
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
    const systemPrompt = context === 'venue' 
      ? "You are Vernon, a helpful AI assistant for venue owners. Provide insightful business analysis and actionable recommendations based on venue data." 
      : "You are Vernon, a helpful AI assistant specializing in local recommendations, events, venues, and things to do in cities. Provide concise, friendly responses with specific venue names and details when possible.";
    
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
