
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// API Keys from environment with proper validation
const VERTEX_AI_API_KEY = Deno.env.get('GOOGLE_VERTEX_API_KEY');
const GOOGLE_SEARCH_API_KEY = Deno.env.get('GOOGLE_CUSTOM_SEARCH_API_KEY');
const GOOGLE_SEARCH_ENGINE_ID = Deno.env.get('GOOGLE_CUSTOM_SEARCH_ENGINE_ID');
const GOOGLE_MAPS_API_KEY = Deno.env.get('GOOGLE_MAPS_API_KEY'); // Correct API key for Places

// Available models with proper fallback logic
const MODELS = {
  PRIMARY: 'gemini-1.5-flash',
  FALLBACK: 'gemini-1.5-pro',
}

// Validate API keys at startup
function validateApiKeys() {
  const missing = [];
  if (!VERTEX_AI_API_KEY) missing.push('GOOGLE_VERTEX_API_KEY');
  if (!GOOGLE_SEARCH_API_KEY) missing.push('GOOGLE_CUSTOM_SEARCH_API_KEY');
  if (!GOOGLE_SEARCH_ENGINE_ID) missing.push('GOOGLE_CUSTOM_SEARCH_ENGINE_ID');
  if (!GOOGLE_MAPS_API_KEY) missing.push('GOOGLE_MAPS_API_KEY');
  
  console.log('API Key Status:', {
    vertex: !!VERTEX_AI_API_KEY,
    search: !!GOOGLE_SEARCH_API_KEY,
    searchEngine: !!GOOGLE_SEARCH_ENGINE_ID,
    maps: !!GOOGLE_MAPS_API_KEY
  });
  
  return missing;
}

// Enhanced real-time search with proper fallback
async function performRealTimeSearch(query: string): Promise<{ success: boolean; data: string; source: string }> {
  if (!GOOGLE_SEARCH_API_KEY || !GOOGLE_SEARCH_ENGINE_ID) {
    console.log('Google Search API not configured, skipping search');
    return { success: false, data: '', source: 'search_unavailable' };
  }

  try {
    console.log('Performing real-time search for:', query);
    
    const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_SEARCH_API_KEY}&cx=${GOOGLE_SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}&num=5`;
    
    const response = await fetch(searchUrl);
    if (!response.ok) {
      console.error(`Search API error: ${response.status} - ${response.statusText}`);
      return { success: false, data: '', source: 'search_error' };
    }
    
    const data = await response.json();
    const items = data.items || [];
    
    if (items.length === 0) {
      return { success: false, data: 'No current search results found.', source: 'no_results' };
    }
    
    // Format search results for Gemini to process
    let searchResults = 'Here are current search results:\n\n';
    items.forEach((item: any, index: number) => {
      searchResults += `${index + 1}. **${item.title}**\n`;
      searchResults += `   ${item.snippet}\n`;
      searchResults += `   Source: ${item.link}\n\n`;
    });
    
    return { success: true, data: searchResults, source: 'google_search' };
  } catch (error) {
    console.error('Error in real-time search:', error);
    return { success: false, data: '', source: 'search_exception' };
  }
}

// Enhanced venue search using correct Google Maps API key
async function searchVenues(location: string, query: string): Promise<{ success: boolean; data: string; source: string }> {
  if (!GOOGLE_MAPS_API_KEY) {
    console.log('Google Maps API not available, skipping venue search');
    return { success: false, data: '', source: 'maps_unavailable' };
  }

  try {
    console.log('Searching venues for:', query, 'in', location);
    
    // Use Google Places API Text Search with correct API key
    const placesUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query + ' in ' + location)}&key=${GOOGLE_MAPS_API_KEY}&fields=name,rating,price_level,formatted_address,opening_hours,photos,website,types`;
    
    const response = await fetch(placesUrl);
    if (!response.ok) {
      console.error(`Places API error: ${response.status} - ${response.statusText}`);
      return { success: false, data: '', source: 'places_error' };
    }
    
    const data = await response.json();
    const places = data.results || [];
    
    if (places.length === 0) {
      return { success: false, data: 'No venues found matching your criteria.', source: 'no_venues' };
    }
    
    // Format venue results with real data
    let venueResults = 'Here are real venues I found:\n\n';
    places.slice(0, 5).forEach((place: any, index: number) => {
      venueResults += `${index + 1}. **${place.name}**\n`;
      venueResults += `   Rating: ${place.rating || 'N/A'} stars\n`;
      venueResults += `   Address: ${place.formatted_address}\n`;
      
      if (place.price_level) {
        const priceLevel = '$'.repeat(place.price_level);
        venueResults += `   Price Level: ${priceLevel}\n`;
      }
      
      if (place.opening_hours?.open_now !== undefined) {
        venueResults += `   Status: ${place.opening_hours.open_now ? 'Open Now' : 'Closed'}\n`;
      }
      
      if (place.website) {
        venueResults += `   Website: ${place.website}\n`;
      }
      
      venueResults += '\n';
    });
    
    return { success: true, data: venueResults, source: 'google_places' };
  } catch (error) {
    console.error('Error searching venues:', error);
    return { success: false, data: '', source: 'places_exception' };
  }
}

// Enhanced Gemini response with proper fallback context
async function generateGeminiResponse(prompt: string, context: any[] = [], searchData?: string, venueData?: string, dataSource?: string): Promise<string> {
  if (!VERTEX_AI_API_KEY) {
    return "I'm currently experiencing configuration issues with my AI services. Please contact support.";
  }

  try {
    let enhancedPrompt = prompt;
    
    // Add search context if available
    if (searchData || venueData) {
      enhancedPrompt = `
        Based on this information, please provide a helpful response to: "${prompt}"
        
        ${searchData ? 'Current Web Search Results:\n' + searchData : ''}
        ${venueData ? 'Real Venue Data:\n' + venueData : ''}
        
        Please provide specific, actionable information based on this real data. Include actual names, ratings, addresses, and other concrete details when available.
      `;
    } else {
      // Fallback to training data with clear indication
      enhancedPrompt = `
        Please help with this query using your training data: "${prompt}"
        
        Note: I'm currently unable to access real-time search results, so I'm providing information from my training data. For the most current information, please verify details independently.
      `;
    }

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
      parts: [{ text: enhancedPrompt }]
    });

    const response = await callGeminiAPI(MODELS.PRIMARY, geminiMessages);
    let responseText = response.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Add data source indication
    if (dataSource && (searchData || venueData)) {
      responseText += `\n\n*Source: ${dataSource === 'google_search' ? 'Real-time web search' : dataSource === 'google_places' ? 'Live venue data' : 'Training data'}*`;
    } else {
      responseText += `\n\n*Source: AI training data (real-time search unavailable)*`;
    }
    
    return responseText;
  } catch (error) {
    console.error('Error generating Gemini response:', error);
    
    // Ultimate fallback
    return `I can help with general information about "${prompt}" from my training data. However, I'm currently experiencing connectivity issues with real-time search. Please try again later for the most current information.`;
  }
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

    // Handle enhanced search requests with waterfall fallback
    if ((action === 'search' && query) || prompt) {
      const searchQuery = query || prompt;
      console.log('Enhanced search request:', searchQuery);
      
      let searchResult = { success: false, data: '', source: 'none' };
      let venueResult = { success: false, data: '', source: 'none' };
      let finalResponse = '';
      let dataSource = 'training_data';
      
      // Step 1: Try real-time search
      searchResult = await performRealTimeSearch(searchQuery);
      
      // Step 2: Try venue search if relevant
      const isVenueSearch = searchQuery.toLowerCase().includes('restaurant') || 
                           searchQuery.toLowerCase().includes('bar') || 
                           searchQuery.toLowerCase().includes('hotel') ||
                           searchQuery.toLowerCase().includes('near') ||
                           searchQuery.toLowerCase().includes('rooftop');
      
      if (isVenueSearch) {
        const locationMatch = searchQuery.match(/(?:in|near)\s+([^,]+)/i);
        const location = locationMatch ? locationMatch[1].trim() : 'Barcelona';
        venueResult = await searchVenues(location, searchQuery);
      }
      
      // Step 3: Generate response with Gemini using available data
      if (searchResult.success || venueResult.success) {
        dataSource = searchResult.success ? searchResult.source : venueResult.source;
        finalResponse = await generateGeminiResponse(
          searchQuery, 
          context, 
          searchResult.success ? searchResult.data : '', 
          venueResult.success ? venueResult.data : '',
          dataSource
        );
      } else {
        // Step 4: Fallback to training data
        console.log('All search methods failed, using training data fallback');
        finalResponse = await generateGeminiResponse(searchQuery, context);
      }
      
      return new Response(JSON.stringify({ 
        text: finalResponse,
        searchEnhanced: searchResult.success || venueResult.success,
        dataSource: dataSource
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
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

    // Handle regular chat completion requests
    if (prompt) {
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
      console.log(`Processing ${requestedModel} request in ${mode} mode`);
      
      // Check if this requires real-time search
      const needsSearch = prompt.toLowerCase().includes('find') || 
                         prompt.toLowerCase().includes('search') ||
                         prompt.toLowerCase().includes('restaurant') ||
                         prompt.toLowerCase().includes('bar') ||
                         prompt.toLowerCase().includes('hotel') ||
                         prompt.toLowerCase().includes('near') ||
                         prompt.toLowerCase().includes('current') ||
                         prompt.toLowerCase().includes('latest') ||
                         prompt.toLowerCase().includes('rating');
      
      let searchData = '';
      let venueData = '';
      let dataSource = 'training_data';
      
      if (needsSearch) {
        console.log('Performing enhanced search for user query');
        
        // Try search
        const searchResult = await performRealTimeSearch(prompt);
        if (searchResult.success) {
          searchData = searchResult.data;
          dataSource = searchResult.source;
        }
        
        // Try venue search if relevant
        const isVenueSearch = prompt.toLowerCase().includes('restaurant') || 
                             prompt.toLowerCase().includes('bar') || 
                             prompt.toLowerCase().includes('hotel') ||
                             prompt.toLowerCase().includes('near') ||
                             prompt.toLowerCase().includes('rooftop');
        
        if (isVenueSearch) {
          const locationMatch = prompt.match(/(?:in|near)\s+([^,]+)/i);
          const location = locationMatch ? locationMatch[1].trim() : 'Barcelona';
          const venueResult = await searchVenues(location, prompt);
          if (venueResult.success) {
            venueData = venueResult.data;
            dataSource = venueResult.source;
          }
        }
      }
      
      // Generate response with available data
      const responseText = await generateGeminiResponse(prompt, context, searchData, venueData, dataSource);
      
      return new Response(JSON.stringify({ 
        text: responseText,
        searchEnhanced: !!(searchData || venueData),
        dataSource: dataSource
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
      text: "I'm currently experiencing connection issues, but I can help with general information from my training data. Please try again in a few minutes for real-time search results.",
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
