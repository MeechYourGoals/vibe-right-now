
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GOOGLE_VERTEX_API_KEY = Deno.env.get('GOOGLE_VERTEX_API_KEY');
const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const VERTEX_API_URL = "https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/gemini-1.5-pro:generateContent";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Model Context Protocol - Enhanced system prompts that define behavior
const MCP_SYSTEM_PROMPTS = {
  default: `<context>
  role: You are Vernon, a helpful and friendly AI assistant within the 'Lovable' app. Your primary goal is to help users discover great places to go and things to do based on their requests.
  
  tone: Respond in a concise, informative, and enthusiastic tone. Be friendly, approachable, and helpful.
  
  capabilities: You can provide recommendations, answer questions about locations, and offer creative suggestions.
  
  limitations: You cannot make reservations directly, but you can help users plan their visits.
  </context>`,
  
  venue: `<context>
  role: You are Vernon for Venues, a knowledgeable business assistant within the 'Lovable' platform. Your primary goal is to help venue owners understand their business metrics, customer trends, and marketing performance.
  
  tone: Provide data-driven insights and actionable recommendations in a professional but friendly manner.
  
  capabilities: You can analyze business data, identify trends, and suggest improvements based on metrics.
  
  limitations: You cannot directly modify business settings or make changes to the venue profile.
  </context>`,
  
  search: `<context>
  role: You are an AI discovery expert for the 'Lovable' social platform. Your job is to provide factual, accurate information about places and venues.
  
  tone: Present information in a structured, clear format that is easy to understand and act upon.
  
  capabilities: You can provide specific details about venues including addresses, hours, and contact information.
  
  limitations: You should only provide information you're confident is factual and acknowledge when you don't know something.
  </context>`
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
    
    // Build conversation history with MCP format
    const contents = [];
    
    // Select the appropriate MCP system prompt based on mode
    const mcpSystemPrompt = mode === 'venue' 
      ? MCP_SYSTEM_PROMPTS.venue 
      : (searchMode ? MCP_SYSTEM_PROMPTS.search : MCP_SYSTEM_PROMPTS.default);
    
    // Add MCP system prompt
    contents.push({
      role: "USER",
      parts: [{ text: mcpSystemPrompt }]
    });
    
    // Add model acknowledgment of the MCP system prompt
    contents.push({
      role: "MODEL",
      parts: [{ text: "I understand my role and will assist according to the context provided." }]
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
    
    // Add the current prompt with additional MCP context for search
    if (searchMode) {
      let enhancedPrompt = prompt;
      
      // Incorporate categories if available
      if (categories && categories.length > 0) {
        const categoryContext = categories.join(', ');
        enhancedPrompt = `<request type="search" categories="${categoryContext}">${prompt}</request>`;
      } else {
        enhancedPrompt = `<request type="search">${prompt}</request>`;
      }
      
      contents.push({
        role: "USER",
        parts: [{ text: enhancedPrompt }]
      });
    } else {
      // Use MCP request format for standard queries
      const requestType = mode === 'venue' ? 'venue_analysis' : 'general';
      contents.push({
        role: "USER",
        parts: [{ text: `<request type="${requestType}">${prompt}</request>` }]
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
    
    // Process response through MCP format
    responseText = `<response>${responseText}</response>`;
    
    // Add hyperlinks to the Explore page for any locations or events mentioned
    const enhancedResponse = addExplorePageLinks(responseText, prompt);
    
    // Include MCP headers in the response
    const mcpHeaders = {
      ...corsHeaders,
      'Content-Type': 'application/json',
      'X-MCP-Provider': useVertexAI ? 'vertex-ai' : 'gemini',
      'X-MCP-Status': 'success',
      'X-MCP-Version': '1.0'
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
          'X-MCP-Status': 'error',
          'X-MCP-Version': '1.0'
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
