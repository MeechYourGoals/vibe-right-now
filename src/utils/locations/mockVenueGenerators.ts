
import { Location } from "@/types";
import { cityCoordinates } from "./cityDatabase";
import { generateRandomBusinessHours } from "./businessHoursUtils";

// Function to generate a random US zip code
export const generateRandomZip = (city: string, state: string) => {
  // Just for fun, create a somewhat realistic zip
  // This is a mock implementation and not accurate
  const stateZipPrefixes: { [key: string]: string } = {
    "CA": "9", "NY": "1", "FL": "3", "TX": "7", "IL": "6",
    "PA": "1", "OH": "4", "MI": "4", "GA": "3", "NC": "2"
  };
  
  const prefix = stateZipPrefixes[state] || String(Math.floor(Math.random() * 9) + 1);
  const suffix = String(Math.floor(Math.random() * 9999)).padStart(4, '0');
  
  return prefix + suffix;
};

// Generate random music venues for a city
export const generateMusicVenues = (city: string, state: string, count: number = 3): Location[] => {
  const venues: Location[] = [];
  const cityCoord = cityCoordinates[city.toLowerCase()];
  
  if (!cityCoord) {
    return venues;
  }
  
  const venueNames = [
    `${city} Arena`, `${city} Concert Hall`, `${city} Music Lounge`,
    `${city} Amphitheater`, `${city} Jazz Club`, `${city} Stadium`
  ];
  
  for (let i = 0; i < Math.min(count, venueNames.length); i++) {
    venues.push({
      id: `music-${city.toLowerCase()}-${i}`,
      name: venueNames[i],
      address: `${100 + i} Music St`,
      city,
      state: state || "CA",
      country: "USA",
      zip: generateRandomZip(city, state),
      lat: cityCoord.lat + (Math.random() * 0.05 - 0.025),
      lng: cityCoord.lng + (Math.random() * 0.05 - 0.025),
      type: "music",
      verified: Math.random() > 0.3,
      businessHours: generateRandomBusinessHours(),
      rating: Math.floor(Math.random() * 2) + 3 + Math.random(), // 3-5 stars
      priceLevel: Math.floor(Math.random() * 3) + 1, // 1-3 $ signs
    });
  }
  
  return venues;
};

// Generate random comedy clubs for a city
export const generateComedyClubs = (city: string, state: string, count: number = 2): Location[] => {
  const venues: Location[] = [];
  const cityCoord = cityCoordinates[city.toLowerCase()];
  
  if (!cityCoord) {
    return venues;
  }
  
  const venueNames = [
    `${city} Comedy Club`, `Laugh Factory ${city}`, `Jokes On You ${city}`,
    `The Punchline ${city}`, `Funny Business ${city}`
  ];
  
  for (let i = 0; i < Math.min(count, venueNames.length); i++) {
    venues.push({
      id: `comedy-${city.toLowerCase()}-${i}`,
      name: venueNames[i],
      address: `${200 + i} Laugh Ave`,
      city,
      state: state || "CA",
      country: "USA",
      zip: generateRandomZip(city, state),
      lat: cityCoord.lat + (Math.random() * 0.05 - 0.025),
      lng: cityCoord.lng + (Math.random() * 0.05 - 0.025),
      type: "comedy",
      verified: Math.random() > 0.3,
      businessHours: generateRandomBusinessHours(),
      rating: Math.floor(Math.random() * 2) + 3 + Math.random(), // 3-5 stars
      priceLevel: Math.floor(Math.random() * 3) + 1, // 1-3 $ signs
    });
  }
  
  return venues;
};

// Generate venue helper
export const generateLocalNightlifeVenues = (city: string, state: string, count: number = 4): Location[] => {
  const venues: Location[] = [];
  const cityCoord = cityCoordinates[city.toLowerCase()];
  
  if (!cityCoord) {
    return venues;
  }
  
  const venueNames = [
    `${city} Nightclub`, `Skybar ${city}`, `Underground ${city}`,
    `Neon Lounge ${city}`, `The Loft ${city}`, `Electric ${city}`
  ];
  
  for (let i = 0; i < Math.min(count, venueNames.length); i++) {
    venues.push({
      id: `nightlife-${city.toLowerCase()}-${i}`,
      name: venueNames[i],
      address: `${300 + i} Night Blvd`,
      city,
      state: state || "CA",
      country: "USA",
      zip: generateRandomZip(city, state),
      lat: cityCoord.lat + (Math.random() * 0.05 - 0.025),
      lng: cityCoord.lng + (Math.random() * 0.05 - 0.025),
      type: "nightlife",
      verified: Math.random() > 0.3,
      businessHours: generateRandomBusinessHours(),
      rating: Math.floor(Math.random() * 2) + 3 + Math.random(), // 3-5 stars
      priceLevel: Math.floor(Math.random() * 3) + 1, // 1-3 $ signs
    });
  }
  
  return venues;
};
