
import { useState, useEffect } from 'react';
import { User } from '@/types';
import { mockUsers } from '@/mock/users';

export const useUserProfile = (userId?: string) => {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!userId) {
          setProfile(null);
          return;
        }

        // Simple hash function to select a consistent user
        const hashCode = (str: string): number => {
          let hash = 0;
          for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
          }
          return Math.abs(hash);
        };

        const userIndex = hashCode(userId) % mockUsers.length;
        const user = mockUsers[userIndex];
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 100));
        
        setProfile(user);
      } catch (err) {
        setError('Failed to fetch user profile');
        console.error('Error fetching user profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  return { profile, loading, error };
};

// Enhanced hook for venue ownership/management
export const useVenueOwnership = (venueId: string, userId?: string) => {
  const [isOwner, setIsOwner] = useState(false);
  const [canManage, setCanManage] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkOwnership = async () => {
      if (!userId || !venueId) {
        setIsOwner(false);
        setCanManage(false);
        setLoading(false);
        return;
      }

      try {
        // Simple hash function for consistent ownership determination
        const hashCode = (str: string): number => {
          let hash = 0;
          for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
          }
          return Math.abs(hash);
        };

        // Combine venue and user IDs to determine ownership
        const ownershipHash = hashCode(venueId + userId);
        const ownership = (ownershipHash % 10) < 3; // 30% chance of ownership
        
        setIsOwner(ownership);
        setCanManage(ownership);
      } catch (error) {
        console.error('Error checking venue ownership:', error);
        setIsOwner(false);
        setCanManage(false);
      } finally {
        setLoading(false);
      }
    };

    checkOwnership();
  }, [venueId, userId]);

  return { isOwner, canManage, loading };
};

// Hook for managing user subscription status
export const useUserSubscription = (userId?: string) => {
  const [subscriptionTier, setSubscriptionTier] = useState<'free' | 'pro' | 'premium'>('free');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSubscription = async () => {
      if (!userId) {
        setSubscriptionTier('free');
        setLoading(false);
        return;
      }

      try {
        // Simple hash function for subscription determination
        const hashCode = (str: string): number => {
          let hash = 0;
          for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
          }
          return Math.abs(hash);
        };

        const subscriptionHash = hashCode(userId);
        const tierValue = subscriptionHash % 10;
        
        if (tierValue < 2) {
          setSubscriptionTier('premium');
        } else if (tierValue < 5) {
          setSubscriptionTier('pro');
        } else {
          setSubscriptionTier('free');
        }
      } catch (error) {
        console.error('Error checking subscription:', error);
        setSubscriptionTier('free');
      } finally {
        setLoading(false);
      }
    };

    checkSubscription();
  }, [userId]);

  return { subscriptionTier, loading };
};

export default useUserProfile;
