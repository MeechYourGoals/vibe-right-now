
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GOOGLE_MAPS_API_KEY = Deno.env.get('GOOGLE_MAPS_API_KEY');

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
    const { query, location, type, placeId, fields, radius, keyword } = await req.json();
    
    console.log('Google Places request received:', { 
      query: query?.substring(0, 50), 
      location, 
      type, 
      placeId, 
      fields, 
      radius, 
      keyword 
    });

    let endpoint;
    let params = new URLSearchParams();
    
    // Set up API key
    params.append('key', GOOGLE_MAPS_API_KEY || '');
    
    // Determine which API endpoint to use based on provided parameters
    if (placeId) {
      // Place Details request
      endpoint = 'https://maps.googleapis.com/maps/api/place/details/json';
      params.append('place_id', placeId);
      
      if (fields && Array.isArray(fields)) {
        params.append('fields', fields.join(','));
      }
    } else if (location && typeof location === 'object') {
      // Nearby Search request
      endpoint = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
      params.append('location', `${location.lat},${location.lng}`);
      params.append('radius', radius?.toString() || '5000');
      
      if (type) params.append('type', type);
      if (keyword) params.append('keyword', keyword);
    } else {
      // Text Search request
      endpoint = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
      params.append('query', query);
      
      if (type) params.append('type', type);
      if (location && typeof location === 'string') {
        params.append('region', location);
      }
    }
    
    console.log('Calling Google Places API:', endpoint);
    
    // Make the request to Google Places API
    const response = await fetch(`${endpoint}?${params.toString()}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Places API error:', response.status, errorText);
      throw new Error(`Google Places API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Google Places response status:', data.status);
    
    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      console.error('Google Places API status error:', data.status, data.error_message);
      throw new Error(`Google Places API status: ${data.status}`);
    }
    
    // Return the places data
    return new Response(
      JSON.stringify(data), 
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in google-places function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
