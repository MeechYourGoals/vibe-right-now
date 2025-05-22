import { useState, useEffect } from 'react';
import { mockUsers } from '@/mock/data';
import { User } from '@/types';
import { hashString, generateUserBio } from '@/mock/users';

// Generate vibe tags for a user based on their username
const generateUserVibeTags = (username: string): string[] => {
  const hash = hashString(username);
  
  const allVibeTags = [
    "Foodie", "NightOwl", "Adventurer", "Artsy", "Sporty", 
    "Trendy", "Chill", "Luxe", "Budget", "Family", 
    "Solo", "Romantic", "Outdoorsy", "Cultural", "Local"
  ];
  
  // Select 2-4 tags based on username hash
  const count = 2 + (hash % 3); // 2 to 4 tags
  const selectedTags: string[] = [];
  
  for (let i = 0; i < count; i++) {
    const index = (hash + i * 7) % allVibeTags.length;
    selectedTags.push(allVibeTags[index]);
  }
  
  return selectedTags;
};

const enrichUserProfile = (user: User): User => {
  // If user profile is already complete, return it
  if (user.bio && user.email && user.vibeTags && user.vibeTags.length > 0) {
    return user;
  }
  
  // Otherwise, enrich the profile with generated data
  return {
    ...user,
    bio: user.bio || generateUserBio(user.username),
    email: user.email || `${user.username}@example.com`,
    vibeTags: user.vibeTags || generateUserVibeTags(user.username),
    isVerified: user.isVerified || false, // Changed from verified to isVerified
  };
};

export const useUserProfile = (userId?: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        if (!userId) {
          throw new Error('User ID is required');
        }
        
        // Find user in mock data
        const foundUser = mockUsers.find(u => u.id === userId);
        
        if (!foundUser) {
          throw new Error('User not found');
        }
        
        // Enrich user profile with additional data if needed
        const enrichedUser = enrichUserProfile(foundUser);
        
        setUser(enrichedUser);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, loading, error };
};

export default useUserProfile;
