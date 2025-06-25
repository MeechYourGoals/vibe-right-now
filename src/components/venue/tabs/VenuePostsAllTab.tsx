
import React from 'react';
import { Post, Comment, Location } from "@/types";
import VenuePostsList from "@/components/venue/VenuePostsList";

interface VenuePostsAllTabProps {
  posts: Post[];
  venue: Location; 
  viewMode: "list" | "grid";
  getComments: (postId: string) => Comment[];
  subscriptionTier?: 'free' | 'plus' | 'premium' | 'pro';
  onPostDeleted?: (postId: string) => void;
}

const VenuePostsAllTab: React.FC<VenuePostsAllTabProps> = ({
  posts,
  venue,
  viewMode,
  getComments,
  subscriptionTier = 'free',
  onPostDeleted
}) => {
  return (
    <VenuePostsList 
      posts={posts} 
      venue={venue} 
      viewMode={viewMode} 
      getComments={getComments}
      subscriptionTier={subscriptionTier}
      onPostDeleted={onPostDeleted}
    />
  );
};

export default VenuePostsAllTab;
