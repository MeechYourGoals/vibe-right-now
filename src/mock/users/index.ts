
import { regularUsers } from "./regularUsers";
import { celebrityUsers } from "./celebrityUsers";
import { hashString, generateUserBio } from "./utils";

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

export { regularUsers, celebrityUsers, hashString, generateUserBio };
