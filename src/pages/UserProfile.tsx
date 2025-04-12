
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileTabs from '@/components/user/ProfileTabs';
import UserProfileHeader from '@/components/user/UserProfileHeader';
import { Container } from '@/components/ui/container';
import useUserProfile from '@/hooks/useUserProfile';
import { comments } from '@/mock/data';

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user, posts, loading, error } = useUserProfile(userId || "");
  
  const [activeTab, setActiveTab] = useState('posts');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');

  // Function to get comments for a post
  const getCommentsForPost = (postId: string) => {
    return comments.filter(comment => comment.postId === postId);
  };

  // Function to get user bio
  const getUserBio = () => {
    if (!user) return "";
    
    return user.isCelebrity 
      ? "Official account. Sharing my favorite spots and vibes around the world!" 
      : "Exploring hidden gems and sharing the best vibes with everyone!";
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="flex justify-center items-center h-screen">User not found</div>;
  }

  return (
    <Container>
      <div className="max-w-4xl mx-auto py-6 px-4">
        <UserProfileHeader 
          user={user} 
          postCount={posts.length}
          getUserBio={getUserBio}
        />
        
        <div className="mt-8">
          <ProfileTabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            viewMode={viewMode}
            setViewMode={setViewMode}
            userPosts={posts}
            getComments={getCommentsForPost}
          />
        </div>
      </div>
    </Container>
  );
};

export default UserProfile;
