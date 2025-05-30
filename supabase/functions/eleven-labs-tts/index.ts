
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const ELEVEN_LABS_API_KEY = Deno.env.get('ELEVEN_LABS_API_KEY') || '';
const DEFAULT_VOICE_ID = "pNInz6obpgDQGcFmaJgB"; // Adam voice ID

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
    // Validate API key
    if (!ELEVEN_LABS_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'ElevenLabs API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    const { text, voiceId = DEFAULT_VOICE_ID, model = "eleven_multilingual_v2" } = await req.json();

    if (!text) {
      return new Response(
        JSON.stringify({ error: 'Text is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Reduce text length if it's too long to save credits
    const reducedText = reduceLongText(text);
    console.log(`Converting text to speech: "${reducedText.substring(0, 50)}..." with voice ${voiceId}`);

    // Call Eleven Labs API
    const elevenLabsResponse = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': ELEVEN_LABS_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: reducedText,
          model_id: model,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      }
    );

    if (!elevenLabsResponse.ok) {
      const errorText = await elevenLabsResponse.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        errorData = { detail: errorText };
      }
      
      // Special handling for quota exceeded errors
      if (errorData?.detail?.status === 'quota_exceeded') {
        console.log('ElevenLabs quota exceeded, returning error with specific code');
        return new Response(
          JSON.stringify({ 
            error: 'quota_exceeded', 
            message: 'ElevenLabs quota exceeded',
            details: errorData?.detail
          }),
          { 
            status: 429, 
            headers: { 
              ...corsHeaders, 
              'Content-Type': 'application/json',
              'X-Error-Type': 'quota_exceeded' 
            } 
          }
        );
      }
      
      console.error(`ElevenLabs API error: ${errorText}`);
      return new Response(
        JSON.stringify({ 
          error: 'Error calling ElevenLabs API', 
          details: errorData || errorText,
          status: elevenLabsResponse.status 
        }),
        { status: elevenLabsResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get audio as array buffer
    const audioArrayBuffer = await elevenLabsResponse.arrayBuffer();

    // Return the audio stream with appropriate content type
    return new Response(audioArrayBuffer, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'audio/mpeg',
      },
    });
  } catch (error) {
    console.error('Error in eleven-labs-tts function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Helper function to reduce long text
function reduceLongText(text: string): string {
  // If text is less than 500 characters, return as is
  if (text.length < 500) return text;
  
  // For longer text, truncate while trying to maintain complete sentences
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  let result = '';
  let totalChars = 0;
  const charLimit = 800;
  
  for (const sentence of sentences) {
    if (totalChars + sentence.length > charLimit) {
      break;
    }
    result += sentence;
    totalChars += sentence.length;
  }
  
  // Add an ellipsis if we truncated the text
  if (result.length < text.length) {
    result = result.trim() + '...';
  }
  
  return result;
}
