
import { format, addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { EventItem } from "@/components/venue/events/types";

const generateRandomArtists = () => {
  const artists = [
    'The Rolling Stones', 'Taylor Swift', 'Ed Sheeran', 'Lady Gaga', 'Drake',
    'Beyoncé', 'Coldplay', 'The Weeknd', 'Bad Bunny', 'BTS', 'Harry Styles',
    'Post Malone', 'Dua Lipa', 'Billie Eilish', 'Bruno Mars', 'Adele',
    'Justin Bieber', 'Ariana Grande', 'Katy Perry', 'Rihanna', 'Lizzo',
    'J Balvin', 'Imagine Dragons', 'Cardi B', 'Kendrick Lamar'
  ];
  
  const count = Math.floor(Math.random() * 2) + 2;
  const selectedArtists = [];
  
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * artists.length);
    selectedArtists.push(artists[randomIndex]);
  }
  
  return selectedArtists;
};

const generateRandomComedians = () => {
  const comedians = [
    'Dave Chappelle', 'Kevin Hart', 'John Mulaney', 'Ali Wong', 'Bill Burr',
    'Trevor Noah', 'Amy Schumer', 'Chris Rock', 'Jerry Seinfeld', 'Jim Gaffigan',
    'Sebastian Maniscalco', 'Wanda Sykes', 'Jo Koy', 'Tom Segura', 'Bert Kreischer',
    'Nikki Glaser', 'Mike Birbiglia', 'Hasan Minhaj', 'Gabriel Iglesias', 'Tim Dillon',
    'Whitney Cummings', 'Iliza Shlesinger', 'Andrew Schulz', 'Taylor Tomlinson'
  ];
  
  const randomIndex = Math.floor(Math.random() * comedians.length);
  return comedians[randomIndex];
};

const generateEventLocation = (city: string, eventType: string) => {
  const venueNameParts: Record<string, string[]> = {
    'music': [
      `${city} Arena`, `The ${city} Theatre`, `${city} Stadium`, 
      `${city} Concert Hall`, `${city} Amphitheater`, `${city} Pavilion`,
      `Downtown ${city} Music Center`, `${city} Opera House`
    ],
    'comedy': [
      `${city} Comedy Club`, `Laugh Factory ${city}`, `${city} Improv`, 
      `Funny Bone ${city}`, `Comedy Cellar ${city}`, `${city} Stand-Up Center`,
      `Jokes & Notes ${city}`, `The Comedy Zone ${city}`
    ]
  };
  
  const venuePart = venueNameParts[eventType][Math.floor(Math.random() * venueNameParts[eventType].length)];
  
  return {
    name: venuePart,
    address: `${100 + Math.floor(Math.random() * 900)} Main St, ${city}`
  };
};

export const generateMusicEvents = (city: string, state: string, dateRange?: DateRange): EventItem[] => {
  if (!city) return [];
  
  const events: EventItem[] = [];
  const today = new Date();
  const startDate = dateRange?.from || today;
  const endDate = dateRange?.to || addDays(startDate, 90);
  
  // Calculate number of days between start and end
  const dayDiff = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const numEvents = Math.min(Math.max(3, Math.floor(dayDiff / 10)), 8);
  
  for (let i = 0; i < numEvents; i++) {
    const eventDate = addDays(startDate, Math.floor(Math.random() * dayDiff));
    const artists = generateRandomArtists();
    const venue = generateEventLocation(city, 'music');
    
    events.push({
      id: `music-${city.toLowerCase().replace(/\s+/g, '-')}-${i}`,
      title: artists.length > 1 ? 
        `${artists[0]} with ${artists.slice(1).join(', ')}` : 
        `${artists[0]} Live`,
      date: format(eventDate, "yyyy-MM-dd"),
      time: `${6 + Math.floor(Math.random() * 4)}:${Math.random() > 0.5 ? '30' : '00'} PM`,
      venueName: venue.name,
      venueAddress: venue.address,
      city,
      state,
      ticketPrice: `$${40 + Math.floor(Math.random() * 160)}`,
      imageUrl: `https://source.unsplash.com/random/800x500/?concert,music,${artists[0].replace(/\s+/g, '')}`,
      type: "music"
    });
  }
  
  // Sort by date
  events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return events;
};

export const generateComedyEvents = (city: string, state: string, dateRange?: DateRange): EventItem[] => {
  if (!city) return [];
  
  const events: EventItem[] = [];
  const today = new Date();
  const startDate = dateRange?.from || today;
  const endDate = dateRange?.to || addDays(startDate, 90);
  
  // Calculate number of days between start and end
  const dayDiff = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const numEvents = Math.min(Math.max(2, Math.floor(dayDiff / 15)), 6);
  
  for (let i = 0; i < numEvents; i++) {
    const eventDate = addDays(startDate, Math.floor(Math.random() * dayDiff));
    const comedian = generateRandomComedians();
    const venue = generateEventLocation(city, 'comedy');
    
    events.push({
      id: `comedy-${city.toLowerCase().replace(/\s+/g, '-')}-${i}`,
      title: `${comedian}: ${['Laugh Out Loud', 'The World Tour', 'Completely Unfiltered', 'New Material', 'Live & Uncensored'][Math.floor(Math.random() * 5)]}`,
      date: format(eventDate, "yyyy-MM-dd"),
      time: `${7 + Math.floor(Math.random() * 3)}:${Math.random() > 0.5 ? '30' : '00'} PM`,
      venueName: venue.name,
      venueAddress: venue.address,
      city,
      state,
      ticketPrice: `$${25 + Math.floor(Math.random() * 75)}`,
      imageUrl: `https://source.unsplash.com/random/800x500/?comedy,standup,${comedian.replace(/\s+/g, '')}`,
      type: "comedy"
    });
  }
  
  // Sort by date
  events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return events;
};

// Function to get comedy events for specific city - exported for use in search queries
export const getComedyEventsForCity = (city: string, state: string): EventItem[] => {
  return generateComedyEvents(city, state);
};
