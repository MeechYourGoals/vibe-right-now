
import React from 'react';
import { Post, Location } from "@/types";
import PostGridItem from "../PostGridItem";

interface VenuePostsGridProps {
  posts: Post[];
  venue: Location;
  canDelete: boolean;
  onPostDeleted?: (postId: string) => void;
}

const VenuePostsGrid: React.FC<VenuePostsGridProps> = ({
  posts,
  venue,
  canDelete,
  onPostDeleted
}) => {
  if (posts.length === 0) {
    return null;
  }
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {posts.map(post => {
        // Determine if the post is from the venue itself
        const isVenuePost = post.isVenuePost || post.location?.id === venue.id;
        
        return (
          <PostGridItem 
            key={post.id} 
            post={post} 
            isVenuePost={isVenuePost}
            canDelete={canDelete && !isVenuePost} // Only allow deletion of user posts, not venue posts
            venue={venue}
            onPostDeleted={onPostDeleted}
          />
        );
      })}
    </div>
  );
};

export default VenuePostsGrid;
