
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
  displayName?: string;
  posts?: number;
}

export interface UserProfile {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio?: string;
  isPrivate: boolean;
  verified: boolean;
  isCelebrity?: boolean;
  followers: number;
  following: number;
  posts: number;
  createdAt: string;
  updatedAt: string;
}
