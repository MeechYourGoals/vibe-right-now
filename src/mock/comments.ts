
import { Comment } from '@/types';

export const mockComments: Comment[] = [
  {
    id: '1',
    author: {
      id: 'user1',
      username: 'foodie_sarah',
      name: 'Sarah M.',
      avatar: '/placeholder.svg',
      verified: false,
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    content: 'Amazing atmosphere! The vibes were perfect for a date night.',
    timestamp: new Date('2024-01-15T19:30:00Z'),
    likes: 12
  },
  {
    id: '2',
    author: {
      id: 'user2',
      username: 'mike_explorer',
      name: 'Mike R.',
      avatar: '/placeholder.svg',
      verified: false,
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    content: 'Great recommendation! Will definitely visit again.',
    timestamp: new Date('2024-01-14T20:15:00Z'),
    likes: 8
  },
  {
    id: '3',
    author: {
      id: 'user3',
      username: 'travel_jenny',
      name: 'Jenny T.',
      avatar: '/placeholder.svg',
      verified: false,
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    content: 'The service was excellent and the food was outstanding.',
    timestamp: new Date('2024-01-13T18:45:00Z'),
    likes: 15
  },
  {
    id: '4',
    author: {
      id: 'user4',
      username: 'city_wanderer',
      name: 'Alex C.',
      avatar: '/placeholder.svg',
      verified: false,
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    content: 'Perfect spot for meeting friends. Highly recommend!',
    timestamp: new Date('2024-01-12T21:00:00Z'),
    likes: 6
  },
  {
    id: '5',
    author: {
      id: 'user5',
      username: 'nightlife_alex',
      name: 'Alex N.',
      avatar: '/placeholder.svg',
      verified: false,
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    content: 'The energy here is incredible. Best night out in ages!',
    timestamp: new Date('2024-01-11T23:30:00Z'),
    likes: 20
  }
];
