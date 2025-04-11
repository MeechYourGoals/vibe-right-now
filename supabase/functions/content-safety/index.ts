
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GOOGLE_API_KEY = Deno.env.get('GOOGLE_API_KEY');
const SAFETY_API_URL = "https://webrisk.googleapis.com/v1/uris:search";

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
    
    console.log('Checking content safety');
    
    // For text content, we'll do a simple check for harmful keywords
    // In a production environment, you would use a more robust solution
    const harmfulKeywords = [
      'hack', 'crack', 'illegal', 'phishing', 'malware', 'virus',
      'exploit', 'attack', 'fraud', 'scam', 'porn', 'xxx'
    ];
    
    const lowercaseContent = content.toLowerCase();
    const foundKeywords = harmfulKeywords.filter(keyword => 
      lowercaseContent.includes(keyword)
    );
    
    const safe = foundKeywords.length === 0;
    
    return new Response(
      JSON.stringify({ 
        safe, 
        reasons: safe ? [] : foundKeywords 
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
