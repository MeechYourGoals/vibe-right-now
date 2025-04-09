
import React from 'react';
import { Post, Comment, Location } from "@/types";
import VenuePostsList from "@/components/venue/VenuePostsList";

interface VenuePostsAllTabProps {
  posts: Post[];
  venue: Location; 
  viewMode: "list" | "grid";
  getComments: (postId: string) => Comment[];
}

const VenuePostsAllTab: React.FC<VenuePostsAllTabProps> = ({
  posts,
  venue,
  viewMode,
  getComments
}) => {
  return (
    <VenuePostsList 
      posts={posts} 
      venue={venue} 
      viewMode={viewMode} 
      getComments={getComments} 
    />
  );
};

export default VenuePostsAllTab;
