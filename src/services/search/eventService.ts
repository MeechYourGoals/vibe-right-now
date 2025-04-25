
import { EventItem } from '@/components/venue/events/types';
import { format, addDays, parse, isWithinInterval } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { VertexAIService } from '@/services/VertexAIService';

// Generate music events for a city
export const generateMusicEvents = (city: string, state: string, dateRange?: DateRange | undefined) => {
  const events: EventItem[] = [];
  const artists = [
    'Taylor Swift', 'Ed Sheeran', 'Beyoncé', 'Coldplay', 'The Weeknd',
    'Lady Gaga', 'Harry Styles', 'Billie Eilish', 'BTS', 'Bruno Mars'
  ];
  
  const venues = [
    `${city} Arena`, `The ${city} Theatre`, `${city} Performance Hall`,
    `${city} Stadium`, `${city} Civic Center`
  ];
  
  // Generate a random date range over the next 3 months
  const today = new Date();
  
  for (let i = 0; i < 5; i++) {
    const eventDate = addDays(today, 7 + Math.floor(Math.random() * 90));
    const formattedDate = format(eventDate, 'yyyy-MM-dd');
    const randomHour = 17 + Math.floor(Math.random() * 6); // Between 5pm and 11pm
    const formattedTime = `${randomHour % 12 || 12}:00 ${randomHour < 12 ? 'AM' : 'PM'}`;
    
    // Skip if outside user's selected date range
    if (dateRange?.from && dateRange?.to) {
      if (!isWithinInterval(eventDate, { start: dateRange.from, end: dateRange.to })) {
        continue;
      }
    } else if (dateRange?.from && !dateRange.to) {
      if (eventDate < dateRange.from) {
        continue;
      }
    }
    
    const artist = artists[Math.floor(Math.random() * artists.length)];
    const venue = venues[Math.floor(Math.random() * venues.length)];
    const price = `$${40 + Math.floor(Math.random() * 120)}`;
    
    events.push({
      id: `music-${city.toLowerCase()}-${i}`,
      title: `${artist} Concert`,
      description: `Join us for an amazing night with ${artist} performing live.`,
      date: formattedDate,
      time: formattedTime,
      venue: venue,
      location: `${city}, ${state}`,
      type: 'music',
      price,
      ticketsAvailable: 100 + Math.floor(Math.random() * 900),
      imageUrl: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1000&auto=format&fit=crop',
      ticketUrl: 'https://tickets.example.com'
    });
  }
  
  return events;
};

// Generate comedy events for a city
export const generateComedyEvents = (city: string, state: string, dateRange?: DateRange) => {
  const events: EventItem[] = [];
  const comedians = [
    'Dave Chappelle', 'Kevin Hart', 'John Mulaney', 'Ali Wong', 'Bill Burr',
    'Trevor Noah', 'Amy Schumer', 'Chris Rock', 'Jerry Seinfeld', 'Jim Gaffigan'
  ];
  
  const venues = [
    `${city} Comedy Club`, `Laugh Factory ${city}`, `The Improv ${city}`,
    `Funny Bone ${city}`, `${city} Stand-up Lounge`
  ];
  
  // Generate a random date range over the next 3 months
  const today = new Date();
  
  for (let i = 0; i < 5; i++) {
    const eventDate = addDays(today, Math.floor(Math.random() * 90));
    const formattedDate = format(eventDate, 'yyyy-MM-dd');
    const randomHour = 19 + Math.floor(Math.random() * 3); // Between 7pm and 10pm
    const formattedTime = `${randomHour % 12 || 12}:00 ${randomHour < 12 ? 'AM' : 'PM'}`;
    
    // Skip if outside user's selected date range
    if (dateRange?.from && dateRange?.to) {
      if (!isWithinInterval(eventDate, { start: dateRange.from, end: dateRange.to })) {
        continue;
      }
    } else if (dateRange?.from && !dateRange.to) {
      if (eventDate < dateRange.from) {
        continue;
      }
    }
    
    const comedian = comedians[Math.floor(Math.random() * comedians.length)];
    const venue = venues[Math.floor(Math.random() * venues.length)];
    const price = `$${30 + Math.floor(Math.random() * 70)}`;
    
    events.push({
      id: `comedy-${city.toLowerCase()}-${i}`,
      title: `${comedian} Stand-up Comedy Show`,
      description: `Get ready to laugh with ${comedian} live on stage!`,
      date: formattedDate,
      time: formattedTime,
      venue: venue,
      location: `${city}, ${state}`,
      type: 'comedy',
      price,
      ticketsAvailable: 50 + Math.floor(Math.random() * 150),
      imageUrl: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?q=80&w=1000&auto=format&fit=crop',
      ticketUrl: 'https://tickets.example.com'
    });
  }
  
  return events;
};

// Get comedy events for a specific city
export const getComedyEventsForCity = (city: string, state: string) => {
  return generateComedyEvents(city, state);
};

// Export missing functions from the errors
export const generateEventsResponse = async (query: string): Promise<string> => {
  try {
    const response = await VertexAIService.searchWithVertex(query, { category: 'events' });
    return response;
  } catch (error) {
    console.error('Error generating events response:', error);
    return "I couldn't find specific event information. Please try a different search.";
  }
};

export const getCitySpecificEvent = (eventType: string, city: string): string => {
  const eventMap: Record<string, string[]> = {
    'music': [
      `${city} Music Festival`, 
      `Live Concert at ${city} Arena`, 
      `Jazz in the Park at ${city}`
    ],
    'comedy': [
      `Stand-up Comedy Night at ${city} Comedy Club`, 
      `Improv Show at ${city} Theatre`, 
      `Comedy Festival in ${city}`
    ],
    'sports': [
      `${city} Basketball Game`, 
      `Baseball Championship at ${city} Stadium`, 
      `Sports Tournament in ${city}`
    ],
    'festival': [
      `Food and Wine Festival in ${city}`, 
      `${city} Summer Festival`, 
      `Art Exhibition in ${city}`
    ]
  };
  
  const events = eventMap[eventType] || [`Event in ${city}`];
  return events[Math.floor(Math.random() * events.length)];
};

export const getEventWebsite = (eventType: string): string => {
  const websiteMap: Record<string, string[]> = {
    'music': ['concerts.example.com', 'musicevents.example.com', 'festivals.example.com'],
    'comedy': ['comedyshows.example.com', 'standuptickets.example.com', 'laughfactory.example.com'],
    'sports': ['sportingevents.example.com', 'gametickets.example.com', 'stadiumevents.example.com'],
    'festival': ['cityevents.example.com', 'festivaltickets.example.com', 'seasonalevents.example.com']
  };
  
  const websites = websiteMap[eventType] || ['events.example.com'];
  return websites[Math.floor(Math.random() * websites.length)];
};
