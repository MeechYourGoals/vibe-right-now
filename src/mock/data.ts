
// Main mock data index file
import { users } from "./users";
import { venues } from "./venues";
import { posts } from "./posts";
import { comments } from "./comments";
import { getRecentTime, getExpiryTime } from "./time-utils";
import { cityLocations } from "./cityLocations";

// Export everything so existing imports continue to work
export { 
  users as mockUsers,
  venues as mockLocations,
  posts as mockPosts,
  comments as mockComments,
  getRecentTime,
  getExpiryTime,
  cityLocations
};
