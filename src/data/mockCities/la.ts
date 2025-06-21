
import { CityData } from '@/types';

const la: CityData = {
  name: "Los Angeles",
  state: "CA",
  country: "USA",
  lat: 34.0522,
  lng: -118.2437,
  venues: [
    {
      id: 'la-1',
      name: 'Republique',
      address: '624 S La Brea Ave',
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      lat: 34.0635,
      lng: -118.3431,
      type: 'restaurant',
      rating: 4.4,
      price_level: 3,
      verified: true,
      vibes: ['trendy', 'upscale', 'date-night'],
      business_status: 'OPERATIONAL',
      google_maps_url: 'https://maps.google.com/?cid=12345',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'la-2',
      name: 'Crypto.com Arena',
      address: '1111 S Figueroa St',
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      lat: 34.043,
      lng: -118.267,
      type: 'sports',
      rating: 4.2,
      verified: true,
      vibes: ['energetic', 'sports', 'concerts'],
      business_status: 'OPERATIONAL',
      google_maps_url: 'https://maps.google.com/?cid=67890',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'la-3',
      name: 'Sunset Strip',
      address: '8001 Sunset Blvd',
      city: 'West Hollywood',
      state: 'CA',
      country: 'USA',
      lat: 34.0901,
      lng: -118.3704,
      type: 'bar',
      rating: 4.1,
      price_level: 3,
      verified: true,
      vibes: ['nightlife', 'music', 'iconic'],
      business_status: 'OPERATIONAL',
      google_maps_url: 'https://maps.google.com/?cid=11111',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    }
  ]
};

export default la;
