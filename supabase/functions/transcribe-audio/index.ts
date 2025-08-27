import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')!
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!

serve(async (req) => {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get the authorization header
    const authorization = req.headers.get('Authorization')
    if (!authorization) {
      throw new Error('No authorization header')
    }

    // Create supabase client to verify JWT
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authorization } }
    })

    // Verify the user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      throw new Error('Unauthorized')
    }

    // Get the audio file from form data
    const formData = await req.formData()
    const audioFile = formData.get('audio') as File
    
    if (!audioFile) {
      throw new Error('No audio file provided')
    }

    // Check file size (max 25MB for Whisper)
    if (audioFile.size > 25 * 1024 * 1024) {
      throw new Error('Audio file too large (max 25MB)')
    }

    // Prepare form data for OpenAI Whisper API
    const whisperFormData = new FormData()
    whisperFormData.append('file', audioFile)
    whisperFormData.append('model', 'whisper-1')
    whisperFormData.append('language', 'nl')
    whisperFormData.append('response_format', 'json')

    // Call OpenAI Whisper API
    const whisperResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: whisperFormData,
    })

    if (!whisperResponse.ok) {
      const error = await whisperResponse.text()
      throw new Error(`Whisper API error: ${error}`)
    }

    const transcriptionResult = await whisperResponse.json()
    const transcript = transcriptionResult.text

    if (!transcript) {
      throw new Error('No transcription result')
    }

    // Simple sentiment analysis (can be enhanced with AI later)
    const sentiment = analyzeSentiment(transcript)

    return new Response(
      JSON.stringify({ 
        transcript,
        sentiment,
        duration: audioFile.size // Rough estimate, could be improved
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Transcription Error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Er ging iets mis bij het transcriberen. Probeer het opnieuw.' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})

// Simple sentiment analysis based on keywords
function analyzeSentiment(text: string): 'positive' | 'neutral' | 'negative' {
  const positiveWords = ['goed', 'fijn', 'blij', 'gelukkig', 'trots', 'succesvol', 'geweldig', 'fantastisch'];
  const negativeWords = ['slecht', 'verdrietig', 'boos', 'gefrustreerd', 'moeilijk', 'zwaar', 'stress', 'pijn'];
  
  const words = text.toLowerCase().split(/\s+/);
  let positiveScore = 0;
  let negativeScore = 0;
  
  words.forEach(word => {
    if (positiveWords.some(pw => word.includes(pw))) positiveScore++;
    if (negativeWords.some(nw => word.includes(nw))) negativeScore++;
  });
  
  if (positiveScore > negativeScore) return 'positive';
  if (negativeScore > positiveScore) return 'negative';
  return 'neutral';
}