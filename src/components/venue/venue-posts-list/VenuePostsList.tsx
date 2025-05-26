
import React from 'react';
import { Post, Comment, Location } from "@/types";
import PostCard from "@/components/post/PostCard";

interface VenuePostsListViewProps {
  posts: Post[];
  venue: Location;
  getComments: (postId: string) => Comment[];
  canDelete: boolean;
  onPostDeleted?: (postId: string) => void;
}

const VenuePostsListView: React.FC<VenuePostsListViewProps> = ({
  posts,
  venue,
  getComments,
  canDelete,
  onPostDeleted
}) => {
  if (posts.length === 0) {
    return null;
  }
  
  return (
    <div className="space-y-4">
      {posts.map(post => {
        // Determine if the post is from the venue itself
        const isVenuePost = post.isVenuePost || post.location?.id === venue.id;
        
        return (
          <PostCard 
            key={post.id} 
            posts={[post]} 
            getComments={getComments}
          />
        );
      })}
    </div>
  );
};

export default VenuePostsListView;
