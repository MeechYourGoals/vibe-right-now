
import { useState, useEffect } from 'react';
import { User } from '@/types';

export const useUserProfile = (username: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Generate a consistent user profile based on username
        const userId = username.toLowerCase().replace(/[^a-z0-9]/g, '');
        const seed = hashString(userId);
        
        const mockUser: User = {
          id: userId,
          username: username,
          name: generateName(username),
          avatar: `https://i.pravatar.cc/150?u=${username}`,
          bio: generateBio(username),
          verified: (seed % 10) === 0, // 10% chance of being verified
          followers: Math.floor((seed % 10000) + 100), // 100-10099 followers
          following: Math.floor((seed % 500) + 50), // 50-549 following
          posts: Math.floor((seed % 200) + 10), // 10-209 posts
          type: (seed % 20) === 0 ? 'celebrity' : 'regular', // 5% chance of celebrity
          isCelebrity: (seed % 20) === 0,
          isPrivate: (seed % 8) === 0 // 12.5% chance of private
        };
        
        setUser(mockUser);
      } catch (err) {
        setError('Failed to load user profile');
        console.error('Error fetching user profile:', err);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUserProfile();
    }
  }, [username]);

  return { user, loading, error };
};

// Helper functions
const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};

const generateName = (username: string): string => {
  const firstNames = ['Alex', 'Jamie', 'Taylor', 'Jordan', 'Casey', 'Riley', 'Morgan', 'Avery', 'Quinn', 'Sage'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  
  const seed = hashString(username);
  const firstName = firstNames[seed % firstNames.length];
  const lastName = lastNames[Math.floor(seed / 10) % lastNames.length];
  
  return `${firstName} ${lastName}`;
};

const generateBio = (username: string): string => {
  const bios = [
    'Living life one vibe at a time ✨',
    'Explorer of hidden gems 🔍',
    'Always ready for the next adventure 🌟',
    'Capturing moments that matter 📸',
    'Chasing sunsets and good vibes 🌅',
    'Food lover and city explorer 🍕',
    'Making memories everywhere I go 💫',
    'Life is better with friends 👥',
    'Adventure awaits! 🗺️',
    'Finding magic in everyday moments ✨'
  ];
  
  const seed = hashString(username);
  return bios[seed % bios.length];
};

// Safe follower count calculation
export const calculateFollowerCount = (userId: string): number => {
  const seed = hashString(userId);
  return Math.floor((seed % 10000) + 100);
};

// Safe stats calculation for profiles
export const calculateUserStats = (userId: string) => {
  const seed = hashString(userId);
  return {
    followers: Math.floor((seed % 10000) + 100),
    following: Math.floor((seed % 500) + 50),
    posts: Math.floor((seed % 200) + 10)
  };
};

// For venue profiles
export const generateVenueProfile = (venueId: string) => {
  const seed = hashString(venueId);
  return {
    followers: Math.floor((seed % 5000) + 500), // 500-5499 followers
    checkins: Math.floor((seed % 10000) + 1000), // 1000-10999 checkins
    posts: Math.floor((seed % 100) + 20) // 20-119 posts
  };
};

export default useUserProfile;
