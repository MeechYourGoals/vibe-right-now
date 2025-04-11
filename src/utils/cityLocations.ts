
// This file is a compatibility layer to avoid breaking existing imports
// It re-exports everything from the new modular structure
import { cityCoordinates, generateCityLocations, generateAllCityLocations } from './locations';
import { getLocationsByCity, getLocationsNearby } from '@/mock/locations';

export { 
  cityCoordinates, 
  generateCityLocations, 
  generateAllCityLocations,
  getLocationsByCity, 
  getLocationsNearby 
};

export type { CityCoordinates } from './locations';

// For backward compatibility with other imports
export const getNearbyLocations = getLocationsNearby;
