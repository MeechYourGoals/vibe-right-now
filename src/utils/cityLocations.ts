
// This file is a compatibility layer to avoid breaking existing imports
// It re-exports everything from the new modular structure
import { cityCoordinates } from './locations/cityDatabase';
import { generateCityLocations, generateAllCityLocations } from './locations';
import { cityLocations, getLocationsByCity, getTrendingLocationsForCity, getNearbyLocations } from '@/mock/cityLocations';

export { 
  cityCoordinates, 
  generateCityLocations, 
  generateAllCityLocations,
  cityLocations,
  getLocationsByCity,
  getTrendingLocationsForCity,
  getNearbyLocations 
};

export type { CityCoordinates } from './locations';
