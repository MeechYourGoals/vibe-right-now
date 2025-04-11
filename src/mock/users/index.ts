
import { User } from "@/types";
import { regularUsers } from "./regularUsers";
import { celebrityUsers } from "./celebrityUsers";
import { generateUserBio, hashString, getFeaturedUsers } from "./utils";

// Export users as a named export for consistent imports
export const users = [...regularUsers, ...celebrityUsers];

// Combine all users for backward compatibility (maintain the old export)
export const mockUsers: User[] = users;

// Export everything from the users module
export {
  regularUsers,
  celebrityUsers,
  generateUserBio,
  hashString,
  getFeaturedUsers
};
