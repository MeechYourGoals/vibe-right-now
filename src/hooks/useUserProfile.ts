
import { useState, useEffect } from 'react';
import { UserProfile } from '@/types';

interface UserProfileStats {
  postsCount: number;
  followersCount: number;
  followingCount: number;
  placesVisited: number;
}

export const useUserProfile = (userId?: string) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserProfileStats>({
    postsCount: 0,
    followersCount: 0,
    followingCount: 0,
    placesVisited: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    setIsLoading(true);
    // Mock implementation
    setTimeout(() => {
      setProfile({
        id: userId,
        username: 'mockuser',
        email: 'mock@example.com',
        avatar: '/placeholder.svg',
        bio: 'Mock user profile'
      });
      setStats({
        postsCount: 12,
        followersCount: 150,
        followingCount: 89,
        placesVisited: 25
      });
      setIsLoading(false);
    }, 1000);
  }, [userId]);

  const updateProfile = async (data: Partial<UserProfile>) => {
    // Mock update
    if (profile) {
      setProfile({ ...profile, ...data });
    }
  };

  const followVenue = async (venueId: string) => {
    // Mock implementation
    console.log('Following venue:', venueId);
  };

  const unfollowVenue = async (venueId: string) => {
    // Mock implementation
    console.log('Unfollowing venue:', venueId);
  };

  const markAsVisited = async (placeId: string) => {
    // Mock implementation
    console.log('Marked as visited:', placeId);
  };

  const removeFromVisited = async (placeId: string) => {
    // Mock implementation
    console.log('Removed from visited:', placeId);
  };

  const addToWantToVisit = async (placeId: string) => {
    // Mock implementation
    console.log('Added to want to visit:', placeId);
  };

  const removeFromWantToVisit = async (placeId: string) => {
    // Mock implementation
    console.log('Removed from want to visit:', placeId);
  };

  return {
    profile,
    stats,
    isLoading,
    updateProfile,
    followVenue,
    unfollowVenue,
    markAsVisited,
    removeFromVisited,
    addToWantToVisit,
    removeFromWantToVisit
  };
};
