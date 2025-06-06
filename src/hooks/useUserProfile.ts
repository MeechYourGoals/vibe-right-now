
import { useState, useEffect } from 'react';
import { MockUserProfile, mockUsers } from '@/mock/users';
import { mockPosts } from '@/mock/posts';

export interface UserStats {
  posts: number;
  followers: number;
  following: number;
  totalLikes: number;
  totalComments: number;
}

export const useUserProfile = (userId: string) => {
  const [profile, setProfile] = useState<MockUserProfile | null>(null);
  const [stats, setStats] = useState<UserStats>({
    posts: 0,
    followers: 0,
    following: 0,
    totalLikes: 0,
    totalComments: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        
        // Find user in mock data
        const userProfile = mockUsers.find(user => user.id === userId);
        
        if (!userProfile) {
          setError('User not found');
          return;
        }

        // Ensure the profile has all required properties
        const enhancedProfile: MockUserProfile = {
          ...userProfile,
          name: userProfile.name || userProfile.username,
          isFollowing: userProfile.verified || false,
          isPrivate: false,
          followers: userProfile.followers || 0,
          following: userProfile.following || 0
        };

        setProfile(enhancedProfile);

        // Calculate stats from posts
        const userPosts = mockPosts.filter(post => post.user.id === userId);
        const totalLikes = userPosts.reduce((sum, post) => sum + (typeof post.likes === 'number' ? post.likes : 0), 0);
        const totalComments = userPosts.reduce((sum, post) => sum + (typeof post.comments === 'number' ? post.comments : 0), 0);

        setStats({
          posts: userPosts.length,
          followers: typeof enhancedProfile.followers === 'number' ? enhancedProfile.followers : 0,
          following: typeof enhancedProfile.following === 'number' ? enhancedProfile.following : 0,
          totalLikes,
          totalComments
        });

      } catch (err) {
        setError('Failed to load profile');
        console.error('Error loading user profile:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  const toggleFollow = async () => {
    if (!profile) return;

    try {
      const isCurrentlyFollowing = profile.isFollowing || false;
      const currentFollowers = typeof profile.followers === 'number' ? profile.followers : 0;
      
      const updatedProfile = {
        ...profile,
        isFollowing: !isCurrentlyFollowing,
        followers: isCurrentlyFollowing ? Math.max(0, currentFollowers - 1) : currentFollowers + 1
      };

      setProfile(updatedProfile);
      setStats(prev => ({
        ...prev,
        followers: updatedProfile.followers
      }));

    } catch (err) {
      console.error('Error toggling follow:', err);
      setError('Failed to update follow status');
    }
  };

  const updateProfile = async (updates: Partial<MockUserProfile>) => {
    if (!profile) return;

    try {
      const updatedProfile = { ...profile, ...updates };
      setProfile(updatedProfile);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
    }
  };

  const blockUser = async () => {
    if (!profile) return;

    try {
      // In a real app, this would make an API call
      console.log(`Blocking user ${profile.username}`);
    } catch (err) {
      console.error('Error blocking user:', err);
      setError('Failed to block user');
    }
  };

  const reportUser = async (reason: string) => {
    if (!profile) return;

    try {
      // In a real app, this would make an API call
      console.log(`Reporting user ${profile.username} for: ${reason}`);
    } catch (err) {
      console.error('Error reporting user:', err);
      setError('Failed to report user');
    }
  };

  const getUserPosts = () => {
    if (!profile) return [];
    return mockPosts.filter(post => post.user.id === profile.id);
  };

  const getRecentActivity = () => {
    const userPosts = getUserPosts();
    return userPosts
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5);
  };

  const getMutualConnections = () => {
    // In a real app, this would fetch mutual connections
    return mockUsers.slice(0, 3);
  };

  const canViewProfile = () => {
    if (!profile) return false;
    if (profile.isPrivate && !profile.isFollowing) {
      return false;
    }
    return true;
  };

  const getProfileCompleteness = () => {
    if (!profile) return 0;
    
    let completeness = 0;
    const fields = [
      profile.bio,
      profile.avatar,
      profile.name,
      profile.username
    ];
    
    fields.forEach(field => {
      if (field && field.trim() !== '') {
        completeness += 25;
      }
    });
    
    return completeness;
  };

  const searchUserContent = (query: string) => {
    const userPosts = getUserPosts();
    return userPosts.filter(post => 
      post.content.toLowerCase().includes(query.toLowerCase()) ||
      post.location.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const getUserByUsername = (username: string) => {
    return mockUsers.find(user => user.username.toLowerCase() === username.toLowerCase());
  };

  return {
    profile,
    stats,
    isLoading,
    error,
    toggleFollow,
    updateProfile,
    blockUser,
    reportUser,
    getUserPosts,
    getRecentActivity,
    getMutualConnections,
    canViewProfile,
    getProfileCompleteness,
    searchUserContent,
    getUserByUsername
  };
};
