
import { regularUsers } from "./regularUsers";
import { celebrityUsers } from "./celebrityUsers";
import { hashString, generateUserBio } from "./utils";

export type { MockUserProfile } from './types';

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
