
import { Location } from '@/types';
import { generateBusinessHours } from '@/utils/businessHoursUtils';
import { getMockUserProfile } from '@/mock/users';

export const generateAttractions = (city: string, state: string): Location[] => {
  const baseAttractions = [
    {
      id: '4',
      name: 'Modern Art Museum',
      address: '456 Culture Ave',
      city,
      state,
      country: 'US',
      category: 'attraction' as const,
      rating: 4.6,
      priceRange: '$$' as const,
      description: 'Contemporary art exhibitions and installations',
      amenities: ['Audio Guide', 'Gift Shop', 'Cafe', 'Parking'],
      vibes: ['🎭 Artsy', '📚 Educational', '🌟 Inspiring'],
      lat: 34.0522 + Math.random() * 0.01,
      lng: -118.2437 + Math.random() * 0.01,
      source: 'generated',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      hours: generateBusinessHours({} as Location),
      userProfile: getMockUserProfile('user1')
    },
    {
      id: '8',
      name: 'Christ the Redeemer',
      address: 'Corcovado Mountain',
      city,
      state,
      country: 'US',
      category: 'attraction' as const,
      rating: 4.8,
      priceRange: '$$$' as const,
      description: 'Iconic statue overlooking the city',
      amenities: ['Cable Car', 'Viewing Platform', 'Gift Shop'],
      vibes: ['🙏 Spiritual', '🏔️ Scenic', '📸 Instagram'],
      lat: 34.0522 + Math.random() * 0.01,
      lng: -118.2437 + Math.random() * 0.01,
      source: 'generated',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      hours: generateBusinessHours({} as Location),
      userProfile: getMockUserProfile('user2')
    }
  ];

  return baseAttractions;
};
