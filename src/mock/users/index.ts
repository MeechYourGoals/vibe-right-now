
import { regularUsers } from './regularUsers';

export const mockUsers = regularUsers;
export { regularUsers };
export default regularUsers;

// Add missing export for backward compatibility
export const getMockUserProfile = (userId: string) => {
  return regularUsers.find(user => user.id === userId);
};
