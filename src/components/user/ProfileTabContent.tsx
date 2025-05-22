import React, { useState, useEffect } from 'react';
import { PostCard } from '@/components/post';
import { Post, Comment } from '@/types';
import { mockPosts, mockComments } from '@/mock/data';

interface ProfileTabContentProps {
  userId: string;
}

const ProfileTabContent: React.FC<ProfileTabContentProps> = ({ userId }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Simulate fetching posts for a user
    const userPosts = mockPosts.filter(post => post.userId === userId);
    setPosts(userPosts);
  }, [userId]);

  const getComments = (postId: string): Comment[] => {
    return mockComments.filter(comment => comment.postId === postId);
  };

  // Update the PostCard implementation to fix type issues
  const renderPosts = () => {
    // Simulate fetching posts for a user
    const userPosts = mockPosts.filter(post => post.userId === userId);
    setPosts(userPosts);
    
    return (
      <div className="grid grid-cols-1 gap-4">
        {posts.map(post => (
          <PostCard 
            key={post.id} 
            post={post}
            getComments={getComments}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Posts</h2>
      {renderPosts()}
    </div>
  );
};

export default ProfileTabContent;
