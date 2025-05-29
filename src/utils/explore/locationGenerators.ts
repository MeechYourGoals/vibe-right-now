
import { Location } from "@/types";
import { generateRestaurantLocations } from "./generators/restaurantGenerator";
import { generateBarLocations } from "./generators/barGenerator";
import { generateEventAndAttractionLocations } from "./generators/attractionsGenerator";
import { generateSportsLocations } from "./generators/sportsGenerator";
import { getRandomItems } from "./mockGenerators";

export { vibeTags } from "./helpers/vibeTags";
export { generateZipCode } from "./helpers/zipCodeGenerator";

// Generate mock locations for a city by combining generators
export const generateMockLocationsForCity = (city: string, state: string = ""): Location[] => {
  const locations: Location[] = [
    ...generateRestaurantLocations(city, state),
    ...generateBarLocations(city, state),
    ...generateEventAndAttractionLocations(city, state),
    ...generateSportsLocations(city, state)
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
