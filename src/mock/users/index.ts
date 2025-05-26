
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

export { celebrityUsers, regularUsers };
