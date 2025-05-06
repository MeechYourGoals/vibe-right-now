
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
    const { audio } = await req.json();
    
    if (!audio) {
      throw new Error('No audio data provided');
    }

    // Process audio in chunks to prevent memory issues
    const audioBytes = processBase64(audio);
    
    // Call Google Speech-to-Text API
    const response = await fetch(`https://speech.googleapis.com/v1/speech:recognize?key=${GOOGLE_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        config: {
          encoding: 'WEBM_OPUS',
          sampleRateHertz: 48000,
          languageCode: 'en-US',
          model: 'latest_long',
          enableAutomaticPunctuation: true,
        },
        audio: {
          content: audioBytes
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Speech-to-Text API error:', errorText);
      throw new Error(`Speech-to-Text API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract transcript from response
    let transcript = '';
    if (data.results && data.results.length > 0) {
      transcript = data.results.map((result: any) => 
        result.alternatives[0]?.transcript || ''
      ).join(' ');
    }
    
    return new Response(JSON.stringify({ text: transcript }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error in google-speech-to-text function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Process base64 in chunks to prevent memory issues
function processBase64(base64String: string): string {
  return base64String; // For Google's API, we can use the base64 string directly
}
