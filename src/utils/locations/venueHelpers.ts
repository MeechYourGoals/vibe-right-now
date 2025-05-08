
import { Location } from "@/types";
import { cityCoordinates } from "./cityDatabase";
import { generateRandomBusinessHours } from "./businessHoursUtils";

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
      zip: `${Math.floor(Math.random() * 90000) + 10000}`,
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

export const generateVibeScore = (location: Location): number => {
  // Generate a random vibe score between 1-10
  return Math.floor(Math.random() * 10) + 1;
};

export const getPopularHours = (location: Location): Record<string, number> => {
  // Generate mock popular hours data
  const hours: Record<string, number> = {};
  
  for (let i = 11; i <= 23; i++) {
    hours[`${i}:00`] = Math.floor(Math.random() * 100);
  }
  
  return hours;
};

export const getAverageVisitLength = (): number => {
  // Return average visit length in minutes
  return Math.floor(Math.random() * 60) + 30;
};
