
import { useState } from "react";
import { User } from "@/types";

export const vibeTags = [
  "Cozy", "Family Friendly", "NightOwl", "Trendy", "Chill", 
  "Upscale", "Casual", "Romantic", "Lively", "Intimate",
  "Artsy", "Historic", "Modern", "Vintage", "Bohemian",
  "Luxury", "Budget-Friendly", "Pet-Friendly", "Outdoor",
  "Indoor", "Quiet", "Energetic", "Hipster", "Corporate"
];

const useUserProfile = () => {
  const [profile, setProfile] = useState<User>({
    id: "current-user",
    name: "Alex Thompson",
    username: "@alexthompson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    isVerified: false,
    followerCount: 1284,
    followingCount: 892,
    bio: "Coffee enthusiast ☕ | Travel addict ✈️ | Always looking for the next great vibe",
    location: "San Francisco, CA",
    joinedDate: "March 2022",
    website: "alexthompson.com"
  });

  const followUser = () => {
    setProfile(prev => ({
      ...prev,
      followerCount: prev.followerCount ? prev.followerCount + 1 : 1
    }));
  };

  const unfollowUser = () => {
    setProfile(prev => ({
      ...prev,
      followerCount: prev.followerCount ? prev.followerCount - 1 : 0
    }));
  };

  const sendMessage = (message: string) => {
    console.log("Sending message:", message);
  };

  const toggleVerification = () => {
    setProfile(prev => ({
      ...prev,
      isVerified: !prev.isVerified
    }));
  };

  const updateProfile = (updates: Partial<User>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  return {
    profile,
    followUser,
    unfollowUser,
    sendMessage,
    toggleVerification,
    updateProfile
  };
};

export default useUserProfile;
