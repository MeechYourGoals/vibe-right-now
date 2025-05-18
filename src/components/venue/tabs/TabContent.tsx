
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import VenuePostsAllTab from './VenuePostsAllTab';
import VenuePostsVrnTab from './VenuePostsVrnTab';
import VenuePostsExternalTab from './VenuePostsExternalTab';
import { Post, Comment, Location } from "@/types";

interface TabContentProps {
  tab: string;
  allPosts: Post[];
  filteredPosts: Post[];
  filteredVenuePosts: Post[];
  venue: Location;
  viewMode: "list" | "grid";
  getComments: (postId: string) => Comment[];
  subscriptionTier: 'standard' | 'plus' | 'premium' | 'pro';
  canEmbed: boolean;
  connectedPlatforms: Record<string, boolean>;
  onUpgradeSubscription: () => void;
  onPostDeleted?: (postId: string) => void;
}

const TabContent: React.FC<TabContentProps> = ({
  tab,
  allPosts,
  filteredPosts,
  filteredVenuePosts,
  venue,
  viewMode,
  getComments,
  subscriptionTier,
  canEmbed,
  connectedPlatforms,
  onUpgradeSubscription,
  onPostDeleted
}) => {
  switch (tab) {
    case 'all':
      return (
        <TabsContent value="all" className="mt-4 space-y-4">
          <VenuePostsAllTab 
            posts={allPosts} 
            venue={venue} 
            viewMode={viewMode} 
            getComments={getComments}
            subscriptionTier={subscriptionTier}
            onPostDeleted={onPostDeleted}
          />
        </TabsContent>
      );
    case 'vrn':
      return (
        <TabsContent value="vrn" className="mt-4 space-y-4">
          <VenuePostsVrnTab
            filteredVenuePosts={filteredVenuePosts}
            filteredPosts={filteredPosts}
            venue={venue}
            viewMode={viewMode}
            getComments={getComments}
            subscriptionTier={subscriptionTier}
            onPostDeleted={onPostDeleted}
          />
        </TabsContent>
      );
    case 'external':
      return (
        <TabsContent value="external" className="mt-4">
          <VenuePostsExternalTab
            venueName={venue.name}
            connectedPlatforms={connectedPlatforms}
            subscriptionTier={subscriptionTier}
            canEmbed={canEmbed}
            onUpgradeSubscription={onUpgradeSubscription}
          />
        </TabsContent>
      );
    default:
      return null;
  }
};

export default TabContent;
