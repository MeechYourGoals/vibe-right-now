
import { User } from "@/types";

export const regularUsers: User[] = [
  {
    id: "1",
    username: "sarah_k",
    displayName: "Sarah Kim",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&q=80&auto=format&fit=crop",
    bio: "Coffee enthusiast & night owl 🌙",
    followersCount: 1250,
    followingCount: 890,
    isVerified: false,
    isPrivate: false,
    joinedDate: "2023-01-15",
    location: "Los Angeles, CA",
    postsCount: 142,
    // Legacy compatibility
    name: "Sarah Kim",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&q=80&auto=format&fit=crop"
  },
  {
    id: "2", 
    username: "mike_downtown",
    displayName: "Mike Rodriguez",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80&auto=format&fit=crop",
    bio: "Exploring the city one vibe at a time",
    followersCount: 850,
    followingCount: 432,
    isVerified: false,
    isPrivate: false,
    joinedDate: "2023-03-22",
    location: "Downtown LA",
    postsCount: 89,
    name: "Mike Rodriguez",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80&auto=format&fit=crop"
  },
  {
    id: "3",
    username: "alex_vibes",
    displayName: "Alex Chen",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80&auto=format&fit=crop",
    bio: "Music lover & photographer 📸🎵",
    followersCount: 2100,
    followingCount: 1200,
    isVerified: true,
    isPrivate: false,
    joinedDate: "2022-11-08",
    location: "Hollywood, CA",
    postsCount: 256,
    name: "Alex Chen",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80&auto=format&fit=crop"
  },
  {
    id: "4",
    username: "jenny_foodie",
    displayName: "Jenny Park",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80&auto=format&fit=crop",
    bio: "Foodie adventures & late night discoveries",
    followersCount: 1890,
    followingCount: 756,
    isVerified: false,
    isPrivate: false,
    joinedDate: "2023-02-14",
    location: "West Hollywood, CA",
    postsCount: 178,
    name: "Jenny Park",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80&auto=format&fit=crop"
  },
  {
    id: "5",
    username: "carlos_night",
    displayName: "Carlos Rivera",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80&auto=format&fit=crop",
    bio: "Nightlife connoisseur 🍸✨",
    followersCount: 3200,
    followingCount: 890,
    isVerified: true,
    isPrivate: false,
    joinedDate: "2022-08-30",
    location: "Beverly Hills, CA",
    postsCount: 312,
    name: "Carlos Rivera",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80&auto=format&fit=crop"
  }
];

export const celebrityUsers: User[] = [
  {
    id: "celeb1",
    username: "djskywalker",
    displayName: "DJ Skywalker",
    profileImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&q=80&auto=format&fit=crop",
    bio: "Grammy-nominated DJ 🎧 Spinning the best vibes",
    followersCount: 2500000,
    followingCount: 1200,
    isVerified: true,
    isPrivate: false,
    joinedDate: "2021-05-10",
    location: "Los Angeles, CA",
    postsCount: 1840,
    name: "DJ Skywalker",
    avatar: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&q=80&auto=format&fit=crop"
  }
];

export const hashString = (str: string): number => {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};
