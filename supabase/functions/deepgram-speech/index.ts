
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, text, audioData, voice = 'aura-asteria-en' } = await req.json();
    const DEEPGRAM_API_KEY = Deno.env.get('DEEPGRAM_API_KEY') || 'a615f48b1cfac2c90654240a126e3cbbb05fdc5f';

    if (action === 'text-to-speech' && text) {
      console.log(`Converting text to speech with Deepgram voice: ${voice}`);
      
      const response = await fetch(`https://api.deepgram.com/v1/speak?model=${voice}`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${DEEPGRAM_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: text.length > 800 ? text.substring(0, 800) + '...' : text
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Deepgram TTS error:', errorText);
        throw new Error('Failed to generate speech');
      }

      const audioArrayBuffer = await response.arrayBuffer();
      
      return new Response(audioArrayBuffer, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'audio/wav',
        },
      });
    } 
    
    else if (action === 'speech-to-text' && audioData) {
      console.log('Processing speech to text with Deepgram Nova-2');
      
      const audioBuffer = new Uint8Array(atob(audioData).split('').map(c => c.charCodeAt(0)));
      
      const response = await fetch('https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${DEEPGRAM_API_KEY}`,
          'Content-Type': 'audio/wav'
        },
        body: audioBuffer
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Deepgram STT error:', errorText);
        throw new Error('Failed to transcribe audio');
      }

      const data = await response.json();
      const transcript = data.results?.channels[0]?.alternatives[0]?.transcript || '';

      return new Response(
        JSON.stringify({ transcript }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    else {
      throw new Error('Invalid action or missing parameters');
    }
  } catch (error) {
    console.error('Error in Deepgram speech function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
