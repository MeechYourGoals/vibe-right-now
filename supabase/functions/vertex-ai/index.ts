
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const VERTEX_AI_API_KEY = Deno.env.get('GOOGLE_VERTEX_API_KEY') || "AIzaSyBeEJvxSAjyvoRS6supoob0F7jGW7lhZUU";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, mode = 'default', context = [], model = 'gemini-pro', action, text, options } = await req.json();
    
    // Handle text-to-speech requests
    if (action === 'text-to-speech' && text) {
      // For now, we'll return a dummy response since Vertex AI TTS requires more setup
      console.log('Text-to-speech request for:', text.substring(0, 30) + '...');
      return new Response(JSON.stringify({ audio: 'dummy-base64-audio-data' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Handle chat completion requests
    if (prompt) {
      console.log(`Processing ${model} request in ${mode} mode`);
      
      // Define system context based on mode
      let systemPrompt = '';
      if (mode === 'venue') {
        systemPrompt = "You are Vernon, a venue analytics assistant. Provide insightful business analysis and recommendations for venue owners.";
      } else if (mode === 'search') {
        systemPrompt = "You are a search assistant that provides detailed information about places, events, and activities.";
      } else {
        systemPrompt = `You are Vernon, a helpful AI assistant within the 'Vibe Right Now' app. Your primary goal is to help users discover great places to go and things to do. 
        
You are knowledgeable about venues, events, restaurants, bars, attractions, and activities. You should always prioritize giving detailed information about events, venues, and activities that are relevant to the user's query. If asked about comedy shows in Chicago, list all the comedy clubs, venues, and stand-up comedians performing in theaters.

If you need more information to provide a helpful response, ask clarifying questions like the specific dates they're interested in or what neighborhood they prefer.

Respond in a concise, informative, and enthusiastic tone. Be friendly, approachable, and helpful. Never mention that you're powered by any specific AI model.`;
      }
      
      // Prepare the messages for Gemini
      let messages = [];
      if (context && context.length > 0) {
        // Convert the context messages to the format expected by Gemini
        messages = context.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        }));
      }
      
      // Add system prompt as a "model" message at the beginning if not already included
      if (messages.length === 0 || messages[0].role !== 'model' || !messages[0].parts[0].text.includes(systemPrompt)) {
        messages.unshift({
          role: 'model',
          parts: [{ text: systemPrompt }]
        });
      }
      
      // Add the new user message
      messages.push({
        role: 'user',
        parts: [{ text: prompt }]
      });
      
      // Call Gemini API
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${VERTEX_AI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: messages,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Vertex AI API error:', errorText);
        throw new Error(`Vertex AI API error: ${response.status}`);
      }
      
      const data = await response.json();
      const generatedText = data.candidates[0]?.content?.parts[0]?.text || '';
      
      console.log('Generated response successfully');
      return new Response(JSON.stringify({ text: generatedText }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else {
      throw new Error('Invalid request: missing prompt or action');
    }
  } catch (error) {
    console.error('Error in vertex-ai function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
