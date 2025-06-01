
import { useState, useEffect } from 'react';
import { MockUserProfile, Post, Location } from '@/types';
import { mockUsers } from '@/mock/users';
import { mockPosts } from '@/mock/posts';
import { mockLocations } from '@/mock/data';

export const useUserProfile = (username?: string) => {
  const [userProfile, setUserProfile] = useState<MockUserProfile>(mockUsers[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (username) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const user = mockUsers.find(u => u.username === username) || mockUsers[0];
        setUserProfile(user);
        setLoading(false);
      }, 500);
    }
  }, [username]);

  const user = userProfile;
  const userPosts = mockPosts.filter(post => post.userId === userProfile.id);
  const followedVenues = mockLocations.slice(0, 5);

  return {
    userProfile,
    loading,
    setUserProfile,
    user,
    userPosts,
    followedVenues
  };
};
