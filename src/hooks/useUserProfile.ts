
import { useState, useEffect } from 'react';
import { User, Post, Location } from '@/types';
import { mockUsers } from '@/mock/users';
import { mockPosts } from '@/mock/posts';
import { mockLocations } from '@/mock/locations';

interface UserProfileData {
  user: User;
  isLoading: boolean;
  error: string;
  followUser: () => void;
  unfollowUser: () => void;
  userPosts: Post[];
  followedVenues: Location[];
  visitedPlaces: Location[];
}

export const useUserProfile = (userId: string): UserProfileData => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [followedVenues, setFollowedVenues] = useState<Location[]>([]);
  const [visitedPlaces, setVisitedPlaces] = useState<Location[]>([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        
        // Find user from mock data
        const foundUser = mockUsers.find(u => u.id === userId);
        
        if (!foundUser) {
          setError('User not found');
          return;
        }
        
        setUser(foundUser);
        
        // Get user's posts
        const userPostsData = mockPosts.filter(post => post.userId === userId);
        setUserPosts(userPostsData);
        
        // Get followed venues (mock data)
        setFollowedVenues(mockLocations.slice(0, 3));
        
        // Get visited places (mock data)
        setVisitedPlaces(mockLocations.slice(0, 5));
        
      } catch (err) {
        setError('Failed to load user profile');
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  const followUser = () => {
    console.log('Following user:', userId);
  };

  const unfollowUser = () => {
    console.log('Unfollowing user:', userId);
  };

  return {
    user: user!,
    isLoading,
    error,
    followUser,
    unfollowUser,
    userPosts,
    followedVenues,
    visitedPlaces
  };
};
