export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  isPrivate: boolean;
  verified: boolean;
  bio?: string;
  isCelebrity?: boolean;
  createdAt: string;
  updatedAt: string;
}
