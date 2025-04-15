
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AgentRequest {
  query: string;
  task: 'search' | 'browse' | 'extract' | 'analyze';
  context?: Record<string, any>;
}

interface SearchResults {
  results: any[];
  source: string;
  metadata?: Record<string, any>;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, task, context } = await req.json() as AgentRequest;
    console.log(`Received ${task} task: ${query}`);

    let response;
    
    switch (task) {
      case 'search':
        response = await performSearch(query, context);
        break;
      case 'browse':
        response = await browseWebsite(query, context);
        break;
      case 'extract':
        response = await extractInformation(query, context);
        break;
      case 'analyze':
        response = await analyzeContent(query, context);
        break;
      default:
        throw new Error('Invalid task type');
    }

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in agent-protocol function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

/**
 * Performs web search using OpenRouter
 */
async function performSearch(query: string, context?: Record<string, any>): Promise<SearchResults> {
  try {
    const openRouterApiKey = Deno.env.get('OPENROUTER_API_KEY');
    if (!openRouterApiKey) {
      throw new Error('OpenRouter API key is not configured');
    }
    
    // Create system prompt for search
    const systemPrompt = `You are a search agent that provides accurate information. 
    Your task is to search the web for information about "${query}".
    Provide comprehensive search results in a structured format.
    If the query is about events, include dates, locations, and ticket information if available.`;
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openRouterApiKey}`,
        "HTTP-Referer": "https://vibe-right-now.com",
        "X-Title": "Vibe Right Now"
      },
      body: JSON.stringify({
        model: "anthropic/claude-3-opus:beta",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Search for: ${query}` }
        ],
        response_format: { type: "json_object" },
        temperature: 0.5,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const content = JSON.parse(data.choices[0].message.content);
    
    return {
      results: content.results || [],
      source: "openrouter_search",
      metadata: {
        model: data.model,
        search_query: query,
        context: context || {}
      }
    };
  } catch (error) {
    console.error('Error in search task:', error);
    return { results: [], source: "error", metadata: { error: error.message } };
  }
}

/**
 * Browses a website to extract structured data
 */
async function browseWebsite(url: string, context?: Record<string, any>): Promise<any> {
  try {
    const openRouterApiKey = Deno.env.get('OPENROUTER_API_KEY');
    if (!openRouterApiKey) {
      throw new Error('OpenRouter API key is not configured');
    }
    
    // Create system prompt for browsing
    const systemPrompt = `You are a web browsing agent. 
    Your task is to imagine browsing the website ${url} and extract relevant information.
    Since you don't have direct web access, make educated guesses about what might be on the site
    based on your training data. Format your response as JSON.`;
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openRouterApiKey}`,
        "HTTP-Referer": "https://vibe-right-now.com",
        "X-Title": "Vibe Right Now"
      },
      body: JSON.stringify({
        model: "anthropic/claude-3-opus:beta",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Extract information from: ${url}. Context: ${JSON.stringify(context)}` }
        ],
        response_format: { type: "json_object" },
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error('Error in browse task:', error);
    return { error: error.message };
  }
}

/**
 * Extract specific information from content
 */
async function extractInformation(content: string, context?: Record<string, any>): Promise<any> {
  try {
    const openRouterApiKey = Deno.env.get('OPENROUTER_API_KEY');
    if (!openRouterApiKey) {
      throw new Error('OpenRouter API key is not configured');
    }

    const extractionType = context?.extractionType || "general";
    
    // Create system prompt for extraction
    const systemPrompt = `You are an information extraction agent.
    Your task is to extract ${extractionType} information from the given content.
    Format your response as a clean JSON object.`;
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openRouterApiKey}`,
        "HTTP-Referer": "https://vibe-right-now.com",
        "X-Title": "Vibe Right Now"
      },
      body: JSON.stringify({
        model: "anthropic/claude-3-opus:beta",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Extract from: ${content}` }
        ],
        response_format: { type: "json_object" },
        temperature: 0.2,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error('Error in extract task:', error);
    return { error: error.message };
  }
}

/**
 * Analyze content for insights
 */
async function analyzeContent(content: string, context?: Record<string, any>): Promise<any> {
  try {
    const openRouterApiKey = Deno.env.get('OPENROUTER_API_KEY');
    if (!openRouterApiKey) {
      throw new Error('OpenRouter API key is not configured');
    }

    const analysisType = context?.analysisType || "general";
    
    // Create system prompt for analysis
    const systemPrompt = `You are a content analysis agent.
    Your task is to perform a ${analysisType} analysis on the given content.
    Look for key insights, patterns, and relevant information.
    Format your response as a clean JSON object with analysis results.`;
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openRouterApiKey}`,
        "HTTP-Referer": "https://vibe-right-now.com",
        "X-Title": "Vibe Right Now"
      },
      body: JSON.stringify({
        model: "anthropic/claude-3-opus:beta",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analyze: ${content}` }
        ],
        response_format: { type: "json_object" },
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error('Error in analyze task:', error);
    return { error: error.message };
  }
}
