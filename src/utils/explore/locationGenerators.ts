
import { Location } from "@/types";
import { generateRestaurants, generateCafes } from "./generators/restaurantGenerator";
import { generateBars, generateNightlife } from "./generators/barGenerator";
import { generateAttractions, generateLandmarks } from "./generators/attractionsGenerator";
import { generateSportsVenues } from "./generators/sportsGenerator";
import { getRandomItems } from "./mockGenerators";

export { vibeTags } from "./helpers/vibeTags";
export { generateZipCode } from "./helpers/zipCodeGenerator";

// Generate mock locations for a city by combining generators
export const generateMockLocationsForCity = (city: string, state: string = ""): Location[] => {
  const locations: Location[] = [
    ...generateRestaurants(city, state),
    ...generateCafes(city, state),
    ...generateBars(city, state),
    ...generateNightlife(city, state),
    ...generateAttractions(city, state),
    ...generateLandmarks(city, state),
    ...generateSportsVenues(city, state)
  ];
  
  return locations;
};

// Generate nightlife venues for a city
export const generateLocalNightlifeVenues = (city: string, state: string = ""): Location[] => {
  const venues = generateMockLocationsForCity(city, state)
    .filter(location => location.type === 'bar');
  
  venues.forEach(venue => {
    if (!venue.vibes?.includes('Nightowl')) {
      venue.vibes = venue.vibes || [];
      venue.vibes.push('Nightowl');
    }
  });
  
  return venues;
};

// Legacy function aliases for backward compatibility
export const generateRestaurantLocations = generateRestaurants;
export const generateBarLocations = generateBars;
export const generateEventAndAttractionLocations = generateAttractions;
export const generateSportsLocations = generateSportsVenues;
