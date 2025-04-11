
// This file is a compatibility layer to avoid breaking existing imports
// It re-exports everything from the new modular structure
import { cityCoordinates, generateCityLocations, generateAllCityLocations } from './locations';
export { cityCoordinates, generateCityLocations, generateAllCityLocations };
export type { CityCoordinates } from './locations';
