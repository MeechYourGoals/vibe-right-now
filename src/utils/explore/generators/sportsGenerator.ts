
import { Location } from '@/types';
import { generateBusinessHours } from '@/utils/businessHoursUtils';
import { getMockUserProfile } from '@/mock/users';

export const generateSportsVenues = (city: string, state: string): Location[] => {
  const baseSportsVenues = [
    {
      id: '30',
      name: 'Lakers Arena',
      address: '1111 S Figueroa St',
      city,
      state,
      country: 'US',
      category: 'sports' as const,
      rating: 4.6,
      priceRange: '$$$' as const,
      description: 'Home of the Lakers basketball team',
      amenities: ['Concessions', 'Team Store', 'Premium Seating'],
      vibes: ['🏀 Basketball', '🔥 Lit', '🏆 Champions'],
      lat: 34.0522 + Math.random() * 0.01,
      lng: -118.2437 + Math.random() * 0.01,
      source: 'generated',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      hours: generateBusinessHours({} as Location),
      userProfile: getMockUserProfile('user1')
    },
    {
      id: '32',
      name: 'Dodger Stadium',
      address: '1000 Vin Scully Ave',
      city,
      state,
      country: 'US',
      category: 'sports' as const,
      rating: 4.5,
      priceRange: '$$' as const,
      description: 'Historic baseball stadium',
      amenities: ['Parking', 'Food Courts', 'Stadium Tours'],
      vibes: ['⚾ Baseball', '🏟️ Classic', '🌭 Americana'],
      lat: 34.0522 + Math.random() * 0.01,
      lng: -118.2437 + Math.random() * 0.01,
      source: 'generated',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      hours: generateBusinessHours({} as Location),
      userProfile: getMockUserProfile('user2')
    }
  ];

  return baseSportsVenues;
};
