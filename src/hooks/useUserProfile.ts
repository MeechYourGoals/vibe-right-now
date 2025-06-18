
import { useState } from 'react';
import { User } from '@/types';

export interface UserProfileStats {
  posts: number;
  followers: number;
  following: number;
}

export const useUserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<UserProfileStats>({
    posts: 0,
    followers: 0,
    following: 0
  });

  const followUser = async (userToFollow: string): Promise<boolean> => {
    try {
      // Mock implementation
      console.log('Following user:', userToFollow);
      
      // Update stats optimistically
      setStats(prev => ({
        ...prev,
        following: prev.following + 1
      }));
      
      return true;
    } catch (error) {
      console.error('Failed to follow user:', error);
      return false;
    }
  };

  const unfollowUser = async (userToUnfollow: string): Promise<boolean> => {
    try {
      // Mock implementation
      console.log('Unfollowing user:', userToUnfollow);
      
      // Update stats optimistically
      setStats(prev => ({
        ...prev,
        following: Math.max(0, prev.following - 1)
      }));
      
      return true;
    } catch (error) {
      console.error('Failed to unfollow user:', error);
      return false;
    }
  };

  const updateBio = async (newBio: string): Promise<boolean> => {
    try {
      if (user) {
        setUser({ ...user, bio: newBio });
      }
      return true;
    } catch (error) {
      console.error('Failed to update bio:', error);
      return false;
    }
  };

  const blockUser = async (userToBlock: string): Promise<boolean> => {
    try {
      console.log('Blocking user:', userToBlock);
      return true;
    } catch (error) {
      console.error('Failed to block user:', error);
      return false;
    }
  };

  const reportUser = async (userToReport: string, reason: string): Promise<boolean> => {
    try {
      console.log('Reporting user:', userToReport, 'for:', reason);
      return true;
    } catch (error) {
      console.error('Failed to report user:', error);
      return false;
    }
  };

  const getUserBio = (): string => {
    return user?.bio || '';
  };

  return {
    user,
    stats,
    followUser,
    unfollowUser,
    updateBio,
    blockUser,
    reportUser,
    getUserBio,
    setUser,
    setStats
  };
};
