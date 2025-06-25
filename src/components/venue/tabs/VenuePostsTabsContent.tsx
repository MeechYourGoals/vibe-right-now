
import React from 'react';
import { Post, Comment, Location } from "@/types";
import TabContent from './TabContent';

interface VenuePostsTabsContentProps {
  activeTab: string;
  allPosts: Post[];
  filteredPosts: Post[];
  filteredVenuePosts: Post[];
  venue: Location;
  viewMode: "list" | "grid";
  getPostComments: (postId: string) => Comment[];
  subscriptionTier: 'free' | 'plus' | 'premium' | 'pro';
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
    <TabContent
      tab={activeTab}
      allPosts={allPosts}
      filteredPosts={filteredPosts}
      filteredVenuePosts={filteredVenuePosts}
      venue={venue}
      viewMode={viewMode}
      getComments={getPostComments}
      subscriptionTier={subscriptionTier}
      canEmbed={canEmbed}
      connectedPlatforms={connectedPlatforms}
      onUpgradeSubscription={onUpgradeSubscription}
      onPostDeleted={onPostDeleted}
    />
  );
};

export default VenuePostsTabsContent;
