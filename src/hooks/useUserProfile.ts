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

  // Function to fetch user profile data
  const fetchUserProfile = (): User | null => {
    if (!username) {
      setError('No username provided');
      setLoading(false);
      return null;
    }

    // Find user in mock data
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

  // Function to fetch user posts
  const fetchUserPosts = (userId: string) => {
    return mockPosts.filter((post) => post.user.id === userId);
  };

  // Function to fetch saved locations
  const fetchSavedLocations = (userId: string) => {
    // In a real app, you would fetch this from an API
    // For now, return a subset of locations as saved
    return mockLocations
      .slice(0, 5)
      .map((location) => ({ ...location, savedAt: new Date().toISOString() }));
  };

  useEffect(() => {
    // Reset states when username changes
    setUser(null);
    setPosts([]);
    setSavedLocations([]);
    setError(null);
    setLoading(true);

    // Using setTimeout to simulate API call delay
    const timer = setTimeout(() => {
      const foundUser = fetchUserProfile();
      
      if (foundUser) {
        setUser(foundUser);
        
        // Fetch related data
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
  };
};
