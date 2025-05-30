
import { celebrityUsers } from './celebrityUsers';
import { regularUsers } from './regularUsers';

export const mockUsers = [...celebrityUsers, ...regularUsers];

// Helper function to get user by username
export const getUserByUsername = (username: string) => {
  return mockUsers.find(user => user.username === username);
};

// Helper function to check if user is verified
export const isUserVerified = (username: string) => {
  const user = getUserByUsername(username);
  return user?.isVerified || false;
};

// Helper function to get featured users
export const getFeaturedUsers = () => {
  return mockUsers.filter(user => user.isCelebrity || user.isVerified);
};

// Helper function to hash string for deterministic selection
export const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};

// Helper function to get mock user profile
export const getMockUserProfile = (id: string) => {
  return mockUsers.find(user => user.id === id) || mockUsers[0];
};

export { celebrityUsers, regularUsers };
