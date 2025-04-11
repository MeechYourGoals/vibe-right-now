
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GOOGLE_VERTEX_API_KEY = Deno.env.get('GOOGLE_VERTEX_API_KEY');
const NLP_API_URL = "https://language.googleapis.com/v1/documents:analyzeEntities";

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
    const { text } = await req.json();
    
    if (!text) {
      return new Response(
        JSON.stringify({ error: 'Text is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Call Google Natural Language API
    const response = await fetch(`${NLP_API_URL}?key=${GOOGLE_VERTEX_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        document: {
          type: 'PLAIN_TEXT',
          content: text
        },
        encodingType: 'UTF8'
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`Google NLP API error: ${response.status}`, errorData);
      return new Response(
        JSON.stringify({ error: `Error calling Google NLP API: ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log("Google NLP API response received");
    
    // Extract relevant categories from entities
    const categories = [];
    if (data.entities) {
      const typeMap = {
        'LOCATION': 'location',
        'ADDRESS': 'location',
        'CONSUMER_GOOD': 'product',
        'WORK_OF_ART': 'entertainment',
        'EVENT': 'event',
        'ORGANIZATION': 'organization',
        'PERSON': 'person'
      };
      
      for (const entity of data.entities) {
        if (typeMap[entity.type]) {
          categories.push(typeMap[entity.type]);
        }
      }
    }
    
    return new Response(
      JSON.stringify({ 
        entities: data.entities || [],
        categories: [...new Set(categories)] // Remove duplicates
      }),
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
