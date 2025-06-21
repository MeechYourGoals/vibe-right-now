
import { Location } from '@/types';

export const amsterdamLocations: Location[] = [
  {
    id: 'amsterdam-1',
    name: 'Anne Frank House',
    address: 'Prinsengracht 263-267',
    city: 'Amsterdam',
    country: 'Netherlands',
    zip: '1016 GV',
    lat: 52.3752,
    lng: 4.8840,
    type: 'attraction',
    verified: true,
    rating: 4.5,
    vibes: ['historic', 'educational', 'moving'],
    tags: ['museum', 'history', 'world-war-ii'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'amsterdam-2',
    name: 'Café de Reiger',
    address: 'Nieuwe Leliestraat 34',
    city: 'Amsterdam',
    country: 'Netherlands',
    zip: '1015 SZ',
    lat: 52.3676,
    lng: 4.8883,
    type: 'restaurant',
    verified: true,
    rating: 4.3,
    vibes: ['cozy', 'local', 'traditional'],
    tags: ['dutch-cuisine', 'neighborhood'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'amsterdam-3',
    name: 'Café Central',
    address: 'Lange Nieuwstraat 62',
    city: 'Amsterdam',
    country: 'Netherlands',
    zip: '2011 JV',
    lat: 52.3702,
    lng: 4.8952,
    type: 'bar',
    verified: true,
    rating: 4.1,
    vibes: ['brown-cafe', 'authentic', 'local'],
    tags: ['beer', 'traditional'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];
