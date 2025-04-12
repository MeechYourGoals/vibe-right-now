
import { User } from "@/types";
import { regularUsers } from "./regularUsers";
import { celebrityUsers } from "./celebrityUsers";
import { generateUserBio, hashString, getFeaturedUsers } from "./utils";

// Combine all users for backward compatibility
export const mockUsers: User[] = [...regularUsers, ...celebrityUsers];

// Export everything from the users module
export {
  regularUsers,
  celebrityUsers,
  generateUserBio,
  hashString,
  getFeaturedUsers
};
