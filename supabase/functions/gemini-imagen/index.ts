
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_API_KEY = "AIzaSyBeEJvxSAjyvoRS6supoob0F7jGW7lhZUU";
const IMAGEN_API_URL = "https://generativelanguage.googleapis.com/v1/models/imagegeneration:generateImage";

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
    const { prompt } = await req.json();
    
    console.log("Generating image with prompt:", prompt);
    
    // Call the Imagen API (part of Gemini)
    const response = await fetch(`${IMAGEN_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: {
          text: prompt
        },
        sampleCount: 1,
        sampleImageSize: "1024x1024"
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`Imagen API error: ${response.status}`, errorData);
      return new Response(
        JSON.stringify({ error: `Error calling Imagen API: ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    
    // Extract the image data
    const imageData = data.images[0].base64;
    
    return new Response(
      JSON.stringify({ imageData: imageData }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in gemini-imagen function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
