
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// API Keys from environment with proper validation
const VERTEX_AI_API_KEY = Deno.env.get('GOOGLE_VERTEX_API_KEY');

// Available models with proper fallback logic
const MODELS = {
  PRIMARY: 'gemini-1.5-flash',
  FALLBACK: 'gemini-1.5-pro',
}

// Validate API keys at startup
function validateApiKeys() {
  console.log('API Key Status:', {
    vertex: !!VERTEX_AI_API_KEY
  });
  
  return !VERTEX_AI_API_KEY ? ['GOOGLE_VERTEX_API_KEY'] : [];
}

// Generate response using Gemini with training data only
async function generateGeminiResponse(prompt: string, context: any[] = []): Promise<string> {
  if (!VERTEX_AI_API_KEY) {
    return "I'm currently experiencing configuration issues with my AI services. Please contact support.";
  }

  try {
    // Prepare messages for Gemini
    let geminiMessages = [];
    
    if (context && context.length > 0) {
      geminiMessages = context.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text || msg.content || '' }]
      }));
    }
    
    geminiMessages.push({
      role: 'user',
      parts: [{ text: prompt }]
    });

    const response = await callGeminiAPI(MODELS.PRIMARY, geminiMessages);
    let responseText = response.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    return responseText || "I can help with general information from my training data. Please be more specific about what you'd like to know.";
  } catch (error) {
    console.error('Error generating Gemini response:', error);
    
    // Provide helpful fallback responses based on the prompt
    return generateTrainingDataResponse(prompt);
  }
}

// Generate a helpful response using training data when APIs are unavailable
function generateTrainingDataResponse(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('restaurant') || lowerPrompt.includes('food')) {
    return "I can help with general restaurant recommendations from my training data. For the most current information about restaurants, hours, and availability, I recommend checking their websites directly or calling ahead. What type of cuisine or dining experience are you looking for?";
  }
  
  if (lowerPrompt.includes('bar') || lowerPrompt.includes('drink')) {
    return "I can provide general information about bars and nightlife from my training data. For current hours, events, and availability, please check directly with venues. What kind of bar experience are you interested in?";
  }
  
  if (lowerPrompt.includes('hotel') || lowerPrompt.includes('stay')) {
    return "I can offer general advice about accommodations from my training data. For current rates and availability, I recommend checking hotel websites or booking platforms directly. What type of accommodation are you looking for?";
  }
  
  if (lowerPrompt.includes('weather') || lowerPrompt.includes('temperature')) {
    return "I can provide general climate information from my training data, but for current weather conditions, please check a weather service like Weather.com or your local forecast.";
  }
  
  if (lowerPrompt.includes('event') || lowerPrompt.includes('concert')) {
    return "I can help with general information about events and entertainment from my training data. For current events and tickets, please check event platforms like Eventbrite, Ticketmaster, or venue websites directly.";
  }
  
  return "I can help with general information from my training data. For the most current and specific details, you may want to verify information from official sources. What would you like to know more about?";
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Received request to vertex-ai function");
    
    // Validate API keys and log status
    const missingKeys = validateApiKeys();
    if (missingKeys.length > 0) {
      console.warn('Missing API keys:', missingKeys);
    }

    const { prompt, mode = 'default', context = [], model = MODELS.PRIMARY, action, text, audio, options, messages, query } = await req.json();
    
    // Handle text-to-speech requests
    if (action === 'text-to-speech' && text) {
      if (!VERTEX_AI_API_KEY) {
        return new Response(JSON.stringify({ 
          error: 'Text-to-speech service not configured',
          audioContent: null 
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      try {
        console.log('Text-to-speech request for:', text.substring(0, 30) + '...');
        
        const ttsResponse = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${VERTEX_AI_API_KEY}`, {
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
    if (action === 'speech-to-text' && audio) {
      if (!VERTEX_AI_API_KEY) {
        return new Response(JSON.stringify({ 
          error: 'Speech-to-text service not configured',
          transcript: null 
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      try {
        console.log('Speech-to-text request received');
        
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

    // Handle OpenAI-style chat completion requests
    if (action === 'chat' && messages) {
      if (!VERTEX_AI_API_KEY) {
        return new Response(JSON.stringify({ 
          error: 'Chat service not configured' 
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      try {
        console.log('Chat completion request with messages:', messages.length);
        
        const geminiMessages = messages.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }));
        
        const response = await callGeminiAPI(model || MODELS.PRIMARY, geminiMessages);
        const generatedText = response.candidates?.[0]?.content?.parts?.[0]?.text || '';
        
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

    // Handle regular chat completion requests - using training data only
    if (prompt || query) {
      const userPrompt = prompt || query;
      
      if (!VERTEX_AI_API_KEY) {
        return new Response(JSON.stringify({ 
          error: 'AI service not configured',
          text: "I'm currently experiencing configuration issues. Please check with the administrator.",
          dataSource: 'error'
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const requestedModel = model || MODELS.PRIMARY;
      console.log(`Processing ${requestedModel} request in ${mode} mode - training data only`);
      
      // Generate response using training data only
      const responseText = await generateGeminiResponse(userPrompt, context);
      
      return new Response(JSON.stringify({ 
        text: responseText,
        searchEnhanced: false,
        dataSource: 'training_data'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else {
      throw new Error('Invalid request: missing prompt or action');
    }
  } catch (error) {
    console.error('Error in vertex-ai function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      text: "I can help with general information from my training data. Please let me know what you'd like to learn about.",
      dataSource: 'fallback'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Helper function to call Gemini API with better error handling
async function callGeminiAPI(model, messages) {
  if (!VERTEX_AI_API_KEY) {
    throw new Error('GOOGLE_VERTEX_API_KEY not configured');
  }

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${VERTEX_AI_API_KEY}`;
  
  console.log(`Calling Gemini API with model: ${model}`);
  
  const response = await fetch(apiUrl, {
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
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    }),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Google Gemini API error: ${response.status}:`, errorText);
    
    try {
      const errorData = JSON.parse(errorText);
      if (errorData.error?.code === 429) {
        throw new Error(`Rate limit exceeded for ${model}. Using training data fallback.`);
      } else if (errorData.error?.code === 404) {
        throw new Error(`Model ${model} is not available. Using training data fallback.`);
      } else if (errorData.error?.code === 400 && errorData.error?.message?.includes('API key not valid')) {
        throw new Error(`Invalid API key for Google Vertex AI. Please check configuration.`);
      } else {
        throw new Error(`Google Gemini API error: ${response.status}: ${errorData.error?.message || errorText}`);
      }
    } catch (parseError) {
      throw new Error(`Google Gemini API error: ${response.status}: ${errorText}`);
    }
  }
  
  return await response.json();
}
