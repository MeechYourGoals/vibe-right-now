
import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/entities/user';

interface UserStats {
  posts: number;
  followers: number;
  following: number;
  likes: number;
}

export const useUserProfile = (userId?: string) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create a default profile with all required fields
  const defaultProfile: UserProfile = {
    id: userId || '1',
    username: 'defaultuser',
    name: 'Default User',
    avatar: '/api/placeholder/150/150',
    bio: 'Welcome to my profile',
    isPrivate: false,
    verified: false,
    isCelebrity: false,
    followers: 0,
    following: 0,
    posts: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    email: '',
    likes: 0
  };

  const [stats, setStats] = useState<UserStats>({
    posts: 0,
    followers: 0,
    following: 0,
    likes: 0
  });

  useEffect(() => {
    if (userId) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setProfile(defaultProfile);
        setStats({
          posts: 25,
          followers: 1250,
          following: 180,
          likes: 3420
        });
        setLoading(false);
      }, 1000);
    }
  }, [userId]);

  const updateStats = (newStats: Partial<UserStats>) => {
    setStats(prev => ({ ...prev, ...newStats }));
  };

  return {
    profile,
    loading,
    error,
    stats,
    updateStats
  };
};
