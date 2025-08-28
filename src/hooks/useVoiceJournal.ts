import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Audio } from 'expo-av';
import { supabase } from '@/services/supabase';
import { transcribeAudio } from '@/services/ai';
import { VoiceJournal } from '@/types';

export function useVoiceJournals(userId: string) {
  return useQuery({
    queryKey: ['voice_journals', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('voice_journals')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false });

      if (error) throw error;
      return data as VoiceJournal[];
    },
    enabled: !!userId,
  });
}

export function useAudioRecording() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingURI, setRecordingURI] = useState<string | null>(null);

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Audio recording permission not granted');
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

              const { recording: newRecording } = await Audio.Recording.createAsync();
      
      setRecording(newRecording);
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      throw new Error('Kon niet beginnen met opnemen. Controleer je microfoon permissies.');
    }
  };

  const stopRecording = async () => {
    if (!recording) return null;

    try {
      setIsRecording(false);
      await recording.stopAndUnloadAsync();
      
      const uri = recording.getURI();
      setRecordingURI(uri);
      setRecording(null);
      
      return uri;
    } catch (error) {
      console.error('Error stopping recording:', error);
      throw new Error('Fout bij stoppen van opname');
    }
  };

  const clearRecording = () => {
    setRecording(null);
    setRecordingURI(null);
    setIsRecording(false);
  };

  return {
    recording,
    isRecording,
    recordingURI,
    startRecording,
    stopRecording,
    clearRecording,
  };
}

export function useCreateVoiceJournal() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({
      userId,
      audioURI,
      notes,
    }: {
      userId: string;
      audioURI: string;
      notes?: string;
    }) => {
      const date = new Date().toISOString().split('T')[0];
      
      try {
        // Convert URI to blob for web, or use file path for mobile
        let audioBlob: Blob;
        
        if (audioURI.startsWith('blob:') || audioURI.startsWith('http')) {
          // Web version
          const response = await fetch(audioURI);
          audioBlob = await response.blob();
        } else {
          // Mobile version - read the file
          const response = await fetch(audioURI);
          audioBlob = await response.blob();
        }

        // Upload audio to Supabase Storage
        const fileName = `voice-journal-${userId}-${Date.now()}.m4a`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('voice-journals')
          .upload(fileName, audioBlob);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('voice-journals')
          .getPublicUrl(fileName);

        // Transcribe audio (optional - can be done async)
        let transcript = undefined;
        try {
          const transcriptionResult = await transcribeAudio(audioBlob);
          transcript = transcriptionResult.transcript;
        } catch (error) {
          console.warn('Transcription failed:', error);
          // Continue without transcript - user can still save the voice journal
        }

        // Save voice journal entry
        const { data, error } = await supabase
          .from('voice_journals')
          .insert({
            user_id: userId,
            date,
            audio_url: publicUrl,
            transcript: transcript || notes,
            sentiment: transcript ? undefined : 'neutral', // Will be analyzed if transcript exists
          })
          .select()
          .single();

        if (error) throw error;
        return data as VoiceJournal;
      } catch (error) {
        console.error('Voice journal creation error:', error);
        throw new Error('Kon spraaknotitie niet opslaan. Probeer het opnieuw.');
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['voice_journals', data.user_id] });
    },
  });
}