
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
    
    if (!GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Gemini API key not configured" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Check if this is a location query
    const isLocationQuery = /what|where|when|things to do|events|places|restaurants|bars|attractions|activities|visit|in|at|near|around/i.test(query);
    const hasCityName = /miami|new york|los angeles|chicago|san francisco|boston|seattle|austin|denver|nashville|atlanta|portland|dallas|houston|phoenix|philadelphia|san diego|las vegas|orlando|washington|dc/i.test(query);
    
    // Determine the best prompt for this query
    let promptText = "";
    
    if (isLocationQuery || hasCityName) {
      promptText = `You are VeRNon, a venue and event discovery assistant. The user is asking about: "${query}".
      
      Provide detailed, accurate information about real venues, events, activities, or attractions that match this query.
      
      If the query is about a location (city, neighborhood, etc.):
      - List popular venues, attractions, and current events in that location
      - Include specific venue names, addresses, and operating hours when available
      - Group information by categories (dining, nightlife, attractions, events, etc.)
      - Mention upcoming events with dates and ticket information if relevant
      
      If the query is about a specific type of activity or venue:
      - Provide examples of places where this activity can be done
      - Include specific details like hours, pricing, and locations
      
      Format your response in a clear, organized way with sections and categories.
      Always prioritize real, verifiable places and events that exist in the real world.
      Include helpful tips for visitors when appropriate.
      
      Your goal is to be as helpful as possible in helping the user discover real venues and events.`;
    } else {
      promptText = `You are VeRNon, a helpful AI assistant. The user is asking: "${query}". 
      Provide a detailed, informative response to their question.`;
    }
    
    // Use Gemini to search for relevant information with a more direct prompt
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: promptText }]
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
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts) {
      console.error("Unexpected Gemini API response structure:", JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: "Unexpected Gemini API response structure" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
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
