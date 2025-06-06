
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, query, location, radius, type, placeId, input } = await req.json();
    const apiKey = Deno.env.get('GOOGLE_MAPS_API_KEY');
    
    if (!apiKey) {
      console.error('Google Maps API key not found');
      return new Response(
        JSON.stringify({ error: 'Google Maps API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Handle special case for API key request
    if (action === 'get-api-key') {
      return new Response(
        JSON.stringify({ apiKey }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`Google Places API call - Action: ${action}`);

    let apiUrl = '';
    let params = new URLSearchParams();
    params.append('key', apiKey);

    switch (action) {
      case 'search':
        apiUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
        params.append('query', query);
        if (location) {
          params.append('location', `${location.lat},${location.lng}`);
          params.append('radius', radius?.toString() || '5000');
        }
        break;

      case 'nearby':
        apiUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
        params.append('location', `${location.lat},${location.lng}`);
        params.append('radius', radius?.toString() || '5000');
        if (type) {
          params.append('type', type);
        }
        break;

      case 'details':
        apiUrl = 'https://maps.googleapis.com/maps/api/place/details/json';
        params.append('place_id', placeId);
        params.append('fields', 'name,formatted_address,geometry,rating,user_ratings_total,price_level,types,photos,opening_hours,business_status,formatted_phone_number,website,reviews');
        break;

      case 'autocomplete':
        apiUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
        params.append('input', input);
        if (location) {
          params.append('location', `${location.lat},${location.lng}`);
          params.append('radius', '50000');
        }
        params.append('types', 'establishment');
        break;

      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action specified' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
    }

    const response = await fetch(`${apiUrl}?${params.toString()}`);
    const data = await response.json();

    console.log(`Google Places API response status: ${data.status}`);
    
    if (data.status === 'OK' || data.status === 'ZERO_RESULTS') {
      return new Response(
        JSON.stringify(data),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    } else {
      console.error('Google Places API error:', data);
      return new Response(
        JSON.stringify({ error: data.error_message || 'Google Places API error', status: data.status }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

  } catch (error) {
    console.error('Error in google-places function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
