
import { useState, useEffect } from 'react';
import { User } from '@/types';
import { mockUsers } from '@/mock/users';

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
        const followers = typeof user.followers === 'number' ? user.followers : parseInt(user.followers as string) || 0;
        const following = typeof user.following === 'number' ? user.following : parseInt(user.following as string) || 0;
        const posts = typeof user.posts === 'number' ? user.posts : parseInt(user.posts as string) || 0;

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
    return [];
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

  return {
    profile,
    loading,
    error,
    followUser,
    unfollowUser,
    updateBio,
    blockUser,
    reportUser,
    getFollowStatus,
    getMutualFollowers,
    getUserPosts,
    getUserStats
  };
};

export default useUserProfile;
