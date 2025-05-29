
import { Location } from '@/types';

export const generateLocationData = (city: string, state: string): Location[] => {
  const baseLocations: Location[] = [
    {
      id: '1',
      name: 'Downtown Bistro',
      address: '123 Main Street',
      city,
      state,
      country: 'US',
      lat: 34.0522 + Math.random() * 0.01,
      lng: -118.2437 + Math.random() * 0.01,
      category: 'restaurant',
      rating: 4.5,
      priceRange: '$$',
      description: 'Cozy downtown restaurant with modern cuisine',
      amenities: ['WiFi', 'Outdoor Seating', 'Parking'],
      vibes: ['🍽️ Foodie', '✨ Trendy', '🌆 Urban'],
      source: 'generated',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Rooftop Lounge',
      address: '456 High Street',
      city,
      state,
      country: 'US',
      lat: 34.0522 + Math.random() * 0.01,
      lng: -118.2437 + Math.random() * 0.01,
      category: 'bar',
      rating: 4.2,
      priceRange: '$$$',
      description: 'Stunning city views from our rooftop bar',
      amenities: ['Live Music', 'Happy Hour', 'VIP Area'],
      vibes: ['🌃 Nightlife', '🍸 Classy', '🎵 Music'],
      source: 'generated',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  return baseLocations;
};

export const searchLocationsByCategory = (category: string, locations: Location[]): Location[] => {
  if (category === 'all') return locations;
  return locations.filter(location => location.category === category);
};

export const filterLocationsByVibes = (vibes: string[], locations: Location[]): Location[] => {
  if (vibes.length === 0) return locations;
  return locations.filter(location => 
    location.vibes && location.vibes.some(vibe => 
      vibes.some(selectedVibe => vibe.toLowerCase().includes(selectedVibe.toLowerCase()))
    )
  );
};
