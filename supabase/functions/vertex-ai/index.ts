
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const GOOGLE_VERTEX_API_KEY = Deno.env.get('GOOGLE_VERTEX_API_KEY');
const VERTEX_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// System prompts that define the chatbot's personality and behavior
const SYSTEM_PROMPTS = {
  default: `You are a helpful and friendly AI assistant within the 'Vibe Right Now' app. Your primary goal is to help users discover great places to go and things to do based on their requests.
  
  Respond in a concise, informative, and enthusiastic tone. Be friendly, approachable, and helpful. Offer creative and interesting suggestions.
  
  Always use web search to provide accurate, up-to-date information about real places, venues, events, and activities.
  
  When providing suggestions, explain why you are recommending them based on potential user interests.
  
  Include specific details like addresses, opening hours, prices, and contact information whenever possible.

  Format your responses for readability with markdown.
  
  If the user asks for something specific and you can't find exact information, acknowledge it and offer the most relevant information you could find.`,
  
  venue: `You are a knowledgeable business assistant within the 'Vibe Right Now' platform. Your primary goal is to help venue owners understand their business metrics, customer trends, and marketing performance.
  
  Provide data-driven insights and actionable recommendations based on the information available. Be concise, professional, and helpful.
  
  When analyzing business data, focus on identifying trends, opportunities, and potential areas for improvement. Support your insights with specific metrics when available.
  
  If the venue owner asks for something specific that isn't readily available, acknowledge it and suggest alternative approaches or metrics they might consider.
  
  Maintain a professional but friendly tone that builds confidence. Avoid being overly technical unless the user demonstrates expertise in the subject.`,
  
  search: `You are an AI discovery expert for the 'Vibe Right Now' social platform. Your job is to provide factual, accurate information about places and venues.
  
  Always include real venue names, addresses, and other specific details when possible. Format your responses with markdown, including headers and bulleted lists.
  
  Present information for venues in a structured format including address, hours, price range, contact information, and other relevant details.
  
  For events, include date and time, location, ticket prices, and how to purchase tickets if applicable.
  
  Only provide information you're confident is factual. If you don't know something, clearly state that you don't have that specific information.
  
  Be concise but thorough. Users are looking for helpful recommendations they can act on immediately.`
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting Vertex AI function execution");
    
    // Parse request body
    const requestData = await req.json();
    const { prompt, messages, mode = "default", history = [], searchMode = false, categories = [], temperature = 0.7, maxTokens = 2048 } = requestData;
    
    console.log("Request parameters:", { 
      promptLength: prompt ? prompt.length : 0,
      messagesLength: messages ? messages.length : 0,
      mode, 
      historyLength: history?.length || 0,
      searchMode, 
      categoriesCount: categories?.length || 0,
      temperature,
      maxTokens
    });
    
    // Determine which input format we're using (older prompt+history or newer messages)
    let contents = [];
    
    // Select the appropriate system prompt based on mode
    const systemPrompt = mode === 'venue' 
      ? SYSTEM_PROMPTS.venue 
      : (searchMode ? SYSTEM_PROMPTS.search : SYSTEM_PROMPTS.default);
    
    if (messages && messages.length > 0) {
      // Using the newer messages format
      
      // Add system prompt as the first user message
      contents.push({
        role: "user",
        parts: [{ text: `System instruction: ${systemPrompt}` }]
      });
      
      // Add model acknowledgment of the system prompt
      contents.push({
        role: "model",
        parts: [{ text: "I understand my role and will assist accordingly." }]
      });
      
      // Add the rest of the messages
      for (const message of messages) {
        // Convert role if needed (user/assistant → user/model)
        const vertexRole = message.role === 'user' || message.role === 'system' ? 'user' : 'model';
        
        // Enhance the final user message if searchMode is enabled
        if (searchMode && vertexRole === 'user' && message === messages[messages.length - 1]) {
          // Enhance the prompt with search instructions
          const searchText = `Please search the web and provide current, factual information about: ${message.parts[0].text}
          Include real names, addresses, operating hours, prices, and contact information when available.
          ${categories.length > 0 ? `Consider these categories: ${categories.join(', ')}` : ''}`;
          
          contents.push({
            role: vertexRole,
            parts: [{ text: searchText }]
          });
        } else {
          // Add the message as is
          contents.push({
            role: vertexRole,
            parts: message.parts
          });
        }
      }
    } else {
      // Using the older prompt+history format
      
      // Add system prompt
      contents.push({
        role: "USER",
        parts: [{ text: systemPrompt }]
      });
      
      // Add model acknowledgment of the system prompt
      contents.push({
        role: "MODEL",
        parts: [{ text: "I understand my role and will assist accordingly." }]
      });
      
      // Add conversation history
      if (history && history.length > 0) {
        for (const message of history) {
          contents.push({
            role: message.sender === 'user' ? "USER" : "MODEL",
            parts: [{ text: message.text || message.content || "" }]
          });
        }
      }
      
      // Add the current prompt
      // For search mode, add extra context
      if (searchMode && prompt) {
        let enhancedPrompt = prompt;
        
        // Incorporate categories if available
        if (categories && categories.length > 0) {
          const categoryContext = categories.join(', ');
          enhancedPrompt = `Search for real factual information about: "${enhancedPrompt}"
          Consider these categories: ${categoryContext}
          Include real venue names, addresses, opening hours, and other specific details.`;
        } else {
          enhancedPrompt = `Search for real factual information about: "${enhancedPrompt}"
          Include real venue names, addresses, opening hours, and other specific details.`;
        }
        
        contents.push({
          role: "USER",
          parts: [{ text: enhancedPrompt }]
        });
      } else if (prompt) {
        contents.push({
          role: "USER",
          parts: [{ text: prompt }]
        });
      }
    }
    
    console.log("Preparing to call Vertex AI API");
    console.log("Contents length:", contents.length);
    
    if (!GOOGLE_VERTEX_API_KEY) {
      throw new Error("GOOGLE_VERTEX_API_KEY environment variable is not set");
    }
    
    // Prepare the request body
    const requestBody: any = {
      contents: contents,
      generationConfig: {
        temperature: searchMode ? 0.3 : temperature, // Lower temperature for search queries
        topK: 40,
        topP: 0.95,
        maxOutputTokens: maxTokens,
      }
    };
    
    // Add tools configuration for search mode
    if (searchMode) {
      requestBody.tools = [{
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
      
      // Add system instructions for search
      requestBody.systemInstruction = {
        parts: [{
          text: "You are an AI assistant with real-time web search capabilities. You can search the web to find information that helps you respond accurately to user queries about places, events, and activities. Use search_web function to find current information when responding to questions about specific venues, businesses, or events."
        }]
      };
    }
    
    // Call the Vertex AI API
    const response = await fetch(`${VERTEX_API_URL}?key=${GOOGLE_VERTEX_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    console.log("Vertex AI API response status:", response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`Vertex AI API error: ${response.status}`, errorData);
      return new Response(
        JSON.stringify({ error: `Error calling Vertex AI API: ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log("Vertex AI API response received");
    
    // Extract the response text
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response at this time.";
    
    // Process tool calls if any
    let enhancedResponse = responseText;
    
    if (data.candidates?.[0]?.content?.parts?.some(part => part.functionCall)) {
      // Get all function calls
      const functionCalls = data.candidates[0].content.parts
        .filter(part => part.functionCall)
        .map(part => part.functionCall);
      
      // Add information about the search being performed
      if (functionCalls.length > 0) {
        const searchQueries = functionCalls
          .filter(call => call.name === "search_web")
          .map(call => call.args.query);
        
        if (searchQueries.length > 0) {
          const searchInfo = `[Searched for: ${searchQueries.join(', ')}]`;
          enhancedResponse = `${searchInfo}\n\n${enhancedResponse}`;
        }
      }
    }
    
    // Add hyperlinks to the Explore page for any locations or events mentioned
    const finalResponse = addExplorePageLinks(enhancedResponse, prompt || "");
    
    return new Response(
      JSON.stringify({ text: finalResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in vertex-ai function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

/**
 * Add hyperlinks to the Explore page for locations/events mentioned in the text
 */
function addExplorePageLinks(text: string, originalQuery: string): string {
  // If the response is very short, it might be an error
  if (!text || text.length < 50) {
    return text;
  }
  
  // Add a link to explore all results at the bottom if we have an original query
  if (originalQuery && originalQuery.length > 0) {
    const exploreAllLink = `\n\n---\n\n**[Explore all results on the map](/explore?q=${encodeURIComponent(originalQuery)})**`;
    return text + exploreAllLink;
  }
  
  return text;
}
