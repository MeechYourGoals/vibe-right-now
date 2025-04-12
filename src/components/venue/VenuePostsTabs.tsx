
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Post, Location } from '@/types';
import VenuePostsList from './VenuePostsList';
import { Skeleton } from '@/components/ui/skeleton';
import { comments } from '@/mock/data';

interface VenuePostsTabsProps {
  posts: Post[];
  venue: Location;
  viewMode: "list" | "grid";
}

const VenuePostsTabs: React.FC<VenuePostsTabsProps> = ({
  posts,
  venue,
  viewMode
}) => {
  // Function to get comments for a post
  const getComments = (postId: string) => {
    return comments.filter(comment => comment.postId === postId);
  };

  const userPosts = posts.filter(post => post.user.id !== "system");
  const systemPosts = posts.filter(post => post.user.id === "system");
  
  return (
    <>
      <TabsContent value="all" className="mt-4">
        <VenuePostsList 
          posts={posts}
          venue={venue}
          viewMode={viewMode}
          getComments={getComments}
        />
      </TabsContent>
      
      <TabsContent value="user" className="mt-4">
        <VenuePostsList 
          posts={userPosts}
          venue={venue}
          viewMode={viewMode}
          getComments={getComments}
        />
      </TabsContent>
      
      <TabsContent value="venue" className="mt-4">
        <VenuePostsList 
          posts={systemPosts}
          venue={venue}
          viewMode={viewMode}
          getComments={getComments}
        />
      </TabsContent>
    </>
  );
};

export default VenuePostsTabs;
