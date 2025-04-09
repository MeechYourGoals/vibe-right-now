
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const TICKETMASTER_API_KEY = Deno.env.get('TICKETMASTER_API_KEY') || '';

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
    if (!TICKETMASTER_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'Ticketmaster API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse URL
    const url = new URL(req.url);
    const operation = url.pathname.split('/').pop();

    // Process based on operation
    switch (operation) {
      case 'events':
        return handleEventSearch(req);
      case 'event-details':
        return handleEventDetails(req);
      case 'venues':
        return handleVenueSearch(req);
      case 'venue-details':
        return handleVenueDetails(req);
      default:
        return new Response(
          JSON.stringify({ error: 'Unknown operation' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
  } catch (error) {
    console.error('Error in ticketmaster function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  async function handleEventSearch(req: Request) {
    const { keyword, city, stateCode, countryCode, postalCode, latlong, radius, unit, startDateTime, endDateTime, classificationName, size, page } = await req.json();

    const params = new URLSearchParams({ apikey: TICKETMASTER_API_KEY });
    
    if (keyword) params.append('keyword', keyword);
    if (city) params.append('city', city);
    if (stateCode) params.append('stateCode', stateCode);
    if (countryCode) params.append('countryCode', countryCode);
    if (postalCode) params.append('postalCode', postalCode);
    if (latlong) params.append('latlong', latlong);
    if (radius) params.append('radius', radius.toString());
    if (unit) params.append('unit', unit);
    if (startDateTime) params.append('startDateTime', startDateTime);
    if (endDateTime) params.append('endDateTime', endDateTime);
    if (classificationName) params.append('classificationName', classificationName);
    if (size) params.append('size', size.toString());
    if (page) params.append('page', page.toString());

    const response = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?${params}`
    );

    const data = await response.json();
    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  async function handleEventDetails(req: Request) {
    const { eventId } = await req.json();

    if (!eventId) {
      return new Response(
        JSON.stringify({ error: 'Event ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const params = new URLSearchParams({ apikey: TICKETMASTER_API_KEY });

    const response = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?${params}`
    );

    const data = await response.json();
    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  async function handleVenueSearch(req: Request) {
    const { keyword, city, stateCode, countryCode, postalCode, latlong, radius, unit, size, page } = await req.json();

    const params = new URLSearchParams({ apikey: TICKETMASTER_API_KEY });
    
    if (keyword) params.append('keyword', keyword);
    if (city) params.append('city', city);
    if (stateCode) params.append('stateCode', stateCode);
    if (countryCode) params.append('countryCode', countryCode);
    if (postalCode) params.append('postalCode', postalCode);
    if (latlong) params.append('latlong', latlong);
    if (radius) params.append('radius', radius.toString());
    if (unit) params.append('unit', unit);
    if (size) params.append('size', size.toString());
    if (page) params.append('page', page.toString());

    const response = await fetch(
      `https://app.ticketmaster.com/discovery/v2/venues.json?${params}`
    );

    const data = await response.json();
    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  async function handleVenueDetails(req: Request) {
    const { venueId } = await req.json();

    if (!venueId) {
      return new Response(
        JSON.stringify({ error: 'Venue ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const params = new URLSearchParams({ apikey: TICKETMASTER_API_KEY });

    const response = await fetch(
      `https://app.ticketmaster.com/discovery/v2/venues/${venueId}.json?${params}`
    );

    const data = await response.json();
    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
