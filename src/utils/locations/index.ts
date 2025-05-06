
// Consolidated exports file for locations module
export { cityCoordinates } from './cityDatabase';
export { 
  generateMockLocations, 
  generateCityLocations, 
  generateAllCityLocations,
  formatLocationHours,
  getLocationStatus,
  getTodaysHours
} from './locationGenerator';
export type { CityCoordinates } from './types';
