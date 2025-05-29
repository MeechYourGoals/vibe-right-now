
import { Location } from '@/types';

export interface CityCoordinates {
  [key: string]: {
    name: string;
    lat: number;
    lng: number;
    state: string;
  };
}

export const cityCoordinates: CityCoordinates = {
  'los-angeles': {
    name: 'Los Angeles',
    lat: 34.0522,
    lng: -118.2437,
    state: 'CA'
  },
  'new-york': {
    name: 'New York',
    lat: 40.7128,
    lng: -74.0060,
    state: 'NY'
  },
  'chicago': {
    name: 'Chicago',
    lat: 41.8781,
    lng: -87.6298,
    state: 'IL'
  },
  'miami': {
    name: 'Miami',
    lat: 25.7617,
    lng: -80.1918,
    state: 'FL'
  },
  'san-francisco': {
    name: 'San Francisco',
    lat: 37.7749,
    lng: -122.4194,
    state: 'CA'
  }
};

export const generateLocationData = (city: string, state: string): Location[] => {
  // Generate mock location data
  return [
    {
      id: '1',
      name: 'Sample Location',
      address: '123 Main St',
      city,
      state,
      country: 'US',
      lat: 34.0522,
      lng: -118.2437,
      category: 'restaurant',
      source: 'generated',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];
};

export const searchLocations = (query: string, locations: Location[]): Location[] => {
  return locations.filter(location => 
    location.name.toLowerCase().includes(query.toLowerCase()) ||
    location.address.toLowerCase().includes(query.toLowerCase())
  );
};

export const generateCityLocations = (cityKey: string): Location[] => {
  const cityData = cityCoordinates[cityKey];
  if (!cityData) return [];
  
  return generateLocationData(cityData.name, cityData.state);
};

export const generateAllCityLocations = (): Location[] => {
  const allLocations: Location[] = [];
  
  Object.keys(cityCoordinates).forEach(cityKey => {
    const cityLocs = generateCityLocations(cityKey);
    allLocations.push(...cityLocs);
  });
  
  return allLocations;
};
