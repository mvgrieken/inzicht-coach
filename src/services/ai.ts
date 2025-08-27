import { supabase } from './supabase';

// Edge function to call OpenAI API safely
export async function sendChatMessage(message: string, conversationHistory: { role: string; content: string }[]) {
  try {
    const { data, error } = await supabase.functions.invoke('ai-chat', {
      body: {
        message,
        history: conversationHistory,
      },
    });

    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('AI Chat Error:', error);
    throw new Error('Er ging iets mis bij het versturen van je bericht. Probeer het opnieuw.');
  }
}

// Edge function for voice transcription using Whisper
export async function transcribeAudio(audioFile: Blob) {
  try {
    const formData = new FormData();
    formData.append('audio', audioFile);

    const { data, error } = await supabase.functions.invoke('transcribe-audio', {
      body: formData,
    });

    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Transcription Error:', error);
    throw new Error('Er ging iets mis bij het transcriberen van je spraak. Probeer het opnieuw.');
  }
}

// System prompt for the AI coach
export const COACH_SYSTEM_PROMPT = `
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
`;