
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GOOGLE_VERTEX_API_KEY = Deno.env.get('GOOGLE_VERTEX_API_KEY');
const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const VERTEX_API_URL = "https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/gemini-1.5-pro:generateContent";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// System prompts that define the chatbot's personality and behavior
const SYSTEM_PROMPTS = {
  default: `You are a helpful and friendly AI assistant within the 'Lovable' app. Your primary goal is to help users discover great places to go and things to do based on their requests.
  
  Respond in a concise, informative, and enthusiastic tone. Be friendly, approachable, and helpful. Offer creative and interesting suggestions.
  
  Maintain a conversational style that is engaging and encourages users to explore. Avoid being overly verbose. Get straight to the point while still being helpful.
  
  When providing suggestions, briefly explain why you are recommending them based on potential user interests.
  
  If the user asks for something specific that isn't readily available, acknowledge it and offer alternative suggestions or ways to find more information within the app.
  
  Do not express personal opinions or beliefs. Focus solely on providing information relevant to places and activities. If a user's request is unclear, ask clarifying questions.`,
  
  venue: `You are a knowledgeable business assistant within the 'Lovable' platform. Your primary goal is to help venue owners understand their business metrics, customer trends, and marketing performance.
  
  Provide data-driven insights and actionable recommendations based on the information available. Be concise, professional, and helpful.
  
  When analyzing business data, focus on identifying trends, opportunities, and potential areas for improvement. Support your insights with specific metrics when available.
  
  If the venue owner asks for something specific that isn't readily available, acknowledge it and suggest alternative approaches or metrics they might consider.
  
  Maintain a professional but friendly tone that builds confidence. Avoid being overly technical unless the user demonstrates expertise in the subject.`,
  
  search: `You are an AI discovery expert for the 'Lovable' social platform. Your job is to provide factual, accurate information about places and venues.
  
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
    console.log("Starting AI function execution with MCP support");
    
    // Parse request body
    const requestData = await req.json();
    const { 
      prompt, 
      mode, 
      history, 
      searchMode, 
      categories,
      useGemini = false,
      provider = 'default'
    } = requestData;
    
    // Special handler for API key check mode
    if (mode === 'check-api-key') {
      if (!GOOGLE_VERTEX_API_KEY && !GEMINI_API_KEY) {
        return new Response(
          JSON.stringify({ error: 'No API keys configured' }),
          { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      return new Response(
        JSON.stringify({ 
          success: true, 
          hasVertexKey: !!GOOGLE_VERTEX_API_KEY,
          hasGeminiKey: !!GEMINI_API_KEY
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log("Request parameters:", { 
      prompt: prompt?.substring(0, 50) + "...", 
      mode, 
      historyLength: history?.length || 0,
      searchMode, 
      categoriesCount: categories?.length || 0,
      useGemini,
      provider
    });
    
    // Build conversation history in Vertex AI format
    const contents = [];
    
    // Select the appropriate system prompt based on mode
    const systemPrompt = mode === 'venue' 
      ? SYSTEM_PROMPTS.venue 
      : (searchMode ? SYSTEM_PROMPTS.search : SYSTEM_PROMPTS.default);
    
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
    
    // Add conversation history for regular chat mode
    if (history && history.length > 0 && !searchMode) {
      for (const message of history) {
        contents.push({
          role: message.sender === 'user' ? "USER" : "MODEL",
          parts: [{ text: message.text }]
        });
      }
    }
    
    // Add the current prompt
    // For search mode, add extra context
    if (searchMode) {
      let enhancedPrompt = prompt;
      
      // Incorporate categories if available
      if (categories && categories.length > 0) {
        const categoryContext = categories.join(', ');
        enhancedPrompt = `${prompt} (Categories: ${categoryContext})`;
      }
      
      contents.push({
        role: "USER",
        parts: [{ text: `Search for real factual information about: "${enhancedPrompt}". Include real venue names, addresses, opening hours, and other specific details.` }]
      });
    } else {
      contents.push({
        role: "USER",
        parts: [{ text: prompt }]
      });
    }
    
    // Determine which AI provider to use
    const useVertexAI = !useGemini && GOOGLE_VERTEX_API_KEY;
    const useGeminiAPI = (useGemini || !GOOGLE_VERTEX_API_KEY) && GEMINI_API_KEY;
    
    if (!useVertexAI && !useGeminiAPI) {
      throw new Error("No valid API keys found for AI providers");
    }
    
    let responseText = '';
    
    // Use Vertex AI
    if (useVertexAI) {
      console.log("Using Vertex AI provider with MCP protocol");
      const response = await fetch(`${VERTEX_API_URL}?key=${GOOGLE_VERTEX_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: contents,
          generationConfig: {
            temperature: searchMode ? 0.1 : 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        })
      });

      console.log("Vertex AI API response status:", response.status);

      if (!response.ok) {
        const errorData = await response.text();
        console.error(`Vertex AI API error: ${response.status}`, errorData);
        throw new Error(`Error calling Vertex AI API: ${response.status}`);
      }

      const data = await response.json();
      console.log("Vertex AI API response received");
      
      // Extract the response text
      responseText = data.candidates[0].content.parts[0].text;
    } 
    // Use Gemini API
    else if (useGeminiAPI) {
      console.log("Using Gemini API provider with MCP protocol");
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: contents,
          generationConfig: {
            temperature: searchMode ? 0.1 : 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        })
      });

      console.log("Gemini API response status:", response.status);

      if (!response.ok) {
        const errorData = await response.text();
        console.error(`Gemini API error: ${response.status}`, errorData);
        throw new Error(`Error calling Gemini API: ${response.status}`);
      }

      const data = await response.json();
      console.log("Gemini API response received");
      
      // Extract the response text
      responseText = data.candidates[0].content.parts[0].text;
    }
    
    // Add hyperlinks to the Explore page for any locations or events mentioned
    const enhancedResponse = addExplorePageLinks(responseText, prompt);
    
    // Include MCP headers in the response
    const mcpHeaders = {
      ...corsHeaders,
      'Content-Type': 'application/json',
      'X-MCP-Provider': useVertexAI ? 'vertex-ai' : 'gemini',
      'X-MCP-Status': 'success'
    };
    
    return new Response(
      JSON.stringify({ 
        text: enhancedResponse,
        provider: useVertexAI ? 'vertex-ai' : 'gemini'
      }),
      { headers: mcpHeaders }
    );
  } catch (error) {
    console.error('Error in AI function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        provider: 'none',
        status: 'error'
      }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'X-MCP-Status': 'error' 
        } 
      }
    );
  }
});

/**
 * Add hyperlinks to the Explore page for locations/events mentioned in the text
 */
function addExplorePageLinks(text: string, originalQuery: string): string {
  // Add a link to explore all results at the bottom
  const exploreAllLink = `\n\n---\n\n**[Explore all results on the map](/explore?q=${encodeURIComponent(originalQuery)})**`;
  
  return text + exploreAllLink;
}
