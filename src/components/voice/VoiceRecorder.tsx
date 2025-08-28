import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput } from 'react-native';
import tw from '@/utils/tailwind';
import { useAudioRecording, useCreateVoiceJournal } from '@/hooks/useVoiceJournal';

interface VoiceRecorderProps {
  userId: string;
  onSaved?: () => void;
}

export function VoiceRecorder({ userId, onSaved }: VoiceRecorderProps) {
  const [notes, setNotes] = useState('');
  const [showNotesInput, setShowNotesInput] = useState(false);
  
  const {
    isRecording,
    recordingURI,
    startRecording,
    stopRecording,
    clearRecording,
  } = useAudioRecording();
  
  const createVoiceJournal = useCreateVoiceJournal();

  const handleStartRecording = async () => {
    try {
      await startRecording();
    } catch (error) {
      Alert.alert('Fout', error instanceof Error ? error.message : 'Onbekende fout');
    }
  };

  const handleStopRecording = async () => {
    try {
      await stopRecording();
      setShowNotesInput(true);
    } catch (error) {
      Alert.alert('Fout', error instanceof Error ? error.message : 'Onbekende fout');
    }
  };

  const handleSave = async () => {
    if (!recordingURI) {
      Alert.alert('Fout', 'Geen opname gevonden');
      return;
    }

    try {
      await createVoiceJournal.mutateAsync({
        userId,
        audioURI: recordingURI,
        notes: notes.trim() || undefined,
      });

      Alert.alert('Gelukt!', 'Je spraaknotitie is opgeslagen!');
      clearRecording();
      setNotes('');
      setShowNotesInput(false);
      onSaved?.();
    } catch (error) {
      Alert.alert('Fout', error instanceof Error ? error.message : 'Onbekende fout');
    }
  };

  const handleDiscard = () => {
    clearRecording();
    setNotes('');
    setShowNotesInput(false);
  };

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={tw`bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-sm`}>
      <Text style={tw`text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4 text-center`}>
        Spraakdagboek 🎙️
      </Text>

      {/* Recording State */}
      {!recordingURI ? (
        <View style={tw`items-center`}>
          {isRecording ? (
            <>
              <View style={tw`w-20 h-20 bg-red-500 rounded-full items-center justify-center mb-4 animate-pulse`}>
                <Text style={tw`text-white text-2xl`}>🎙️</Text>
              </View>
              <Text style={tw`text-base text-neutral-800 dark:text-neutral-200 mb-4 text-center`}>
                Opname bezig...
              </Text>
              <TouchableOpacity
                style={tw`bg-red-500 px-6 py-3 rounded-lg`}
                onPress={handleStopRecording}
              >
                <Text style={tw`text-white font-medium`}>
                  ⏹️ Stop opname
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={tw`text-sm text-neutral-600 dark:text-neutral-400 mb-4 text-center`}>
                Spreek je gedachten, gevoelens of ervaringen in. 
                Dit helpt je om bewuster te worden van je patroon.
              </Text>
              <TouchableOpacity
                style={tw`w-20 h-20 bg-primary-500 rounded-full items-center justify-center mb-4`}
                onPress={handleStartRecording}
              >
                <Text style={tw`text-white text-2xl`}>🎙️</Text>
              </TouchableOpacity>
              <Text style={tw`text-sm text-neutral-600 dark:text-neutral-400 text-center`}>
                Tik om opname te starten
              </Text>
            </>
          )}
        </View>
      ) : (
        <View>
          <View style={tw`items-center mb-4`}>
            <View style={tw`w-16 h-16 bg-green-500 rounded-full items-center justify-center mb-2`}>
              <Text style={tw`text-white text-xl`}>✅</Text>
            </View>
            <Text style={tw`text-base text-neutral-800 dark:text-neutral-200 font-medium`}>
              Opname voltooid!
            </Text>
          </View>

          {showNotesInput && (
            <View style={tw`mb-4`}>
              <Text style={tw`text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2`}>
                Voeg eventueel een notitie toe:
              </Text>
              <TextInput
                style={tw`bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg px-3 py-2 text-neutral-800 dark:text-neutral-200`}
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={3}
                placeholder="Optionele notitie bij je spraakopname..."
                placeholderTextColor={tw.color('neutral-500')}
              />
            </View>
          )}

          <View style={tw`flex-row gap-2`}>
            <TouchableOpacity
              style={tw`flex-1 bg-neutral-200 dark:bg-neutral-600 p-3 rounded-lg items-center`}
              onPress={handleDiscard}
              disabled={createVoiceJournal.isPending}
            >
              <Text style={tw`text-neutral-700 dark:text-neutral-300 font-medium`}>
                Weggooien
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex-1 bg-primary-500 p-3 rounded-lg items-center ${
                createVoiceJournal.isPending ? 'opacity-50' : ''
              }`}
              onPress={handleSave}
              disabled={createVoiceJournal.isPending}
            >
              <Text style={tw`text-white font-medium`}>
                {createVoiceJournal.isPending ? 'Opslaan...' : 'Opslaan'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}