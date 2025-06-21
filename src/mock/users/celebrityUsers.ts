
import { User } from '@/types';

export const celebrityUsers: User[] = [
  {
    id: 'celeb1',
    username: 'gordon_ramsay_official',
    name: 'Gordon Ramsay',
    avatar: '/placeholder.svg',
    bio: 'World-renowned chef and restaurateur. Passionate about exceptional dining experiences.',
    verified: true,
    createdAt: '2020-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'celeb2',
    username: 'anthony_bourdain_legacy',
    name: 'Anthony Bourdain Legacy',
    avatar: '/placeholder.svg',
    bio: 'Exploring cultures through food and travel. Adventure awaits in every meal.',
    verified: true,
    createdAt: '2018-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'celeb3',
    username: 'jamie_oliver',
    name: 'Jamie Oliver',
    avatar: '/placeholder.svg',
    bio: 'Chef, author, and food activist. Making good food accessible to everyone.',
    verified: true,
    createdAt: '2019-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];
