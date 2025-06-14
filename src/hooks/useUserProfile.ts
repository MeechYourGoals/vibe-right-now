
import { useState, useEffect } from 'react';
import { User, Post, Location, Comment } from '@/types';
import { mockUsers } from '@/mock/users';
import { mockPosts } from '@/mock/posts';
import { mockLocations } from '@/mock/locations';

interface UserProfile extends User {
  totalPosts: number;
  totalFollowers: number;
  totalFollowing: number;
  engagementRate: string;
  averageLikes: number;
  topVibes: string[];
  joinedDate: string;
}

export const useUserProfile = (username: string) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        
        // Find user from mock data
        const user = mockUsers.find(u => u.username === username);
        
        if (!user) {
          setError('User not found');
          return;
        }

        // Convert string values to numbers for calculations
        const followers = typeof user.followers === 'number' ? user.followers : parseInt(String(user.followers)) || 0;
        const following = typeof user.following === 'number' ? user.following : parseInt(String(user.following)) || 0;
        const posts = typeof user.posts === 'number' ? user.posts : parseInt(String(user.posts)) || 0;

        // Generate enhanced profile data
        const enhancedProfile: UserProfile = {
          ...user,
          id: user.id,
          username: user.username,
          name: user.name,
          avatar: user.avatar,
          bio: user.bio || `${user.name} is exploring the world one vibe at a time 🌟`,
          verified: user.verified || false,
          followers,
          following,
          posts,
          totalPosts: posts,
          totalFollowers: followers,
          totalFollowing: following,
          engagementRate: '4.2%',
          averageLikes: Math.floor(Math.random() * 200) + 50,
          topVibes: ['nightlife', 'foodie', 'adventure'],
          joinedDate: '2023-03-15'
        };

        setProfile(enhancedProfile);
      } catch (err) {
        console.error('Error loading profile:', err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      loadProfile();
    }
  }, [username]);

  // Mock user posts - filter posts by user
  const userPosts = mockPosts.filter(post => post.user.username === username);
  
  // Mock followed venues
  const followedVenues = mockLocations.slice(0, 5);
  
  // Mock visited places
  const visitedPlaces = mockLocations.slice(0, 8);
  
  // Mock want to visit places
  const wantToVisitPlaces = mockLocations.slice(8, 15);

  const followUser = async (userToFollow: string) => {
    if (!profile) return;

    try {
      // In a real app, this would make an API call
      const updatedProfile = {
        ...profile,
        totalFollowers: profile.totalFollowers + 1
      };
      
      setProfile(updatedProfile);
      return true;
    } catch (err) {
      console.error('Error following user:', err);
      return false;
    }
  };

  const unfollowUser = async (userToUnfollow: string) => {
    if (!profile) return;

    try {
      // In a real app, this would make an API call
      const updatedProfile = {
        ...profile,
        totalFollowers: Math.max(0, profile.totalFollowers - 1)
      };
      
      setProfile(updatedProfile);
      return true;
    } catch (err) {
      console.error('Error unfollowing user:', err);
      return false;
    }
  };

  const updateBio = async (newBio: string) => {
    if (!profile) return;

    try {
      // In a real app, this would make an API call
      const updatedProfile = {
        ...profile,
        bio: newBio
      };
      
      setProfile(updatedProfile);
      return true;
    } catch (err) {
      console.error('Error updating bio:', err);
      return false;
    }
  };

  const blockUser = async (userToBlock: string) => {
    try {
      // In a real app, this would make an API call
      console.log(`Blocking user: ${userToBlock}`);
      return true;
    } catch (err) {
      console.error('Error blocking user:', err);
      return false;
    }
  };

  const reportUser = async (userToReport: string, reason: string) => {
    try {
      // In a real app, this would make an API call
      console.log(`Reporting user: ${userToReport} for: ${reason}`);
      return true;
    } catch (err) {
      console.error('Error reporting user:', err);
      return false;
    }
  };

  const getFollowStatus = (currentUserId: string, targetUserId: string) => {
    // In a real app, this would check the actual follow relationship
    return Math.random() > 0.5; // Random for demo
  };

  const getMutualFollowers = (currentUserId: string, targetUserId: string) => {
    // In a real app, this would fetch mutual followers
    const mutualCount = Math.floor(Math.random() * 50);
    return {
      count: mutualCount,
      users: mockUsers.slice(0, Math.min(3, mutualCount))
    };
  };

  const getUserPosts = (userId: string) => {
    // In a real app, this would fetch user's posts
    return userPosts;
  };

  const getUserStats = (userId: string) => {
    if (!profile) return null;

    return {
      totalPosts: profile.totalPosts,
      totalFollowers: profile.totalFollowers,
      totalFollowing: profile.totalFollowing,
      engagementRate: profile.engagementRate,
      averageLikes: profile.averageLikes,
      topVibes: profile.topVibes,
      joinedDate: profile.joinedDate
    };
  };

  const getPostComments = (postId: string): Comment[] => {
    // Mock comments for posts
    return [];
  };

  const getUserBio = (userId: string): string => {
    return profile?.bio || '';
  };

  const isPrivateProfile = false; // Mock - in real app this would be based on user settings

  return {
    // Main profile data (renamed from 'user' to 'profile' for consistency)
    profile,
    user: profile, // Keep 'user' for backward compatibility
    loading,
    error,
    
    // User content
    userPosts,
    followedVenues,
    visitedPlaces,
    wantToVisitPlaces,
    
    // User actions
    followUser,
    unfollowUser,
    updateBio,
    blockUser,
    reportUser,
    
    // User relationships
    getFollowStatus,
    getMutualFollowers,
    
    // User data getters
    getUserPosts,
    getUserStats,
    getPostComments,
    getUserBio,
    
    // User settings
    isPrivateProfile
  };
};

export default useUserProfile;
