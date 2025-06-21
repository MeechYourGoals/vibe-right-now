
// Centralized data exports
export { amsterdamLocations as amsterdamData } from './mockCities/amsterdam';
export { default as bangkokData } from './mockCities/bangkok';
export { default as barcelonaData } from './mockCities/barcelona';
export { default as berlinData } from './mockCities/berlin';
export { chicagoLocations as chicagoData } from './mockCities/chicago';
export { default as dubaiData } from './mockCities/dubai';
export { default as istanbulData } from './mockCities/istanbul';
export { laLocations as laData } from './mockCities/la';
export { default as londonData } from './mockCities/london';
export { default as melbourneData } from './mockCities/melbourne';
export { default as miamiData } from './mockCities/miami';
export { default as moscowData } from './mockCities/moscow';
export { default as mumbaiData } from './mockCities/mumbai';
export { default as nycData } from './mockCities/nyc';
export { default as parisData } from './mockCities/paris';
export { default as phoenixData } from './mockCities/phoenix';
export { default as rioData } from './mockCities/riodejaneiro';
export { default as sanFranciscoData } from './mockCities/sanfrancisco';
export { default as saoPauloData } from './mockCities/saopaulo';
export { default as seoulData } from './mockCities/seoul';
export { default as singaporeData } from './mockCities/singapore';
export { default as sydneyData } from './mockCities/sydney';
export { default as tokyoData } from './mockCities/tokyo';
export { default as torontoData } from './mockCities/toronto';
export { default as vegasData } from './mockCities/vegas';
export { default as romeData } from './mockCities/rome';

import { CityData } from '@/types';

// Consolidated city data map
export const CITY_DATA_MAP: Record<string, CityData> = {};

// Helper functions for city data
export const getCityData = (cityName: string): CityData | null => {
  const normalizedName = cityName.toLowerCase().replace(/\s+/g, '');
  return CITY_DATA_MAP[normalizedName] || null;
};

export const getAllCityNames = (): string[] => {
  return Object.keys(CITY_DATA_MAP);
};

export const getAllCitiesData = (): CityData[] => {
  return Object.values(CITY_DATA_MAP);
};
