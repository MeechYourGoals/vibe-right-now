import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Get API key from Supabase secrets
const PERPLEXITY_API_KEY = Deno.env.get('PERPLEXITY_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Received request to perplexity-chat function");
    
    if (!PERPLEXITY_API_KEY) {
      console.error('PERPLEXITY_API_KEY not configured');
      return new Response(JSON.stringify({ 
        error: 'Vernon AI is not properly configured. Please check API keys.',
        text: "I'm currently experiencing configuration issues. Please check with the administrator."
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { prompt, mode = 'default', context = [] } = await req.json();
    
    if (!prompt) {
      return new Response(JSON.stringify({ 
        error: 'No prompt provided',
        text: "I didn't receive your question. Please try again."
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Processing Perplexity request in ${mode} mode`);
    
    // Build conversation messages
    let messages = [];
    
    // Add system message for Vernon personality but keep it unrestricted
    messages.push({
      role: 'system',
      content: 'You are Vernon, a helpful AI assistant. You can answer questions about anything - venues, events, general knowledge, current events, or any topic the user asks about. Use web search to provide accurate, up-to-date information. Be conversational and helpful.'
    });
    
    // Add context from previous messages
    if (context && context.length > 0) {
      const recentContext = context.slice(-5);
      recentContext.forEach(msg => {
        messages.push({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        });
      });
    }
    
    // Add current user prompt
    messages.push({
      role: 'user',
      content: prompt
    });

    // Call Perplexity API
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: messages,
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 1000,
        return_images: false,
        return_related_questions: false,
        search_domain_filter: [],
        search_recency_filter: 'month',
        frequency_penalty: 1,
        presence_penalty: 0
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Perplexity API error: ${response.status}:`, errorText);
      
      let errorMessage = 'I encountered an error while processing your request.';
      
      if (response.status === 429) {
        errorMessage = 'I\'m currently experiencing high demand. Please try again in a moment.';
      } else if (response.status === 401) {
        errorMessage = 'Authentication error. Please check with the administrator.';
      }
      
      return new Response(JSON.stringify({ 
        error: `Perplexity API error: ${response.status}`,
        text: errorMessage
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const responseText = data.choices?.[0]?.message?.content || 'I apologize, but I was unable to generate a response. Please try again.';
    
    console.log('Perplexity response generated successfully');
    
    return new Response(JSON.stringify({ 
      text: responseText,
      dataSource: 'perplexity_ai'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in perplexity-chat function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      text: "I'm having trouble processing your request right now. Please try again in a moment."
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
