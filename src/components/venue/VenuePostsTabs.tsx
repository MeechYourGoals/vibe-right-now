
import React, { useState, useEffect } from 'react';
import { Tabs } from "@/components/ui/tabs";
import { Post, Comment, Location } from "@/types";
import VenuePostsTabsHeader from './tabs/VenuePostsTabsHeader';
import VenuePostsTabsContent from './tabs/VenuePostsTabsContent';

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
      <VenuePostsTabsHeader 
        activeTab={activeTab}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onConnectedPlatformsChange={setConnectedPlatforms}
      />
      
      <VenuePostsTabsContent 
        activeTab={activeTab}
        allPosts={allPosts}
        filteredPosts={filteredPosts}
        filteredVenuePosts={filteredVenuePosts}
        venue={venue}
        viewMode={viewMode}
        getPostComments={getPostComments}
        subscriptionTier={subscriptionTier}
        canEmbed={canEmbed}
        connectedPlatforms={connectedPlatforms}
        onUpgradeSubscription={handleUpgradeSubscription}
      />
    </Tabs>
  );
};

export default VenuePostsTabs;
