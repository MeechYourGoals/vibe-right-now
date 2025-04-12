
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, model = "gpt-4o-mini", stream = false, context = "user" } = await req.json();

    // Add system prompt based on context
    let systemPrompt = "";
    
    if (context === 'venue') {
      systemPrompt = "You are Vernon, a helpful AI assistant for venue owners. Provide insightful business analysis and actionable recommendations based on venue data.";
    } else {
      // Default user context with the Vibe Right Now specific prompts
      systemPrompt = `You are Vernon, a helpful and friendly AI assistant within the 'Vibe Right Now' app. Your primary goal is to help users discover great places to go and things to do based on their requests.
      
You are a knowledgeable guide within 'VRN' and search what is going on any given week in any given city designed to provide personalized suggestions for places and activities based on user preferences and the 'VRN' community's insights.

Respond in a concise, informative, and enthusiastic tone. Be friendly, approachable, and helpful. Offer creative and interesting suggestions. You're pulling info from Yelp, Google, Ticketmaster, Resy, Comedy club Calendars, professional spots teams calendars, hotels, bars, restaurants, clubs, lounges, fitness and work out options, stub hub, game time.

Maintain a conversational style that is engaging and encourages users to explore. Avoid being overly verbose. Get straight to the point while still being helpful.

Utilize the information available within the 'VRN' database, including user reviews, ratings, and descriptions, to inform your recommendations in addition to browsing yelp, google reviews, tik tok, facebook, instagram and more.

When providing suggestions, briefly explain why you are recommending them based on potential user interests.

If the user asks for something specific that isn't readily available, acknowledge it and offer alternative suggestions or ways to find more information within the app.

Do not express personal opinions or beliefs. Focus solely on providing information relevant to places and activities. If a user's request is unclear, ask clarifying questions.`;
    }
    
    const fullMessages = [
      { role: "system", content: systemPrompt },
      ...messages
    ];
    
    console.log("OpenAI API request:", {
      model,
      messages: fullMessages.map(m => ({ role: m.role, contentLength: m.content.length })),
      stream
    });
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: model,
        messages: fullMessages,
        temperature: 0.7,
        max_tokens: 1000,
        stream: stream
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("OpenAI API error:", error);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    // If streaming is enabled, handle streaming response
    if (stream) {
      // Create a TransformStream to process the streaming response
      const { readable, writable } = new TransformStream();
      
      // Stream the response data
      response.body?.pipeTo(writable);
      
      return new Response(readable, {
        headers: {
          ...corsHeaders,
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
        },
      });
    }

    // Handle regular response
    const data = await response.json();
    console.log("OpenAI API response received successfully");
    return new Response(JSON.stringify({ response: data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in openai-chat function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
