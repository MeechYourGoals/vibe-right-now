
import { regularUsers } from "./regularUsers";
import { celebrityUsers } from "./celebrityUsers";

// Define the MockUserProfile type directly here if missing from @/types
export interface MockUserProfile {
  id: string;
  username: string;
  avatar: string;
  bio?: string;
  type?: 'regular' | 'celebrity' | 'venue';
  verified?: boolean;
}

// Mock user profile utility
export const getMockUserProfile = (type: 'regular' | 'celebrity' | 'venue'): MockUserProfile => {
  const collection = type === 'celebrity' ? celebrityUsers : regularUsers;
  const randomIndex = Math.floor(Math.random() * collection.length);
  return {
    ...collection[randomIndex],
    type: type,
    verified: type === 'venue' ? true : collection[randomIndex].verified
  };
};

// Create a combined mockUsers array
export const mockUsers = [...regularUsers, ...celebrityUsers];

// Utility functions
export const hashString = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
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

export { regularUsers, celebrityUsers };
