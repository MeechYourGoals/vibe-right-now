
import { Location } from '@/types';
import { CityCoordinates } from './types';

// Import all city data
import nyc from '@/data/mockCities/nyc';
import la from '@/data/mockCities/la';
import london from '@/data/mockCities/london';
import chicago from '@/data/mockCities/chicago';
import miami from '@/data/mockCities/miami';
import sanfrancisco from '@/data/mockCities/sanfrancisco';
import paris from '@/data/mockCities/paris';
import tokyo from '@/data/mockCities/tokyo';
import sydney from '@/data/mockCities/sydney';
import barcelona from '@/data/mockCities/barcelona';
import berlin from '@/data/mockCities/berlin';
import amsterdam from '@/data/mockCities/amsterdam';
import rome from '@/data/mockCities/rome';
import dubai from '@/data/mockCities/dubai';
import singapore from '@/data/mockCities/singapore';
import bangkok from '@/data/mockCities/bangkok';
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
  { name: "London", country: "UK", lat: 51.5074, lng: -0.1278 },
  { name: "Chicago", state: "IL", country: "USA", lat: 41.8781, lng: -87.6298 },
  { name: "Miami", state: "FL", country: "USA", lat: 25.7617, lng: -80.1918 },
  { name: "San Francisco", state: "CA", country: "USA", lat: 37.7749, lng: -122.4194 },
  { name: "Paris", country: "France", lat: 48.8566, lng: 2.3522 },
  { name: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503 },
  { name: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093 },
  { name: "Barcelona", country: "Spain", lat: 41.3851, lng: 2.1734 }
];

// All mock cities
const allCities = [
  nyc, la, london, chicago, miami, sanfrancisco, paris, tokyo, 
  sydney, barcelona, berlin, amsterdam, rome, dubai, singapore,
  bangkok, seoul, istanbul, moscow, mumbai, riodejaneiro, 
  saopaulo, melbourne, toronto, phoenix, vegas
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
