
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_API_KEY = "AIzaSyBeEJvxSAjyvoRS6supoob0F7jGW7lhZUU";

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
    const { query } = await req.json();
    
    console.log("Vector search query:", query);
    
    // This is a placeholder implementation
    // In a real implementation, this would connect to a vector database
    // For now, we'll use Gemini to emulate vector search capabilities
    
    if (!GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Gemini API key not configured" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Call Gemini API to emulate vector search with enhanced web search capabilities
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ 
              text: `Please search the web for current information about: "${query}".
              
              Return detailed and up-to-date information about venues, events, activities, or places that match this query.
              If it's about things to do in a location, include specific venue names, opening hours, and event schedules if available.
              If it's about events, include dates, times, ticket information, and venue details.
              If it's about a type of activity, provide specific locations where this can be done.
              
              Format your response in a clear, organized way with headers and sections as appropriate.
              Focus only on real, verifiable places and events.
              Include web references where relevant.
              
              Your goal is to provide the most helpful and accurate information possible about real places and events.` 
            }]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      })
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API error:", errorData);
      return new Response(
        JSON.stringify({ error: "Error calling Gemini API" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const data = await response.json();
    const results = data.candidates[0].content.parts[0].text;
    
    return new Response(
      JSON.stringify({ results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in vector-search function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
