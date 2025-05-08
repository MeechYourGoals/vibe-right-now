
import { generateRandomBusinessHours } from "@/utils/locations/businessHoursUtils";
import { DateRange } from "react-day-picker";
import { addDays, format, isSameDay, isWithinInterval } from "date-fns";

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  city: string;
  state: string;
  image: string;
  ticketPrice: string;
  ticketUrl: string;
  category: string;
  featured: boolean;
  lat: number;
  lng: number;
}

// Generate mock music events for a city
export const generateMusicEvents = (city: string, state: string, dateRange?: DateRange): EventItem[] => {
  const events: EventItem[] = [];
  const today = new Date();
  
  // Generate events for the next 14 days
  for (let i = 0; i < 8; i++) {
    const eventDate = addDays(today, i);
    
    // Skip if outside the selected date range
    if (dateRange?.from && dateRange?.to) {
      if (!(isWithinInterval(eventDate, { start: dateRange.from, end: dateRange.to }))) {
        continue;
      }
    } else if (dateRange?.from && !dateRange.to) {
      if (!isSameDay(eventDate, dateRange.from)) {
        continue;
      }
    }
    
    const formattedDate = format(eventDate, "yyyy-MM-dd");
    const formattedDisplayDate = format(eventDate, "EEEE, MMMM d");
    
    const genres = ["Rock", "Pop", "Jazz", "Hip Hop", "Electronic", "Classical", "R&B"];
    const artists = ["The Weekenders", "Electric Sound", "Jazzy Trio", "Beat Masters", "Symphony Orchestra"];
    const venues = [`${city} Arena`, `${city} Concert Hall`, "Downtown Theater", "Riverside Venue"];
    
    events.push({
      id: `music-event-${city}-${i}`,
      title: `${artists[i % artists.length]} ${genres[i % genres.length]} Concert`,
      description: `Join us for a night of amazing ${genres[i % genres.length]} music with ${artists[i % artists.length]}.`,
      date: formattedDisplayDate,
      time: `${7 + (i % 3)}:00 PM`,
      venue: venues[i % venues.length],
      address: `${100 + i} Music Avenue`,
      city,
      state: state || "CA",
      image: `https://source.unsplash.com/random/400x300/?concert,${genres[i % genres.length]}`,
      ticketPrice: `$${25 + (i * 5)}`,
      ticketUrl: "#",
      category: "music",
      featured: i < 2,
      lat: 37.7749 + (Math.random() * 0.05),
      lng: -122.4194 + (Math.random() * 0.05)
    });
  }
  
  return events;
};

// Generate mock comedy events for a city
export const generateComedyEvents = (city: string, state: string, dateRange?: DateRange): EventItem[] => {
  const events: EventItem[] = [];
  const today = new Date();
  
  // Generate events for the next 7 days
  for (let i = 0; i < 6; i++) {
    const eventDate = addDays(today, i);
    
    // Skip if outside the selected date range
    if (dateRange?.from && dateRange?.to) {
      if (!(isWithinInterval(eventDate, { start: dateRange.from, end: dateRange.to }))) {
        continue;
      }
    } else if (dateRange?.from && !dateRange.to) {
      if (!isSameDay(eventDate, dateRange.from)) {
        continue;
      }
    }
    
    const formattedDate = format(eventDate, "yyyy-MM-dd");
    const formattedDisplayDate = format(eventDate, "EEEE, MMMM d");
    
    const comedians = ["Amy Johnson", "Mike Roberts", "Sarah Williams", "Jack Thompson", "Liz Davis"];
    const venues = [`${city} Comedy Club`, "Laugh Factory", "The Punchline", "Comedy Cellar"];
    
    events.push({
      id: `comedy-event-${city}-${i}`,
      title: `${comedians[i % comedians.length]} Stand-Up Comedy`,
      description: `An evening of hilarious comedy with ${comedians[i % comedians.length]}.`,
      date: formattedDisplayDate,
      time: `${8 + (i % 2)}:00 PM`,
      venue: venues[i % venues.length],
      address: `${200 + i} Laugh Street`,
      city,
      state: state || "CA",
      image: `https://source.unsplash.com/random/400x300/?comedy,standup`,
      ticketPrice: `$${20 + (i * 3)}`,
      ticketUrl: "#",
      category: "comedy",
      featured: i < 2,
      lat: 37.7749 + (Math.random() * 0.05),
      lng: -122.4194 + (Math.random() * 0.05)
    });
  }
  
  return events;
};
