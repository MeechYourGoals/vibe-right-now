
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Get the Gemini API key from environment
const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

if (!GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY is not set in environment variables');
}

// Models to use with fallback logic
const MODELS = {
  PRIMARY: 'gemini-1.5-pro',
  FALLBACK: 'gemini-1.0-pro',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Received request to vertex-ai function");
    const { prompt, mode = 'default', context = [], model = MODELS.PRIMARY, action, text, options } = await req.json();
    
    // Handle text-to-speech requests
    if (action === 'text-to-speech' && text) {
      try {
        console.log('Text-to-speech request for:', text.substring(0, 30) + '...');
        
        // Call Google's Text-to-Speech API
        const ttsResponse = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: { text },
            voice: {
              languageCode: 'en-US',
              name: options?.voice || 'en-US-Neural2-D',
              ssmlGender: 'MALE'
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
      const requestedModel = model || MODELS.PRIMARY;
      console.log(`Processing ${requestedModel} request in ${mode} mode with prompt: ${prompt.substring(0, 50)}...`);
      
      // Define system context based on mode
      let systemPrompt = '';
      if (mode === 'venue') {
        systemPrompt = "You are Vernon, a venue analytics assistant powered by Google Gemini. Provide insightful business analysis and recommendations for venue owners. You can search the web for real-time information about venues, events, and business trends.";
      } else if (mode === 'search') {
        systemPrompt = "You are Vernon, a search assistant powered by Google Gemini. Provide detailed, accurate information about places, events, and activities using web search when needed.";
      } else {
        systemPrompt = `You are Vernon, a helpful AI assistant powered by Google Gemini within the 'Vibe Right Now' app. Your primary goal is to help users discover great places to go and things to do. You have access to real-time web search and can provide current information about venues, events, restaurants, entertainment, and more. Always provide helpful, accurate, and up-to-date information.`;
      }
      
      // Prepare the messages for Gemini
      let messages = [];
      
      // Add system prompt as the first message
      messages.push({
        role: 'user',
        parts: [{ text: systemPrompt }]
      });
      
      messages.push({
        role: 'model',
        parts: [{ text: "I understand. I'm Vernon, your AI assistant powered by Google Gemini. I'm here to help you with information about venues, events, places to go, and general questions. I can search the web for real-time information. How can I help you today?" }]
      });
      
      // Process context properly - ensure it's in the correct format
      if (context && context.length > 0) {
        const contextMessages = context.map(msg => ({
          role: msg.role || (msg.sender === 'user' ? 'user' : 'model'),
          parts: [{ text: msg.parts?.[0]?.text || msg.text || msg.content || '' }]
        }));
        messages = messages.concat(contextMessages);
      }
      
      // Add the new user message
      messages.push({
        role: 'user',
        parts: [{ text: prompt }]
      });
      
      console.log("Sending request to Gemini API with", messages.length, "messages");

      // Try with primary model first
      try {
        const response = await callGeminiAPI(requestedModel, messages);
        const generatedText = response.candidates?.[0]?.content?.parts?.[0]?.text || '';
        
        if (!generatedText) {
          throw new Error('No text generated in Gemini response');
        }
        
        console.log('Generated response successfully:', generatedText.substring(0, 50) + '...');
        
        return new Response(JSON.stringify({ text: generatedText }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (error) {
        console.error('Error with Gemini API:', error);
        
        // If we get a rate limit error and we're using the primary model, try fallback
        if (error.message.includes('429') && requestedModel === MODELS.PRIMARY) {
          console.log(`Rate limit exceeded for ${MODELS.PRIMARY}, trying fallback model ${MODELS.FALLBACK}`);
          
          try {
            const fallbackResponse = await callGeminiAPI(MODELS.FALLBACK, messages);
            const fallbackText = fallbackResponse.candidates?.[0]?.content?.parts?.[0]?.text || '';
            console.log('Generated response with fallback model:', fallbackText.substring(0, 50) + '...');
            
            return new Response(JSON.stringify({ 
              text: fallbackText,
              usedFallbackModel: true 
            }), {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          } catch (fallbackError) {
            console.error('Error with fallback model:', fallbackError);
            throw new Error(`Failed with both primary and fallback models: ${fallbackError.message}`);
          }
        } else {
          // Rethrow if it's not a rate limit issue or we've already tried fallback
          throw error;
        }
      }
    } else {
      throw new Error('Invalid request: missing prompt or action');
    }
  } catch (error) {
    console.error('Error in vertex-ai function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      fallbackResponse: "I'm currently experiencing connection issues with Google's AI services. Please try again shortly." 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Helper function to call Gemini API
async function callGeminiAPI(model, messages) {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`, {
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
        maxOutputTokens: 2048,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    }),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Google Gemini API error: ${response.status}:`, errorText);
    throw new Error(`Google Gemini API error: ${response.status}: ${errorText}`);
  }
  
  const responseData = await response.json();
  
  if (!responseData.candidates || responseData.candidates.length === 0) {
    console.error('No candidates in Gemini response:', responseData);
    throw new Error('No response candidates generated by Gemini');
  }
  
  return responseData;
}
