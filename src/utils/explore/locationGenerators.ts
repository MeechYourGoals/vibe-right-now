
import { Location } from '@/types';
import { generateRestaurants } from './generators/restaurantGenerator';
import { generateBars } from './generators/barGenerator';
import { generateAttractions } from './generators/attractionsGenerator';
import { generateSportsVenues } from './generators/sportsGenerator';

export const generateLocationsByCity = (city: string, state: string = 'CA'): Location[] => {
  const allLocations: Location[] = [];
  
  // Generate different types of locations
  allLocations.push(...generateRestaurants(city, state));
  allLocations.push(...generateBars(city, state));
  allLocations.push(...generateAttractions(city, state));
  allLocations.push(...generateSportsVenues(city, state));
  
  return allLocations;
};

export const generateLocationsByCategory = (category: string, city: string, state: string = 'CA'): Location[] => {
  switch (category) {
    case 'restaurant':
      return generateRestaurants(city, state);
    case 'bar':
      return generateBars(city, state);
    case 'attraction':
      return generateAttractions(city, state);
    case 'sports':
      return generateSportsVenues(city, state);
    default:
      return generateLocationsByCity(city, state);
  }
};

export const filterLocationsByVibes = (locations: Location[], selectedVibes: string[]): Location[] => {
  if (selectedVibes.length === 0) {
    return locations;
  }
  
  return locations.filter(location => {
    if (!location.vibes || !Array.isArray(location.vibes)) {
      return false;
    }
    return selectedVibes.some(vibe => 
      location.vibes!.some(locationVibe => 
        locationVibe.toLowerCase().includes(vibe.toLowerCase())
      )
    );
  });
};
