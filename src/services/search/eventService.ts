import { addDays, format, isWithinInterval, parseISO } from "date-fns";
import { DateRange } from "react-day-picker";
import { EventItem } from "@/components/venue/events/types";
import { v4 as uuidv4 } from 'uuid';
import { PlaceService, PlaceSearchResult } from '../PlaceService'; // Added import

// Helper function to map PlaceSearchResult to EventItem
export const mapPlaceToEventItem = (place: PlaceSearchResult, eventType: 'music' | 'comedy', city: string, state: string): EventItem => {
  // Placeholder for date/time as Google Places API might not directly provide future event dates for general place searches.
  // Attempt to parse date if place.name includes something like "YYYY-MM-DD" - very basic.
  let eventDate = addDays(new Date(), Math.floor(Math.random() * 30)); // Default placeholder
  const dateMatch = place.name?.match(/(\d{4}-\d{2}-\d{2})/);
  if (dateMatch && dateMatch[1]) {
    const parsed = parseISO(dateMatch[1]);
    if (!isNaN(parsed.getTime())) {
      eventDate = parsed;
    }
  }

  // Basic image URL construction from photos, if available
  let imageUrl = `https://source.unsplash.com/random/400x300/?${eventType},${place.name ? place.name.split(' ').join(',') : eventType}`;
  // Assuming place.photos is an array of Google Place Photo objects
  // This is a simplified example; actual URL construction is more complex
  // if (place.photos && place.photos.length > 0 && place.photos[0].photo_reference) {
  //   imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=YOUR_API_KEY`; // Replace YOUR_API_KEY
  // }


  return {
    id: place.id || uuidv4(),
    title: place.name || `Unnamed ${eventType} Event`,
    date: format(eventDate, "yyyy-MM-dd"),
    time: "N/A", // Placeholder, as specific times are hard to get
    venue: place.name || city, // Assuming the place itself is the venue
    location: place.formatted_address || `${city}, ${state}`,
    description: place.types ? `Type: ${place.types.join(', ')}` : `An exciting ${eventType} event. More details at the venue.`,
    price: "N/A", // Placeholder
    ticketsAvailable: Math.floor(Math.random() * 100), // Placeholder
    type: eventType,
    image: imageUrl,
  };
};

// Generate mock music events for fallback
const generateMockMusicEvents = (city: string, state: string, count: number = 3): EventItem[] => {
  const mockArtists = ['The Mockingbirds', 'Synthwave Dreams', 'Acoustic Nights'];
  const mockVenues = [`${city} Mock Arena`, `The ${city} Mock Theatre`];
  const events: EventItem[] = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const eventDate = addDays(today, Math.floor(Math.random() * 60));
    const artist = mockArtists[Math.floor(Math.random() * mockArtists.length)];
    const venue = mockVenues[Math.floor(Math.random() * mockVenues.length)];
    events.push({
      id: uuidv4(),
      title: `${artist} Live (Mock)`,
      date: format(eventDate, "yyyy-MM-dd"),
      time: `${7 + Math.floor(Math.random() * 4)}:00 PM`,
      venue: venue,
      location: `${city}, ${state}`,
      description: `This is a mock event for ${artist} at ${venue}.`,
      price: `$${50 + Math.floor(Math.random() * 100)}`,
      ticketsAvailable: 30 + Math.floor(Math.random() * 100),
      type: "music",
      image: `https://source.unsplash.com/random/400x300/?concert,music,${artist.split(' ').join(',')}`
    });
  }
  return events;
}

// Generate mock comedy events for fallback
const generateMockComedyEvents = (city: string, state: string, count: number = 3): EventItem[] => {
  const mockComedians = ['Chuckles McFunny', 'The Giggle Guru', 'Deadpan Dave'];
  const mockVenues = [`${city} Mock Comedy Club`, `Laugh Factory ${city} (Mock)`];
  const events: EventItem[] = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const eventDate = addDays(today, Math.floor(Math.random() * 60));
    const comedian = mockComedians[Math.floor(Math.random() * mockComedians.length)];
    const venue = mockVenues[Math.floor(Math.random() * mockVenues.length)];
    events.push({
      id: uuidv4(),
      title: `${comedian} Stand-up (Mock)`,
      date: format(eventDate, "yyyy-MM-dd"),
      time: `${7 + Math.floor(Math.random() * 3)}:30 PM`,
      venue: venue,
      location: `${city}, ${state}`,
      description: `This is a mock comedy show by ${comedian} at ${venue}.`,
      price: `$${20 + Math.floor(Math.random() * 50)}`,
      ticketsAvailable: 20 + Math.floor(Math.random() * 50),
      type: "comedy",
      image: `https://source.unsplash.com/random/400x300/?comedy,standup,${comedian.split(' ').join(',')}`
    });
  }
  return events;
}


export const generateMusicEvents = async (city: string, state: string, dateRange?: DateRange): Promise<EventItem[]> => {
  try {
    const query = `music events in ${city}`; // Or "live music venues in city"
    const placeResults: PlaceSearchResult[] = await PlaceService.findEvents(query);
    
    let events: EventItem[] = placeResults
      .map(place => mapPlaceToEventItem(place, 'music', city, state))
      .filter(event => event.title && event.title.toLowerCase().includes('live') || event.description?.toLowerCase().includes('music') || event.type === 'music'); // Basic filter

    if (dateRange?.from) {
      events = events.filter(event => {
        try {
          const eventDate = parseISO(event.date); // Assumes event.date is "yyyy-MM-dd"
          if (dateRange.to) {
            return isWithinInterval(eventDate, { start: dateRange.from!, end: dateRange.to });
          }
          return eventDate >= dateRange.from!;
        } catch (e) {
          console.warn(`Could not parse date ${event.date} for event ${event.title}`);
          return true; // Keep event if date is unparsable for now
        }
      });
    }
    
    if (events.length < 3) {
      console.log(`Fetched ${events.length} music events for ${city}, adding mock events.`);
      const mockEvents = generateMockMusicEvents(city, state, 3 - events.length);
      events = [...events, ...mockEvents];
    }
    return events.slice(0,10); // Limit to 10 events max
  } catch (error) {
    console.error(`Error fetching music events for ${city}:`, error);
    return generateMockMusicEvents(city, state); // Fallback to mock data on error
  }
};

export const generateComedyEvents = async (city: string, state: string, dateRange?: DateRange): Promise<EventItem[]> => {
  try {
    const query = `comedy shows in ${city}`; // Or "comedy clubs in city"
    const placeResults: PlaceSearchResult[] = await PlaceService.findEvents(query);

    let events: EventItem[] = placeResults
      .map(place => mapPlaceToEventItem(place, 'comedy', city, state))
      .filter(event => event.title && event.title.toLowerCase().includes('comedy') || event.description?.toLowerCase().includes('comedy') || event.type === 'comedy'); // Basic filter


    if (dateRange?.from) {
      events = events.filter(event => {
        try {
          const eventDate = parseISO(event.date); // Assumes event.date is "yyyy-MM-dd"
          if (dateRange.to) {
            return isWithinInterval(eventDate, { start: dateRange.from!, end: dateRange.to });
          }
          return eventDate >= dateRange.from!;
        } catch (e) {
          console.warn(`Could not parse date ${event.date} for event ${event.title}`);
          return true; // Keep event if date is unparsable
        }
      });
    }

    if (events.length < 3) {
      console.log(`Fetched ${events.length} comedy events for ${city}, adding mock events.`);
      const mockEvents = generateMockComedyEvents(city, state, 3 - events.length);
      events = [...events, ...mockEvents];
    }
    return events.slice(0,10); // Limit to 10 events max
  } catch (error) {
    console.error(`Error fetching comedy events for ${city}:`, error);
    return generateMockComedyEvents(city, state); // Fallback to mock data on error
  }
};

export const getComedyEventsForCity = async (city: string, state: string): Promise<EventItem[]> => {
  return generateComedyEvents(city, state);
};

export const generateEventsResponse = async (city: string): Promise<string> => {
  const musicEvents = await generateMusicEvents(city, ""); // Assuming state can be empty for this general response
  if (!musicEvents || musicEvents.length === 0) {
    return `Could not find upcoming events in ${city}.`;
  }
  return `Here are some upcoming events in ${city}:\n\n` +
    musicEvents.slice(0, 3).map(event => 
      `- ${event.title} at ${event.venue} on ${event.date}${event.time !== "N/A" ? ` at ${event.time}` : ''}`
    ).join('\n');
};

export const getCitySpecificEvent = async (city: string): Promise<string> => {
  const events = await generateMusicEvents(city, ""); // Assuming state can be empty
  if (!events || events.length === 0) {
    return `A popular concert in ${city}`; // Fallback
  }
  const randomEvent = events[Math.floor(Math.random() * events.length)];
  return randomEvent ? randomEvent.title : `Concert in ${city}`;
};

export const getEventWebsite = async (city: string): Promise<string> => {
  // For now, returns a generic search query. 
  // A more advanced version could fetch a specific event and try to find its website via PlaceDetails.
  return `https://www.google.com/search?q=events+in+${city.replace(/\s/g, '+')}`;
};

export const fetchMusicEvents = async (city: string, state: string, dateRange?: DateRange): Promise<EventItem[]> => {
  return generateMusicEvents(city, state, dateRange);
};

export const fetchComedyEvents = async (city: string, state: string, dateRange?: DateRange): Promise<EventItem[]> => {
  return generateComedyEvents(city, state, dateRange);
};
