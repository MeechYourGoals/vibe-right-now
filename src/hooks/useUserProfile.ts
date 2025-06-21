
import { useState, useEffect } from 'react';
import { UserProfileData, UserProfileStats, User, Post, Location, Comment } from '@/types';
import { mockUsers, getUserById, getUserByUsername } from '@/mock/users';
import { mockPosts } from '@/mock/posts';
import { mockComments } from '@/mock/comments';
import { mockLocations } from '@/mock/locations';

export const useUserProfile = (userIdOrUsername?: string) => {
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
    if (userIdOrUsername) {
      setLoading(true);
      
      setTimeout(() => {
        // Try to find user by ID first, then by username
        let user = getUserById(userIdOrUsername);
        if (!user) {
          user = getUserByUsername(userIdOrUsername);
        }
        
        if (user) {
          setProfile(user);
          const posts = mockPosts.filter(p => p.user.id === user.id);
          setUserPosts(posts);
          setStats({
            posts: posts.length,
            followers: user.followers || 0,
            following: user.following || 0,
            likes: posts.reduce((sum, post) => sum + post.likes, 0)
          });
          
          // Get followed venues based on user's followedVenues array
          const userFollowedVenues = user.followedVenues 
            ? mockLocations.filter(loc => user.followedVenues?.includes(loc.id))
            : mockLocations.slice(0, 3);
          setFollowedVenues(userFollowedVenues);
          
          // Get visited places based on user's visitedPlaces array
          const userVisitedPlaces = user.visitedPlaces 
            ? mockLocations.filter(loc => user.visitedPlaces?.includes(loc.id))
            : mockLocations.slice(0, 5);
          setVisitedPlaces(userVisitedPlaces);
          
          // Get want to visit places based on user's wantToVisitPlaces array
          const userWantToVisitPlaces = user.wantToVisitPlaces 
            ? mockLocations.filter(loc => user.wantToVisitPlaces?.includes(loc.id))
            : mockLocations.slice(5, 8);
          setWantToVisitPlaces(userWantToVisitPlaces);
          
          setError(null);
        } else {
          setError('User not found');
          setProfile(null);
        }
        setLoading(false);
      }, 500);
    }
  }, [userIdOrUsername]);

  const followUser = async (userToFollow: string): Promise<boolean> => {
    return true;
  };

  const unfollowUser = async (userToUnfollow: string): Promise<boolean> => {
    return true;
  };

  const getFollowStatus = (userId: string): boolean => {
    return false;
  };

  const getMutualFollowers = (userId: string): User[] => {
    return mockUsers.slice(0, 2);
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

  const updateBio = async (bio: string): Promise<boolean> => {
    return true;
  };

  const blockUser = async (userId: string): Promise<boolean> => {
    return true;
  };

  const reportUser = async (userId: string, reason: string): Promise<boolean> => {
    return true;
  };

  const getUserBio = (userId: string): string => {
    const user = mockUsers.find(u => u.id === userId);
    return user?.bio || '';
  };

  const isPrivateProfile = (userId: string): boolean => {
    const user = mockUsers.find(u => u.id === userId);
    return user?.isPrivate || false;
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
    setStats,
    updateBio,
    blockUser,
    reportUser,
    getUserBio,
    isPrivateProfile
  };
};
