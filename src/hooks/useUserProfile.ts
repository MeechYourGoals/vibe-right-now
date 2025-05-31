
import { useState, useEffect } from 'react';
import { MockUserProfile, getUserByHash } from '@/mock/users';

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

  return {
    userProfile,
    loading,
    setUserProfile
  };
};
