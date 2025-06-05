
import { useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatar: string;
  verified: boolean;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  location: string;
  website: string;
  joinedDate: string;
  isPrivate: boolean;
  isFollowing: boolean;
  isFollowedBy: boolean;
  mutualFollowers: number;
  badges: string[];
  preferences: {
    notifications: boolean;
    privacy: 'public' | 'private' | 'friends';
    location: boolean;
  };
}

const mockUserProfile: UserProfile = {
  id: 'user-123',
  username: 'sarah_chen',
  displayName: 'Sarah Chen',
  bio: 'Exploring the best vibes around the city 🌃 | Food & nightlife enthusiast | NYC',
  avatar: '/placeholder.svg',
  verified: true,
  followersCount: 1250,
  followingCount: 890,
  postsCount: 156,
  location: 'New York, NY',
  website: 'https://sarahchen.com',
  joinedDate: '2023-03-15',
  isPrivate: false,
  isFollowing: false,
  isFollowedBy: false,
  mutualFollowers: 12,
  badges: ['Explorer', 'Foodie', 'Verified'],
  preferences: {
    notifications: true,
    privacy: 'public',
    location: true
  }
};

export const useUserProfile = (userId?: string) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (userId === 'error') {
          throw new Error('User not found');
        }
        
        // Return mock data for now
        setProfile(mockUserProfile);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user profile');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserProfile();
    } else {
      setProfile(mockUserProfile);
      setLoading(false);
    }
  }, [userId]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      if (profile) {
        const updatedProfile = { ...profile, ...updates };
        setProfile(updatedProfile);
        // In a real app, you would make an API call here
        console.log('Profile updated:', updatedProfile);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    }
  };

  const toggleFollow = async () => {
    try {
      if (profile) {
        const newFollowingState = !profile.isFollowing;
        const followerCountChange = newFollowingState ? 1 : -1;
        
        setProfile({
          ...profile,
          isFollowing: newFollowingState,
          followersCount: profile.followersCount + followerCountChange
        });
        
        // In a real app, you would make an API call here
        console.log(`${newFollowingState ? 'Followed' : 'Unfollowed'} user`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle follow');
    }
  };

  const blockUser = async () => {
    try {
      // In a real app, you would make an API call here
      console.log('User blocked');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to block user');
    }
  };

  const reportUser = async (reason: string) => {
    try {
      // In a real app, you would make an API call here
      console.log('User reported for:', reason);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to report user');
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
    toggleFollow,
    blockUser,
    reportUser
  };
};
