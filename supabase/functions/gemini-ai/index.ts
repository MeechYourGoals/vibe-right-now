
// @ts-ignore - Deno imports need to be ignored in TypeScript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

// @ts-ignore - Deno.env needs to be ignored in TypeScript
const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// @ts-ignore - Deno serve function needs to be ignored in TypeScript
serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, model = "gemini-1.5-flash", temperature = 0.7, maxTokens = 800, searchMode = false } = await req.json();

    console.log("Processing Gemini AI request", { 
      model,
      messageCount: messages.length,
      temperature,
      maxTokens,
      searchMode
    });

    // Define model to use
    let modelToUse = model;
    
    // For search queries, use the appropriate model
    if (searchMode) {
      // Use gemini-1.5-pro for searching as it has better information retrieval
      modelToUse = "gemini-1.5-pro";
      
      // Adjust the last user message to include web search instructions
      if (messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage.role === 'user') {
          // Enhance the prompt to request web search results
          lastMessage.parts[0].text = `Please search the web and provide real, factual, up-to-date information about: ${lastMessage.parts[0].text}
          Include specific details like names of places, addresses, prices, and current information.
          Format your response in a readable way with sections and bullet points where appropriate.
          Please cite your sources when possible.`;
        }
      }
    }

    // Prepare API call parameters
    const apiParams: any = {
      contents: messages,
      generationConfig: {
        temperature: searchMode ? 0.2 : temperature, // Lower temperature for factual search queries
        maxOutputTokens: maxTokens,
        topP: searchMode ? 0.95 : 0.8,
        topK: 40
      }
    };
    
    // Add web search tools if in search mode
    if (searchMode) {
      apiParams.tools = [{
        functionDeclarations: [{
          name: "search_web",
          description: "Search the web for information to answer a user's query",
          parameters: {
            type: "OBJECT",
            properties: {
              query: {
                type: "STRING",
                description: "The search query to find information"
              }
            },
            required: ["query"]
          }
        }]
      }];
      
      // Turn on system instructions for better web search
      apiParams.systemInstruction = {
        parts: [{
          text: "You are an AI assistant with real-time web search capabilities. When answering questions about places, events, businesses, or other real-world information, please use your web search tool to find accurate and up-to-date information. Include specific details like venue names, addresses, opening hours, and prices when available. Cite your sources and be transparent when information might not be current."
        }]
      };
    }

    // Call the Vertex AI API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelToUse}:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(apiParams)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the response text
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    // If there are tool outputs, format them nicely in the response
    if (data.candidates?.[0]?.content?.parts?.[0]?.functionCall) {
      const functionCall = data.candidates[0].content.parts[0].functionCall;
      text = `[Searching for: ${functionCall.args.query}]\n\n${text}`;
    }
    
    console.log("Received Gemini response", { textLength: text.length });

    return new Response(JSON.stringify({ text }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Error in gemini-ai function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
