import { useState, useEffect } from 'react';
import { mockUsers, mockPosts, comments } from '@/mock/data';
import { User, Post, Comment } from '@/types';

interface UserProfile {
  user: User | null;
  posts: Post[];
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const useUserProfile = (userId: string): UserProfile => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [userComments, setUserComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        // Simulate API call
        setTimeout(() => {
          const foundUser = mockUsers.find((u) => u.id === userId) || null;
          const userPosts = mockPosts.filter((post) => post.user.id === userId);
          const userCommentsForPosts = comments.filter(comment => userPosts.some(post => post.id === comment.postId));

          setUser(foundUser);
          setPosts(userPosts);
          setUserComments(userCommentsForPosts);
          setLoading(false);
        }, 500);
      } catch (e: any) {
        setError(e.message || "Failed to fetch user profile");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  return {
    user,
    posts,
    comments: userComments,
    loading,
    error,
  };
};

export default useUserProfile;
