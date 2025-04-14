import { EventItem } from "@/components/venue/events/types";
import { supabase } from '@/integrations/supabase/client';

/**
 * Get music events for a specific city using OpenRouter search
 */
export const getMusicEventsForCity = async (
  city: string, 
  state?: string,
  dateRange?: { from?: Date, to?: Date }
): Promise<EventItem[]> => {
  try {
    console.log(`Fetching music events for ${city}, ${state}`);
    
    const location = state ? `${city}, ${state}` : city;
    const dateContext = getDateRangeContext(dateRange);
    
    // Create search query for music events
    const searchQuery = `music events concerts shows in ${location}${dateContext}`;
    
    // Use OpenRouter to search for events
    const events = await searchEventsWithOpenRouter(searchQuery, "music", city, state);
    
    if (events.length > 0) {
      return events;
    }
    
    // Fallback to mock data if no events found
    console.log('No music events found via OpenRouter, using mock data');
    return generateMockMusicEvents(city, state, dateRange);
  } catch (error) {
    console.error('Error getting music events:', error);
    return generateMockMusicEvents(city, state, dateRange);
  }
};

/**
 * Get comedy events for a specific city using OpenRouter search
 */
export const getComedyEventsForCity = async (
  city: string, 
  state?: string,
  dateRange?: { from?: Date, to?: Date }
): Promise<EventItem[]> => {
  try {
    console.log(`Fetching comedy events for ${city}, ${state}`);
    
    const location = state ? `${city}, ${state}` : city;
    const dateContext = getDateRangeContext(dateRange);
    
    // Create search query for comedy events
    const searchQuery = `comedy shows standup performances in ${location}${dateContext}`;
    
    // Use OpenRouter to search for events
    const events = await searchEventsWithOpenRouter(searchQuery, "comedy", city, state);
    
    if (events.length > 0) {
      return events;
    }
    
    // Fallback to mock data if no events found
    console.log('No comedy events found via OpenRouter, using mock data');
    return generateMockComedyEvents(city, state, dateRange);
  } catch (error) {
    console.error('Error getting comedy events:', error);
    return generateMockComedyEvents(city, state, dateRange);
  }
};

/**
 * Search for events using OpenRouter
 */
async function searchEventsWithOpenRouter(
  query: string,
  eventType: "music" | "comedy",
  city: string,
  state?: string
): Promise<EventItem[]> {
  try {
    const OPENROUTER_API_KEY = "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";
    
    const systemPrompt = `You are an events data extraction assistant. Your task is to:
    1. Find ${eventType} events in the specified location
    2. Extract ONLY factual information about real events
    3. Return data in a structured JSON format containing ONLY an array of events
    4. Each event must include: title, date (YYYY-MM-DD format), time, location/venue, price (if available)
    5. Do NOT include any explanatory text or non-event data
    6. If no events are found, return an empty array []
    7. Include at least 5-8 events if available`;
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": window.location.origin,
        "X-Title": "Vibe Right Now"
      },
      body: JSON.stringify({
        model: "anthropic/claude-3-haiku",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: query
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.2,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const responseContent = data.choices[0].message.content;
    
    // Parse the JSON response
    try {
      const parsedData = JSON.parse(responseContent);
      const eventsList = parsedData.events || [];
      
      if (!Array.isArray(eventsList) || eventsList.length === 0) {
        return [];
      }
      
      // Map the response to our EventItem format
      return eventsList.map((event: any, index: number) => ({
        id: `${eventType}-${city}-${index}`,
        title: event.title || `${eventType} Event`,
        description: event.description || `${eventType} event in ${city}`,
        date: event.date || new Date().toISOString(),
        time: event.time || '8:00 PM',
        location: event.location || event.venue || `${city} ${eventType === 'music' ? 'Concert Hall' : 'Comedy Club'}`,
        imageUrl: event.imageUrl || `https://source.unsplash.com/random/800x600/?${eventType}`,
        ticketUrl: event.ticketUrl || '#',
        price: event.price || 'Various Prices',
        type: eventType
      }));
    } catch (parseError) {
      console.error('Error parsing OpenRouter response:', parseError);
      return [];
    }
  } catch (error) {
    console.error('Error searching with OpenRouter:', error);
    return [];
  }
}

/**
 * Get date range context for search queries
 */
function getDateRangeContext(dateRange?: { from?: Date, to?: Date }): string {
  if (!dateRange?.from) return '';
  
  const fromDate = new Date(dateRange.from);
  const fromMonth = fromDate.toLocaleString('default', { month: 'long' });
  const fromYear = fromDate.getFullYear();
  
  if (!dateRange.to) {
    return ` in ${fromMonth} ${fromYear}`;
  }
  
  const toDate = new Date(dateRange.to);
  const toMonth = toDate.toLocaleString('default', { month: 'long' });
  const toYear = toDate.getFullYear();
  
  if (fromYear === toYear && fromMonth === toMonth) {
    return ` in ${fromMonth} ${fromYear}`;
  }
  
  if (fromYear === toYear) {
    return ` from ${fromMonth} to ${toMonth} ${fromYear}`;
  }
  
  return ` from ${fromMonth} ${fromYear} to ${toMonth} ${toYear}`;
}

/**
 * Generate mock music events for a city
 */
const generateMockMusicEvents = (
  city: string, 
  state?: string,
  dateRange?: { from?: Date, to?: Date }
): EventItem[] => {
  const musicArtists = [
    "Taylor Swift", "The Weeknd", "Bad Bunny", "Billie Eilish", 
    "Drake", "BTS", "Dua Lipa", "Post Malone", "Harry Styles"
  ];
  
  const venues = [
    `${city} Arena`, `${city} Amphitheater`, `Downtown ${city} Concert Hall`, 
    `${city} Stadium`, `${city} Center`
  ];
  
  const now = new Date();
  const events: EventItem[] = [];
  
  const count = Math.floor(Math.random() * 6) + 3;
  
  for (let i = 0; i < count; i++) {
    const artist = musicArtists[Math.floor(Math.random() * musicArtists.length)];
    const venue = venues[Math.floor(Math.random() * venues.length)];
    
    let date = new Date();
    if (dateRange?.from) {
      const start = new Date(dateRange.from);
      let end = dateRange.to ? new Date(dateRange.to) : new Date();
      end.setDate(start.getDate() + 90); // Default to 90 days if no end date
      date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    } else {
      date.setDate(now.getDate() + Math.floor(Math.random() * 90));
    }
    
    events.push({
      id: `music-${city}-${i}`,
      title: `${artist} Concert`,
      description: `Live performance by ${artist}`,
      date: date.toISOString(),
      time: `${7 + Math.floor(Math.random() * 4)}:00 PM`,
      location: venue,
      imageUrl: `https://source.unsplash.com/random/800x600/?concert,${artist.split(' ').join(',')}`,
      ticketUrl: `https://www.bandsintown.com`,
      price: `$${45 + Math.floor(Math.random() * 150)}`,
      type: "music"
    });
  }
  
  return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

/**
 * Generate mock comedy events for a city
 */
const generateMockComedyEvents = (
  city: string, 
  state?: string,
  dateRange?: { from?: Date, to?: Date }
): EventItem[] => {
  const comedians = [
    "Dave Chappelle", "Kevin Hart", "John Mulaney", "Ali Wong", 
    "Bill Burr", "Hannah Gadsby", "Trevor Noah", "Wanda Sykes", "Jim Gaffigan"
  ];
  
  const venues = [
    `${city} Comedy Club`, `Laugh Factory ${city}`, `${city} Improv`, 
    `Funny Bone ${city}`, `Comedy Cellar ${city}`
  ];
  
  const now = new Date();
  const events: EventItem[] = [];
  
  const count = Math.floor(Math.random() * 5) + 3;
  
  for (let i = 0; i < count; i++) {
    const comedian = comedians[Math.floor(Math.random() * comedians.length)];
    const venue = venues[Math.floor(Math.random() * venues.length)];
    
    let date = new Date();
    if (dateRange?.from) {
      const start = new Date(dateRange.from);
      let end = dateRange.to ? new Date(dateRange.to) : new Date();
      end.setDate(start.getDate() + 90); // Default to 90 days if no end date
      date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    } else {
      date.setDate(now.getDate() + Math.floor(Math.random() * 90));
    }
    
    events.push({
      id: `comedy-${city}-${i}`,
      title: `${comedian} Stand-Up`,
      description: `Comedy show featuring ${comedian}`,
      date: date.toISOString(),
      time: `${7 + Math.floor(Math.random() * 3)}:00 PM`,
      location: venue,
      imageUrl: `https://source.unsplash.com/random/800x600/?comedian,standup`,
      ticketUrl: `https://punchup.live`,
      price: `$${30 + Math.floor(Math.random() * 70)}`,
      type: "comedy"
    });
  }
  
  return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};
