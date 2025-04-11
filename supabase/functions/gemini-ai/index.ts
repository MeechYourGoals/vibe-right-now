
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_API_KEY = "AIzaSyDq1Cm2qUvsJAxvcHnJGrSWvyHDNqOi_O0";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";

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
    
    // Build conversation history in Gemini format
    const messages = [];
    
    // Add system prompt based on the mode
    if (mode === 'venue') {
      messages.push({
        role: "model",
        parts: [{ text: "I am VeRNon for Venues, a business insights assistant. I help venue owners understand their metrics, customer trends, and marketing performance." }]
      });
    } else {
      messages.push({
        role: "model",
        parts: [{ text: "I am VeRNon, a venue and event discovery assistant. I help users find venues, events, and local attractions based on their preferences and location." }]
      });
    }
    
    // Add conversation history
    if (history && history.length > 0) {
      for (const message of history) {
        messages.push({
          role: message.sender === 'user' ? "user" : "model",
          parts: [{ text: message.text }]
        });
      }
    }
    
    // Add the current prompt
    messages.push({
      role: "user",
      parts: [{ text: prompt }]
    });
    
    console.log("Sending request to Gemini API with messages:", JSON.stringify(messages));
    
    // Call the Gemini API
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: messages,
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
      console.error(`Gemini API error: ${response.status}`, errorData);
      return new Response(
        JSON.stringify({ error: `Error calling Gemini API: ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log("Gemini API response:", JSON.stringify(data));
    
    // Extract the response text
    const responseText = data.candidates[0].content.parts[0].text;
    
    return new Response(
      JSON.stringify({ text: responseText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in gemini-ai function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
