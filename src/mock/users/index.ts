
import { regularUsers } from "./regularUsers";
import { celebrityUsers } from "./celebrityUsers";
import { diverseUsers } from "./diverseUsers";

// Define the MockUserProfile type directly here if missing from @/types
export interface MockUserProfile {
  id: string;
  username: string;
  avatar: string;
  bio?: string;
  name: string;
  type?: 'regular' | 'celebrity' | 'venue';
  verified?: boolean;
  followers?: number;
  following?: number;
  posts?: number;
}

// Create a combined mockUsers array with all user types
export const mockUsers = [...regularUsers, ...celebrityUsers, ...diverseUsers];

// Mock user profile utility
export const getMockUserProfile = (type: 'regular' | 'celebrity' | 'venue'): MockUserProfile => {
  const collection = type === 'celebrity' ? celebrityUsers : regularUsers;
  const randomIndex = Math.floor(Math.random() * collection.length);
  const user = collection[randomIndex];
  return {
    ...user,
    name: user.name || user.username,
    type: type,
    verified: type === 'venue' ? true : collection[randomIndex].verified
  };
};

// Helper function to get user by ID consistently
export const getUserById = (id: string) => {
  return mockUsers.find(user => user.id === id);
};

// Helper function to get user by username consistently
export const getUserByUsername = (username: string) => {
  return mockUsers.find(user => user.username === username);
};

// Utility functions
export const hashString = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString();
};

export const generateUserBio = (username: string): string => {
  const bios = [
    `${username} vibes everywhere ✨`,
    `Living my best life one vibe at a time 🌟`,
    `Exploring the world through amazing vibes 🌎`,
    `Collecting memories and good vibes 📸`,
    `Just here for the vibes and good times 🎉`
  ];
  const hash = hashString(username);
  return bios[parseInt(hash) % bios.length];
};

export { regularUsers, celebrityUsers, diverseUsers };
