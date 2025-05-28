
import { regularUsers } from './users/regularUsers';
import { mockLocations } from './locations';
import { mockPosts } from './posts';

export const mockUsers = regularUsers;
export { mockLocations, mockPosts };
export default {
  users: regularUsers,
  locations: mockLocations,
  posts: mockPosts
};
