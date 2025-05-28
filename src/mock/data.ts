
import { regularUsers } from './users/regularUsers';
import { mockLocations } from './locations';
import { mockPosts } from './posts';
import { mockComments } from './comments';

export const mockUsers = regularUsers;
export { mockLocations, mockPosts, mockComments };
export default {
  users: regularUsers,
  locations: mockLocations,
  posts: mockPosts,
  comments: mockComments
};
