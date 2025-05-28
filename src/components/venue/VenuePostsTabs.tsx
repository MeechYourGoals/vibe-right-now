
import React, { useState } from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import VenuePostsTabsHeader from './VenuePostsTabsHeader';
import VenuePostsTabsContent from './tabs/VenuePostsTabsContent';
import VenuePostsExternalTab from './tabs/VenuePostsExternalTab';
import { Location, Post, Comment } from '@/types';

interface VenuePostsTabsProps {
  venue: Location;
  posts: Post[];
  getComments: (postId: string) => Comment[];
  onPostDeleted: (postId: string) => void;
}

const VenuePostsTabs: React.FC<VenuePostsTabsProps> = ({
  venue,
  posts,
  getComments,
  onPostDeleted
}) => {
  const [activeTab, setActiveTab] = useState("internal");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [connectedPlatforms, setConnectedPlatforms] = useState<Record<string, boolean>>({
    instagram: false,
    google: false,
    yelp: false
  });

  const handleAddPost = () => {
    console.log('Add post clicked');
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <VenuePostsTabsHeader
          activeTab={activeTab}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onConnectedPlatformsChange={setConnectedPlatforms}
          onAddPost={handleAddPost}
          venueId={venue.id}
        />
        
        <TabsContent value="internal">
          <VenuePostsTabsContent
            posts={posts}
            venue={venue}
            viewMode={viewMode}
            getComments={getComments}
            canDelete={true}
            onPostDeleted={onPostDeleted}
          />
        </TabsContent>
        
        <TabsContent value="external">
          <VenuePostsExternalTab
            venue={venue}
            connectedPlatforms={connectedPlatforms}
            onConnectedPlatformsChange={setConnectedPlatforms}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VenuePostsTabs;
