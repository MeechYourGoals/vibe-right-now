
import { useState } from 'react';
import { User } from '@/types';
import { mockUsers } from '@/mock/users';
import { mockPosts } from '@/mock/posts';
import { mockComments } from '@/mock/comments';
import { mockLocations } from '@/mock/locations';

export const useUserProfile = (userId?: string) => {
  const [userProfile, setUserProfile] = useState<User>(() => {
    if (userId) {
      return mockUsers.find(user => user.id === userId) || mockUsers[0];
    }
    return mockUsers[0];
  });

  const updateProfile = (updates: Partial<User>) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  const followersCount = userProfile.followers || Math.floor(Math.random() * 1000) + 100;
  const followingCount = userProfile.following || Math.floor(Math.random() * 500) + 50;
  const postsCount = userProfile.posts || Math.floor(Math.random() * 200) + 20;

  const stats = {
    posts: postsCount,
    followers: followersCount,
    following: followingCount,
  };

  const followUser = () => {
    console.log(`Following user: ${userProfile.username}`);
  };

  const unfollowUser = () => {
    console.log(`Unfollowing user: ${userProfile.username}`);
  };

  // Add the missing properties for UserProfile page
  const user = userProfile;
  const userPosts = mockPosts.filter(post => post.user.id === userProfile.id);
  const followedVenues = mockLocations.slice(0, 3);
  const visitedPlaces = mockLocations.slice(0, 5);
  const wantToVisitPlaces = mockLocations.slice(5, 10);
  
  const getPostComments = (postId: string) => {
    return mockComments.filter(comment => comment.postId === postId);
  };
  
  const getUserBio = () => userProfile.bio || "No bio available";
  const isPrivateProfile = userProfile.isPrivate || false;

  return {
    userProfile,
    updateProfile,
    stats,
    followUser,
    unfollowUser,
    user,
    userPosts,
    followedVenues,
    visitedPlaces,
    wantToVisitPlaces,
    getPostComments,
    getUserBio,
    isPrivateProfile
  };
};
