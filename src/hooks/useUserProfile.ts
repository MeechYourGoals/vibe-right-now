
import { useState, useEffect } from 'react';
import { User, Post, Location } from '@/types';
import { mockUsers } from '@/mock/users/index';

export const useUserProfile = (userId?: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [followedVenues, setFollowedVenues] = useState<Location[]>([]);
  const [visitedPlaces, setVisitedPlaces] = useState<Location[]>([]);

  useEffect(() => {
    if (userId) {
      const foundUser = mockUsers.find(u => u.id === userId);
      if (foundUser) {
        const userProfile: User = {
          id: foundUser.id,
          username: foundUser.username,
          displayName: foundUser.displayName,
          profileImage: foundUser.profileImage,
          bio: foundUser.bio,
          followersCount: foundUser.followersCount,
          followingCount: foundUser.followingCount,
          isVerified: foundUser.isVerified,
          isPrivate: foundUser.isPrivate,
          joinedDate: foundUser.joinedDate,
          location: foundUser.location,
          website: foundUser.website,
          socialLinks: foundUser.socialLinks
        };
        setUser(userProfile);
      } else {
        setError('User not found');
      }
    }
    setLoading(false);
    setIsLoading(false);
  }, [userId]);

  const followUser = async () => {
    // Mock follow functionality
    console.log('Following user:', userId);
  };

  const unfollowUser = async () => {
    // Mock unfollow functionality
    console.log('Unfollowing user:', userId);
  };

  return {
    user,
    loading,
    isLoading,
    error,
    setUser,
    followUser,
    unfollowUser,
    userPosts,
    followedVenues,
    visitedPlaces
  };
};
