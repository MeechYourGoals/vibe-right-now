
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
        // Ensure post has at least one media item
        const postWithMedia = {
          ...post,
          media: post.media && post.media.length > 0 
            ? post.media 
            : [{ 
                type: "image" as const, 
                url: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 10000)}?w=600&q=80&auto=format&fit=crop` 
              }]
        };
        
        // Determine if the post is from the venue itself
        const isVenuePost = post.isVenuePost || post.location?.id === venue.id;
        
        return (
          <PostGridItem 
            key={post.id} 
            post={postWithMedia} 
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
