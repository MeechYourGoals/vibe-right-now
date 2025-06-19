
import { Location } from '@/types';

export const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Rooftop Bar Barcelona',
    address: 'Plaça de Catalunya, 21, 08002 Barcelona, Spain',
    coordinates: [41.3874, 2.1686],
    category: 'Rooftop Bar',
    rating: 4.5,
    images: ['/api/placeholder/400/300'],
    city: 'Barcelona',
    country: 'Spain',
    lat: 41.3874,
    lng: 2.1686,
    type: 'bar',
    verified: true,
    vibes: ['trendy', 'rooftop', 'sunset'],
    tags: ['cocktails', 'views', 'nightlife'],
    hours: {
      monday: '6:00 PM - 2:00 AM',
      tuesday: '6:00 PM - 2:00 AM',
      wednesday: '6:00 PM - 2:00 AM',
      thursday: '6:00 PM - 2:00 AM',
      friday: '6:00 PM - 3:00 AM',
      saturday: '6:00 PM - 3:00 AM',
      sunday: '6:00 PM - 2:00 AM'
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T12:00:00Z'
  },
  {
    id: '2',
    name: 'Mediterranean Bistro',
    address: 'Carrer de Balmes, 150, 08008 Barcelona, Spain',
    coordinates: [41.3948, 2.1637],
    category: 'Restaurant',
    rating: 4.7,
    images: ['/api/placeholder/400/300'],
    city: 'Barcelona',
    country: 'Spain',
    lat: 41.3948,
    lng: 2.1637,
    type: 'restaurant',
    verified: true,
    vibes: ['romantic', 'upscale', 'mediterranean'],
    tags: ['seafood', 'wine', 'fine dining'],
    hours: {
      monday: '12:00 PM - 11:00 PM',
      tuesday: '12:00 PM - 11:00 PM',
      wednesday: '12:00 PM - 11:00 PM',
      thursday: '12:00 PM - 11:00 PM',
      friday: '12:00 PM - 12:00 AM',
      saturday: '12:00 PM - 12:00 AM',
      sunday: '12:00 PM - 11:00 PM'
    },
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-16T10:30:00Z'
  }
];
