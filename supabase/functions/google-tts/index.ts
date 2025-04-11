
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, voice, languageCode, speakingRate, pitch } = await req.json();

    if (!text) {
      console.error('No text provided to Google TTS function');
      return new Response(
        JSON.stringify({ error: 'Text is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Google TTS request: ${text.substring(0, 50)}...`);
    console.log(`Using voice: ${voice || 'en-US-Neural2-D'}`);

    // Get Google API key from environment
    const apiKey = Deno.env.get('GOOGLE_API_KEY');
    if (!apiKey) {
      console.error('Google API key not configured in environment');
      return new Response(
        JSON.stringify({ error: 'Google API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Prepare request to Google Cloud Text-to-Speech API
    const requestBody = {
      input: { text },
      voice: { 
        languageCode: languageCode || 'en-US', 
        name: voice || 'en-US-Neural2-D'  // Default to male voice
      },
      audioConfig: { 
        audioEncoding: 'MP3',
        speakingRate: speakingRate || 1.0,
        pitch: pitch !== undefined ? pitch : 0
      }
    };

    // Call Google TTS API with proper error handling
    console.log('Calling Google TTS API...');
    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google TTS API error:', errorText);
      return new Response(
        JSON.stringify({ error: `Google TTS API error: ${errorText}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    
    if (!data.audioContent) {
      console.error('No audio content in Google TTS response');
      return new Response(
        JSON.stringify({ error: 'No audio content in Google TTS response' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log('Google TTS successful, returning audio content');
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
