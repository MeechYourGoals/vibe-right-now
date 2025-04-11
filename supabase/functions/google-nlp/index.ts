
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GOOGLE_API_KEY = Deno.env.get('GOOGLE_API_KEY') || Deno.env.get('GOOGLE_VERTEX_API_KEY');
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
    
    if (!GOOGLE_API_KEY) {
      console.error('Missing Google API key');
      return new Response(
        JSON.stringify({ error: 'Google API key is not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log(`Analyzing text with Cloud Natural Language API: "${text.substring(0, 50)}..."`);
    
    // Prepare the request to Google Cloud Natural Language API
    const response = await fetch(`${NLP_API_URL}?key=${GOOGLE_API_KEY}`, {
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
      const errorText = await response.text();
      console.error('Google NLP API error:', errorText);
      
      return new Response(
        JSON.stringify({ error: `Google NLP API error: ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    
    // Process the entity data to extract useful categories
    const categories = new Set<string>();
    
    if (data.entities && Array.isArray(data.entities)) {
      data.entities.forEach((entity: any) => {
        const type = entity.type;
        if (type) {
          // Map entity types to categories
          const typeMapping: Record<string, string> = {
            'LOCATION': 'location',
            'ADDRESS': 'location',
            'CONSUMER_GOOD': 'product',
            'WORK_OF_ART': 'entertainment',
            'EVENT': 'event',
            'ORGANIZATION': 'organization',
            'PERSON': 'person',
            'OTHER': 'other',
            'FOOD': 'restaurant',
            'DRINK': 'bar'
          };
          
          if (typeMapping[type]) {
            categories.add(typeMapping[type]);
          }
          
          // Extract metadata for additional categories
          if (entity.metadata) {
            Object.entries(entity.metadata).forEach(([key, value]: [string, any]) => {
              if (typeof value === 'string' && value.length > 0) {
                categories.add(value.toLowerCase());
              }
            });
          }
        }
      });
    }
    
    // Add the extracted categories to the response
    const enhancedData = {
      ...data,
      categories: Array.from(categories)
    };
    
    return new Response(
      JSON.stringify(enhancedData),
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
