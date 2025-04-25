
import { Location } from "@/types";

export const generateMusicVenues = (city: string, state: string): Location[] => {
  if (!city) return [];

  const venues = [
    {
      id: `music-${city.toLowerCase()}-1`,
      name: `${city} Concert Hall`,
      address: '123 Music Ave',
      city,
      state,
      zip: '12345', // Added required field
      country: 'USA',
      lat: 40 + Math.random(),
      lng: -75 + Math.random(),
      type: 'music',
      verified: Math.random() > 0.3,
      vibes: ["Trendy", "High Energy"]
    },
    {
      id: `music-${city.toLowerCase()}-2`,
      name: `${city} Arena`,
      address: '456 Stadium Blvd',
      city,
      state,
      zip: '12346', // Added required field
      country: 'USA',
      lat: 40 + Math.random(),
      lng: -75 + Math.random(),
      type: 'music',
      verified: Math.random() > 0.3,
      vibes: ["High Energy", "Modern"]
    },
    {
      id: `music-${city.toLowerCase()}-3`,
      name: `Underground ${city}`,
      address: '789 Indie St',
      city,
      state,
      zip: '12347', // Added required field
      country: 'USA',
      lat: 40 + Math.random(),
      lng: -75 + Math.random(),
      type: 'music',
      verified: Math.random() > 0.3,
      vibes: ["Intimate", "Artsy"]
    }
  ] as Location[];

  return venues;
};

export const generateComedyClubs = (city: string, state: string): Location[] => {
  if (!city) return [];

  const clubs = [
    {
      id: `comedy-${city.toLowerCase()}-1`,
      name: `${city} Comedy Club`,
      address: '123 Laugh Ave',
      city,
      state,
      zip: '12348', // Added required field
      country: 'USA',
      lat: 40 + Math.random(),
      lng: -75 + Math.random(),
      type: 'comedy',
      verified: Math.random() > 0.3,
      vibes: ["Intimate", "Lively"]
    },
    {
      id: `comedy-${city.toLowerCase()}-2`,
      name: `Improv ${city}`,
      address: '456 Jest St',
      city,
      state,
      zip: '12349', // Added required field
      country: 'USA',
      lat: 40 + Math.random(),
      lng: -75 + Math.random(),
      type: 'comedy',
      verified: Math.random() > 0.3,
      vibes: ["Cozy", "Casual"]
    }
  ] as Location[];

  return clubs;
};

export const generateNightlifeVenues = (city: string, state: string): Location[] => {
  if (!city) return [];

  const nightlifeVenues = [
    "Rooftop Lounge", "Nightclub", "Cocktail Bar", "Jazz Bar", "Dance Club", 
    "Speakeasy", "Brewery", "Wine Bar", "Pub", "Karaoke Bar"
  ];
  
  const nightlifeLocations: Location[] = [];
  
  const count = Math.floor(Math.random() * 5) + 2;
  
  for (let i = 0; i < count; i++) {
    const venueName = `${city} ${nightlifeVenues[Math.floor(Math.random() * nightlifeVenues.length)]}`;
    const isVerified = Math.random() > 0.4;
    
    nightlifeLocations.push({
      id: `nightlife-${city.toLowerCase()}-${i}`,
      name: venueName,
      address: `${100 + i} Party St`,
      city,
      state,
      zip: `${12350 + i}`, // Added required field
      country: "USA",
      lat: 40 + Math.random(),
      lng: -75 + Math.random(),
      type: "bar",
      verified: isVerified,
      vibes: generateRandomVibes()
    } as Location);
  }
  
  return nightlifeLocations;
};

const generateRandomVibes = (): string[] => {
  const allVibes = [
    "Cozy", "Family Friendly", "NightOwl", "Trendy", "Chill", 
    "Upscale", "Casual", "Romantic", "Lively", "Intimate", 
    "High Energy", "Laid Back", "Artsy", "Eclectic", "Historic",
    "Modern", "Vintage", "Industrial", "Bohemian", "Elegant"
  ];
  
  const numberOfVibes = Math.floor(Math.random() * 4) + 1;
  const selectedVibes: string[] = [];
  
  for (let i = 0; i < numberOfVibes; i++) {
    const randomVibe = allVibes[Math.floor(Math.random() * allVibes.length)];
    if (!selectedVibes.includes(randomVibe)) {
      selectedVibes.push(randomVibe);
    }
  }
  
  return selectedVibes;
};
