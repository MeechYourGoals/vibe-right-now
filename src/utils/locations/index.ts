
// Consolidated exports file for locations module
export { cityCoordinates } from './cityDatabase';
export { generateCityLocations, generateAllCityLocations } from './locationGenerator';
export type { CityCoordinates } from './types';

// Re-export from mock/locations for backward compatibility
export { getLocationsByType, getLocationsByCity, getLocationsNearby, getLocationById, searchLocations } from '@/mock/locations/utils';
