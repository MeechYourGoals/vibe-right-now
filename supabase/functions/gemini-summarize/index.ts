
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
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
    const { reviews, placeName } = await req.json();
    
    if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
      return new Response(
        JSON.stringify({ 
          error: "No reviews provided for summarization" 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (!GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ 
          error: "GEMINI_API_KEY environment variable is not set" 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Prepare the reviews for summarization
    const reviewsText = reviews.map(review => {
      return `Rating: ${review.rating}/5 - ${review.text}`;
    }).join("\n\n");

    // Create the prompt for summarizing reviews
    const prompt = `
      You are a helpful assistant that provides concise summaries of user reviews for locations and businesses.
      
      Please analyze the following reviews for "${placeName}" and provide:
      
      1. A 1-2 sentence overall impression
      2. Main positive points (3-4 bullet points)
      3. Main negative points or areas for improvement (1-2 bullet points, if any)
      4. A brief statement about the typical visitor experience
      
      Format your response in a structured way with clear sections, but keep it concise and easy to read.
      
      Here are the reviews to analyze:
      
      ${reviewsText}
    `;

    // Call the Gemini API
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          role: "user",
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.3,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Gemini API error: ${response.status}`, errorText);
      return new Response(
        JSON.stringify({ error: `Error calling Gemini API: ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const summaryText = data.candidates[0].content.parts[0].text;
    
    return new Response(
      JSON.stringify({ summary: summaryText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in gemini-summarize function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
