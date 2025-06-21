
// Re-export all existing city data from the correct mockCities directory
export * from './mockCities/nyc';
export * from './mockCities/la';
export * from './mockCities/chicago';
export * from './mockCities/phoenix';
export * from './mockCities/miami';
export * from './mockCities/vegas';
export * from './mockCities/toronto';
export * from './mockCities/amsterdam';
export * from './mockCities/paris';
export * from './mockCities/rome';
export * from './mockCities/tokyo';
export * from './mockCities/seoul';
export * from './mockCities/singapore';
export * from './mockCities/sydney';
export * from './mockCities/saopaulo';
export * from './mockCities/riodejaneiro';
export * from './mockCities/sanfrancisco';
export * from './mockCities/melbourne';
export * from './mockCities/mumbai';
export * from './mockCities/moscow';

import { cityLocations } from '@/mock/cityLocations';

// Add the missing findCityByName function
export const findCityByName = (cityName: string) => {
  return cityLocations[cityName] || null;
};
