
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Use the provided API key
const VERTEX_AI_API_KEY = "AIzaSyDHBe4hL8fQZdz9wSYi9srL0BGTnZ6XmyM";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Received request to vertex-ai function");
    const { prompt, mode = 'default', context = [], model = 'gemini-pro', action, text, options } = await req.json();
    
    // Handle text-to-speech requests
    if (action === 'text-to-speech' && text) {
      try {
        console.log('Text-to-speech request for:', text.substring(0, 30) + '...');
        
        // Call Google's Text-to-Speech API
        const ttsResponse = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${VERTEX_AI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: { text },
            voice: {
              languageCode: 'en-US',
              name: options?.voice || 'en-US-Neural2-D', // Default to male voice
              ssmlGender: 'MALE' // Consistently use male voice
            },
            audioConfig: {
              audioEncoding: 'MP3',
              speakingRate: options?.speakingRate || 1.0,
              pitch: options?.pitch || 0
            }
          })
        });
        
        if (!ttsResponse.ok) {
          throw new Error(`Google TTS API error: ${ttsResponse.status}`);
        }
        
        const ttsData = await ttsResponse.json();
        
        return new Response(JSON.stringify({ audioContent: ttsData.audioContent }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (error) {
        console.error('Error in text-to-speech:', error);
        return new Response(JSON.stringify({ error: error.message, audioContent: null }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Handle speech-to-text requests
    if (action === 'speech-to-text' && prompt) {
      try {
        console.log('Speech-to-text request received');
        
        // Mock implementation for now - would be replaced with actual Google Speech-to-Text API call
        return new Response(JSON.stringify({ transcript: "Speech transcription with Google Speech-to-Text" }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (error) {
        console.error('Error in speech-to-text:', error);
        return new Response(JSON.stringify({ error: error.message, transcript: null }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Handle chat completion requests
    if (prompt) {
      console.log(`Processing ${model} request in ${mode} mode with prompt: ${prompt.substring(0, 50)}...`);
      
      // Define system context based on mode
      let systemPrompt = '';
      if (mode === 'venue') {
        systemPrompt = "You are Vernon, a venue analytics assistant powered by Google Gemini. Provide insightful business analysis and recommendations for venue owners.";
      } else if (mode === 'search') {
        systemPrompt = "You are a search assistant powered by Google Gemini. Provide detailed information about places, events, and activities.";
      } else {
        systemPrompt = `You are Vernon, a helpful AI assistant powered by Google Gemini within the 'Vibe Right Now' app. Your primary goal is to help users discover great places to go and things to do.`;
      }
      
      // Prepare the messages for Gemini
      let messages = [];
      if (context && context.length > 0) {
        // Convert the context messages to the format expected by Gemini
        messages = context.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text || msg.content }]
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
      
      console.log("Sending request to Gemini API with messages:", JSON.stringify(messages));
      
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
        console.error('Google Gemini API error:', errorText);
        throw new Error(`Google Gemini API error: ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      console.log("Gemini API response:", JSON.stringify(data));
      
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      console.log('Generated response successfully:', generatedText.substring(0, 50) + '...');
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
