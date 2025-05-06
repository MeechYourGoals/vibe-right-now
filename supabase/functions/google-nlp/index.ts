
// @ts-ignore - Deno imports need to be ignored in TypeScript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

// @ts-ignore - Deno.env needs to be ignored in TypeScript
const GOOGLE_API_KEY = Deno.env.get('GOOGLE_VERTEX_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// @ts-ignore - Deno serve function needs to be ignored in TypeScript
serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text } = await req.json();
    
    if (!text) {
      throw new Error('No text provided');
    }

    // Call Google Natural Language API
    const response = await fetch(`https://language.googleapis.com/v1/documents:analyzeEntities?key=${GOOGLE_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        document: {
          type: 'PLAIN_TEXT',
          content: text,
        },
        encodingType: 'UTF8',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google NLP API error:', errorText);
      throw new Error(`Google NLP API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract relevant categories and entity types from the response
    const categories = processEntities(data.entities);
    
    return new Response(JSON.stringify({ categories }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error in google-nlp function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Process entities to extract relevant categories
function processEntities(entities: any[]): string[] {
  const categoryMap: Record<string, boolean> = {};
  
  if (!entities || entities.length === 0) {
    return [];
  }
  
  // Entity type mapping to categories
  const entityTypeToCategory: Record<string, string> = {
    'LOCATION': 'location',
    'ADDRESS': 'location',
    'CONSUMER_GOOD': 'shopping',
    'WORK_OF_ART': 'arts',
    'EVENT': 'events',
    'ORGANIZATION': 'business',
    'PERSON': 'people',
    'FOOD': 'dining',
    'OTHER': 'general'
  };
  
  // Extract categories from entities
  entities.forEach(entity => {
    if (entity.type && entityTypeToCategory[entity.type]) {
      categoryMap[entityTypeToCategory[entity.type]] = true;
    }
    
    // Check for specific keywords in entity names
    const name = entity.name.toLowerCase();
    if (name.includes('restaurant') || name.includes('food') || name.includes('dining')) {
      categoryMap['dining'] = true;
    } else if (name.includes('bar') || name.includes('club') || name.includes('pub')) {
      categoryMap['nightlife'] = true;
    } else if (name.includes('museum') || name.includes('gallery') || name.includes('art')) {
      categoryMap['arts'] = true;
    } else if (name.includes('park') || name.includes('garden') || name.includes('outdoor')) {
      categoryMap['outdoors'] = true;
    } else if (name.includes('concert') || name.includes('show') || name.includes('festival')) {
      categoryMap['events'] = true;
    } else if (name.includes('shop') || name.includes('mall') || name.includes('store')) {
      categoryMap['shopping'] = true;
    }
  });
  
  return Object.keys(categoryMap);
}
