
import { useState, useEffect } from 'react';
import { User, Post, Location } from '@/types';

interface UserProfileStats {
  postsCount: number;
  followersCount: number;
  followingCount: number;
  placesVisited: number;
}

export const useUserProfile = (username: string) => {
  const [profile, setProfile] = useState<User | null>(null);
  const [stats, setStats] = useState<UserProfileStats>({
    postsCount: 0,
    followersCount: 0,
    followingCount: 0,
    placesVisited: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [followedVenues, setFollowedVenues] = useState<Location[]>([]);
  const [visitedPlaces, setVisitedPlaces] = useState<Location[]>([]);
  const [wantToVisitPlaces, setWantToVisitPlaces] = useState<Location[]>([]);

  useEffect(() => {
    if (!username) return;

    setLoading(true);
    setError(null);
    
    // Mock implementation
    setTimeout(() => {
      if (username === 'party_queen') {
        setProfile({
          id: 'user_sophie',
          username: 'party_queen',
          name: 'Sophie Garcia',
          avatar: '/placeholder.svg',
          verified: true,
          bio: 'Nightlife connoisseur and music lover. Finding the best clubs, festivals, and dance floors wherever I go. 🎵🕺',
          createdAt: '2023-08-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        });
        setStats({
          postsCount: 42,
          followersCount: 354000,
          followingCount: 234,
          placesVisited: 89
        });
      } else {
        setProfile({
          id: username,
          username: username,
          name: username.replace('_', ' '),
          avatar: '/placeholder.svg',
          verified: false,
          bio: 'Mock user profile',
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        });
        setStats({
          postsCount: 12,
          followersCount: 150,
          followingCount: 89,
          placesVisited: 25
        });
      }
      setLoading(false);
    }, 1000);
  }, [username]);

  const followUser = async (userToFollow: string): Promise<boolean> => {
    console.log('Following user:', userToFollow);
    return true;
  };

  const unfollowUser = async (userToUnfollow: string): Promise<boolean> => {
    console.log('Unfollowing user:', userToUnfollow);
    return true;
  };

  const updateBio = async (newBio: string): Promise<boolean> => {
    if (profile) {
      setProfile({ ...profile, bio: newBio });
    }
    return true;
  };

  const blockUser = async (userToBlock: string): Promise<boolean> => {
    console.log('Blocking user:', userToBlock);
    return true;
  };

  const reportUser = async (userToReport: string, reason: string): Promise<boolean> => {
    console.log('Reporting user:', userToReport, 'for:', reason);
    return true;
  };

  const getFollowStatus = (userId: string): boolean => {
    return false; // Mock implementation
  };

  const getMutualFollowers = (userId: string): User[] => {
    return []; // Mock implementation
  };

  const getUserPosts = (userId: string): Post[] => {
    return userPosts;
  };

  const getUserStats = (userId: string): UserProfileStats => {
    return stats;
  };

  const getPostComments = (postId: string) => {
    return []; // Mock implementation
  };

  const getUserBio = (userId: string): string => {
    return profile?.bio || '';
  };

  const isPrivateProfile = (userId: string): boolean => {
    return false; // Mock implementation
  };

  return {
    profile,
    stats,
    loading,
    error,
    userPosts,
    followedVenues,
    visitedPlaces,
    wantToVisitPlaces,
    followUser,
    unfollowUser,
    updateBio,
    blockUser,
    reportUser,
    getFollowStatus,
    getMutualFollowers,
    getUserPosts,
    getUserStats,
    getPostComments,
    getUserBio,
    isPrivateProfile
  };
};
