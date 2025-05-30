
import { useState, useEffect } from 'react';
import { User } from '@/types';

export const useUserProfile = (username?: string) => {
  const [user, setUser] = useState<User>(() => ({
    id: '1',
    username: 'johndoe',
    displayName: 'John Doe',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    bio: 'Living my best life in the city! 🌟',
    followersCount: 1250,
    followingCount: 890,
    isVerified: false,
    isPrivate: false,
    joinedDate: '2023-01-15',
    location: 'New York, NY'
  }));

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const followUser = () => {
    setUser(prev => ({
      ...prev,
      followersCount: prev.followersCount + 1
    }));
  };

  const unfollowUser = () => {
    setUser(prev => ({
      ...prev,
      followersCount: Math.max(0, prev.followersCount - 1)
    }));
  };

  return {
    user,
    isLoading,
    error,
    followUser,
    unfollowUser
  };
};
