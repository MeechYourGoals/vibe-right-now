
import { User } from '@/types';
import { regularUsers } from './regularUsers';

export const mockUsers: User[] = regularUsers;

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getUserByUsername = (username: string): User | undefined => {
  return mockUsers.find(user => user.username === username);
};

export const getVerifiedUsers = (): User[] => {
  return mockUsers.filter(user => user.isVerified);
};

export const getRandomUsers = (count: number = 5): User[] => {
  const shuffled = [...mockUsers].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
