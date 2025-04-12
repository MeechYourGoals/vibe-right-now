
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Post, Location, Comment } from '@/types';
import VenuePostsList from './VenuePostsList';
import { Skeleton } from '@/components/ui/skeleton';
import { comments } from '@/mock/data';

interface VenuePostsTabsProps {
  posts?: Post[];
  venue: Location;
  viewMode: "list" | "grid";
  getComments?: (postId: string) => Comment[];
  
  // Additional props for VenuePostsContent
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  setViewMode?: (mode: "list" | "grid") => void;
  allPosts?: Post[];
  filteredPosts?: Post[];
  filteredVenuePosts?: Post[];
  getPostComments?: (postId: string) => Comment[];
}

const VenuePostsTabs: React.FC<VenuePostsTabsProps> = ({
  posts = [],
  venue,
  viewMode,
  getComments,
  activeTab,
  setActiveTab,
  allPosts,
  filteredPosts,
  filteredVenuePosts,
  getPostComments
}) => {
  // Function to get comments for a post
  const getCommentsForPost = (postId: string) => {
    if (getComments) {
      return getComments(postId);
    }
    if (getPostComments) {
      return getPostComments(postId);
    }
    return comments.filter(comment => comment.postId === postId);
  };

  // Use provided posts or fallback to derived ones
  const postsToShow = posts.length > 0 ? posts : (allPosts || []);
  const userPosts = postsToShow.filter(post => post.user.id !== "system");
  const systemPosts = postsToShow.filter(post => post.user.id === "system");
  
  // Used filtered posts if available
  const filteredUserPosts = filteredPosts || userPosts;
  const filteredSystemPosts = filteredVenuePosts || systemPosts;
  
  return (
    <>
      <TabsContent value="all" className="mt-4">
        <VenuePostsList 
          posts={postsToShow}
          venue={venue}
          viewMode={viewMode}
          getComments={getCommentsForPost}
        />
      </TabsContent>
      
      <TabsContent value="user" className="mt-4">
        <VenuePostsList 
          posts={filteredUserPosts}
          venue={venue}
          viewMode={viewMode}
          getComments={getCommentsForPost}
        />
      </TabsContent>
      
      <TabsContent value="venue" className="mt-4">
        <VenuePostsList 
          posts={filteredSystemPosts}
          venue={venue}
          viewMode={viewMode}
          getComments={getCommentsForPost}
        />
      </TabsContent>
    </>
  );
};

export default VenuePostsTabs;
