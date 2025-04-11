
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GOOGLE_CLOUD_API_KEY = Deno.env.get('GOOGLE_CLOUD_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text } = await req.json();
    
    if (!text) {
      throw new Error('Text is required');
    }
    
    console.log('NLP request received for:', text.substring(0, 50) + '...');

    // Analyze entities
    const entitiesResponse = await fetch('https://language.googleapis.com/v1/documents:analyzeEntities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_CLOUD_API_KEY || ''
      },
      body: JSON.stringify({
        document: {
          type: 'PLAIN_TEXT',
          content: text
        },
        encodingType: 'UTF8'
      })
    });

    if (!entitiesResponse.ok) {
      const errorData = await entitiesResponse.text();
      console.error('Google NLP Entities API error:', entitiesResponse.status, errorData);
      throw new Error(`Google NLP API error: ${entitiesResponse.status}`);
    }

    const entitiesData = await entitiesResponse.json();
    
    // Analyze categories
    const categoriesResponse = await fetch('https://language.googleapis.com/v1/documents:classifyText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_CLOUD_API_KEY || ''
      },
      body: JSON.stringify({
        document: {
          type: 'PLAIN_TEXT',
          content: text
        }
      })
    });

    // If categories fails (common for short texts), just proceed without categories
    let categories = [];
    if (categoriesResponse.ok) {
      const categoriesData = await categoriesResponse.json();
      categories = categoriesData.categories?.map((cat: any) => cat.name) || [];
    }
    
    console.log('NLP analysis complete:', {
      entitiesCount: entitiesData.entities?.length || 0,
      categoriesCount: categories.length
    });
    
    // Extract intent and keywords (simple implementation)
    const extractedData = {
      entities: entitiesData.entities || [],
      categories,
      sentiment: entitiesData.documentSentiment,
    };
    
    return new Response(
      JSON.stringify(extractedData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in google-nlp function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
