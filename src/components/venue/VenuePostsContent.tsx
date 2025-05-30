
import React from 'react';
import { Post, Comment, Location } from "@/types";
import VenuePostsTabs from './VenuePostsTabs';
import { useVenuePosts } from '@/hooks/useVenuePosts';

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

const VenuePostsContent: React.FC<VenuePostsContentProps> = (props) => {
  const {
    activeTab,
    setActiveTab,
    viewMode,
    setViewMode,
    allPosts,
    filteredPosts,
    venue,
    getPostComments
  } = props;
  
  const { filteredVenuePosts } = useVenuePosts(props);
  
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
