
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { withErrorHandling } from "../_shared/request-handler.ts";
import { createValidationErrorResponse } from "../_shared/response.ts";
import { validateRequired } from "../_shared/validation.ts";
import { getApiKey } from "../_shared/auth.ts";
import { logInfo, logError } from "../_shared/logging.ts";
import { corsHeaders } from "../_shared/cors.ts";

const BRIAN_VOICE_ID = "nPczCjzI2devNBz1zQrb";

const handler = withErrorHandling(async (req: Request): Promise<Response> => {
  const ELEVEN_LABS_API_KEY = Deno.env.get('ELEVEN_LABS_API_KEY') || '';
  
  if (!ELEVEN_LABS_API_KEY) {
    return createValidationErrorResponse('ElevenLabs API key not configured');
  }

  const { text, voiceId = BRIAN_VOICE_ID, model = "eleven_multilingual_v2" } = await req.json();

  validateRequired(text, 'text');

  const reducedText = reduceLongText(text);
  logInfo(`Converting text to speech with Brian voice`, { textLength: reducedText.length });

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
    logError(`ElevenLabs API error: ${errorText}`, { status: elevenLabsResponse.status });
    throw new Error('Error calling ElevenLabs API');
  }

  const audioArrayBuffer = await elevenLabsResponse.arrayBuffer();

  return new Response(audioArrayBuffer, {
    headers: {
      ...corsHeaders,
      'Content-Type': 'audio/mpeg',
    },
  });
}, 'eleven-labs-tts');

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

serve(handler);
