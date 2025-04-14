
import { EventItem } from "@/components/venue/events/types";
import { supabase } from '@/integrations/supabase/client';

/**
 * Get music events for a specific city using Bandsintown API
 * This is an unofficial API client that parses the public website data
 */
export const getMusicEventsForCity = async (
  city: string, 
  state?: string,
  dateRange?: { from?: Date, to?: Date }
): Promise<EventItem[]> => {
  try {
    console.log(`Fetching music events for ${city}, ${state}`);
    
    const location = state ? `${city}, ${state}` : city;
    const encodedLocation = encodeURIComponent(location);
    
    // Scrape Bandsintown data through our serverless function
    const { data, error } = await supabase.functions.invoke('event-search', {
      body: { 
        provider: 'bandsintown',
        location: encodedLocation,
        dateFrom: dateRange?.from?.toISOString(),
        dateTo: dateRange?.to?.toISOString()
      }
    });

    if (error) {
      console.error('Error fetching Bandsintown events:', error);
      return generateMockMusicEvents(city, state, dateRange);
    }

    if (!data || !data.events || data.events.length === 0) {
      console.log('No Bandsintown events found, using mock data');
      return generateMockMusicEvents(city, state, dateRange);
    }

    // Map Bandsintown data to our event format
    return data.events.map((event: any, index: number) => ({
      id: `music-${city}-${index}`,
      title: event.title || `${event.artist} Concert`,
      description: event.description || `Live performance by ${event.artist}`,
      date: event.date || new Date().toISOString(),
      time: event.time || '8:00 PM',
      location: event.venue || `${city} Music Hall`,
      imageUrl: event.imageUrl || `https://source.unsplash.com/random/800x600/?concert,music`,
      ticketUrl: event.ticketUrl || 'https://www.bandsintown.com/',
      price: event.price || 'Various Prices',
      type: "music"
    }));
  } catch (error) {
    console.error('Error getting music events:', error);
    return generateMockMusicEvents(city, state, dateRange);
  }
};

/**
 * Get comedy events for a specific city using Punchup.live website data
 */
export const getComedyEventsForCity = async (
  city: string, 
  state?: string,
  dateRange?: { from?: Date, to?: Date }
): Promise<EventItem[]> => {
  try {
    console.log(`Fetching comedy events for ${city}, ${state}`);
    
    // Attempt to get postal code for the location
    const location = state ? `${city}, ${state}` : city;
    const encodedLocation = encodeURIComponent(location);
    
    // Scrape Punchup data through our serverless function
    const { data, error } = await supabase.functions.invoke('event-search', {
      body: { 
        provider: 'punchup',
        location: encodedLocation,
        dateFrom: dateRange?.from?.toISOString(),
        dateTo: dateRange?.to?.toISOString()
      }
    });

    if (error) {
      console.error('Error fetching Punchup comedy events:', error);
      return generateMockComedyEvents(city, state, dateRange);
    }

    if (!data || !data.events || data.events.length === 0) {
      console.log('No Punchup comedy events found, using mock data');
      return generateMockComedyEvents(city, state, dateRange);
    }

    // Map Punchup data to our event format
    return data.events.map((event: any, index: number) => ({
      id: `comedy-${city}-${index}`,
      title: event.title || 'Comedy Show',
      description: event.description || 'Stand-up comedy performance',
      date: event.date || new Date().toISOString(),
      time: event.time || '8:00 PM',
      location: event.venue || `${city} Comedy Club`,
      imageUrl: event.imageUrl || `https://source.unsplash.com/random/800x600/?comedy,standup`,
      ticketUrl: event.ticketUrl || 'https://punchup.live/',
      price: event.price || 'Various Prices',
      type: "comedy"
    }));
  } catch (error) {
    console.error('Error getting comedy events:', error);
    return generateMockComedyEvents(city, state, dateRange);
  }
};

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
