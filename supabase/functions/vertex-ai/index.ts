
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
    const { prompt, mode = 'default', context = [], model = MODELS.PRIMARY, action, text, options } = await req.json();
    
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
        console.log('Speech-to-text request received.');
        const audioBase64 = prompt; // Assuming prompt is the base64 audio data
        const audioEncoding = options?.audioEncoding || 'WEBM_OPUS'; // Default to WEBM_OPUS
        const languageCode = options?.languageCode || 'en-US';
        const sampleRateHertz = options?.sampleRateHertz; // Only include if provided, useful for LINEAR16

        const sttPayload: any = {
          audio: {
            content: audioBase64,
          },
          config: {
            encoding: audioEncoding,
            languageCode: languageCode,
            // Potentially add model selection, punctuation, etc. here if needed
          },
        };

        // Add sampleRateHertz only if encoding is LINEAR16 or if explicitly provided
        if (sampleRateHertz && (audioEncoding === 'LINEAR16' || options?.sampleRateHertz)) {
          sttPayload.config.sampleRateHertz = sampleRateHertz;
        }
        if (audioEncoding === 'LINEAR16' && !sampleRateHertz) {
            console.warn("Warning: sampleRateHertz is typically required for LINEAR16 encoding but was not provided. API might default or error.");
        }


        console.log(`Calling Google Speech-to-Text API with encoding: ${audioEncoding}, lang: ${languageCode}`);

        const sttResponse = await fetch(`https://speech.googleapis.com/v1/speech:recognize?key=${VERTEX_AI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sttPayload),
        });

        if (!sttResponse.ok) {
          const errorBody = await sttResponse.text();
          console.error('Google STT API error:', sttResponse.status, errorBody);
          throw new Error(`Google STT API error: ${sttResponse.status} - ${errorBody}`);
        }

        const sttData = await sttResponse.json();
        console.log("STT API Response:", JSON.stringify(sttData).substring(0,100) + "...");

        // Extract transcript
        // Typical response structure: results[0].alternatives[0].transcript
        const transcript = sttData.results?.[0]?.alternatives?.[0]?.transcript || "";
        
        if (!transcript && sttData.results && sttData.results.length === 0) {
            console.log("STT API returned no results, possibly empty audio or no speech detected.");
        } else if (!transcript) {
            console.log("Transcript not found in expected place in STT response. Full response:", sttData);
        }


        return new Response(JSON.stringify({ transcript: transcript }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (error) {
        console.error('Error in speech-to-text:', error.message);
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
        systemPrompt = "You are Vernon, a venue analytics assistant powered by Google Gemini. Provide insightful business analysis and recommendations for venue owners.";
      } else if (mode === 'search') {
        systemPrompt = "You are a search assistant powered by Google Gemini. Provide detailed information about places, events, and activities.";
      } else {
        systemPrompt = `You are Vernon, a helpful AI assistant powered by Google Gemini within the 'Vibe Right Now' app. Your primary goal is to help users discover great places to go and things to do.`;
      }
      
      // Prepare the messages for Gemini
      let messages = [];
      
      // Process context properly - ensure it's in the correct format
      if (context && context.length > 0) {
        messages = context.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text || msg.content || '' }]
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

      // Try with primary model first, with fallback logic
      let attemptModel = requestedModel;
      let finalResponseText = '';
      let usedFallback = false;
      let loopMessages = [...messages]; // Create a mutable copy for the loop

      for (let attempt = 0; attempt < 2; attempt++) { // Max 2 attempts (primary, then fallback)
        try {
          console.log(`Calling Gemini with model: ${attemptModel}. Current message count: ${loopMessages.length}`);
          
          let currentTools = undefined;
          if (mode === 'search') {
            currentTools = googleSearchTool;
          }

          let geminiResponse = await callGeminiAPI(attemptModel, loopMessages, currentTools);
          let candidate = geminiResponse.candidates?.[0];

          // Handle function calling
          if (candidate?.content?.parts?.[0]?.functionCall) {
            const functionCall = candidate.content.parts[0].functionCall;
            console.log(`Gemini requested function call: ${functionCall.name}`);

            if (functionCall.name === 'google_search') {
              const searchQuery = functionCall.args?.query;
              if (!searchQuery) {
                console.error("Google Search tool called by Gemini without a query.");
                // Send a result indicating error to Gemini
                 loopMessages.push(candidate.content); // Gemini's request
                 loopMessages.push({
                  role: "function",
                  parts: [{ functionResponse: { name: "google_search", response: { error: "Missing search query", summary: "Search could not be performed."} }}]
                });
              } else {
                const searchResults = await executeGoogleSearch(searchQuery);

                const functionResponsePart = {
                  role: "function",
                  parts: [{
                    functionResponse: {
                      name: "google_search",
                      response: searchResults, // searchResults contains {summary} or {error, summary}
                    }
                  }]
                };
                // Add Gemini's function call message and our function response to history for the next turn
                loopMessages.push(candidate.content);
                loopMessages.push(functionResponsePart);
              }

              console.log("Calling Gemini again with function response. Message count: " + loopMessages.length);
              // Call Gemini again with the function response, tools are typically not needed for this direct response generation.
              geminiResponse = await callGeminiAPI(attemptModel, loopMessages /*, undefined tools */);
              candidate = geminiResponse.candidates?.[0];
            } else {
              console.warn(`Unsupported function call requested: ${functionCall.name}. Responding to Gemini that tool is unavailable.`);
              // Add Gemini's function call message
              loopMessages.push(candidate.content);
              // Add a function response indicating the tool is not available or there was an error
              loopMessages.push({
                role: "function",
                parts: [{ functionResponse: { name: functionCall.name, response: { error: `Function ${functionCall.name} is not available.`, summary: `Tool ${functionCall.name} could not be executed.` } } }]
              });
              console.log("Calling Gemini again after unsupported function call. Message count: " + loopMessages.length);
              geminiResponse = await callGeminiAPI(attemptModel, loopMessages);
              candidate = geminiResponse.candidates?.[0];
            }
          }

          finalResponseText = candidate?.content?.parts?.[0]?.text || '';
          if (finalResponseText) {
            console.log(`Generated response successfully with ${attemptModel}:`, finalResponseText.substring(0, 80) + '...');
            if (attemptModel === MODELS.FALLBACK) usedFallback = true;
            break; // Success
          } else {
            console.warn(`Empty text response from ${attemptModel}. Full response:`, JSON.stringify(geminiResponse).substring(0, 200));
            if (attempt === 0 && requestedModel === MODELS.PRIMARY && attemptModel === MODELS.PRIMARY) {
                attemptModel = MODELS.FALLBACK; // Set up for next iteration
                console.log(`Primary model ${requestedModel} returned empty. Trying fallback ${attemptModel}.`);
                // loopMessages are already set for the next attempt
                continue;
            }
            // If already on fallback or it wasn't an empty text from primary that could trigger fallback
            throw new Error(`Empty text response from ${attemptModel} after potential function calling.`);
          }

        } catch (error) {
          console.error(`Error with ${attemptModel}:`, error.message);
          if (attempt === 0 && requestedModel === MODELS.PRIMARY && attemptModel === MODELS.PRIMARY) {
            console.log(`Error with primary model ${requestedModel}. Trying fallback ${MODELS.FALLBACK}.`);
            attemptModel = MODELS.FALLBACK; // Set up for next iteration
             // Reset loopMessages to the original state before this failed attempt if function calling modified it
            loopMessages = [...messages];
          } else {
            throw error;
          }
        }
      } // End of for loop for attempts

      return new Response(JSON.stringify({ text: finalResponseText, usedFallbackModel: usedFallback }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } else {
      throw new Error('Invalid request: missing prompt or action for chat completion.');
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

// Placeholder for Google Custom Search API credentials - REPLACE THESE!
const GOOGLE_CUSTOM_SEARCH_API_KEY = Deno.env.get("GOOGLE_CUSTOM_SEARCH_API_KEY") || "YOUR_CUSTOM_SEARCH_API_KEY_HERE";
const GOOGLE_CUSTOM_SEARCH_ENGINE_ID = Deno.env.get("GOOGLE_CUSTOM_SEARCH_ENGINE_ID") || "YOUR_CUSTOM_SEARCH_ENGINE_ID_HERE";

// Tool definition for Google Search
const googleSearchTool = {
  function_declarations: [
    {
      name: "google_search",
      description: "Get information from Google Search. Use this for questions about current events, specific facts, or anything that requires up-to-date information from the web.",
      parameters: {
        type: "OBJECT",
        properties: {
          query: {
            type: "STRING",
            description: "The search query."
          }
        },
        required: ["query"]
      }
    }
  ]
};

// Helper function to execute Google Search
async function executeGoogleSearch(query: string) {
  if (GOOGLE_CUSTOM_SEARCH_API_KEY === "YOUR_CUSTOM_SEARCH_API_KEY_HERE" ||
      GOOGLE_CUSTOM_SEARCH_ENGINE_ID === "YOUR_CUSTOM_SEARCH_ENGINE_ID_HERE") {
    console.warn("Google Custom Search API Key or Engine ID is not configured in environment variables (GOOGLE_CUSTOM_SEARCH_API_KEY, GOOGLE_CUSTOM_SEARCH_ENGINE_ID). Returning mock search results.");
    return { summary: `Mock search results for query: '${query}'. Configure API keys for real results.` };
  }

  const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_CUSTOM_SEARCH_API_KEY}&cx=${GOOGLE_CUSTOM_SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}&num=3&fields=items(title,link,snippet)`;

  console.log(`Executing Google Search for query: ${query}`);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google Custom Search API error:", response.status, errorText);
      return { error: `Search API failed with status ${response.status}`, summary: "Could not retrieve search results." };
    }
    const data = await response.json();

    const items = data.items || [];
    let summary = items.slice(0, 3)
                       .map((item: any) => `Title: ${item.title}\nSnippet: ${item.snippet}\nLink: ${item.link}`)
                       .join("\n\n---\n\n");

    if (!summary && items.length > 0) summary = "Found some results, but could not extract snippets.";
    if (items.length === 0) summary = "No relevant search results found for your query.";

    return { summary: summary };
  } catch (error) {
    console.error("Error during Google Custom Search API call:", error);
    return { error: error.message, summary: "Failed to execute search." };
  }
}


// Helper function to call Gemini API
async function callGeminiAPI(model: string, messages: any[], tools?: any) {
  const requestBody: any = {
    contents: messages,
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    }
  };

  if (tools) {
    requestBody.tools = tools;
  }

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${VERTEX_AI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Google Gemini API error (${model}): ${response.status}:`, errorText);
    throw new Error(`Google Gemini API error (${model}): ${response.status}: ${errorText}`);
  }
  
  return await response.json();
}
