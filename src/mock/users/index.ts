
import { MockUserProfile } from "@/types";
import { regularUsers } from "./regularUsers";
import { celebrityUsers } from "./celebrityUsers";

// Mock user profile utility
export const getMockUserProfile = (type: 'regular' | 'celebrity' | 'venue'): MockUserProfile => {
  const collection = type === 'celebrity' ? celebrityUsers : regularUsers;
  const randomIndex = Math.floor(Math.random() * collection.length);
  return {
    ...collection[randomIndex],
    type: type
  };
};

export { regularUsers, celebrityUsers };
