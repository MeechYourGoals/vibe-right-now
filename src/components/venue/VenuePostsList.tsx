
import React, { useState } from 'react';
import { Location, Post, Comment } from "@/types";
import { canDeleteUserPosts } from '@/utils/venue/postManagementUtils';
import { VenuePostsGrid, VenuePostsListView, EmptyState } from './venue-posts-list';

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
    return <EmptyState venueName={venue.name} />;
  }
  
  return viewMode === "grid" ? (
    <VenuePostsGrid 
      posts={localPosts} 
      venue={venue}
      canDelete={canDelete}
      onPostDeleted={handlePostDeleted}
    />
  ) : (
    <VenuePostsListView 
      posts={localPosts} 
      venue={venue}
      getComments={getComments}
      canDelete={canDelete}
      onPostDeleted={handlePostDeleted}
    />
  );
};

export default VenuePostsList;
