
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Location } from "@/types";
import VenuePostsExternalTab from './VenuePostsExternalTab';

interface TabContentProps {
  venue: Location;
  subscriptionTier: 'standard' | 'plus' | 'premium' | 'pro';
  onUpgradeSubscription: () => void;
}

const TabContent = ({ venue, subscriptionTier, onUpgradeSubscription }: TabContentProps) => {
  // Simulate connected platforms based on venue data
  const hasConnections = venue.customerId ? true : false;

  return (
    <div className="mt-6">
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts" className="mt-6">
          <VenuePostsExternalTab
            venueName={venue.name}
            instagramKey=""
            yelpKey=""
            googleKey=""
            subscriptionTier={subscriptionTier}
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
      </Tabs>
    </div>
  );
};

export default TabContent;
