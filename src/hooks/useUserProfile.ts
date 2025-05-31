
import { useState, useEffect } from 'react';
import { MockUserProfile, getUserByHash } from '@/mock/users';
import mockPosts from '@/mock/posts';
import { mockLocations } from '@/mock/locations';

export const vibeTags = [
  'aesthetic', 'vibes', 'foodie', 'nightlife', 'coffee', 'sunset', 'brunch', 'party', 'peaceful'
];

export const useUserProfile = (identifier?: string) => {
  const [userProfile, setUserProfile] = useState<MockUserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (identifier) {
      // Get user based on identifier hash for consistent assignment
      const profile = getUserByHash(identifier);
      setUserProfile(profile);
    }
    setLoading(false);
  }, [identifier]);

  // Mock additional data for user profile
  const user = userProfile;
  const userPosts = mockPosts.filter(post => post.user.username === userProfile?.username);
  const followedVenues = mockLocations.slice(0, 3);

  return {
    userProfile: userProfile!,
    loading,
    setUserProfile,
    user,
    userPosts,
    followedVenues
  };
};
