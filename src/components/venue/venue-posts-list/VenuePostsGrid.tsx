
import React from 'react';
import { Post, Location } from "@/types";
import PostGridItem from "../PostGridItem";
import { getMediaForLocation } from "@/utils/map/locationMediaUtils";

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

  // Helper function to ensure post has valid media
  const ensurePostMedia = (post: Post): Post => {
    if (post.media && post.media.length > 0) {
      return post;
    }
    
    // If post has no media, add a relevant venue image
    const venueMedia = getMediaForLocation(venue);
    return {
      ...post,
      media: [{
        type: "image" as const,
        url: venueMedia.url
      }]
    };
  };
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {posts.map(post => {
        // Ensure post has valid media
        const postWithMedia = ensurePostMedia(post);
        
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
