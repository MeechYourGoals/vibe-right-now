
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const OPENROUTER_API_KEY = "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";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate API key
    if (!OPENROUTER_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'OpenRouter API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    const { query } = await req.json();

    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Searching with OpenRouter: "${query.substring(0, 50)}..."`);

    // Call OpenRouter API with Claude for better search capabilities
    const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://vibesapp.lovable.app',
        'X-Title': 'VibesApp Vernon Assistant'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku',
        messages: [
          {
            role: 'system',
            content: 'You are Vernon, a local venue discovery assistant for VibesApp. You help users find venues, events, and local attractions. Provide accurate, helpful information about places to visit, eat, drink, and experience. Be conversational and enthusiastic while staying informative. When possible, include specific details like addresses, hours, or pricing.'
          },
          {
            role: 'user',
            content: query
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
        top_p: 0.9
      }),
    });

    if (!openRouterResponse.ok) {
      const errorText = await openRouterResponse.text();
      console.error(`OpenRouter API error: ${errorText}`);
      return new Response(
        JSON.stringify({ 
          error: 'Error calling OpenRouter API', 
          details: errorText,
          status: openRouterResponse.status 
        }),
        { status: openRouterResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get response JSON
    const responseData = await openRouterResponse.json();
    
    return new Response(
      JSON.stringify({
        text: responseData.choices[0].message.content,
        relatedQuestions: [],
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in openrouter-search function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
