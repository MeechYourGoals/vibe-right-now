
import { Location } from '@/types';
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
  { name: "Barcelona", country: "Spain", lat: 41.3851, lng: 2.1734 },
  { name: "Berlin", country: "Germany", lat: 52.52, lng: 13.405 },
  { name: "Rome", country: "Italy", lat: 41.9028, lng: 12.4964 },
  { name: "Dubai", country: "UAE", lat: 25.2048, lng: 55.2708 },
  { name: "Singapore", country: "Singapore", lat: 1.3521, lng: 103.8198 },
  { name: "Seoul", country: "South Korea", lat: 37.5665, lng: 126.9780 },
  { name: "Istanbul", country: "Turkey", lat: 41.0082, lng: 28.9784 },
  { name: "Moscow", country: "Russia", lat: 55.7558, lng: 37.6173 },
  { name: "Mumbai", country: "India", lat: 19.0760, lng: 72.8777 },
  { name: "Rio de Janeiro", country: "Brazil", lat: -22.9068, lng: -43.1729 },
  { name: "São Paulo", country: "Brazil", lat: -23.5505, lng: -46.6333 },
  { name: "Melbourne", country: "Australia", lat: -37.8136, lng: 144.9631 },
  { name: "Toronto", country: "Canada", lat: 43.6532, lng: -79.3832 },
  { name: "Phoenix", state: "AZ", country: "USA", lat: 33.4484, lng: -112.0740 },
  { name: "Las Vegas", state: "NV", country: "USA", lat: 36.1699, lng: -115.1398 }
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
