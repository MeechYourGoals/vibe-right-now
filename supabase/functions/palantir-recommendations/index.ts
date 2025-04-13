
// Palantir AIP Recommendations Mock Edge Function
// This function simulates recommendations from Palantir AIP

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { action, user_id, count = 5, context, city } = await req.json()
    
    console.log(`Processing ${action} request for ${user_id || 'anonymous'}`)
    
    let responseData = {}
    
    switch (action) {
      case 'get_recommendations':
        responseData = {
          recommendations: generateMockRecommendations(count, context?.city || city)
        }
        break
        
      case 'get_trending':
        responseData = {
          trending: generateMockTrending(count, city)
        }
        break
        
      case 'get_events':
        responseData = {
          events: generateMockEvents(count, city, user_id)
        }
        break
        
      default:
        throw new Error(`Unknown action: ${action}`)
    }
    
    return new Response(
      JSON.stringify({ 
        success: true,
        ...responseData
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error("Error in Palantir recommendations:", error)
    
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

// Generate mock venue recommendations
function generateMockRecommendations(count: number, city?: string) {
  const cities = ['Los Angeles', 'New York', 'Miami', 'Chicago', 'San Francisco']
  const targetCity = city || cities[Math.floor(Math.random() * cities.length)]
  
  const recommendations = []
  
  for (let i = 0; i < count; i++) {
    recommendations.push({
      id: crypto.randomUUID(),
      type: ['restaurant', 'bar', 'event', 'attraction', 'sports'][Math.floor(Math.random() * 5)],
      name: generateVenueName(),
      description: `A wonderful place in ${targetCity} with a great atmosphere.`,
      location: {
        lat: 34.0522 + (Math.random() - 0.5) * 0.1,
        lng: -118.2437 + (Math.random() - 0.5) * 0.1,
        address: `${Math.floor(Math.random() * 1000) + 100} Main St`,
        city: targetCity,
        state: getStateFromCity(targetCity)
      },
      score: Math.random() * 100,
      confidence: Math.random(),
      relevance_factors: ['Popular', 'Trending', 'Match your taste', 'Friends visited'][Math.floor(Math.random() * 4)].split(' '),
      timing: {
        best_time: `${Math.floor(Math.random() * 12) + 1}:00 ${Math.random() > 0.5 ? 'PM' : 'AM'}`,
        availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].slice(0, Math.floor(Math.random() * 7) + 1),
        recommended_duration: `${Math.floor(Math.random() * 3) + 1} hours`
      },
      metadata: {
        popularity: Math.floor(Math.random() * 100),
        price_level: Math.floor(Math.random() * 4) + 1,
        tags: ['fun', 'lively', 'quiet', 'romantic', 'hip'].slice(0, Math.floor(Math.random() * 5) + 1)
      }
    })
  }
  
  return recommendations
}

// Generate mock trending locations
function generateMockTrending(count: number, city?: string) {
  const cities = ['Los Angeles', 'New York', 'Miami', 'Chicago', 'San Francisco']
  const targetCity = city || cities[Math.floor(Math.random() * cities.length)]
  
  const trending = []
  
  for (let i = 0; i < count; i++) {
    trending.push({
      id: crypto.randomUUID(),
      type: ['restaurant', 'bar', 'event', 'attraction'][Math.floor(Math.random() * 4)],
      name: generateVenueName(),
      description: `Trending spot in ${targetCity} with increasing popularity.`,
      location: {
        lat: 34.0522 + (Math.random() - 0.5) * 0.1,
        lng: -118.2437 + (Math.random() - 0.5) * 0.1,
        address: `${Math.floor(Math.random() * 1000) + 100} Broadway`,
        city: targetCity,
        state: getStateFromCity(targetCity)
      },
      score: 80 + Math.random() * 20, // Trending places have high scores
      confidence: 0.8 + Math.random() * 0.2,
      relevance_factors: ['Hot this week', 'Rising star', 'Viral', 'Celebrity visited'][Math.floor(Math.random() * 4)].split(' '),
      timing: {
        best_time: `${Math.floor(Math.random() * 12) + 1}:00 ${Math.random() > 0.5 ? 'PM' : 'AM'}`,
      },
      metadata: {
        growth_rate: Math.floor(Math.random() * 100) + 200, // percentage growth
        mentions: Math.floor(Math.random() * 1000) + 500,
        social_media_presence: Math.floor(Math.random() * 100)
      }
    })
  }
  
  return trending
}

// Generate mock events
function generateMockEvents(count: number, city?: string, userId?: string) {
  const cities = ['Los Angeles', 'New York', 'Miami', 'Chicago', 'San Francisco']
  const targetCity = city || cities[Math.floor(Math.random() * cities.length)]
  
  const events = []
  
  for (let i = 0; i < count; i++) {
    const randomDays = Math.floor(Math.random() * 14) + 1 // Event in next 2 weeks
    const eventDate = new Date()
    eventDate.setDate(eventDate.getDate() + randomDays)
    
    const hour = Math.floor(Math.random() * 12) + 1
    const minute = Math.floor(Math.random() * 4) * 15 // 0, 15, 30, 45
    const period = Math.random() > 0.3 ? 'PM' : 'AM'
    
    events.push({
      id: crypto.randomUUID(),
      type: 'event',
      name: generateEventName(),
      description: `Exciting event happening in ${targetCity}.`,
      location: {
        lat: 34.0522 + (Math.random() - 0.5) * 0.1,
        lng: -118.2437 + (Math.random() - 0.5) * 0.1,
        address: `${Math.floor(Math.random() * 1000) + 100} Event Avenue`,
        city: targetCity,
        state: getStateFromCity(targetCity)
      },
      score: Math.random() * 100,
      confidence: Math.random(),
      relevance_factors: ['Recommended', 'Popular', 'Matches interests'][Math.floor(Math.random() * 3)].split(' '),
      timing: {
        best_time: `${eventDate.toLocaleDateString()} at ${hour}:${minute.toString().padStart(2, '0')} ${period}`,
        availability: ['Limited tickets', 'Selling fast', 'Available'][Math.floor(Math.random() * 3)],
        recommended_duration: `${Math.floor(Math.random() * 3) + 1} hours`
      },
      metadata: {
        ticket_price: `$${Math.floor(Math.random() * 100) + 20}`,
        category: ['Music', 'Sports', 'Food & Drink', 'Arts', 'Nightlife'][Math.floor(Math.random() * 5)],
        attendance: Math.floor(Math.random() * 500) + 50
      }
    })
  }
  
  return events
}

// Helper function to generate venue names
function generateVenueName() {
  const prefixes = ['The', 'Little', 'Big', 'Urban', 'Downtown', 'Uptown', 'Coastal', 'Royal', 'Golden', 'Silver']
  const nouns = ['Table', 'Spoon', 'Kitchen', 'Lounge', 'Grill', 'Room', 'Bar', 'Club', 'Spot', 'Place']
  const suffixes = ['& Co.', 'Bistro', 'House', 'Cafe', 'Restaurant', 'Eatery', 'Pub', 'Tavern', '']
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]
  
  return `${prefix} ${noun}${suffix ? ' ' + suffix : ''}`
}

// Helper function to generate event names
function generateEventName() {
  const prefixes = ['Annual', 'Summer', 'Winter', 'Spring', 'Fall', 'Night of', 'Day of', 'Weekend', 'Grand']
  const descriptors = ['Jazz', 'Food', 'Music', 'Art', 'Film', 'Beer', 'Wine', 'Dance', 'Comedy', 'Cultural']
  const types = ['Festival', 'Celebration', 'Party', 'Gathering', 'Exhibition', 'Show', 'Fair', 'Concert', 'Gala']
  
  const usePrefix = Math.random() > 0.5
  const prefix = usePrefix ? prefixes[Math.floor(Math.random() * prefixes.length)] + ' ' : ''
  const descriptor = descriptors[Math.floor(Math.random() * descriptors.length)]
  const type = types[Math.floor(Math.random() * types.length)]
  
  return `${prefix}${descriptor} ${type}`
}

// Helper function to get state from city
function getStateFromCity(city: string): string {
  const cityToState: Record<string, string> = {
    'Los Angeles': 'CA',
    'San Francisco': 'CA',
    'New York': 'NY',
    'Miami': 'FL',
    'Chicago': 'IL',
    'Seattle': 'WA',
    'Boston': 'MA',
    'Austin': 'TX',
    'Denver': 'CO',
    'Portland': 'OR'
  }
  
  return cityToState[city] || 'CA'
}
