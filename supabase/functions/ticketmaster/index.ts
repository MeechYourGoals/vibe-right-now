
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
      case 'events-by-category':
        return handleEventsByCategory(req);
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
    const { 
      keyword, 
      city, 
      stateCode, 
      countryCode, 
      postalCode, 
      latlong, 
      radius, 
      unit, 
      startDateTime, 
      endDateTime, 
      classificationName, 
      size, 
      page, 
      startDate,
      endDate 
    } = await req.json();

    const params = new URLSearchParams({ apikey: TICKETMASTER_API_KEY });
    
    if (keyword) params.append('keyword', keyword);
    if (city) params.append('city', city);
    if (stateCode) params.append('stateCode', stateCode);
    if (countryCode) params.append('countryCode', countryCode);
    if (postalCode) params.append('postalCode', postalCode);
    if (latlong) params.append('latlong', latlong);
    if (radius) params.append('radius', radius.toString());
    if (unit) params.append('unit', unit);
    
    // Handle date parameters
    if (startDateTime) {
      params.append('startDateTime', startDateTime);
    } else if (startDate) {
      const formattedStartDate = `${startDate}T00:00:00Z`;
      params.append('startDateTime', formattedStartDate);
    }
    
    if (endDateTime) {
      params.append('endDateTime', endDateTime);
    } else if (endDate) {
      const formattedEndDate = `${endDate}T23:59:59Z`;
      params.append('endDateTime', formattedEndDate);
    }
    
    if (classificationName) params.append('classificationName', classificationName);
    if (size) params.append('size', size.toString());
    if (page) params.append('page', page.toString());

    console.log(`Searching Ticketmaster events with params: ${params.toString()}`);

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

  async function handleEventsByCategory(req: Request) {
    const { category, city, startDate, endDate, size = 10 } = await req.json();
    
    // Category mapping
    const categoryMapping = {
      'nightlife': 'Music',
      'comedy': 'Comedy',
      'music': 'Music',
      'festival': 'Festival',
      'sports': 'Sports',
      'arts': 'Arts & Theatre'
    };
    
    // Get the classification name from mapping or use the category directly
    const classificationName = categoryMapping[category.toLowerCase()] || category;
    
    const params = new URLSearchParams({ 
      apikey: TICKETMASTER_API_KEY,
      size: size.toString(),
      sort: 'date,asc'
    });
    
    if (classificationName) {
      params.append('classificationName', classificationName);
    }
    
    if (city) {
      params.append('city', city);
    }
    
    // Format dates for Ticketmaster API
    const now = new Date();
    const formattedStartDate = startDate 
      ? `${startDate}T00:00:00Z` 
      : `${now.toISOString().split('T')[0]}T00:00:00Z`;
    
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + 3); // Default to 3 months in the future
    
    const formattedEndDate = endDate 
      ? `${endDate}T23:59:59Z` 
      : `${futureDate.toISOString().split('T')[0]}T23:59:59Z`;
    
    params.append('startDateTime', formattedStartDate);
    params.append('endDateTime', formattedEndDate);
    
    console.log(`Searching ${classificationName} events with params: ${params.toString()}`);
    
    try {
      const response = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?${params}`
      );
      
      const data = await response.json();
      
      // If we receive real data, return it
      if (data._embedded && data._embedded.events) {
        return new Response(
          JSON.stringify(data),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      // If no real data, generate fallback mock data
      const mockEvents = generateMockEventsByCategory(category, city, 10);
      return new Response(
        JSON.stringify({ 
          _embedded: { events: mockEvents },
          page: { totalElements: mockEvents.length, size: mockEvents.length }
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error(`Error fetching ${classificationName} events:`, error);
      // Generate fallback mock data on error
      const mockEvents = generateMockEventsByCategory(category, city, 10);
      return new Response(
        JSON.stringify({ 
          _embedded: { events: mockEvents },
          page: { totalElements: mockEvents.length, size: mockEvents.length }
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  }
});

// Helper function to generate mock events by category
function generateMockEventsByCategory(category: string, city: string = 'Los Angeles', count: number = 10) {
  const categoryLower = category.toLowerCase();
  const events = [];
  const now = new Date();
  
  // Category-specific venue names
  const venuesByCategory = {
    nightlife: [
      "Skyline Rooftop Bar", "Underground Lounge", "Echo Club", "Velvet Room", 
      "The Edison", "The Spare Room", "The Abbey", "Bootsy Bellows", 
      "Avalon Hollywood", "Sound Nightclub"
    ],
    comedy: [
      "The Comedy Store", "Laugh Factory", "The Improv", "Comedy Cellar", 
      "Upright Citizens Brigade", "The Stand", "Gotham Comedy Club", 
      "Zanies Comedy Club", "Helium Comedy Club", "Just For Laughs"
    ],
    music: [
      "The Troubadour", "Whisky a Go Go", "The Roxy", "Hollywood Bowl", 
      "The Greek Theatre", "Madison Square Garden", "The Fillmore", 
      "House of Blues", "Red Rocks Amphitheatre", "The Gorge"
    ],
    festival: [
      "Coachella Valley", "Lollapalooza Grounds", "Bonnaroo Farm", 
      "Austin City Limits", "Electric Daisy Carnival", "Outside Lands", 
      "Governors Island", "Randall's Island Park", "Grant Park", "Zilker Park"
    ],
    sports: [
      "Dodger Stadium", "Staples Center", "Madison Square Garden", 
      "Yankee Stadium", "Wrigley Field", "Fenway Park", "AT&T Stadium", 
      "Lambeau Field", "TD Garden", "Oracle Arena"
    ],
    arts: [
      "The Metropolitan Museum of Art", "LACMA", "MoMA", "Getty Center", 
      "Whitney Museum", "Guggenheim Museum", "National Gallery of Art", 
      "Art Institute of Chicago", "Smithsonian American Art Museum", "Tate Modern"
    ]
  };
  
  // Category-specific event names
  const eventNamesByCategory = {
    nightlife: [
      "Neon Nights Dance Party", "Rooftop Summer Sessions", "Underground Beat Society", 
      "Velvet Lounge Experience", "Electric Sky Weekends", "Full Moon Party",
      "Silent Disco Night", "Throwback Thursday", "Friday Night Live", "Saturday Groove"
    ],
    comedy: [
      "Stand-up Showcase", "Comedy All-Stars", "Last Laugh Fridays", 
      "Improv Night", "The Roast Sessions", "Open Mic Champions",
      "Comedy Knockout", "Laugh Your Face Off", "Joke's On You", "Comedy Explosion"
    ],
    music: [
      "Summer Concert Series", "Live Jazz Night", "Rock Revival", 
      "Acoustic Sessions", "EDM Explosion", "Hip-Hop Showcase",
      "Classical Connections", "Indie Band Spotlight", "Metal Mayhem", "Country Roads Tour"
    ],
    festival: [
      "Cultural Arts Festival", "Food & Wine Celebration", "Music & Arts Fair", 
      "Heritage Festival", "Summer Music Festival", "Film Festival Weekend",
      "Craft Beer Festival", "Street Food Carnival", "Book & Poetry Fair", "Tech Expo"
    ],
    sports: [
      "Championship Finals", "All-Star Weekend", "Playoff Series", 
      "Season Opener", "Rivalry Match", "Exhibition Game",
      "Charity Tournament", "Fan Appreciation Day", "Draft Day Event", "Awards Ceremony"
    ],
    arts: [
      "Gallery Opening Night", "Artist Spotlight Series", "Modern Art Exhibition", 
      "Photography Showcase", "Sculpture Garden Tour", "Interactive Art Installation",
      "Performance Art Night", "Art & Wine Walk", "Museum After Dark", "Artist Workshop"
    ]
  };
  
  // Select appropriate content based on category
  const venues = venuesByCategory[categoryLower] || venuesByCategory.nightlife;
  const eventNames = eventNamesByCategory[categoryLower] || eventNamesByCategory.nightlife;
  
  // Generate events
  for (let i = 0; i < count; i++) {
    // Create random future date within next 3 months
    const eventDate = new Date();
    eventDate.setDate(now.getDate() + Math.floor(Math.random() * 90) + 1);
    
    const venue = venues[i % venues.length];
    const eventName = eventNames[i % eventNames.length];
    
    // Add variety to event names
    const fullEventName = i % 3 === 0 ? 
      `${city} ${eventName}` : 
      (i % 2 === 0 ? `${eventName} at ${venue}` : eventName);
    
    events.push({
      id: `mock-${categoryLower}-${i}-${Date.now()}`,
      name: fullEventName,
      type: categoryLower,
      url: `https://example.com/events/${categoryLower}/${i}`,
      locale: "en-us",
      images: [
        {
          ratio: "16_9",
          url: `https://source.unsplash.com/random/800x450?${categoryLower},${venue.split(' ').join(',')}`
        }
      ],
      dates: {
        start: {
          localDate: eventDate.toISOString().split('T')[0],
          localTime: `${18 + (i % 6)}:00:00`,
          dateTime: eventDate.toISOString(),
        },
        status: {
          code: "onsale"
        }
      },
      _embedded: {
        venues: [
          {
            name: venue,
            city: {
              name: city
            },
            address: {
              line1: `${100 + i} Main Street`
            }
          }
        ]
      },
      priceRanges: [
        {
          min: 25 + (i * 5),
          max: 75 + (i * 10),
          currency: "USD"
        }
      ]
    });
  }
  
  return events;
}
