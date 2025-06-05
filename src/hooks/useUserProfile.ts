
import { useState, useEffect } from 'react';
import { mockUsers, MockUserProfile } from '@/mock/users';

// Simple hash function for deterministic user selection
export const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};

export const useUserProfile = (userId?: string) => {
  const [userProfile, setUserProfile] = useState<MockUserProfile | null>(null);

  useEffect(() => {
    if (userId) {
      // Convert string ID to number for hash calculation
      const numericId = parseInt(userId) || hashString(userId);
      const userIndex = numericId % mockUsers.length;
      setUserProfile(mockUsers[userIndex]);
    } else {
      setUserProfile(null);
    }
  }, [userId]);

  return { userProfile };
};

// Hook for getting venue profile
export const useVenueProfile = (venueId?: string) => {
  const [venueProfile, setVenueProfile] = useState<MockUserProfile | null>(null);

  useEffect(() => {
    if (venueId) {
      // For venues, we use a different subset of users or create venue-specific profiles
      const venueUsers = mockUsers.filter(user => user.type === 'venue');
      if (venueUsers.length > 0) {
        const numericId = parseInt(venueId) || hashString(venueId);
        const venueIndex = numericId % venueUsers.length;
        setVenueProfile(venueUsers[venueIndex]);
      } else {
        // Fallback to regular users if no venue users available
        const numericId = parseInt(venueId) || hashString(venueId);
        const userIndex = numericId % mockUsers.length;
        setVenueProfile({
          ...mockUsers[userIndex],
          type: 'venue',
          name: `${mockUsers[userIndex].name} Venue`,
          bio: 'Amazing venue in the heart of the city'
        });
      }
    } else {
      setVenueProfile(null);
    }
  }, [venueId]);

  return { venueProfile };
};

// Hook for getting multiple user profiles (for lists, etc.)
export const useMultipleUserProfiles = (userIds: string[]) => {
  const [userProfiles, setUserProfiles] = useState<MockUserProfile[]>([]);

  useEffect(() => {
    if (userIds.length > 0) {
      const profiles = userIds.map(userId => {
        const numericId = parseInt(userId) || hashString(userId);
        const userIndex = numericId % mockUsers.length;
        return mockUsers[userIndex];
      });
      setUserProfiles(profiles);
    } else {
      setUserProfiles([]);
    }
  }, [userIds]);

  return { userProfiles };
};

// Hook for getting random user profiles (for suggestions, etc.)
export const useRandomUserProfiles = (count: number, seed?: string) => {
  const [randomProfiles, setRandomProfiles] = useState<MockUserProfile[]>([]);

  useEffect(() => {
    const seedValue = seed ? hashString(seed) : Date.now();
    const profiles: MockUserProfile[] = [];
    
    for (let i = 0; i < count && i < mockUsers.length; i++) {
      const index = (seedValue + i) % mockUsers.length;
      profiles.push(mockUsers[index]);
    }
    
    setRandomProfiles(profiles);
  }, [count, seed]);

  return { randomProfiles };
};

// Hook for celebrity user profiles
export const useCelebrityProfiles = () => {
  const [celebrityProfiles, setCelebrityProfiles] = useState<MockUserProfile[]>([]);

  useEffect(() => {
    const celebrities = mockUsers.filter(user => user.isCelebrity);
    setCelebrityProfiles(celebrities);
  }, []);

  return { celebrityProfiles };
};

// Hook for getting a user profile by username
export const useUserProfileByUsername = (username?: string) => {
  const [userProfile, setUserProfile] = useState<MockUserProfile | null>(null);

  useEffect(() => {
    if (username) {
      const foundUser = mockUsers.find(user => user.username === username);
      if (foundUser) {
        setUserProfile(foundUser);
      } else {
        // Fallback: generate a user based on username hash
        const numericId = hashString(username);
        const userIndex = numericId % mockUsers.length;
        setUserProfile({
          ...mockUsers[userIndex],
          username: username
        });
      }
    } else {
      setUserProfile(null);
    }
  }, [username]);

  return { userProfile };
};

// Function to get user by username (direct function)
export const getUserByUsername = (username: string): MockUserProfile | null => {
  const foundUser = mockUsers.find(user => user.username === username);
  if (foundUser) {
    return foundUser;
  }
  
  // Fallback: generate a user based on username hash
  const numericId = hashString(username);
  const userIndex = numericId % mockUsers.length;
  return {
    ...mockUsers[userIndex],
    username: username
  };
};

export default useUserProfile;
