
import { Location } from '@/types';
import { generateBusinessHours } from '@/utils/businessHoursUtils';
import { getMockUserProfile } from '@/mock/users';

export const generateBars = (city: string, state: string): Location[] => {
  const baseBars = [
    {
      id: '1',
      name: 'Sunset Lounge',
      address: '123 Main St',
      city,
      state,
      country: 'US',
      category: 'bar' as const,
      rating: 4.5,
      priceRange: '$$$' as const,
      description: 'Rooftop bar with stunning sunset views',
      amenities: ['Happy Hour', 'Live Music', 'Outdoor Seating'],
      vibes: ['🌅 Sunset', '🍸 Classy', '🎵 Vibes'],
      lat: 34.0522 + Math.random() * 0.01,
      lng: -118.2437 + Math.random() * 0.01,
      source: 'generated',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      hours: generateBusinessHours({} as Location),
      userProfile: getMockUserProfile('user1')
    },
    {
      id: '5',
      name: 'Skyline Rooftop',
      address: '789 High St',
      city,
      state,
      country: 'US',
      category: 'bar' as const,
      rating: 4.7,
      priceRange: '$$$$' as const,
      description: 'Premium rooftop experience with city views',
      amenities: ['VIP Sections', 'Craft Cocktails', '360° Views'],
      vibes: ['🏙️ Skyline', '💎 Bougie', '🌃 Chill'],
      lat: 34.0522 + Math.random() * 0.01,
      lng: -118.2437 + Math.random() * 0.01,
      source: 'generated',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      hours: generateBusinessHours({} as Location),
      userProfile: getMockUserProfile('user2')
    }
  ];

  return baseBars;
};
