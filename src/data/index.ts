
// Import all city data
import amsterdam from './mockCities/amsterdam';
import bangkok from './mockCities/bangkok';
import barcelona from './mockCities/barcelona';
import berlin from './mockCities/berlin';
import chicago from './mockCities/chicago';
import dubai from './mockCities/dubai';
import istanbul from './mockCities/istanbul';
import la from './mockCities/la';
import london from './mockCities/london';
import melbourne from './mockCities/melbourne';
import miami from './mockCities/miami';
import moscow from './mockCities/moscow';
import mumbai from './mockCities/mumbai';
import nyc from './mockCities/nyc';
import paris from './mockCities/paris';
import phoenix from './mockCities/phoenix';
import rio from './mockCities/riodejaneiro';
import sanfrancisco from './mockCities/sanfrancisco';
import saopaulo from './mockCities/saopaulo';
import seoul from './mockCities/seoul';
import singapore from './mockCities/singapore';
import sydney from './mockCities/sydney';
import tokyo from './mockCities/tokyo';
import toronto from './mockCities/toronto';
import vegas from './mockCities/vegas';
import rome from './mockCities/rome';

import { CityData } from '@/types';

// Export individual city data with proper names
export const amsterdamData = amsterdam;
export const bangkokData = bangkok;
export const barcelonaData = barcelona;
export const berlinData = berlin;
export const chicagoData = chicago;
export const dubaiData = dubai;
export const istanbulData = istanbul;
export const laData = la;
export const londonData = london;
export const melbourneData = melbourne;
export const miamiData = miami;
export const moscowData = moscow;
export const mumbaiData = mumbai;
export const nycData = nyc;
export const parisData = paris;
export const phoenixData = phoenix;
export const rioData = rio;
export const sanFranciscoData = sanfrancisco;
export const saoPauloData = saopaulo;
export const seoulData = seoul;
export const singaporeData = singapore;
export const sydneyData = sydney;
export const tokyoData = tokyo;
export const torontoData = toronto;
export const vegasData = vegas;
export const romeData = rome;

// Consolidated city data map
export const CITY_DATA_MAP: Record<string, CityData> = {
  'amsterdam': amsterdam,
  'bangkok': bangkok,
  'barcelona': barcelona,
  'berlin': berlin,
  'chicago': chicago,
  'dubai': dubai,
  'istanbul': istanbul,
  'losangeles': la,
  'la': la,
  'london': london,
  'melbourne': melbourne,
  'miami': miami,
  'moscow': moscow,
  'mumbai': mumbai,
  'newyork': nyc,
  'nyc': nyc,
  'paris': paris,
  'phoenix': phoenix,
  'riodejaneiro': rio,
  'rio': rio,
  'sanfrancisco': sanfrancisco,
  'sf': sanfrancisco,
  'saopaulo': saopaulo,
  'seoul': seoul,
  'singapore': singapore,
  'sydney': sydney,
  'tokyo': tokyo,
  'toronto': toronto,
  'lasvegas': vegas,
  'vegas': vegas,
  'rome': rome
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
