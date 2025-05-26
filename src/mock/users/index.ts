
import { User } from "@/integrations/supabase/types";
import { regularUsers } from "./regularUsers";
import { celebrityUsers } from "./celebrityUsers";

export interface MockUserProfile extends User {
  type: "regular" | "celebrity" | "venue";
  avatar: string;
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

export { regularUsers, celebrityUsers };
