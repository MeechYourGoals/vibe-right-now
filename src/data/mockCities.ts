
// Re-export all existing city data
export * from './cities/nyc';
export * from './cities/la';
export * from './cities/chicago';
export * from './cities/phoenix';
export * from './cities/miami';
export * from './cities/vegas';
export * from './cities/toronto';
export * from './cities/amsterdam';
export * from './cities/paris';
export * from './cities/rome';
export * from './cities/tokyo';
export * from './cities/seoul';
export * from './cities/singapore';
export * from './cities/sydney';
export * from './cities/saopaulo';
export * from './cities/riodejaneiro';
export * from './cities/sanfrancisco';
export * from './cities/melbourne';
export * from './cities/mumbai';
export * from './cities/moscow';

import { cityLocations } from '@/mock/cityLocations';

// Add the missing findCityByName function
export const findCityByName = (cityName: string) => {
  return cityLocations[cityName] || null;
};
