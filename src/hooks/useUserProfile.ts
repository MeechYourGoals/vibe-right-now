
import { useState, useEffect } from 'react';
import { MockUserProfile, defaultUserProfiles } from '@/utils/locations/types';

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

export const useUserProfile = (locationId: string): MockUserProfile => {
  const [userProfile, setUserProfile] = useState<MockUserProfile>(() => {
    const hash = simpleHash(locationId);
    const index = hash % defaultUserProfiles.length;
    return defaultUserProfiles[index];
  });

  useEffect(() => {
    const hash = simpleHash(locationId);
    const index = hash % defaultUserProfiles.length;
    setUserProfile(defaultUserProfiles[index]);
  }, [locationId]);

  return userProfile;
};
