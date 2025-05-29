
import { Location } from '@/types';

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
