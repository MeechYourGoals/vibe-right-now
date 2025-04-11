
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GOOGLE_VERTEX_API_KEY = Deno.env.get('GOOGLE_VERTEX_API_KEY');
const STT_API_URL = "https://speech.googleapis.com/v1/speech:recognize";

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
    const { audio } = await req.json();
    
    if (!audio) {
      return new Response(
        JSON.stringify({ error: 'Audio content is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Call Google Speech-to-Text API
    const response = await fetch(`${STT_API_URL}?key=${GOOGLE_VERTEX_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        config: {
          encoding: 'WEBM_OPUS',
          sampleRateHertz: 48000,
          languageCode: 'en-US',
          model: 'latest_long'
        },
        audio: {
          content: audio
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`Google STT API error: ${response.status}`, errorData);
      return new Response(
        JSON.stringify({ error: `Error calling Google STT API: ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log("Google STT API response received");
    
    let transcript = '';
    if (data.results && data.results.length > 0) {
      transcript = data.results[0].alternatives[0].transcript || '';
    }
    
    return new Response(
      JSON.stringify({ transcript }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in google-stt function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
