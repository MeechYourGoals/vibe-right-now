
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GOOGLE_VERTEX_API_KEY = Deno.env.get('GOOGLE_VERTEX_API_KEY');
const VERTEX_API_URL = "https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/gemini-1.5-pro:generateContent";

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
    const { prompt, mode, history } = await req.json();
    
    // Build conversation history in Vertex AI format
    const contents = [];
    
    // Add system prompt based on the mode
    if (mode === 'venue') {
      contents.push({
        role: "USER",
        parts: [{ text: "You are VeRNon for Venues, a business insights assistant. Help venue owners understand their metrics, customer trends, and marketing performance." }]
      });
      contents.push({
        role: "MODEL",
        parts: [{ text: "I am VeRNon for Venues, a business insights assistant. I help venue owners understand their metrics, customer trends, and marketing performance." }]
      });
    } else {
      contents.push({
        role: "USER",
        parts: [{ text: "You are VeRNon, a venue and event discovery assistant. Help users find venues, events, and local attractions based on their preferences and location." }]
      });
      contents.push({
        role: "MODEL",
        parts: [{ text: "I am VeRNon, a venue and event discovery assistant. I help users find venues, events, and local attractions based on their preferences and location." }]
      });
    }
    
    // Add conversation history
    if (history && history.length > 0) {
      for (const message of history) {
        contents.push({
          role: message.sender === 'user' ? "USER" : "MODEL",
          parts: [{ text: message.text }]
        });
      }
    }
    
    // Add the current prompt
    contents.push({
      role: "USER",
      parts: [{ text: prompt }]
    });
    
    console.log("Sending request to Vertex AI API");
    
    // Call the Vertex AI API
    const response = await fetch(`${VERTEX_API_URL}?key=${GOOGLE_VERTEX_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: contents,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`Vertex AI API error: ${response.status}`, errorData);
      return new Response(
        JSON.stringify({ error: `Error calling Vertex AI API: ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log("Vertex AI API response received");
    
    // Extract the response text
    const responseText = data.candidates[0].content.parts[0].text;
    
    return new Response(
      JSON.stringify({ text: responseText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in vertex-ai function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
