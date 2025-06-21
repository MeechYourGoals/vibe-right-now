
// Centralized data exports
export { default as amsterdamData } from './mockCities/amsterdam';
export { default as bangkokData } from './mockCities/bangkok';
export { default as barcelonaData } from './mockCities/barcelona';
export { default as berlinData } from './mockCities/berlin';
export { default as chicagoData } from './mockCities/chicago';
export { default as dubaiData } from './mockCities/dubai';
export { default as istanbulData } from './mockCities/istanbul';
export { default as laData } from './mockCities/la';
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
export const CITY_DATA_MAP: Record<string, CityData> = {
  amsterdam: require('./mockCities/amsterdam').default,
  bangkok: require('./mockCities/bangkok').default,
  barcelona: require('./mockCities/barcelona').default,
  berlin: require('./mockCities/berlin').default,
  chicago: require('./mockCities/chicago').default,
  dubai: require('./mockCities/dubai').default,
  istanbul: require('./mockCities/istanbul').default,
  la: require('./mockCities/la').default,
  london: require('./mockCities/london').default,
  melbourne: require('./mockCities/melbourne').default,
  miami: require('./mockCities/miami').default,
  moscow: require('./mockCities/moscow').default,
  mumbai: require('./mockCities/mumbai').default,
  nyc: require('./mockCities/nyc').default,
  paris: require('./mockCities/paris').default,
  phoenix: require('./mockCities/phoenix').default,
  rio: require('./mockCities/riodejaneiro').default,
  sanfrancisco: require('./mockCities/sanfrancisco').default,
  saopaulo: require('./mockCities/saopaulo').default,
  seoul: require('./mockCities/seoul').default,
  singapore: require('./mockCities/singapore').default,
  sydney: require('./mockCities/sydney').default,
  tokyo: require('./mockCities/tokyo').default,
  toronto: require('./mockCities/toronto').default,
  vegas: require('./mockCities/vegas').default,
  rome: require('./mockCities/rome').default
};

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
