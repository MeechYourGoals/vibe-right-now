
import { User } from '@/types';

export const celebrityUsers: User[] = [
  {
    id: 'celeb1',
    username: 'gordon_ramsay_official',
    name: 'Gordon Ramsay',
    email: 'gordon@example.com',
    avatar: '/placeholder.svg',
    bio: 'World-renowned chef and restaurateur. Passionate about exceptional dining experiences.',
    verified: true,
    followerCount: 2500000,
    following: 234,
    createdAt: '2020-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'celeb2',
    username: 'anthony_bourdain_legacy',
    name: 'Anthony Bourdain Legacy',
    email: 'anthony@example.com',
    avatar: '/placeholder.svg',
    bio: 'Exploring cultures through food and travel. Adventure awaits in every meal.',
    verified: true,
    followerCount: 1800000,
    following: 189,
    createdAt: '2018-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'celeb3',
    username: 'jamie_oliver',
    name: 'Jamie Oliver',
    email: 'jamie@example.com',
    avatar: '/placeholder.svg',
    bio: 'Chef, author, and food activist. Making good food accessible to everyone.',
    verified: true,
    followerCount: 3200000,
    following: 456,
    createdAt: '2019-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];
