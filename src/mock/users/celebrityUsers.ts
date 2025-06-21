
import { User } from '@/types';

export const celebrityUsers: User[] = [
  {
    id: 'celeb1',
    username: 'gordon_ramsay_official',
    email: 'gordon@example.com',
    avatar: '/placeholder.svg',
    bio: 'World-renowned chef and restaurateur. Passionate about exceptional dining experiences.',
    isVerified: true,
    followerCount: 2500000,
    following: ['user1', 'user2'],
    createdAt: '2020-01-01T00:00:00Z'
  },
  {
    id: 'celeb2',
    username: 'anthony_bourdain_legacy',
    email: 'anthony@example.com',
    avatar: '/placeholder.svg',
    bio: 'Exploring cultures through food and travel. Adventure awaits in every meal.',
    isVerified: true,
    followerCount: 1800000,
    following: ['user3', 'user4'],
    createdAt: '2018-01-01T00:00:00Z'
  },
  {
    id: 'celeb3',
    username: 'jamie_oliver',
    email: 'jamie@example.com',
    avatar: '/placeholder.svg',
    bio: 'Chef, author, and food activist. Making good food accessible to everyone.',
    isVerified: true,
    followerCount: 3200000,
    following: ['user5', 'user6'],
    createdAt: '2019-01-01T00:00:00Z'
  }
];
