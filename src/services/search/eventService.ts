
import { addDays, format, isWithinInterval } from "date-fns";
import { DateRange } from "react-day-picker";
import { EventItem } from "@/components/venue/events/types";
import { v4 as uuidv4 } from 'uuid';

// Generate mock music events for a city
export const generateMusicEvents = (city: string, state: string, dateRange?: DateRange): EventItem[] => {
  if (!city) {
    city = "San Francisco";
    state = "CA";
  }

  const mockArtists = [
    'The Rolling Stones', 'Taylor Swift', 'Ed Sheeran', 'Lady Gaga', 'Drake',
    'Beyoncé', 'Coldplay', 'The Weeknd', 'Bad Bunny', 'BTS',
    'Harry Styles', 'Post Malone', 'Dua Lipa', 'Billie Eilish', 'Bruno Mars'
  ];

  const mockVenues = [
    `${city} Arena`, `The ${city} Theatre`, `${city} Jazz Club`,
    `Underground ${city}`, `${city} Symphony Hall`
  ];

  // Generate 5-10 events
  const eventCount = Math.floor(Math.random() * 5) + 5;
  const events: EventItem[] = [];

  const today = new Date();
  
  for (let i = 0; i < eventCount; i++) {
    const eventDate = addDays(today, Math.floor(Math.random() * 60));
    
    // Skip if event date is outside the selected date range
    if (dateRange?.from && dateRange?.to) {
      if (!isWithinInterval(eventDate, { start: dateRange.from, end: dateRange.to })) {
        continue;
      }
    } else if (dateRange?.from && !dateRange?.to) {
      if (eventDate < dateRange.from) {
        continue;
      }
    }
    
    const artist = mockArtists[Math.floor(Math.random() * mockArtists.length)];
    const venue = mockVenues[Math.floor(Math.random() * mockVenues.length)];
    
    events.push({
      id: uuidv4(),
      title: `${artist} Live`,
      date: format(eventDate, "yyyy-MM-dd"),
      time: `${7 + Math.floor(Math.random() * 4)}:00 PM`,
      venue: venue,
      location: `${city}, ${state}`,
      description: `Join us for an unforgettable performance by ${artist} at ${venue}!`,
      price: `$${45 + Math.floor(Math.random() * 150)}`,
      ticketsAvailable: 20 + Math.floor(Math.random() * 200),
      type: "music",
      image: `https://source.unsplash.com/random/400x300/?concert,music,${artist.split(' ').join(',')}`
    });
  }

  // Always return at least 3 events even if date filtering removed some
  if (events.length < 3) {
    for (let i = events.length; i < 3; i++) {
      const eventDate = addDays(today, Math.floor(Math.random() * 60));
      const artist = mockArtists[Math.floor(Math.random() * mockArtists.length)];
      const venue = mockVenues[Math.floor(Math.random() * mockVenues.length)];
      
      events.push({
        id: uuidv4(),
        title: `${artist} Live`,
        date: format(eventDate, "yyyy-MM-dd"),
        time: `${7 + Math.floor(Math.random() * 4)}:00 PM`,
        venue: venue,
        location: `${city}, ${state}`,
        description: `Join us for an unforgettable performance by ${artist} at ${venue}!`,
        price: `$${45 + Math.floor(Math.random() * 150)}`,
        ticketsAvailable: 20 + Math.floor(Math.random() * 200),
        type: "music",
        image: `https://source.unsplash.com/random/400x300/?concert,music,${artist.split(' ').join(',')}`
      });
    }
  }
  
  return events;
};

// Generate mock comedy events for a city
export const generateComedyEvents = (city: string, state: string, dateRange?: DateRange): EventItem[] => {
  if (!city) {
    city = "San Francisco";
    state = "CA";
  }

  const mockComedians = [
    'Dave Chappelle', 'Kevin Hart', 'John Mulaney', 'Ali Wong', 'Bill Burr',
    'Trevor Noah', 'Amy Schumer', 'Chris Rock', 'Jerry Seinfeld', 'Jim Gaffigan'
  ];

  const mockVenues = [
    `${city} Comedy Club`, `Laugh Factory ${city}`, `${city} Improv`,
    `Funny Bone ${city}`, `Comedy Cellar ${city}`
  ];

  // Generate 5-10 events
  const eventCount = Math.floor(Math.random() * 5) + 5;
  const events: EventItem[] = [];

  const today = new Date();
  
  for (let i = 0; i < eventCount; i++) {
    const eventDate = addDays(today, Math.floor(Math.random() * 60));
    
    // Skip if event date is outside the selected date range
    if (dateRange?.from && dateRange?.to) {
      if (!isWithinInterval(eventDate, { start: dateRange.from, end: dateRange.to })) {
        continue;
      }
    } else if (dateRange?.from && !dateRange?.to) {
      if (eventDate < dateRange.from) {
        continue;
      }
    }
    
    const comedian = mockComedians[Math.floor(Math.random() * mockComedians.length)];
    const venue = mockVenues[Math.floor(Math.random() * mockVenues.length)];
    
    events.push({
      id: uuidv4(),
      title: `${comedian} Stand-up`,
      date: format(eventDate, "yyyy-MM-dd"),
      time: `${7 + Math.floor(Math.random() * 3)}:30 PM`,
      venue: venue,
      location: `${city}, ${state}`,
      description: `Laugh the night away with ${comedian} at ${venue}!`,
      price: `$${35 + Math.floor(Math.random() * 100)}`,
      ticketsAvailable: 20 + Math.floor(Math.random() * 100),
      type: "comedy",
      image: `https://source.unsplash.com/random/400x300/?comedy,standup,${comedian.split(' ').join(',')}`
    });
  }

  // Always return at least 3 events even if date filtering removed some
  if (events.length < 3) {
    for (let i = events.length; i < 3; i++) {
      const eventDate = addDays(today, Math.floor(Math.random() * 60));
      const comedian = mockComedians[Math.floor(Math.random() * mockComedians.length)];
      const venue = mockVenues[Math.floor(Math.random() * mockVenues.length)];
      
      events.push({
        id: uuidv4(),
        title: `${comedian} Stand-up`,
        date: format(eventDate, "yyyy-MM-dd"),
        time: `${7 + Math.floor(Math.random() * 3)}:30 PM`,
        venue: venue,
        location: `${city}, ${state}`,
        description: `Laugh the night away with ${comedian} at ${venue}!`,
        price: `$${35 + Math.floor(Math.random() * 100)}`,
        ticketsAvailable: 20 + Math.floor(Math.random() * 100),
        type: "comedy",
        image: `https://source.unsplash.com/random/400x300/?comedy,standup,${comedian.split(' ').join(',')}`
      });
    }
  }
  
  return events;
};

// Helper function to get comedy events for a specific city
export const getComedyEventsForCity = (city: string, state: string): EventItem[] => {
  return generateComedyEvents(city, state);
};

// Add this function for backward compatibility with imports
export const fetchMusicEvents = (city: string, state: string): Promise<EventItem[]> => {
  return Promise.resolve(generateMusicEvents(city, state));
};

// Add this function for backward compatibility with imports
export const fetchComedyEvents = (city: string, state: string): Promise<EventItem[]> => {
  return Promise.resolve(generateComedyEvents(city, state));
};
