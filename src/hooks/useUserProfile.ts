import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Post } from '@/types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ProfileData {
  user: User | null;
  posts: Post[] | null;
  isLoading: boolean;
  error: string | null;
  loadUserData: () => Promise<void>;
}

export const useUserProfile = (username: string | undefined): ProfileData => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const loadUserData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    if (!username) {
      setError('Username is required to load user profile.');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock user data
      const mockUser = {
        id: 'user123',
        name: 'Mock User',
        username: username,
        email: 'mock.user@example.com',
        bio: 'This is a mock user profile.',
        avatar: 'https://i.pravatar.cc/150?img=3',
        coverPhoto: 'https://source.unsplash.com/random/800x300',
        followers: 123,
        following: 456,
        isVerified: true,
        joinedDate: '2023-01-01',
        location: 'Mock City',
        vibeTags: ['mock', 'user', 'test'],
        isCelebrity: false,
      };

      // Mock post data
      const mockPosts = [
        {
          id: 'post1',
          userId: 'user123',
          content: 'Mock post content 1',
          media: ['https://source.unsplash.com/random/600x400'],
          timestamp: new Date().toISOString(),
          likes: 10,
          comments: 2,
          vibeTags: ['mock', 'post'],
        },
        {
          id: 'post2',
          userId: 'user123',
          content: 'Mock post content 2',
          media: ['https://source.unsplash.com/random/600x400'],
          timestamp: new Date().toISOString(),
          likes: 5,
          comments: 1,
          vibeTags: ['mock', 'post'],
        },
      ];

      setUser(mockUser);
      setPosts(mockPosts);
    } catch (err: any) {
      console.error('Failed to load user data:', err);
      setError(err.message || 'Failed to load user data.');
      toast.error('Failed to load user data.');
      navigate('/404');
    } finally {
      setIsLoading(false);
    }
  }, [username, setUser, setPosts, navigate]);

  useEffect(() => {
    if (username) {
      loadUserData();
    }
  }, [username, loadUserData]);

  // Simulate privacy settings
  const isPrivate = false; // Replace with actual logic to fetch privacy settings

  const canViewProfile = user ? true : false;  // Replace logic that used isPrivate

  return {
    user,
    posts,
    isLoading,
    error,
    loadUserData,
  };
};

export default useUserProfile;
