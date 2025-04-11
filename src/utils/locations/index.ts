
// Consolidated exports file for locations module
export { cityCoordinates } from './cityDatabase';
export { generateCityLocations, generateAllCityLocations } from './locationGenerator';
export type { CityCoordinates } from './types';

// Re-export convenience functions without circular imports
// Instead of importing directly from mock/locations/utils, we'll now just re-export the types
// but actual implementations will be imported directly where needed
export type { 
  LocationsByTypeFunction,
  LocationsByCityFunction,
  LocationsNearbyFunction,
  LocationByIdFunction,
  SearchLocationsFunction
} from '@/mock/locations/utils';
