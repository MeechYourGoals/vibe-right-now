
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// API Keys from environment with proper validation
const VERTEX_AI_API_KEY = Deno.env.get('GOOGLE_VERTEX_API_KEY') || Deno.env.get('GEMINI_API_KEY');
const GOOGLE_SEARCH_API_KEY = Deno.env.get('GOOGLE_CUSTOM_SEARCH_API_KEY');
const GOOGLE_SEARCH_ENGINE_ID = Deno.env.get('GOOGLE_CUSTOM_SEARCH_ENGINE_ID');

// Available models with proper fallback logic
const MODELS = {
  PRIMARY: 'gemini-1.5-flash',
  FALLBACK: 'gemini-1.5-pro',
}

// Validate API keys at startup
function validateApiKeys() {
  console.log('API Key Status:', {
    vertex: !!VERTEX_AI_API_KEY,
    search: !!GOOGLE_SEARCH_API_KEY,
    searchEngine: !!GOOGLE_SEARCH_ENGINE_ID
  });
  
  const missing = [];
  if (!VERTEX_AI_API_KEY) missing.push('GOOGLE_VERTEX_API_KEY or GEMINI_API_KEY');
  return missing;
}

// Enhanced web search function
async function performWebSearch(query: string): Promise<string[]> {
  if (!GOOGLE_SEARCH_API_KEY || !GOOGLE_SEARCH_ENGINE_ID) {
    console.log('Google Search not configured, skipping web search');
    return [];
  }

  try {
    const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_SEARCH_API_KEY}&cx=${GOOGLE_SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}&num=5`;
    
    const response = await fetch(searchUrl);
    if (!response.ok) {
      console.error('Google Search API error:', response.status);
      return [];
    }
    
    const data = await response.json();
    const results = data.items || [];
    
    return results.map((item: any) => ({
      title: item.title,
      snippet: item.snippet,
      link: item.link
    })).slice(0, 3); // Limit to top 3 results
  } catch (error) {
    console.error('Error performing web search:', error);
    return [];
  }
}

// Generate intelligent response using Gemini with enhanced context
async function generateGeminiResponse(prompt: string, context: any[] = [], enableSearch = true): Promise<string> {
  if (!VERTEX_AI_API_KEY) {
    throw new Error("Vernon AI is not properly configured. Please check API keys.");
  }

  try {
    let searchResults: any[] = [];
    let enhancedPrompt = prompt;
    
    // Perform web search if enabled and appropriate
    if (enableSearch && shouldPerformSearch(prompt)) {
      console.log('Performing web search for:', prompt);
      searchResults = await performWebSearch(prompt);
      
      if (searchResults.length > 0) {
        const searchContext = searchResults.map(result => 
          `${result.title}: ${result.snippet}`
        ).join('\n');
        
        enhancedPrompt = `Based on the following current information from the web and your knowledge, provide a helpful and accurate response:

Current Web Information:
${searchContext}

User Question: ${prompt}

Please provide a comprehensive answer that combines current information with your knowledge. Be specific and helpful.`;
      }
    }
    
    // Prepare messages for Gemini
    let geminiMessages = [];
    
    // Add system message for better responses
    geminiMessages.push({
      role: 'user',
      parts: [{ text: `You are Vernon, a helpful AI assistant. You provide direct, accurate, and useful responses. When asked about locations, events, or current information, you give specific recommendations and details. You don't start responses with disclaimers about training data - you just provide helpful information directly.` }]
    });
    
    geminiMessages.push({
      role: 'model',
      parts: [{ text: 'I understand. I\'ll provide direct, helpful responses without unnecessary disclaimers.' }]
    });
    
    if (context && context.length > 0) {
      const recentContext = context.slice(-5).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text || msg.content || '' }]
      }));
      geminiMessages = [...geminiMessages, ...recentContext];
    }
    
    geminiMessages.push({
      role: 'user',
      parts: [{ text: enhancedPrompt }]
    });

    const response = await callGeminiAPI(MODELS.PRIMARY, geminiMessages);
    let responseText = response.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Clean up the response
    responseText = cleanResponse(responseText);
    
    if (!responseText) {
      throw new Error('Empty response from Gemini');
    }
    
    return responseText;
  } catch (error) {
    console.error('Error generating Gemini response:', error);
    throw error;
  }
}

// Check if query should trigger web search
function shouldPerformSearch(query: string): boolean {
  const searchTriggers = [
    'restaurant', 'bar', 'hotel', 'event', 'concert', 'show', 'movie',
    'weather', 'news', 'current', 'today', 'now', 'latest', 'recent',
    'open', 'hours', 'phone', 'address', 'location', 'near me',
    'best', 'top', 'recommended', 'popular', 'trending',
    'price', 'cost', 'booking', 'reservation', 'ticket'
  ];
  
  const lowerQuery = query.toLowerCase();
  return searchTriggers.some(trigger => lowerQuery.includes(trigger));
}

// Clean and enhance response
function cleanResponse(text: string): string {
  // Remove common AI disclaimer patterns
  const disclaimers = [
    /^I don't have access to real-time information[^.]*\./gi,
    /^I can't provide real-time information[^.]*\./gi,
    /^My training data doesn't include[^.]*\./gi,
    /^I don't have current information[^.]*\./gi,
    /^Based on my training data[^,]*,?\s*/gi,
    /^From my training data[^,]*,?\s*/gi
  ];
  
  let cleaned = text;
  disclaimers.forEach(pattern => {
    cleaned = cleaned.replace(pattern, '');
  });
  
  return cleaned.trim();
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

    const { prompt, mode = 'default', context = [], model = MODELS.PRIMARY, action, text, audio, options, messages, query, enableSearch = true } = await req.json();
    
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
        
        const geminiMessages = messages.map((msg: any) => ({
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

    // Handle regular chat completion requests - intelligent responses with search
    if (prompt || query) {
      const userPrompt = prompt || query;
      
      if (!VERTEX_AI_API_KEY) {
        return new Response(JSON.stringify({ 
          error: 'Vernon AI service not configured',
          text: "I'm currently experiencing configuration issues. Please check with the administrator.",
          dataSource: 'error'
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const requestedModel = model || MODELS.PRIMARY;
      console.log(`Processing ${requestedModel} request in ${mode} mode with search: ${enableSearch}`);
      
      // Generate response with web search capabilities
      const responseText = await generateGeminiResponse(userPrompt, context, enableSearch);
      
      return new Response(JSON.stringify({ 
        text: responseText,
        searchEnhanced: enableSearch && shouldPerformSearch(userPrompt),
        dataSource: 'vernon_ai'
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
      text: "I'm having trouble processing your request right now. Please try again in a moment.",
      dataSource: 'error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Helper function to call Gemini API with better error handling
async function callGeminiAPI(model: string, messages: any[]) {
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
        temperature: 0.8,
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
        throw new Error(`Rate limit exceeded for ${model}. Please try again in a moment.`);
      } else if (errorData.error?.code === 404) {
        throw new Error(`Model ${model} is not available. Please try again.`);
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
