
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const DEFAULT_MALE_VOICE = "en-US-Neural2-D";

// Get API key from environment variable
const GOOGLE_CLOUD_API_KEY = Deno.env.get('GOOGLE_VERTEX_API_KEY') || '';

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, voice = DEFAULT_MALE_VOICE, speakingRate = 1.0, pitch = 0 } = await req.json();
    
    if (!text) {
      throw new Error('Text is required');
    }
    
    console.log('TTS request received:', { 
      textLength: text.length,
      voice,
      speakingRate,
      pitch
    });

    // Prepare Google Cloud TTS request
    const response = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_CLOUD_API_KEY
      },
      body: JSON.stringify({
        input: { text },
        voice: {
          languageCode: voice.substring(0, 5),
          name: voice,
          ssmlGender: 'MALE' // Force MALE gender for consistent voice
        },
        audioConfig: {
          audioEncoding: 'MP3',
          speakingRate,
          pitch
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Google TTS API error:', response.status, errorData);
      throw new Error(`Google TTS API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('TTS response received successfully');
    
    return new Response(
      JSON.stringify({ audioContent: data.audioContent }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in google-tts function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
