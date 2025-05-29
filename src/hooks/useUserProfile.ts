import { useState } from 'react';
import { User } from '@/types';

export interface UserProfile extends User {
  // Additional profile properties can be added here
}

export const useUserProfile = () => {
  const [user, setUser] = useState<UserProfile>({
    id: '1',
    name: 'John Doe',
    username: 'johndoe',
    bio: 'Love exploring new places and vibes!',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    coverPhoto: 'https://source.unsplash.com/1200x400/?city',
    followers: 1250,
    following: 890,
    isVerified: true,
    joinedDate: '2023-01-15',
    location: 'San Francisco, CA',
    vibeTags: ['Trendy', 'Foodie', 'NightOwl', 'Artsy']
  });

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  return {
    user,
    updateProfile,
    isLoading: false,
    error: null
  };
};

// Named export for vibeTags
export const vibeTags = [
  "Chill",
  "Lively", 
  "Upscale",
  "Casual",
  "Romantic",
  "Family-Friendly",
  "Trendy",
  "Historic",
  "Artsy",
  "Outdoorsy",
  "Sporty",
  "Foodie",
  "NightOwl",
  "EarlyBird",
  "Pet-Friendly",
  "StudentHangout",
  "BusinessCasual",
  "LGBTQ-Friendly",
  "LiveMusic",
  "Quiet",
  "Bustling",
  "Intimate",
  "Scenic",
  "Hipster",
  "Retro",
  "Local",
  "Touristy"
];

export default useUserProfile;
