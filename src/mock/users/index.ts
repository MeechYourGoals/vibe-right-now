
import { User } from "@/types";
import { regularUsers } from "./regularUsers";
import { celebrityUsers } from "./celebrityUsers";

export interface MockUserProfile extends User {
  type: "regular" | "celebrity" | "venue";
}

// Combine all users and add type information
export const mockUsers: MockUserProfile[] = [
  ...regularUsers.map(user => ({
    ...user,
    type: "regular" as const,
    avatar: user.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    isVerified: user.isVerified || false
  })),
  ...celebrityUsers.map(user => ({
    ...user,
    type: "celebrity" as const,
    avatar: user.avatar || "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face",
    isVerified: user.isVerified || false
  }))
];

// Simple hash function to generate a numeric hash from a string
export const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash); // Return absolute value to ensure positive number
};

// Get a mock user profile by index or random
export const getMockUserProfile = (index?: number): MockUserProfile => {
  if (index !== undefined && index < mockUsers.length) {
    return mockUsers[index];
  }
  return mockUsers[Math.floor(Math.random() * mockUsers.length)];
};

export { regularUsers, celebrityUsers };
