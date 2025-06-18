
import { User } from '@/types';

const currentDate = new Date().toISOString();

export const regularUsers: User[] = [
  {
    id: 'user-1',
    username: 'alexchen',
    name: 'Alex Chen',
    avatar: '/placeholder.svg',
    isPrivate: false,
    verified: true,
    bio: 'Coffee enthusiast and weekend explorer. Always looking for the next great vibe.',
    createdAt: currentDate,
    updatedAt: currentDate
  },
  {
    id: 'user-2',
    username: 'sarahj',
    name: 'Sarah Johnson',
    avatar: '/placeholder.svg',
    isPrivate: false,
    verified: true,
    bio: 'Digital nomad sharing hidden gems around the world.',
    createdAt: currentDate,
    updatedAt: currentDate
  },
  {
    id: 'user-3',
    username: 'mikerg',
    name: 'Mike Rodriguez',
    avatar: '/placeholder.svg',
    isPrivate: false,
    verified: true,
    bio: 'Foodie, photographer, and nightlife connoisseur.',
    createdAt: currentDate,
    updatedAt: currentDate
  },
  {
    id: 'user-4',
    username: 'emilyw',
    name: 'Emily Wang',
    avatar: '/placeholder.svg',
    isPrivate: false,
    verified: true,
    bio: 'Tech professional by day, salsa dancer by night.',
    createdAt: currentDate,
    updatedAt: currentDate
  },
  {
    id: 'user-5',
    username: 'davidm',
    name: 'David Martinez',
    avatar: '/placeholder.svg',
    isPrivate: false,
    verified: true,
    bio: 'Local music scene enthusiast and vinyl collector.',
    createdAt: currentDate,
    updatedAt: currentDate
  },
  {
    id: 'user-6',
    username: 'jessicak',
    name: 'Jessica Kim',
    avatar: '/placeholder.svg',
    isPrivate: true,
    verified: false,
    createdAt: currentDate,
    updatedAt: currentDate
  },
  {
    id: 'user-7',
    username: 'ryant',
    name: 'Ryan Thompson',
    avatar: '/placeholder.svg',
    isPrivate: false,
    verified: false,
    createdAt: currentDate,
    updatedAt: currentDate
  },
  {
    id: 'user-8',
    username: 'lisal',
    name: 'Lisa Lee',
    avatar: '/placeholder.svg',
    isPrivate: true,
    verified: false,
    createdAt: currentDate,
    updatedAt: currentDate
  },
  {
    id: 'user-9',
    username: 'chriss',
    name: 'Chris Smith',
    avatar: '/placeholder.svg',
    isPrivate: false,
    verified: false,
    createdAt: currentDate,
    updatedAt: currentDate
  },
  {
    id: 'user-10',
    username: 'amandab',
    name: 'Amanda Brown',
    avatar: '/placeholder.svg',
    isPrivate: true,
    verified: false,
    createdAt: currentDate,
    updatedAt: currentDate
  },
  {
    id: 'user-11',
    username: 'kevinl',
    name: 'Kevin Liu',
    avatar: '/placeholder.svg',
    isPrivate: false,
    verified: false,
    createdAt: currentDate,
    updatedAt: currentDate
  },
  {
    id: 'user-12',
    username: 'rachelg',
    name: 'Rachel Green',
    avatar: '/placeholder.svg',
    isPrivate: true,
    verified: false,
    createdAt: currentDate,
    updatedAt: currentDate
  },
  {
    id: 'user-13',
    username: 'tomh',
    name: 'Tom Harris',
    avatar: '/placeholder.svg',
    isPrivate: false,
    verified: false,
    createdAt: currentDate,
    updatedAt: currentDate
  },
  {
    id: 'user-14',
    username: 'jennyd',
    name: 'Jenny Davis',
    avatar: '/placeholder.svg',
    isPrivate: true,
    verified: false,
    createdAt: currentDate,
    updatedAt: currentDate
  },
  {
    id: 'user-15',
    username: 'markw',
    name: 'Mark Wilson',
    avatar: '/placeholder.svg',
    isPrivate: false,
    verified: false,
    createdAt: currentDate,
    updatedAt: currentDate
  }
];
