
// @ts-ignore - Deno imports need to be ignored in TypeScript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

// @ts-ignore - Deno.env needs to be ignored in TypeScript
const GOOGLE_API_KEY = Deno.env.get('GOOGLE_VERTEX_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// @ts-ignore - Deno serve function needs to be ignored in TypeScript
serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, voice = 'en-US-Standard-D' } = await req.json();
    
    if (!text) {
      throw new Error('No text provided');
    }

    // Call Google Text-to-Speech API
    const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: { text },
        voice: {
          languageCode: 'en-US',
          name: voice,
        },
        audioConfig: {
          audioEncoding: 'MP3',
          speakingRate: 1.0,
          pitch: 0.0,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Text-to-Speech API error:', errorText);
      throw new Error(`Text-to-Speech API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Return base64-encoded audio
    return new Response(JSON.stringify({ audio: data.audioContent }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error in google-text-to-speech function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
