
import { MockUserProfile } from '@/types';

export const MockUserProfile: MockUserProfile = {
  id: '1',
  username: 'johndoe',
  name: 'John Doe',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
  bio: 'Living life one vibe at a time ✨',
  isVerified: true,
  followerCount: 1234,
  followingCount: 567,
  postCount: 89,
  isPrivate: false
};

export const mockUsers: MockUserProfile[] = [
  MockUserProfile,
  {
    id: '2',
    username: 'janedoe',
    name: 'Jane Doe',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    bio: 'Exploring the world 🌍',
    isVerified: false,
    followerCount: 892,
    followingCount: 234,
    postCount: 45,
    isPrivate: false
  }
];
