
import { User } from '@/types';
import { celebrityUsers } from './celebrityUsers';
import { regularUsers } from './regularUsers';

export const mockUsers: User[] = [
  ...celebrityUsers,
  ...regularUsers.map(user => ({
    ...user,
    isVerified: user.isVerified || false
  }))
];

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getUserByUsername = (username: string): User | undefined => {
  return mockUsers.find(user => user.username.toLowerCase() === username.toLowerCase());
};

export const searchUsers = (query: string): User[] => {
  const searchTerm = query.toLowerCase();
  return mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm) ||
    user.username.toLowerCase().includes(searchTerm)
  );
};
