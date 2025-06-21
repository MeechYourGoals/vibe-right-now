
import { Location } from '@/types';
import * as cities from '@/data/mockCities';

// Convert city data to location format
const convertToLocations = (cityData: any): Location[] => {
  return cityData.venues.map((venue: any) => ({
    ...venue,
    type: venue.type === 'music' ? 'nightlife' : venue.type as any,
    source: 'mock',
    category: venue.type,
    name: venue.name,
    address: venue.address,
    city: venue.city,
    country: venue.country,
    lat: venue.lat,
    lng: venue.lng,
    createdAt: venue.createdAt || '2024-01-01T00:00:00Z',
    updatedAt: venue.updatedAt || '2024-01-01T00:00:00Z'
  }));
};

export const cityLocations: Record<string, Location[]> = {
  'New York': convertToLocations(cities.nyc),
  'Los Angeles': convertToLocations(cities.la),
  'Chicago': convertToLocations(cities.chicago),
  'Phoenix': convertToLocations(cities.phoenix),
  'Miami': convertToLocations(cities.miami),
  'Las Vegas': convertToLocations(cities.vegas),
  'Toronto': convertToLocations(cities.toronto),
  'Amsterdam': convertToLocations(cities.amsterdam),
  'Paris': convertToLocations(cities.paris),
  'Rome': convertToLocations(cities.rome),
  'Tokyo': convertToLocations(cities.tokyo),
  'Seoul': convertToLocations(cities.seoul),
  'Singapore': convertToLocations(cities.singapore),
  'Sydney': convertToLocations(cities.sydney),
  'São Paulo': convertToLocations(cities.saopaulo),
  'Rio de Janeiro': convertToLocations(cities.riodejaneiro),
  'San Francisco': convertToLocations(cities.sanfrancisco),
  'Melbourne': convertToLocations(cities.melbourne),
  'Mumbai': convertToLocations(cities.mumbai),
  'Moscow': convertToLocations(cities.moscow)
};
