import { useState, useEffect } from 'react';
import { User } from '@/types';
import { mockUsers } from '@/mock/users';
import { mockLocations } from '@/mock/locations';
import { mockPosts } from '@/mock/posts';

export const useUserProfile = (username: string | undefined) => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [savedLocations, setSavedLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userPosts = posts;
  const followedVenues = savedLocations.slice(0, 3);
  const visitedPlaces = savedLocations;
  const wantToVisitPlaces = savedLocations.slice(0, 2);
  const getPostComments = () => posts.flatMap(post => post.comments || []);
  const getUserBio = () => user?.bio || '';
  const isPrivateProfile = false;  // Default value, adjust as needed

  const fetchUserProfile = (): User | null => {
    if (!username) {
      setError('No username provided');
      setLoading(false);
      return null;
    }

    const foundUser = mockUsers.find(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    );

    if (!foundUser) {
      setError('User not found');
      setLoading(false);
      return null;
    }

    return foundUser;
  };

  const fetchUserPosts = (userId: string) => {
    return mockPosts.filter((post) => post.user.id === userId);
  };

  const fetchSavedLocations = (userId: string) => {
    return mockLocations
      .slice(0, 5)
      .map((location) => ({ ...location, savedAt: new Date().toISOString() }));
  };

  useEffect(() => {
    setUser(null);
    setPosts([]);
    setSavedLocations([]);
    setError(null);
    setLoading(true);

    const timer = setTimeout(() => {
      const foundUser = fetchUserProfile();
      
      if (foundUser) {
        setUser(foundUser);
        
        const userPosts = fetchUserPosts(foundUser.id);
        const userSavedLocations = fetchSavedLocations(foundUser.id);
        
        setPosts(userPosts);
        setSavedLocations(userSavedLocations);
      }
      
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [username]);

  return {
    user,
    posts,
    savedLocations,
    loading,
    error,
    userPosts,
    followedVenues,
    visitedPlaces,
    wantToVisitPlaces,
    getPostComments,
    getUserBio,
    isPrivateProfile
  };
};
