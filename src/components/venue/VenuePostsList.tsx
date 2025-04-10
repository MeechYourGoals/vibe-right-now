
import React, { useState } from 'react';
import { Location, Post, Comment } from "@/types";
import PostGridItem from './PostGridItem';
import PostCard from "@/components/post/PostCard";
import { Grid } from "lucide-react";
import { canDeleteUserPosts } from '@/utils/venue/postManagementUtils';

interface VenuePostsListProps {
  posts: Post[];
  venue: Location;
  viewMode: "list" | "grid";
  getComments: (postId: string) => Comment[];
  subscriptionTier?: 'standard' | 'plus' | 'premium' | 'pro';
  onPostDeleted?: (postId: string) => void;
}

const VenuePostsList: React.FC<VenuePostsListProps> = ({
  posts,
  venue,
  viewMode,
  getComments,
  subscriptionTier = 'standard',
  onPostDeleted
}) => {
  const [localPosts, setLocalPosts] = useState<Post[]>(posts);
  
  // Check if venue manager can delete posts based on subscription tier
  const canDelete = canDeleteUserPosts(subscriptionTier);
  
  const handlePostDeleted = (postId: string) => {
    // Update local state to remove the deleted post
    setLocalPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    
    // Call parent handler if provided
    if (onPostDeleted) {
      onPostDeleted(postId);
    }
  };
  
  if (localPosts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <Grid className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
        <p className="text-muted-foreground">
          Be the first to share what's happening at {venue.name}!
        </p>
      </div>
    );
  }
  
  return (
    <div className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 gap-4" : "space-y-4"}>
      {localPosts.map(post => {
        // Determine if the post is from the venue itself
        const isVenuePost = post.isVenuePost || post.location?.id === venue.id;
        
        return viewMode === "grid" ? (
          <PostGridItem 
            key={post.id} 
            post={post} 
            isVenuePost={isVenuePost}
            canDelete={canDelete && !isVenuePost} // Only allow deletion of user posts, not venue posts
            venue={venue}
            onPostDeleted={handlePostDeleted}
          />
        ) : (
          <PostCard 
            key={post.id} 
            post={post} 
            comments={getComments(post.id)}
            canDelete={canDelete && !isVenuePost}
            venue={venue}
            onPostDeleted={handlePostDeleted}
          />
        );
      })}
    </div>
  );
};

export default VenuePostsList;
