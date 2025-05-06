
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const GOOGLE_VERTEX_API_KEY = Deno.env.get('GOOGLE_VERTEX_API_KEY');

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
    const { action, text } = await req.json();

    if (action === 'analyze-entities') {
      return await handleEntityAnalysis(text);
    } else if (action === 'analyze-sentiment') {
      return await handleSentimentAnalysis(text);
    } else if (action === 'extract-categories') {
      return await handleCategoryExtraction(text);
    } else {
      throw new Error(`Unknown action: ${action}`);
    }
  } catch (error) {
    console.error('Error in google-nlp function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function handleEntityAnalysis(text: string) {
  // Call Google Natural Language API for entity analysis
  const response = await fetch(`https://language.googleapis.com/v1/documents:analyzeEntities?key=${GOOGLE_VERTEX_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      document: {
        type: 'PLAIN_TEXT',
        content: text
      },
      encodingType: 'UTF8'
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Google NLP API error:', errorText);
    throw new Error(`Google NLP API error: ${response.status}`);
  }

  const data = await response.json();

  return new Response(JSON.stringify({ entities: data.entities }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleSentimentAnalysis(text: string) {
  // Call Google Natural Language API for sentiment analysis
  const response = await fetch(`https://language.googleapis.com/v1/documents:analyzeSentiment?key=${GOOGLE_VERTEX_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      document: {
        type: 'PLAIN_TEXT',
        content: text
      },
      encodingType: 'UTF8'
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Google NLP API error:', errorText);
    throw new Error(`Google NLP API error: ${response.status}`);
  }

  const data = await response.json();
  
  // Determine sentiment label based on score
  const score = data.documentSentiment.score;
  let sentimentLabel = 'neutral';
  
  if (score > 0.25) sentimentLabel = 'positive';
  else if (score < -0.25) sentimentLabel = 'negative';
  
  return new Response(JSON.stringify({ 
    sentiment: data.documentSentiment,
    label: sentimentLabel
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleCategoryExtraction(text: string) {
  // Call Google Natural Language API for content classification
  const response = await fetch(`https://language.googleapis.com/v1/documents:classifyText?key=${GOOGLE_VERTEX_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      document: {
        type: 'PLAIN_TEXT',
        content: text
      }
    }),
  });

  if (!response.ok) {
    if (response.status === 400) {
      // This happens when the text is too short for classification
      return new Response(JSON.stringify({ categories: [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    const errorText = await response.text();
    console.error('Google NLP API error:', errorText);
    throw new Error(`Google NLP API error: ${response.status}`);
  }

  const data = await response.json();
  
  // Extract category names
  const categories = data.categories?.map(cat => {
    // Clean up the category name
    const nameParts = cat.name.split('/').filter(Boolean);
    return nameParts[nameParts.length - 1].replace(/_/g, ' ');
  }) || [];

  return new Response(JSON.stringify({ categories }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
