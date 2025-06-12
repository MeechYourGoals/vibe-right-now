
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const ELEVEN_LABS_API_KEY = Deno.env.get('ELEVEN_LABS_API_KEY') || '';
const BRIAN_VOICE_ID = "nPczCjzI2devNBz1zQrb";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!ELEVEN_LABS_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'ElevenLabs API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { text, voiceId = BRIAN_VOICE_ID, model = "eleven_multilingual_v2" } = await req.json();

    if (!text) {
      return new Response(
        JSON.stringify({ error: 'Text is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const reducedText = reduceLongText(text);
    console.log(`Converting text to speech with Brian voice: "${reducedText.substring(0, 50)}..."`);

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
            stability: 0.75,
            similarity_boost: 0.85,
            style: 0.2,
            use_speaker_boost: true
          },
        }),
      }
    );

    if (!elevenLabsResponse.ok) {
      const errorText = await elevenLabsResponse.text();
      console.error(`ElevenLabs API error: ${errorText}`);
      return new Response(
        JSON.stringify({ 
          error: 'Error calling ElevenLabs API', 
          details: errorText,
          status: elevenLabsResponse.status 
        }),
        { status: elevenLabsResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const audioArrayBuffer = await elevenLabsResponse.arrayBuffer();

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

function reduceLongText(text: string): string {
  if (text.length < 500) return text;
  
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
  
  if (result.length < text.length) {
    result = result.trim() + '...';
  }
  
  return result;
}
