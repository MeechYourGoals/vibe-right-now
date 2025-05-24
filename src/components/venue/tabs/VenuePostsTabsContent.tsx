
import React from 'react';
import { Post, Comment, Location } from "@/types";
import { TabsContent } from "@/components/ui/tabs";
import VenuePostsList from '../VenuePostsList';

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
      <TabsContent value="posts" className="mt-6">
        <VenuePostsList
          posts={filteredVenuePosts}
          venue={venue}
          viewMode={viewMode}
          getComments={getPostComments}
          canDelete={canEmbed}
          onPostDeleted={onPostDeleted || (() => {})}
        />
      </TabsContent>
      
      <TabsContent value="reviews" className="mt-6">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Reviews will be displayed here</p>
        </div>
      </TabsContent>
      
      <TabsContent value="events" className="mt-6">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Events will be displayed here</p>
        </div>
      </TabsContent>
    </>
  );
};

export default VenuePostsTabsContent;
