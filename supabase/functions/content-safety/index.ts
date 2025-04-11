
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GOOGLE_VERTEX_API_KEY = Deno.env.get('GOOGLE_VERTEX_API_KEY');
const SAFETY_API_URL = "https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/text-bison:predict";

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
    const { content } = await req.json();
    
    if (!content) {
      return new Response(
        JSON.stringify({ error: 'Content is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Use Vertex AI to check content safety
    // We're using the text-bison model to evaluate if content is appropriate
    const response = await fetch(`${SAFETY_API_URL}?key=${GOOGLE_VERTEX_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        instances: [
          { 
            prompt: `Evaluate if the following content is safe and appropriate. 
                    Respond with YES or NO, followed by a brief reason:
                    
                    Content: "${content}"` 
          }
        ],
        parameters: {
          temperature: 0.2,
          maxOutputTokens: 256,
          topP: 0.8,
          topK: 40
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`Content Safety API error: ${response.status}`, errorData);
      return new Response(
        JSON.stringify({ error: `Error calling Content Safety API: ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log("Content Safety API response received");
    
    // Parse the response to determine if content is safe
    const aiResponse = data.predictions[0];
    const isSafe = aiResponse.toLowerCase().includes('yes');
    const reasonMatch = aiResponse.match(/reason:?\s*(.*)/i);
    const reasons = reasonMatch ? [reasonMatch[1].trim()] : [];
    
    return new Response(
      JSON.stringify({ 
        safe: isSafe,
        reasons: isSafe ? [] : reasons
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in content-safety function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
