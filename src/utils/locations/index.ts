
// Consolidated exports file for locations module
export { cityCoordinates } from './cityDatabase';
export { generateRandomLocation, generateRandomLocations } from './locationGenerator';
export type { CityCoordinates } from './types';

// Export functions for generating city locations
export const generateCityLocations = (cityName: string, count: number = 10) => {
  // This is a wrapper around generateRandomLocations
  return generateRandomLocations(count);
};

export const generateAllCityLocations = (count: number = 50) => {
  // Generate a set of random locations
  return generateRandomLocations(count);
};
