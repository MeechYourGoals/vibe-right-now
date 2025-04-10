
import React from 'react';
import { Post, Comment, Location } from "@/types";
import VenuePostsAllTab from './VenuePostsAllTab';
import VenuePostsVrnTab from './VenuePostsVrnTab';
import VenuePostsExternalTab from './VenuePostsExternalTab';
import { TabsContent } from "@/components/ui/tabs";

interface VenuePostsTabsContentProps {
  activeTab: string;
  allPosts: Post[];
  filteredPosts: Post[];
  filteredVenuePosts: Post[];
  venue: Location;
  viewMode: "list" | "grid";
  getPostComments: (postId: string) => Comment[];
  subscriptionTier: 'standard' | 'plus' | 'premium' | 'pro';
  canEmbed: boolean;
  connectedPlatforms: Record<string, boolean>;
  onUpgradeSubscription: () => void;
  onPostDeleted?: (postId: string) => void;
}

const VenuePostsTabsContent: React.FC<VenuePostsTabsContentProps> = ({
  activeTab,
  allPosts,
  filteredPosts,
  filteredVenuePosts,
  venue,
  viewMode,
  getPostComments,
  subscriptionTier,
  canEmbed,
  connectedPlatforms,
  onUpgradeSubscription,
  onPostDeleted
}) => {
  return (
    <>
      <TabsContent value="all" className="mt-4 space-y-4">
        <VenuePostsAllTab 
          posts={allPosts} 
          venue={venue} 
          viewMode={viewMode} 
          getComments={getPostComments}
          subscriptionTier={subscriptionTier}
          onPostDeleted={onPostDeleted}
        />
      </TabsContent>
      
      <TabsContent value="vrn" className="mt-4 space-y-4">
        <VenuePostsVrnTab
          filteredVenuePosts={filteredVenuePosts}
          filteredPosts={filteredPosts}
          venue={venue}
          viewMode={viewMode}
          getComments={getPostComments}
          subscriptionTier={subscriptionTier}
          onPostDeleted={onPostDeleted}
        />
      </TabsContent>
      
      <TabsContent value="external" className="mt-4">
        <VenuePostsExternalTab
          venueName={venue.name}
          connectedPlatforms={connectedPlatforms}
          subscriptionTier={subscriptionTier}
          canEmbed={canEmbed}
          onUpgradeSubscription={onUpgradeSubscription}
        />
      </TabsContent>
    </>
  );
};

export default VenuePostsTabsContent;
