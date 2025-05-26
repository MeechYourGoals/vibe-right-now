
import { useState, useEffect } from 'react';
import { User } from '@/types';

// Export vibeTags for use in other components
export const vibeTags = [
  'Cozy', 'Trendy', 'Upscale', 'Casual', 'Romantic', 'Lively', 'Intimate',
  'Family Friendly', 'NightOwl', 'Chill', 'Energetic', 'Sophisticated',
  'Alternative', 'Hip', 'Classic', 'Modern', 'Artsy', 'Sports', 'Foodie'
];

export const useUserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Mock user data
    const mockUser: User = {
      id: '1',
      username: 'johndoe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format',
      bio: 'Love exploring new places and vibes!',
      verified: true,
      followersCount: 1234,
      followingCount: 567
    };
    
    setUser(mockUser);
  }, []);
  
  return { user, vibeTags };
};
