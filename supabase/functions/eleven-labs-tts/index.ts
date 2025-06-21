
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { withErrorHandling } from "../_shared/request-handler.ts";
import { createValidationErrorResponse } from "../_shared/response.ts";
import { validateRequired } from "../_shared/validation.ts";
import { getApiKey } from "../_shared/auth.ts";
import { logInfo, logError } from "../_shared/logging.ts";
import { corsHeaders } from "../_shared/cors.ts";

const DEFAULT_MODEL = "aura-asteria-en";

const handler = withErrorHandling(async (req: Request): Promise<Response> => {
  const DEEPGRAM_API_KEY = Deno.env.get('DEEPGRAM_API_KEY') || '';

  if (!DEEPGRAM_API_KEY) {
    return createValidationErrorResponse('Deepgram API key not configured');
  }

  const { text, model = DEFAULT_MODEL } = await req.json();

  validateRequired(text, 'text');

  const reducedText = reduceLongText(text);
  logInfo(`Converting text to speech with Deepgram`, { textLength: reducedText.length });

  const dgResponse = await fetch(
    `https://api.deepgram.com/v1/speak?model=${model}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Token ${DEEPGRAM_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: reducedText })
    }
  );

  if (!dgResponse.ok) {
    const errorText = await dgResponse.text();
    logError(`Deepgram API error: ${errorText}`, { status: dgResponse.status });
    throw new Error('Error calling Deepgram API');
  }

  const audioArrayBuffer = await dgResponse.arrayBuffer();

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
