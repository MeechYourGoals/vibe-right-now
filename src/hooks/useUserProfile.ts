
import { useState, useEffect } from "react";
import { mockUsers, MockUserProfile } from "@/mock/users";
import { mockPosts } from "@/mock/posts";
import { mockComments } from "@/mock/comments";
import { mockLocations } from "@/mock/locations";
import { generateUserBio } from "@/mock/users";
import { Post, Comment, Location, User } from "@/types";

export interface UserStats {
  posts: number;
  followers: number;
  following: number;
}

export const useUserProfile = (username?: string) => {
  const [profile, setProfile] = useState<MockUserProfile | null>(null);
  const [stats, setStats] = useState<UserStats>({ posts: 0, followers: 0, following: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Enhanced mock user profile with additional properties
  const createEnhancedProfile = (baseProfile: MockUserProfile): MockUserProfile => {
    return {
      ...baseProfile,
      name: baseProfile.name || baseProfile.username,
      isFollowing: Math.random() > 0.7,
      isPrivate: Math.random() > 0.8,
      posts: Math.floor(Math.random() * 200) + 10,
      followers: Math.floor(Math.random() * 5000) + 100,
      following: Math.floor(Math.random() * 1000) + 50
    };
  };

  useEffect(() => {
    if (!username) {
      setIsLoading(false);
      return;
    }

    const fetchUserProfile = async () => {
      setIsLoading(true);
      setError("");

      try {
        // Find user in mock data
        const foundUser = mockUsers.find(user => user.username === username);
        
        if (foundUser) {
          const enhancedProfile = createEnhancedProfile(foundUser);
          setProfile(enhancedProfile);
          setStats({
            posts: enhancedProfile.posts || 0,
            followers: enhancedProfile.followers || 0,
            following: enhancedProfile.following || 0
          });
        } else {
          setError("User not found");
          setProfile(null);
        }
      } catch (err) {
        setError("Failed to load user profile");
        setProfile(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [username]);

  const toggleFollow = async () => {
    if (!profile) return;
    
    const updatedProfile = {
      ...profile,
      isFollowing: !profile.isFollowing,
      followers: profile.isFollowing 
        ? (profile.followers || 0) - 1 
        : (profile.followers || 0) + 1
    };
    
    setProfile(updatedProfile);
    setStats(prev => ({
      ...prev,
      followers: updatedProfile.followers || 0
    }));
  };

  const updateProfile = async (updates: Partial<MockUserProfile>) => {
    if (!profile) return;
    
    const updatedProfile = { ...profile, ...updates };
    setProfile(updatedProfile);
  };

  // Helper functions for compatibility
  const user = profile;
  const userPosts = profile ? mockPosts.filter(post => post.user.id === profile.id) : [];
  const followedVenues = mockLocations.slice(0, 6);
  const visitedPlaces = mockLocations.slice(0, 8);
  const wantToVisitPlaces = mockLocations.slice(8, 16);
  
  const getPostComments = (postId: string): Comment[] => {
    return mockComments.filter(comment => comment.postId === postId);
  };
  
  const getUserBio = (username: string): string => {
    return generateUserBio(username);
  };
  
  const isPrivateProfile = profile?.isPrivate && !profile?.isFollowing;
  
  const getUserByUsername = (username: string): User => {
    const foundUser = mockUsers.find(user => user.username === username);
    if (!foundUser) {
      throw new Error("User not found");
    }
    return {
      id: foundUser.id,
      username: foundUser.username,
      name: foundUser.name || foundUser.username,
      avatar: foundUser.avatar,
      verified: foundUser.verified || false,
      bio: foundUser.bio
    };
  };

  return {
    profile,
    stats,
    isLoading,
    error,
    toggleFollow,
    updateProfile,
    user,
    userPosts,
    followedVenues,
    visitedPlaces,
    wantToVisitPlaces,
    getPostComments,
    getUserBio,
    isPrivateProfile,
    getUserByUsername
  };
};
