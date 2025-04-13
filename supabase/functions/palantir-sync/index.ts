
// Palantir Foundry Data Connector Edge Function
// This function handles data synchronization between Supabase and Palantir Foundry

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Handles both real-time events and batch synchronization
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { event_type, data, batch_mode } = await req.json()
    
    // Log the incoming event for debugging
    console.log(`Processing ${batch_mode ? 'batch' : 'single'} event of type: ${event_type}`)
    
    // Format the data according to Palantir's expected schema
    const formattedData = formatDataForPalantir(event_type, data)
    
    // Synchronize with Palantir Foundry using Edge Data Connector
    const syncResult = await syncToPalantir(formattedData, event_type)
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully synced ${event_type} data to Palantir Foundry`,
        result: syncResult
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error("Error in Palantir sync:", error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})

// Function to format data according to Palantir's ontology schema
function formatDataForPalantir(eventType: string, data: any) {
  // Common fields for all event types
  const baseObject = {
    timestamp: new Date().toISOString(),
    source: "vrn_app",
    event_id: crypto.randomUUID(),
  }
  
  switch (eventType) {
    case 'check_in':
      return {
        ...baseObject,
        entity_type: 'user_venue_interaction',
        interaction_type: 'check_in',
        user_id: data.userId,
        venue_id: data.venueId,
        venue_name: data.venueName,
        venue_type: data.venueType,
        venue_location: {
          lat: data.venueLat,
          lng: data.venueLng,
          city: data.venueCity,
          state: data.venueState
        },
        metadata: {
          has_receipt: data.hasReceipt || false,
          points_earned: data.pointsEarned || 0,
          distance_from_venue: data.distance || null
        }
      }
      
    case 'search':
      return {
        ...baseObject,
        entity_type: 'user_search',
        user_id: data.userId || 'anonymous',
        search_query: data.query,
        search_location: data.location || null,
        search_categories: data.categories || [],
        search_results_count: data.resultsCount || 0,
        metadata: {
          search_platform: data.platform || 'web',
          search_provider: data.provider || 'openai',
          city_context: data.city || null,
          time_context: data.timeframe || null
        }
      }
      
    case 'rsvp':
      return {
        ...baseObject,
        entity_type: 'user_event_interaction',
        interaction_type: 'rsvp',
        user_id: data.userId,
        event_id: data.eventId,
        event_name: data.eventName,
        event_type: data.eventType,
        venue_id: data.venueId,
        response: data.response, // 'going', 'interested', 'not_going'
        metadata: {
          group_size: data.groupSize || 1,
          rsvp_source: data.source || 'app'
        }
      }
      
    case 'favorite':
      return {
        ...baseObject,
        entity_type: 'user_preference',
        preference_type: 'favorite',
        user_id: data.userId,
        venue_id: data.venueId,
        venue_name: data.venueName,
        venue_type: data.venueType,
        action: data.action // 'add' or 'remove'
      }
      
    default:
      // For any other event types
      return {
        ...baseObject,
        entity_type: 'generic_event',
        event_name: eventType,
        ...data
      }
  }
}

// Function to sync data to Palantir Foundry
async function syncToPalantir(data: any, eventType: string) {
  // In a real implementation, this would use Palantir's SDK or API
  // For now, we'll simulate the API call
  
  console.log(`Sending to Palantir Foundry: ${JSON.stringify(data)}`)
  
  // Simulate API call to Palantir Edge Connector
  // In production, replace with actual API call
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Return a mock success response
  return {
    sync_id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    status: "queued",
    event_type: eventType
  }
}
