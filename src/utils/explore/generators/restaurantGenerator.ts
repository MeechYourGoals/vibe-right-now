
import { Location } from '@/types';
import { generateBusinessHours } from '@/utils/businessHoursUtils';
import { getMockUserProfile } from '@/mock/users';

export const generateRestaurants = (city: string, state: string): Location[] => {
  const baseRestaurants = [
    {
      id: '2',
      name: 'Artisan Coffee',
      address: '456 Coffee Blvd',
      city,
      state,
      country: 'US',
      category: 'restaurant' as const,
      rating: 4.3,
      priceRange: '$$' as const,
      description: 'Specialty coffee and artisan pastries',
      amenities: ['WiFi', 'Outdoor Seating', 'Vegan Options'],
      vibes: ['☕ Coffee', '📖 Study', '🌱 Organic'],
      lat: 34.0522 + Math.random() * 0.01,
      lng: -118.2437 + Math.random() * 0.01,
      source: 'generated',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      hours: generateBusinessHours({} as Location),
      userProfile: getMockUserProfile('user1')
    },
    {
      id: '11',
      name: "Mama's Fish House",
      address: '799 Poho Pl',
      city,
      state,
      country: 'US',
      category: 'restaurant' as const,
      rating: 4.8,
      priceRange: '$$$$' as const,
      description: 'Fresh seafood with ocean views',
      amenities: ['Ocean View', 'Fresh Fish', 'Romantic Setting'],
      vibes: ['🐟 Fresh', '🌊 Ocean', '🌮 Foodie'],
      lat: 34.0522 + Math.random() * 0.01,
      lng: -118.2437 + Math.random() * 0.01,
      source: 'generated',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      hours: generateBusinessHours({} as Location),
      userProfile: getMockUserProfile('user2')
    }
  ];

  return baseRestaurants;
};
