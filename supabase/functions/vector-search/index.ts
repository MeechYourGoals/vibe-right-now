
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const { query, categories } = await req.json();
    console.log(`Vector search for: "${query}"`);
    
    if (categories && categories.length > 0) {
      console.log('With NLP categories:', categories);
    }
    
    // Enhance the query with categories if available
    let enhancedQuery = query;
    if (categories && categories.length > 0) {
      const categoryContext = categories
        .filter((cat: string) => cat && cat.trim().length > 0)
        .join(', ');
        
      if (categoryContext) {
        enhancedQuery = `${query} (Categories: ${categoryContext})`;
      }
    }
    
    // Perform the vector search here
    // This would typically call a vector database or other search service
    // For this demo, we'll just return a simulated result
    
    // Simulate a search response (this would be replaced with actual vector search)
    const content = `Here are the results for "${query}". [Vector search with AI-enhanced results]`;
    
    return new Response(
      JSON.stringify({
        content,
        categories: categories || []
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Error in vector-search function:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
