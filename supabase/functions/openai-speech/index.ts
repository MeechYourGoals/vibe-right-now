
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

// Process base64 in chunks to prevent memory issues
function processBase64Chunks(base64String: string, chunkSize = 32768) {
  const chunks: Uint8Array[] = [];
  let position = 0;
  
  while (position < base64String.length) {
    const chunk = base64String.slice(position, position + chunkSize);
    const binaryChunk = atob(chunk);
    const bytes = new Uint8Array(binaryChunk.length);
    
    for (let i = 0; i < binaryChunk.length; i++) {
      bytes[i] = binaryChunk.charCodeAt(i);
    }
    
    chunks.push(bytes);
    position += chunkSize;
  }

  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;

  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }

  return result;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, audio, text } = await req.json();
    console.log(`Processing ${action} request`, { 
      hasAudio: !!audio, 
      textLength: text?.length 
    });
    
    if (action === "speech-to-text" && audio) {
      // Process audio in chunks
      const binaryAudio = processBase64Chunks(audio);
      console.log("Audio processed, sending to OpenAI");
      
      // Prepare form data
      const formData = new FormData();
      const blob = new Blob([binaryAudio], { type: 'audio/webm' });
      formData.append('file', blob, 'audio.webm');
      formData.append('model', 'whisper-1');

      // Send to OpenAI
      const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("OpenAI Whisper API error:", errorText);
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const result = await response.json();
      console.log("Transcription successful:", { textLength: result.text.length });
      return new Response(
        JSON.stringify({ text: result.text }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else if (action === "text-to-speech" && text) {
      console.log("Processing text-to-speech request");
      // Call OpenAI TTS API
      const response = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'tts-1',
          voice: 'alloy',
          input: text
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("OpenAI TTS API error:", errorText);
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      // Process the audio file
      const audioArrayBuffer = await response.arrayBuffer();
      const audioBase64 = btoa(
        new Uint8Array(audioArrayBuffer)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );

      console.log("Text-to-speech successful");
      return new Response(
        JSON.stringify({ audio: audioBase64 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      throw new Error('Invalid action or missing parameters');
    }
  } catch (error) {
    console.error('Error in openai-speech function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
