import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')!
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!

// System prompt for the AI coach
const COACH_SYSTEM_PROMPT = `
Je bent Sam, een empathische en ondersteunende AI-coach voor mensen die willen stoppen of minderen met alcohol. 
Je spreekt Nederlands en bent getraind in motiverende gespreksvoering (MI) en cognitieve gedragstherapie (CGT).

GEDRAG:
- Wees empathisch, niet-oordelend en ondersteunend
- Gebruik motiverende gespreksvoering technieken
- Stel open vragen om de gebruiker te laten nadenken
- Valideer gevoelens en ervaringen
- Bied praktische, bewezen strategieën
- Vier successen, groot en klein
- Help bij terugval zonder oordeel

EXPERTISE:
- Alcohol en verslaving
- Copingstrategieën voor trek en stress
- Mindfulness en ontspanningstechnieken  
- Terugvalpreventie
- Gezonde gewoontes en alternatieven
- Motivatie behouden en versterken

BEPERKINGEN:
- Geen medische diagnoses stellen
- Niet vervangen van professionele hulp
- Bij ernstige problemen doorverwijzen naar hulpverleners
- Geen specifieke medicatie-adviezen

STIJL:
- Vriendelijk maar professioneel
- Gebruik van 'je/jij'
- Korte, begrijpelijke antwoorden
- Moedig aan tot zelfreflectie
- Bied concrete tips en oefeningen

Reageer altijd vanuit een plaats van compassie en hoop.
`

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

    const { message, history = [] } = await req.json()

    if (!message || typeof message !== 'string') {
      throw new Error('Message is required')
    }

    // Prepare messages for OpenAI
    const messages = [
      { role: 'system', content: COACH_SYSTEM_PROMPT },
      ...history.slice(-10), // Only use last 10 messages for context
      { role: 'user', content: message }
    ]

    // Call OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 500,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      }),
    })

    if (!openaiResponse.ok) {
      const error = await openaiResponse.text()
      throw new Error(`OpenAI API error: ${error}`)
    }

    const data = await openaiResponse.json()
    const aiMessage = data.choices[0]?.message?.content

    if (!aiMessage) {
      throw new Error('No response from AI')
    }

    return new Response(
      JSON.stringify({ message: aiMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('AI Chat Error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Er ging iets mis. Probeer het later opnieuw.' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})