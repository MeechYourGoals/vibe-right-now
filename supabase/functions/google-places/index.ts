
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GOOGLE_MAPS_API_KEY = Deno.env.get('GOOGLE_MAPS_API_KEY') || '';

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
    if (!GOOGLE_MAPS_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'Google Maps API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse URL
    const url = new URL(req.url);
    const operation = url.pathname.split('/').pop();

    // Process based on operation
    switch (operation) {
      case 'search':
        return handlePlaceSearch(req);
      case 'details':
        return handlePlaceDetails(req);
      case 'nearby':
        return handleNearbySearch(req);
      default:
        return new Response(
          JSON.stringify({ error: 'Unknown operation' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
  } catch (error) {
    console.error('Error in google-places function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  async function handlePlaceSearch(req: Request) {
    const { query, type } = await req.json();

    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const params = new URLSearchParams({
      input: query,
      key: GOOGLE_MAPS_API_KEY,
      inputtype: 'textquery',
    });

    if (type) {
      params.append('type', type);
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?${params}`
    );

    const data = await response.json();
    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  async function handlePlaceDetails(req: Request) {
    const { placeId, fields } = await req.json();

    if (!placeId) {
      return new Response(
        JSON.stringify({ error: 'Place ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const params = new URLSearchParams({
      place_id: placeId,
      key: GOOGLE_MAPS_API_KEY,
    });

    if (fields) {
      params.append('fields', fields.join(','));
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?${params}`
    );

    const data = await response.json();
    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  async function handleNearbySearch(req: Request) {
    const { location, radius, type, keyword } = await req.json();

    if (!location || !radius) {
      return new Response(
        JSON.stringify({ error: 'Location and radius are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const params = new URLSearchParams({
      location: `${location.lat},${location.lng}`,
      radius: radius.toString(),
      key: GOOGLE_MAPS_API_KEY,
    });

    if (type) {
      params.append('type', type);
    }

    if (keyword) {
      params.append('keyword', keyword);
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${params}`
    );

    const data = await response.json();
    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
