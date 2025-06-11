
import React, { useState } from 'react';
import { Tabs } from "@/components/ui/tabs";
import { Post, Comment, Location } from "@/types";
import VenuePostsTabsHeader from './tabs/VenuePostsTabsHeader';
import VenuePostsTabsContent from './tabs/VenuePostsTabsContent';
import AddVenuePostDialog from './AddVenuePostDialog';
import { useVenueConnections } from '@/hooks/useVenueConnections';
import { usePostDeletion } from '@/hooks/usePostDeletion';

interface VenuePostsTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  viewMode: "list" | "grid";
  setViewMode: (mode: "list" | "grid") => void;
  allPosts: Post[];
  filteredPosts: Post[];
  filteredVenuePosts: Post[];
  venue: Location;
  getPostComments: (postId: string) => Comment[];
}

const VenuePostsTabs: React.FC<VenuePostsTabsProps> = ({
  activeTab,
  setActiveTab,
  viewMode,
  setViewMode,
  allPosts,
  filteredPosts,
  filteredVenuePosts,
  venue,
  getPostComments
}) => {
  // Use our custom hooks
  const {
    connectedPlatforms,
    setConnectedPlatforms,
    subscriptionTier,
    handleUpgradeSubscription,
    canEmbed
  } = useVenueConnections(venue.id);
  
  const { deletedPostIds, handlePostDeleted } = usePostDeletion();
  
  // State to track add post dialog
  const [isAddPostDialogOpen, setIsAddPostDialogOpen] = useState(false);
  
  // Filter out deleted posts
  const filteredAllPosts = allPosts.filter(post => !deletedPostIds.includes(post.id));
  const filteredUserPosts = filteredPosts.filter(post => !deletedPostIds.includes(post.id));
  
  return (
    <>
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <VenuePostsTabsHeader 
          activeTab={activeTab}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onConnectedPlatformsChange={setConnectedPlatforms}
          onAddPost={() => setIsAddPostDialogOpen(true)}
          venueId={venue.id}
        />
        
        <VenuePostsTabsContent 
          activeTab={activeTab}
          allPosts={filteredAllPosts}
          filteredPosts={filteredUserPosts}
          filteredVenuePosts={filteredVenuePosts}
          venue={venue}
          viewMode={viewMode}
          getPostComments={getPostComments}
          subscriptionTier={subscriptionTier}
          canEmbed={canEmbed}
          connectedPlatforms={connectedPlatforms}
          onUpgradeSubscription={handleUpgradeSubscription}
          onPostDeleted={handlePostDeleted}
        />
      </Tabs>
      
      <AddVenuePostDialog 
        open={isAddPostDialogOpen}
        onOpenChange={setIsAddPostDialogOpen}
        venue={venue}
      />
    </>
  );
};

export default VenuePostsTabs;
