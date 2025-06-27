
import { Location } from '@/types/entities/venue';
import { CityCoordinates } from './types';

// Import all city data
import nyc from '@/data/mockCities/nyc';
import la from '@/data/mockCities/la';
import sanfrancisco from '@/data/mockCities/sanfrancisco';
import sydney from '@/data/mockCities/sydney';
import barcelona from '@/data/mockCities/barcelona';
import berlin from '@/data/mockCities/berlin';
import rome from '@/data/mockCities/rome';
import dubai from '@/data/mockCities/dubai';
import singapore from '@/data/mockCities/singapore';
import seoul from '@/data/mockCities/seoul';
import istanbul from '@/data/mockCities/istanbul';
import moscow from '@/data/mockCities/moscow';
import mumbai from '@/data/mockCities/mumbai';
import riodejaneiro from '@/data/mockCities/riodejaneiro';
import saopaulo from '@/data/mockCities/saopaulo';
import melbourne from '@/data/mockCities/melbourne';
import toronto from '@/data/mockCities/toronto';
import phoenix from '@/data/mockCities/phoenix';
import vegas from '@/data/mockCities/vegas';

// City coordinates for location generation
export const cityCoordinates: CityCoordinates[] = [
  { name: "New York", state: "NY", country: "USA", lat: 40.7128, lng: -74.0060 },
  { name: "Los Angeles", state: "CA", country: "USA", lat: 34.0522, lng: -118.2437 },
  { name: "San Francisco", state: "CA", country: "USA", lat: 37.7749, lng: -122.4194 },
  { name: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093 },
  { name: "Barcelona", country: "Spain", lat: 41.3851, lng: 2.1734 }
];

// All mock cities
const allCities = [
  nyc,
  la,
  sanfrancisco,
  sydney,
  barcelona,
  berlin,
  rome,
  dubai,
  singapore,
  seoul,
  istanbul,
  moscow,
  mumbai,
  riodejaneiro,
  saopaulo,
  melbourne,
  toronto,
  phoenix,
  vegas
];

// Generate locations for a specific city
export const generateCityLocations = (cityName: string): Location[] => {
  const city = allCities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
  return city ? city.venues : [];
};

// Generate all locations from all cities
export const generateAllCityLocations = (): Location[] => {
  return allCities.reduce((allLocations: Location[], city) => {
    return [...allLocations, ...city.venues];
  }, []);
};

export type { CityCoordinates };
