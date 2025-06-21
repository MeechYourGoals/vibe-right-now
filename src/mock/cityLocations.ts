
import { Location } from '@/types';

// Mock city data structure to match what's expected
const mockCityData = {
  venues: [
    {
      id: 'loc1',
      name: 'The Rooftop Bar',
      type: 'bar',
      address: '123 Main St',
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      lat: 34.0522,
      lng: -118.2437,
      rating: 4.5,
      priceLevel: 3,
      verified: true,
      source: 'mock',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'loc2',
      name: 'Sunset Lounge',
      type: 'nightlife',
      address: '456 Ocean Ave',
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      lat: 34.0522,
      lng: -118.2437,
      rating: 4.2,
      priceLevel: 2,
      verified: false,
      source: 'mock',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    }
  ]
};

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
  'New York': convertToLocations(mockCityData),
  'Los Angeles': convertToLocations(mockCityData),
  'Chicago': convertToLocations(mockCityData),
  'Phoenix': convertToLocations(mockCityData),
  'Miami': convertToLocations(mockCityData),
  'Las Vegas': convertToLocations(mockCityData),
  'Toronto': convertToLocations(mockCityData),
  'Amsterdam': convertToLocations(mockCityData),
  'Paris': convertToLocations(mockCityData),
  'Rome': convertToLocations(mockCityData),
  'Tokyo': convertToLocations(mockCityData),
  'Seoul': convertToLocations(mockCityData),
  'Singapore': convertToLocations(mockCityData),
  'Sydney': convertToLocations(mockCityData),
  'São Paulo': convertToLocations(mockCityData),
  'Rio de Janeiro': convertToLocations(mockCityData),
  'San Francisco': convertToLocations(mockCityData),
  'Melbourne': convertToLocations(mockCityData),
  'Mumbai': convertToLocations(mockCityData),
  'Moscow': convertToLocations(mockCityData)
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
