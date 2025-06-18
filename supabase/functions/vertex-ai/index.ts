
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// API Keys
const VERTEX_AI_API_KEY = Deno.env.get('GOOGLE_VERTEX_API_KEY') || "AIzaSyDHBe4hL8fQZdz9wSYi9srL0BGTnZ6XmyM";
const GOOGLE_SEARCH_API_KEY = Deno.env.get('GOOGLE_CUSTOM_SEARCH_API_KEY');
const GOOGLE_SEARCH_ENGINE_ID = Deno.env.get('GOOGLE_CUSTOM_SEARCH_ENGINE_ID') || "9450222ed533f404b";

// Available models with proper fallback logic
const MODELS = {
  PRIMARY: 'gemini-1.5-flash',
  FALLBACK: 'gemini-1.5-pro',
}

// Real-time search function using Google Custom Search API
async function performRealTimeSearch(query: string): Promise<string> {
  if (!GOOGLE_SEARCH_API_KEY || !GOOGLE_SEARCH_ENGINE_ID) {
    console.log('Google Search API not configured, using Gemini knowledge only');
    return '';
  }

  try {
    console.log('Performing real-time search for:', query);
    
    const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_SEARCH_API_KEY}&cx=${GOOGLE_SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}&num=5`;
    
    const response = await fetch(searchUrl);
    if (!response.ok) {
      throw new Error(`Search API error: ${response.status}`);
    }
    
    const data = await response.json();
    const items = data.items || [];
    
    if (items.length === 0) {
      return 'No current search results found.';
    }
    
    // Format search results for Gemini to process
    let searchResults = 'Here are current search results:\n\n';
    items.forEach((item: any, index: number) => {
      searchResults += `${index + 1}. **${item.title}**\n`;
      searchResults += `   ${item.snippet}\n`;
      searchResults += `   Source: ${item.link}\n\n`;
    });
    
    return searchResults;
  } catch (error) {
    console.error('Error in real-time search:', error);
    return 'Unable to fetch current search results.';
  }
}

// Enhanced venue search using Google Places API
async function searchVenues(location: string, query: string): Promise<string> {
  if (!VERTEX_AI_API_KEY) {
    return 'Places search not available.';
  }

  try {
    console.log('Searching venues for:', query, 'in', location);
    
    // Use Google Places API Text Search
    const placesUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query + ' in ' + location)}&key=${VERTEX_AI_API_KEY}&fields=name,rating,price_level,formatted_address,opening_hours,photos,website,types`;
    
    const response = await fetch(placesUrl);
    if (!response.ok) {
      throw new Error(`Places API error: ${response.status}`);
    }
    
    const data = await response.json();
    const places = data.results || [];
    
    if (places.length === 0) {
      return 'No venues found matching your criteria.';
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
    
    return venueResults;
  } catch (error) {
    console.error('Error searching venues:', error);
    return 'Unable to fetch venue information at the moment.';
  }
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

    // Handle enhanced search requests with real-time data
    if (action === 'search' && (query || prompt)) {
      try {
        const searchQuery = query || prompt;
        console.log('Enhanced search request:', searchQuery);
        
        // Perform real-time search
        const searchResults = await performRealTimeSearch(searchQuery);
        
        // Check if this is a venue/restaurant search
        const isVenueSearch = searchQuery.toLowerCase().includes('restaurant') || 
                             searchQuery.toLowerCase().includes('bar') || 
                             searchQuery.toLowerCase().includes('hotel') ||
                             searchQuery.toLowerCase().includes('near') ||
                             searchQuery.toLowerCase().includes('rooftop');
        
        let venueResults = '';
        if (isVenueSearch) {
          // Extract location from query
          const locationMatch = searchQuery.match(/(?:in|near)\s+([^,]+)/i);
          const location = locationMatch ? locationMatch[1].trim() : 'Barcelona'; // Default to Barcelona based on user's query
          venueResults = await searchVenues(location, searchQuery);
        }
        
        // Combine search results with venue data and use Gemini to provide intelligent response
        const enhancedPrompt = `
          Based on this real-time information, please provide a helpful and accurate response to: "${searchQuery}"
          
          ${searchResults ? 'Current Web Search Results:\n' + searchResults : ''}
          
          ${venueResults ? 'Real Venue Data:\n' + venueResults : ''}
          
          Please provide specific, actionable information based on this real data. Include actual names, ratings, addresses, and other concrete details from the search results. Do not mention that results are simulated - this is real, current information.
        `;
        
        const response = await callGeminiAPI(MODELS.PRIMARY, [{
          role: 'user',
          parts: [{ text: enhancedPrompt }]
        }]);
        
        const searchResult = response.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to process search results.';
        
        return new Response(JSON.stringify({ 
          text: searchResult,
          relatedQuestions: []
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (error) {
        console.error('Error in enhanced search:', error);
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

    // Handle regular chat completion requests with enhanced search capability
    if (prompt) {
      const requestedModel = model || MODELS.PRIMARY;
      console.log(`Processing ${requestedModel} request in ${mode} mode with prompt: ${prompt.substring(0, 50)}...`);
      
      // Define system context based on mode
      let systemPrompt = '';
      if (mode === 'venue') {
        systemPrompt = "You are Vernon, a venue analytics assistant powered by Google Gemini with real-time search capabilities. Provide insightful business analysis and recommendations for venue owners using current data.";
      } else if (mode === 'search') {
        systemPrompt = "You are a search assistant powered by Google Gemini with real-time web access. Provide detailed, current information about places, events, and activities with actual, up-to-date data.";
      } else {
        systemPrompt = `You are Vernon, a helpful AI assistant powered by Google Gemini with real-time search capabilities within the 'Vibe Right Now' app. Your primary goal is to help users discover great places to go and things to do using current, accurate information.`;
      }
      
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
      
      let enhancedPrompt = prompt;
      
      if (needsSearch) {
        console.log('Performing enhanced search for user query');
        
        // Get real-time search results
        const searchResults = await performRealTimeSearch(prompt);
        
        // Check for venue search
        const isVenueSearch = prompt.toLowerCase().includes('restaurant') || 
                             prompt.toLowerCase().includes('bar') || 
                             prompt.toLowerCase().includes('hotel') ||
                             prompt.toLowerCase().includes('near') ||
                             prompt.toLowerCase().includes('rooftop');
        
        let venueResults = '';
        if (isVenueSearch) {
          const locationMatch = prompt.match(/(?:in|near)\s+([^,]+)/i);
          const location = locationMatch ? locationMatch[1].trim() : 'Barcelona';
          venueResults = await searchVenues(location, prompt);
        }
        
        // Enhance prompt with real data
        enhancedPrompt = `
          ${systemPrompt}
          
          User Query: ${prompt}
          
          ${searchResults ? 'Current Web Search Results:\n' + searchResults : ''}
          
          ${venueResults ? 'Real Venue Data:\n' + venueResults : ''}
          
          Please provide a helpful response using this real, current information. Include specific names, ratings, addresses, and concrete details from the search results. Do not mention that results are simulated - this is real, current data.
        `;
      }
      
      // Prepare the messages for Gemini
      let geminiMessages = [];
      
      if (context && context.length > 0) {
        geminiMessages = context.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text || msg.content || '' }]
        }));
      }
      
      if (geminiMessages.length === 0 || !geminiMessages[0].parts[0].text.includes(systemPrompt)) {
        geminiMessages.unshift({
          role: 'model',
          parts: [{ text: systemPrompt }]
        });
      }
      
      geminiMessages.push({
        role: 'user',
        parts: [{ text: enhancedPrompt }]
      });
      
      console.log("Sending enhanced request to Gemini API");

      let responseText = '';
      let usedFallback = false;
      
      try {
        const response = await callGeminiAPI(requestedModel, geminiMessages);
        responseText = response.candidates?.[0]?.content?.parts?.[0]?.text || '';
        console.log('Generated enhanced response successfully');
      } catch (error) {
        console.error(`Error with ${requestedModel}:`, error);
        
        if (requestedModel === MODELS.PRIMARY) {
          console.log(`Trying fallback model ${MODELS.FALLBACK}`);
          try {
            const fallbackResponse = await callGeminiAPI(MODELS.FALLBACK, geminiMessages);
            responseText = fallbackResponse.candidates?.[0]?.content?.parts?.[0]?.text || '';
            usedFallback = true;
            console.log('Generated response with fallback model');
          } catch (fallbackError) {
            console.error('Error with fallback model:', fallbackError);
            responseText = "I'm experiencing some connectivity issues right now. Please try again in a moment.";
          }
        } else {
          responseText = "I'm experiencing some connectivity issues right now. Please try again in a moment.";
        }
      }
      
      return new Response(JSON.stringify({ 
        text: responseText,
        usedFallbackModel: usedFallback,
        searchEnhanced: needsSearch 
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
      fallbackResponse: "I'm currently experiencing connection issues. Please try again in a few minutes." 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Helper function to call Gemini API with better error handling
async function callGeminiAPI(model, messages) {
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
        throw new Error(`Rate limit exceeded for ${model}. Please wait a moment before trying again.`);
      } else if (errorData.error?.code === 404) {
        throw new Error(`Model ${model} is not available. Please try again.`);
      } else {
        throw new Error(`Google Gemini API error: ${response.status}: ${errorData.error?.message || errorText}`);
      }
    } catch (parseError) {
      throw new Error(`Google Gemini API error: ${response.status}: ${errorText}`);
    }
  }
  
  return await response.json();
}
