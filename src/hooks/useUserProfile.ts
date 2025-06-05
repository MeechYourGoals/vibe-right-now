
import { useState, useEffect } from 'react';
import { mockUsers, mockPosts } from '@/mock/data';
import { User, Post } from '@/types';

export const vibeTags = [
  "Chill", "Energetic", "Romantic", "Adventure", "Foodie", "Nightlife", 
  "Cultural", "Sporty", "Artsy", "Social", "Relaxing", "Trendy",
  "Local", "Tourist", "Family", "Date Night", "Girls Night", "Bros Night"
];

const useUserProfile = (username: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [following, setFollowing] = useState<User[]>([]);
  const [followers, setFollowers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = () => {
      setLoading(true);
      
      // Find user by username
      const foundUser = mockUsers.find(u => u.username === username);
      
      if (foundUser) {
        setUser(foundUser);
        
        // Get user's posts
        const userPosts = mockPosts.filter(post => post.user.username === username);
        setPosts(userPosts);
        
        // Generate mock following/followers based on user ID
        const userId = parseInt(foundUser.id) || 1;
        const followingCount = 50 + (userId % 150);
        const followersCount = 100 + (userId % 300);
        
        // Generate following list
        const mockFollowing = mockUsers
          .filter(u => u.username !== username)
          .slice(0, Math.min(followingCount, mockUsers.length - 1));
        setFollowing(mockFollowing);
        
        // Generate followers list (different subset)
        const mockFollowers = mockUsers
          .filter(u => u.username !== username)
          .slice(1, Math.min(followersCount + 1, mockUsers.length));
        setFollowers(mockFollowers);
      }
      
      setLoading(false);
    };

    fetchUserProfile();
  }, [username]);

  const followUser = (targetUser: User) => {
    setFollowing(prev => [...prev, targetUser]);
  };

  const unfollowUser = (targetUserId: string) => {
    setFollowing(prev => prev.filter(u => u.id !== targetUserId));
  };

  const isFollowing = (targetUserId: string) => {
    return following.some(u => u.id === targetUserId);
  };

  return {
    user,
    posts,
    following,
    followers,
    loading,
    followUser,
    unfollowUser,
    isFollowing
  };
};

export default useUserProfile;
