
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Use the provided API key
const VERTEX_AI_API_KEY = "AIzaSyDHBe4hL8fQZdz9wSYi9srL0BGTnZ6XmyM";

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
    const { prompt, mode = 'default', context = [], model = MODELS.PRIMARY, action, text, audio, options, messages, query } = await req.json();
    
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
    if (action === 'speech-to-text' && audio) {
      try {
        console.log('Speech-to-text request received');
        
        // Call Google Speech-to-Text API
        const sttResponse = await fetch(`https://speech.googleapis.com/v1/speech:recognize?key=${VERTEX_AI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            config: {
              encoding: 'WEBM_OPUS',
              sampleRateHertz: 48000,
              languageCode: 'en-US',
              enableAutomaticPunctuation: true,
              model: 'latest_long'
            },
            audio: {
              content: audio
            }
          })
        });
        
        if (!sttResponse.ok) {
          throw new Error(`Google STT API error: ${sttResponse.status}`);
        }
        
        const sttData = await sttResponse.json();
        const transcript = sttData.results?.[0]?.alternatives?.[0]?.transcript || '';
        
        return new Response(JSON.stringify({ transcript }), {
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

    // Handle search requests (replacing Perplexity)
    if (action === 'search' && (query || prompt)) {
      try {
        const searchQuery = query || prompt;
        console.log('Search request:', searchQuery);
        
        // Use Gemini for search-enhanced responses
        const searchPrompt = `
          Please provide comprehensive, up-to-date information about "${searchQuery}".
          Include specific details like:
          - Names of venues, events, or places
          - Addresses and locations when relevant
          - Hours, prices, and availability if applicable
          - Current and recent information
          
          Format your response clearly and provide actionable information.
        `;
        
        const response = await callGeminiAPI(MODELS.PRIMARY, [{
          role: 'user',
          parts: [{ text: searchPrompt }]
        }]);
        
        const searchResult = response.candidates?.[0]?.content?.parts?.[0]?.text || '';
        
        return new Response(JSON.stringify({ 
          text: searchResult,
          relatedQuestions: [] // Placeholder for related questions
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (error) {
        console.error('Error in search:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Handle OpenAI-style chat completion requests
    if (action === 'chat' && messages) {
      try {
        console.log('Chat completion request with messages:', messages.length);
        
        // Convert OpenAI format to Gemini format
        const geminiMessages = messages.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }));
        
        const response = await callGeminiAPI(model || MODELS.PRIMARY, geminiMessages);
        const generatedText = response.candidates?.[0]?.content?.parts?.[0]?.text || '';
        
        // Return in OpenAI-compatible format
        return new Response(JSON.stringify({
          response: {
            choices: [{
              message: {
                content: generatedText,
                role: 'assistant'
              }
            }]
          }
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (error) {
        console.error('Error in chat completion:', error);
        return new Response(JSON.stringify({ error: error.message }), {
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
        systemPrompt = "You are Vernon, a venue analytics assistant powered by Google Gemini. Provide insightful business analysis and recommendations for venue owners.";
      } else if (mode === 'search') {
        systemPrompt = "You are a search assistant powered by Google Gemini. Provide detailed information about places, events, and activities with current, accurate information.";
      } else {
        systemPrompt = `You are Vernon, a helpful AI assistant powered by Google Gemini within the 'Vibe Right Now' app. Your primary goal is to help users discover great places to go and things to do.`;
      }
      
      // Prepare the messages for Gemini
      let geminiMessages = [];
      
      // Process context properly - ensure it's in the correct format
      if (context && context.length > 0) {
        geminiMessages = context.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text || msg.content || '' }]
        }));
      }
      
      // Add system prompt as a "model" message at the beginning if not already included
      if (geminiMessages.length === 0 || geminiMessages[0].role !== 'model' || !geminiMessages[0].parts[0].text.includes(systemPrompt)) {
        geminiMessages.unshift({
          role: 'model',
          parts: [{ text: systemPrompt }]
        });
      }
      
      // Add the new user message
      geminiMessages.push({
        role: 'user',
        parts: [{ text: prompt }]
      });
      
      console.log("Sending request to Gemini API with messages:", JSON.stringify(geminiMessages));

      // Try with primary model first
      try {
        const response = await callGeminiAPI(requestedModel, geminiMessages);
        const generatedText = response.candidates?.[0]?.content?.parts?.[0]?.text || '';
        console.log('Generated response successfully:', generatedText.substring(0, 50) + '...');
        
        return new Response(JSON.stringify({ text: generatedText }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (error) {
        // If we get a rate limit error and we're using the primary model, try fallback
        if (error.message.includes('429') && requestedModel === MODELS.PRIMARY) {
          console.log(`Rate limit exceeded for ${MODELS.PRIMARY}, trying fallback model ${MODELS.FALLBACK}`);
          
          try {
            const fallbackResponse = await callGeminiAPI(MODELS.FALLBACK, geminiMessages);
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
      fallbackResponse: "I'm currently experiencing connection issues. Please try again shortly." 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Helper function to call Gemini API
async function callGeminiAPI(model, messages) {
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
    console.error(`Google Gemini API error: ${response.status}:`, errorText);
    throw new Error(`Google Gemini API error: ${response.status}: ${errorText}`);
  }
  
  return await response.json();
}
