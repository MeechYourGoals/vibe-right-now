
import { regularUsers } from './regularUsers';
import { celebrityUsers } from './celebrityUsers';
import { User } from '@/types';

// Combine all user types
const allUsers = [
  ...regularUsers,
  ...celebrityUsers
];

// Get a random user
export const getRandomUser = (): User => {
  const index = Math.floor(Math.random() * allUsers.length);
  return allUsers[index];
};

// Get a user by ID
export const getUserById = (id: string): User | undefined => {
  return allUsers.find(user => user.id === id);
};

// Create a new user (for auth flows)
export const createUser = (userData: Partial<User>): User => {
  return {
    id: `user_${Date.now()}`,
    name: userData.name || 'New User',
    username: userData.username || `user_${Date.now()}`,
    email: userData.email || '',
    bio: userData.bio || '',
    avatar: userData.avatar || '',
    coverPhoto: userData.coverPhoto || '',
    followers: userData.followers || 0,
    following: userData.following || 0,
    posts: userData.posts || 0,
    isVerified: userData.isVerified || false,
    isCelebrity: userData.isCelebrity || false,
    isPrivate: userData.isPrivate || false,
    vibeTags: userData.vibeTags || []
  };
};

// Export all users
export { regularUsers, celebrityUsers };
export const mockUsers = allUsers; // Export as mockUsers for backward compatibility
export default allUsers;
