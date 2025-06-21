
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
  'New York': convertToLocations(cities.nycData),
  'Los Angeles': convertToLocations(cities.laData),
  'Chicago': convertToLocations(cities.chicagoData),
  'Phoenix': convertToLocations(cities.phoenixData),
  'Miami': convertToLocations(cities.miamiData),
  'Las Vegas': convertToLocations(cities.vegasData),
  'Toronto': convertToLocations(cities.torontoData),
  'Amsterdam': convertToLocations(cities.amsterdamData),
  'Paris': convertToLocations(cities.parisData),
  'Rome': convertToLocations(cities.romeData),
  'Tokyo': convertToLocations(cities.tokyoData),
  'Seoul': convertToLocations(cities.seoulData),
  'Singapore': convertToLocations(cities.singaporeData),
  'Sydney': convertToLocations(cities.sydneyData),
  'São Paulo': convertToLocations(cities.saoPauloData),
  'Rio de Janeiro': convertToLocations(cities.rioData),
  'San Francisco': convertToLocations(cities.sanFranciscoData),
  'Melbourne': convertToLocations(cities.melbourneData),
  'Mumbai': convertToLocations(cities.mumbaiData),
  'Moscow': convertToLocations(cities.moscowData)
};

// Get nearby locations based on coordinates
export const getNearbyLocations = (lat: number, lng: number): Location[] => {
  // Simple distance calculation to find nearest city
  const cities = Object.keys(cityLocations);
  let nearestCity = 'Los Angeles'; // default
  
  // For simplicity, just return locations from a default city
  // In a real app, you'd calculate actual distances
  return cityLocations[nearestCity] || [];
};

// Get trending locations for a specific city
export const getTrendingLocationsForCity = (cityName: string): Location[] => {
  const locations = cityLocations[cityName];
  if (!locations) return [];
  
  // Return first 3 locations as "trending"
  return locations.slice(0, 3);
};
