
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const YELP_API_KEY = Deno.env.get('YELP_API_KEY') || '';

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
    if (!YELP_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'Yelp API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse URL
    const url = new URL(req.url);
    const operation = url.pathname.split('/').pop();

    // Process based on operation
    switch (operation) {
      case 'business-search':
        return handleBusinessSearch(req);
      case 'business-details':
        return handleBusinessDetails(req);
      case 'business-reviews':
        return handleBusinessReviews(req);
      default:
        return new Response(
          JSON.stringify({ error: 'Unknown operation' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
  } catch (error) {
    console.error('Error in yelp-fusion function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  async function handleBusinessSearch(req: Request) {
    const { term, location, latitude, longitude, categories, price, open_now, sort_by, limit, offset } = await req.json();

    if ((!location && (!latitude || !longitude)) || !term) {
      return new Response(
        JSON.stringify({ error: 'Location (or coordinates) and search term are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const params = new URLSearchParams({ term });
    
    if (location) params.append('location', location);
    if (latitude) params.append('latitude', latitude.toString());
    if (longitude) params.append('longitude', longitude.toString());
    if (categories) params.append('categories', categories);
    if (price) params.append('price', price);
    if (open_now !== undefined) params.append('open_now', open_now.toString());
    if (sort_by) params.append('sort_by', sort_by);
    if (limit) params.append('limit', limit.toString());
    if (offset) params.append('offset', offset.toString());

    const response = await fetch(
      `https://api.yelp.com/v3/businesses/search?${params}`,
      {
        headers: {
          'Authorization': `Bearer ${YELP_API_KEY}`,
        },
      }
    );

    const data = await response.json();
    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  async function handleBusinessDetails(req: Request) {
    const { business_id } = await req.json();

    if (!business_id) {
      return new Response(
        JSON.stringify({ error: 'Business ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const response = await fetch(
      `https://api.yelp.com/v3/businesses/${business_id}`,
      {
        headers: {
          'Authorization': `Bearer ${YELP_API_KEY}`,
        },
      }
    );

    const data = await response.json();
    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  async function handleBusinessReviews(req: Request) {
    const { business_id, locale } = await req.json();

    if (!business_id) {
      return new Response(
        JSON.stringify({ error: 'Business ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const params = new URLSearchParams();
    if (locale) params.append('locale', locale);

    const response = await fetch(
      `https://api.yelp.com/v3/businesses/${business_id}/reviews?${params}`,
      {
        headers: {
          'Authorization': `Bearer ${YELP_API_KEY}`,
        },
      }
    );

    const data = await response.json();
    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
