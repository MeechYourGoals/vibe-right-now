
// Main mock data index file
import mockUsers from "./users";
import { mockLocations } from "./locations";
import mockPosts from "./posts";
import { mockComments } from "./comments";
import { getRecentTime, getExpiryTime } from "./time-utils";
import { cityLocations } from "./cityLocations";

// Export everything so existing imports continue to work
export { 
  mockUsers,
  mockLocations,
  mockPosts,
  mockComments,
  getRecentTime,
  getExpiryTime,
  cityLocations
};
