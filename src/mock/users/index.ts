
import { User } from '@/types';
import { celebrityUsers } from './celebrityUsers';
import { regularUsers } from './regularUsers';

// Hash function for generating consistent colors
export const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

export const mockUsers: User[] = [
  ...celebrityUsers,
  ...regularUsers.map(user => ({
    ...user,
    isVerified: user.isVerified || false
  }))
];

// Re-export for external use
export { regularUsers, celebrityUsers };

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
