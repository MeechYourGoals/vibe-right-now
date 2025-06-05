
import { useState, useEffect } from 'react';
import { MockUserProfile, defaultUserProfiles } from '@/utils/locations/types';
import { mockUsers } from '@/mock/users';
import { Post, Location, Comment } from '@/types';

// Vibe tags for posts
export const vibeTags = [
  "Cozy", "Family Friendly", "NightOwl", "Trendy", "Chill", 
  "Upscale", "Casual", "Romantic", "Lively", "Intimate",
  "Energetic", "Cultural", "Artistic", "Sophisticated", "Fun"
];

// Simple hash function for consistent user selection
const simpleHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};

export const useUserProfile = (username?: string) => {
  const [userProfile, setUserProfile] = useState<MockUserProfile | null>(null);

  useEffect(() => {
    if (username) {
      // Find user by username
      const foundUser = mockUsers.find(user => user.username === username);
      if (foundUser) {
        setUserProfile(foundUser);
      } else {
        setUserProfile(null);
      }
    }
  }, [username]);

  // Generate mock data for the user
  const generateUserData = () => {
    if (!userProfile) return {};

    const userPosts: Post[] = [];
    const followedVenues: Location[] = [];
    const visitedPlaces: Location[] = [];
    const wantToVisitPlaces: Location[] = [];

    return {
      user: userProfile,
      userPosts,
      followedVenues,
      visitedPlaces,
      wantToVisitPlaces,
      getPostComments: (postId: string): Comment[] => [],
      getUserBio: () => userProfile?.bio || '',
      isPrivateProfile: userProfile?.isPrivate || false
    };
  };

  return generateUserData();
};
