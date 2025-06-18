
import { User } from '@/types';

const currentDate = new Date().toISOString();

export const celebrityUsers: User[] = [
  {
    id: 'celeb-1',
    username: 'djkhaled',
    name: 'DJ Khaled',
    avatar: '/placeholder.svg',
    isCelebrity: true,
    verified: true,
    bio: 'We The Best Music! Producer, DJ, and entrepreneur spreading positivity worldwide.',
    isPrivate: false,
    createdAt: currentDate,
    updatedAt: currentDate
  },
  {
    id: 'celeb-2',
    username: 'vancityreynolds',
    name: 'Ryan Reynolds',
    avatar: '/placeholder.svg',
    isCelebrity: true,
    verified: true,
    bio: 'Actor, producer, and gin enthusiast. Currently owned by my children.',
    isPrivate: false,
    createdAt: currentDate,
    updatedAt: currentDate
  },
  {
    id: 'celeb-3',
    username: 'zendaya',
    name: 'Zendaya',
    avatar: '/placeholder.svg',
    isCelebrity: true,
    verified: true,
    bio: 'Actor and singer. Spider-Man universe resident. Dog mom to Noon.',
    isPrivate: false,
    createdAt: currentDate,
    updatedAt: currentDate
  },
  {
    id: 'celeb-4',
    username: 'therock',
    name: 'Dwayne Johnson',
    avatar: '/placeholder.svg',
    isCelebrity: true,
    verified: true,
    bio: 'Actor, producer, businessman, retired professional wrestler. CEO of @sevenbucksprod',
    isPrivate: false,
    createdAt: currentDate,
    updatedAt: currentDate
  },
  {
    id: 'celeb-5',
    username: 'selenagomez',
    name: 'Selena Gomez',
    avatar: '/placeholder.svg',
    isCelebrity: true,
    verified: true,
    bio: 'Multi-platinum recording artist, actress, producer, entrepreneur, and philanthropist.',
    isPrivate: false,
    createdAt: currentDate,
    updatedAt: currentDate
  }
];
