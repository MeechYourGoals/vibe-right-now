
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Grid2X2, ListIcon, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Post, Comment, Location } from "@/types";
import VenuePostsAllTab from './tabs/VenuePostsAllTab';
import VenuePostsVrnTab from './tabs/VenuePostsVrnTab';
import VenuePostsExternalTab from './tabs/VenuePostsExternalTab';
import SocialMediaConnectionsSheet from './SocialMediaConnectionsSheet';

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
  // State for social media connections (moved from parent)
  const [connectedPlatforms, setConnectedPlatforms] = useState<Record<string, boolean>>({
    instagram: false,
    tiktok: false,
    yelp: false,
    tripadvisor: false,
    foursquare: false,
    google: false,
    franki: false,
    other: false
  });
  
  // State to track subscription tier
  const [subscriptionTier, setSubscriptionTier] = useState<'standard' | 'plus' | 'premium' | 'pro'>('standard');
  
  // Load saved platforms on component mount
  useEffect(() => {
    const savedKeys = localStorage.getItem('socialMediaApiKeys');
    if (savedKeys) {
      try {
        const parsedKeys = JSON.parse(savedKeys);
        
        // Set platforms as connected if they have API keys
        const connected: Record<string, boolean> = {};
        Object.keys(parsedKeys).forEach(key => {
          connected[key] = !!parsedKeys[key];
        });
        setConnectedPlatforms(connected);
      } catch (error) {
        console.error('Error parsing saved API keys:', error);
      }
    }
    
    // Check for subscription tier in localStorage
    const savedTier = localStorage.getItem('subscriptionTier');
    if (savedTier) {
      setSubscriptionTier(savedTier as 'standard' | 'plus' | 'premium' | 'pro');
    }
  }, []);
  
  // Handle upgrading subscription
  const handleUpgradeSubscription = () => {
    // For demo purposes, cycle through subscription tiers
    const tiers: Array<'standard' | 'plus' | 'premium' | 'pro'> = ['standard', 'plus', 'premium', 'pro'];
    const currentIndex = tiers.indexOf(subscriptionTier);
    const nextTier = tiers[(currentIndex + 1) % tiers.length];
    setSubscriptionTier(nextTier);
    localStorage.setItem('subscriptionTier', nextTier);
  };
  
  // Check if embedding is allowed (premium/pro tiers only)
  const canEmbed = subscriptionTier === 'premium' || subscriptionTier === 'pro';
  
  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <TabsList className="grid grid-cols-3 w-[300px]">
          <TabsTrigger value="all">All Posts</TabsTrigger>
          <TabsTrigger value="vrn">VRN Content</TabsTrigger>
          <TabsTrigger value="external">External</TabsTrigger>
        </TabsList>
        
        <div className="flex gap-2">
          <Button 
            variant={viewMode === "list" ? "default" : "outline"} 
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <ListIcon className="h-4 w-4" />
          </Button>
          <Button 
            variant={viewMode === "grid" ? "default" : "outline"} 
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid2X2 className="h-4 w-4" />
          </Button>
          
          {activeTab === 'external' && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" data-trigger="connections">
                  <Settings className="h-4 w-4 mr-1" />
                  Connections
                </Button>
              </SheetTrigger>
              <SocialMediaConnectionsSheet 
                onConnectedPlatformsChange={setConnectedPlatforms} 
              />
            </Sheet>
          )}
        </div>
      </div>
      
      <TabsContent value="all" className="mt-4 space-y-4">
        <VenuePostsAllTab 
          posts={allPosts} 
          venue={venue} 
          viewMode={viewMode} 
          getComments={getPostComments} 
        />
      </TabsContent>
      
      <TabsContent value="vrn" className="mt-4 space-y-4">
        <VenuePostsVrnTab
          filteredVenuePosts={filteredVenuePosts}
          filteredPosts={filteredPosts}
          venue={venue}
          viewMode={viewMode}
          getComments={getPostComments}
        />
      </TabsContent>
      
      <TabsContent value="external" className="mt-4">
        <VenuePostsExternalTab
          venueName={venue.name}
          connectedPlatforms={connectedPlatforms}
          subscriptionTier={subscriptionTier}
          canEmbed={canEmbed}
          onUpgradeSubscription={handleUpgradeSubscription}
        />
      </TabsContent>
    </Tabs>
  );
};

export default VenuePostsTabs;
