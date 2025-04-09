
import React from 'react';
import { Post, Comment, Location } from "@/types";
import VenuePostsTabs from './VenuePostsTabs';
import { SocialMediaApiKeys } from '@/services/SocialMediaService';

interface VenuePostsContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  viewMode: "list" | "grid";
  setViewMode: (mode: "list" | "grid") => void;
  allPosts: Post[];
  filteredPosts: Post[];
  generatedVenuePosts: Post[];
  selectedDays: number[];
  venue: Location;
  getPostComments: (postId: string) => Comment[];
}

const VenuePostsContent: React.FC<VenuePostsContentProps> = ({
  activeTab,
  setActiveTab,
  viewMode,
  setViewMode,
  allPosts,
  filteredPosts,
  generatedVenuePosts,
  selectedDays,
  venue,
  getPostComments
}) => {
  // Filter venue posts by selected days
  const filteredVenuePosts = selectedDays.length === 0 
    ? generatedVenuePosts 
    : generatedVenuePosts.filter(post => 
        selectedDays.includes(new Date(post.timestamp).getDay())
      );
  
  return (
    <VenuePostsTabs
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      viewMode={viewMode}
      setViewMode={setViewMode}
      allPosts={allPosts}
      filteredPosts={filteredPosts}
      filteredVenuePosts={filteredVenuePosts}
      venue={venue}
      getPostComments={getPostComments}
    />
  );
};

export default VenuePostsContent;
