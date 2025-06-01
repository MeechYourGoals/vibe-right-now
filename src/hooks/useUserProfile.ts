import { useState } from 'react';
import { User } from '@/types';
import { mockUsers } from '@/mock/users';

export const useUserProfile = (userId?: string) => {
  // Simulated user profile data
  const [userProfile, setUserProfile] = useState<User>(() => {
    if (userId) {
      return mockUsers.find(user => user.id === userId) || mockUsers[0];
    }
    return mockUsers[0];
  });

  const updateProfile = (updates: Partial<User>) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  // Simulated followers/following counts
  const followersCount = userProfile.followers || Math.floor(Math.random() * 1000) + 100;
  const followingCount = userProfile.following || Math.floor(Math.random() * 500) + 50;
  const postsCount = userProfile.posts || Math.floor(Math.random() * 200) + 20;

  const stats = {
    posts: postsCount,
    followers: followersCount,
    following: followingCount,
  };

  // Simulated method to follow a user
  const followUser = () => {
    // In a real app, this would update the user's following list and the target's followers list
    console.log(`Following user: ${userProfile.username}`);
  };

  // Simulated method to unfollow a user
  const unfollowUser = () => {
    // In a real app, this would update the user's following list and the target's followers list
    console.log(`Unfollowing user: ${userProfile.username}`);
  };

  return {
    userProfile,
    updateProfile,
    stats,
    followUser,
    unfollowUser
  };
};
