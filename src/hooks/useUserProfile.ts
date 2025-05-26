
import { useState, useEffect } from 'react';
import { User } from '@/types';
import { mockUsers } from '@/mock/users';

interface UseUserProfileReturn {
  profile: User;
  followUser: () => void;
  unfollowUser: () => void;
  sendMessage: (message: string) => void;
  toggleVerification: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const useUserProfile = (username: string): UseUserProfileReturn => {
  const [profile, setProfile] = useState<User>(() => {
    const user = mockUsers.find(u => u.username === username);
    return user || {
      id: '1',
      username: username || 'unknown',
      name: 'Unknown User',
      avatar: '/placeholder.svg',
      bio: 'No bio available',
      followersCount: 0,
      followingCount: 0,
      postsCount: 0,
      isVerified: false,
      isCelebrity: false,
      location: 'Unknown',
      createdAt: new Date().toISOString(),
      likesCount: 0
    };
  });

  const followUser = () => {
    setProfile(prev => ({
      ...prev,
      followersCount: (prev.followersCount || 0) + 1
    }));
  };

  const unfollowUser = () => {
    setProfile(prev => ({
      ...prev,
      followersCount: Math.max((prev.followersCount || 0) - 1, 0)
    }));
  };

  const sendMessage = (message: string) => {
    console.log(`Sending message to ${profile.username}: ${message}`);
  };

  const toggleVerification = () => {
    setProfile(prev => ({
      ...prev,
      isVerified: !prev.isVerified
    }));
  };

  const updateProfile = (updates: Partial<User>) => {
    setProfile(prev => ({
      ...prev,
      ...updates
    }));
  };

  return {
    profile,
    followUser,
    unfollowUser,
    sendMessage,
    toggleVerification,
    updateProfile
  };
};

export default useUserProfile;
