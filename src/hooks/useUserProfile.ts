
import { useState, useEffect } from 'react';
import { UserProfileData, UserProfileStats, User, Post, Location, Comment } from '@/types';
import { mockUsers } from '@/mock/users';
import { mockPosts } from '@/mock/posts';
import { mockComments } from '@/mock/comments';
import { mockLocations } from '@/mock/locations';

export const useUserProfile = (userId?: string) => {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [followedVenues, setFollowedVenues] = useState<Location[]>([]);
  const [visitedPlaces, setVisitedPlaces] = useState<Location[]>([]);
  const [wantToVisitPlaces, setWantToVisitPlaces] = useState<Location[]>([]);
  const [stats, setStats] = useState<UserProfileStats>({
    posts: 0,
    followers: 0,
    following: 0,
    likes: 0
  });

  useEffect(() => {
    if (userId) {
      // Simulate loading
      setLoading(true);
      
      setTimeout(() => {
        const user = mockUsers.find(u => u.id === userId);
        if (user) {
          setProfile(user);
          const posts = mockPosts.filter(p => p.user.id === userId);
          setUserPosts(posts);
          setStats({
            posts: posts.length,
            followers: user.followers || 0,
            following: user.following || 0,
            likes: posts.reduce((sum, post) => sum + post.likes, 0)
          });
          setFollowedVenues(mockLocations.slice(0, 3));
          setVisitedPlaces(mockLocations.slice(0, 5));
          setWantToVisitPlaces(mockLocations.slice(5, 8));
        } else {
          setError('User not found');
        }
        setLoading(false);
      }, 500);
    }
  }, [userId]);

  const followUser = async (userToFollow: string): Promise<boolean> => {
    // Mock implementation
    return true;
  };

  const unfollowUser = async (userToUnfollow: string): Promise<boolean> => {
    // Mock implementation
    return true;
  };

  const getFollowStatus = (userId: string): boolean => {
    return false; // Mock implementation
  };

  const getMutualFollowers = (userId: string): User[] => {
    return mockUsers.slice(0, 2); // Mock implementation
  };

  const getUserPosts = (userId: string): Post[] => {
    return mockPosts.filter(p => p.user.id === userId);
  };

  const getUserStats = (userId: string): UserProfileStats => {
    const posts = getUserPosts(userId);
    const user = mockUsers.find(u => u.id === userId);
    return {
      posts: posts.length,
      followers: user?.followers || 0,
      following: user?.following || 0,
      likes: posts.reduce((sum, post) => sum + post.likes, 0)
    };
  };

  const getPostComments = (postId: string): Comment[] => {
    return mockComments.filter(c => c.postId === postId);
  };

  return {
    profile,
    loading,
    error,
    userPosts,
    followedVenues,
    visitedPlaces,
    wantToVisitPlaces,
    stats,
    followUser,
    unfollowUser,
    getFollowStatus,
    getMutualFollowers,
    getUserPosts,
    getUserStats,
    getPostComments,
    setStats
  };
};
