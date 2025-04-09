
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Grid2X2, ListIcon, Settings, Plus, ExternalLink } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import VenuePostsList from "@/components/venue/VenuePostsList";
import SocialMediaFeed from "@/components/venue/SocialMediaFeed";
import SocialMediaSettings from "@/components/venue/SocialMediaSettings";
import { Post, Comment, Location } from "@/types";
import { SocialMediaApiKeys } from '@/services/SocialMediaService';
import { toast } from 'sonner';

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

const VenuePostsContent: React.FC<VenuePostsContentProps> = ({
  activeTab,
  setActiveTab,
  viewMode,
  setViewMode,
  allPosts,
  filteredPosts,
  generatedVenuePosts,
  selectedDays,
  venue,
  getPostComments
}) => {
  // Filter venue posts by selected days
  const filteredVenuePosts = selectedDays.length === 0 
    ? generatedVenuePosts 
    : generatedVenuePosts.filter(post => 
        selectedDays.includes(new Date(post.timestamp).getDay())
      );
  
  // State for social media API keys and integrations
  const [socialMediaApiKeys, setSocialMediaApiKeys] = useState<SocialMediaApiKeys>({
    instagram: '',
    tiktok: '',
    yelp: '',
    tripadvisor: '',
    foursquare: '',
    google: '',
    franki: '',
    other: ''
  });
  
  // State to track connected platforms
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
  
  // Load saved API keys and platforms on component mount
  useEffect(() => {
    const savedKeys = localStorage.getItem('socialMediaApiKeys');
    if (savedKeys) {
      try {
        const parsedKeys = JSON.parse(savedKeys);
        setSocialMediaApiKeys(parsedKeys);
        
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
  
  // Handle saving API keys
  const handleSaveApiKeys = (keys: SocialMediaApiKeys) => {
    setSocialMediaApiKeys(keys);
    
    // Update connected platforms based on provided keys
    const connected: Record<string, boolean> = {};
    Object.keys(keys).forEach(key => {
      connected[key] = !!keys[key];
    });
    setConnectedPlatforms(connected);
  };
  
  // Handle upgrading subscription
  const handleUpgradeSubscription = () => {
    toast.info("This would navigate to subscription upgrade page. Premium and Pro accounts have full embedding capability.");
    // For demo purposes, cycle through subscription tiers
    const tiers: Array<'standard' | 'plus' | 'premium' | 'pro'> = ['standard', 'plus', 'premium', 'pro'];
    const currentIndex = tiers.indexOf(subscriptionTier);
    const nextTier = tiers[(currentIndex + 1) % tiers.length];
    setSubscriptionTier(nextTier);
    localStorage.setItem('subscriptionTier', nextTier);
    toast.success(`Demo mode: Upgraded to ${nextTier} tier!`);
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
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-1" />
                  Connections
                </Button>
              </SheetTrigger>
              <SheetContent className="min-w-[400px] sm:max-w-[540px]">
                <SheetHeader>
                  <SheetTitle>Social Media Integration</SheetTitle>
                  <SheetDescription>
                    Connect external platforms to aggregate content about this venue
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-4">
                  <SocialMediaSettings onSaveApiKeys={handleSaveApiKeys} />
                </div>
              </SheetContent>
            </Sheet>
          )}
          
          {activeTab === 'external' && (
            <Button variant="default" size="sm" onClick={handleUpgradeSubscription}>
              <Plus className="h-4 w-4 mr-1" />
              {subscriptionTier === 'standard' || subscriptionTier === 'plus' 
                ? 'Upgrade to Premium' 
                : 'Connect Platform'}
            </Button>
          )}
        </div>
      </div>
      
      <TabsContent value="all" className="mt-4 space-y-4">
        <VenuePostsList 
          posts={allPosts} 
          venue={venue} 
          viewMode={viewMode} 
          getComments={getPostComments} 
        />
      </TabsContent>
      
      <TabsContent value="vrn" className="mt-4 space-y-4">
        <div className="flex justify-between mb-4">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">VRN Content</h3>
            <p className="text-sm text-muted-foreground">Content posted on VRN by users and venue owners</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Filter Content
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="border-l-4 border-amber-500 pl-4 py-2">
            <h4 className="text-sm font-medium text-amber-700 dark:text-amber-300">Venue Posts</h4>
            <p className="text-xs text-muted-foreground">
              Official content from {venue.name}
            </p>
          </div>
          
          <VenuePostsList 
            posts={filteredVenuePosts} 
            venue={venue} 
            viewMode={viewMode} 
            getComments={getPostComments} 
          />
          
          <div className="border-l-4 border-blue-500 pl-4 py-2 mt-4">
            <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300">User Posts</h4>
            <p className="text-xs text-muted-foreground">
              Content from users who visited {venue.name}
            </p>
          </div>
          
          <VenuePostsList 
            posts={filteredPosts} 
            venue={venue} 
            viewMode={viewMode} 
            getComments={getPostComments} 
          />
        </div>
      </TabsContent>
      
      <TabsContent value="external" className="mt-4">
        <div className="mb-4 p-4 border rounded-lg bg-muted/10">
          <h3 className="text-sm font-medium mb-2">Connected External Platforms</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.entries(connectedPlatforms).map(([platform, isConnected]) => (
              <div 
                key={platform}
                className={`p-2 rounded-md text-center text-xs border 
                  ${isConnected 
                    ? 'bg-green-500/10 border-green-500/30 text-green-600' 
                    : 'bg-muted/20 border-muted/30 text-muted-foreground'}`}
              >
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
                {isConnected ? ' ✓' : ''}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-muted-foreground">
              Content is aggregated from connected platforms to provide a comprehensive view of this venue
            </p>
            <div className="text-xs py-1 px-2 rounded-full bg-primary/10 text-primary">
              {subscriptionTier.toUpperCase()} ACCOUNT
            </div>
          </div>
        </div>
        
        {canEmbed ? (
          <SocialMediaFeed 
            venueName={venue.name} 
            apiKeys={socialMediaApiKeys} 
          />
        ) : (
          <div className="space-y-4">
            <div className="p-6 border border-dashed rounded-lg text-center">
              <h3 className="text-lg font-medium mb-2">Upgrade to Premium</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Premium and Pro accounts can embed external content directly in the feed.
                With your current {subscriptionTier.toUpperCase()} account, links to external platforms are provided.
              </p>
              <Button onClick={handleUpgradeSubscription}>
                Upgrade Account
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(connectedPlatforms)
                .filter(([_, isConnected]) => isConnected)
                .map(([platform]) => (
                  <a 
                    key={platform}
                    href={`https://${platform}.com/search?q=${encodeURIComponent(venue.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                  >
                    <div>
                      <h4 className="font-medium">{platform.charAt(0).toUpperCase() + platform.slice(1)}</h4>
                      <p className="text-sm text-muted-foreground">View on {platform}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </a>
                ))}
            </div>
            
            {Object.values(connectedPlatforms).filter(Boolean).length === 0 && (
              <div className="text-center p-4 bg-muted/10 rounded-lg">
                <p>No external platforms connected.</p>
                <Button variant="outline" size="sm" className="mt-2" onClick={() => document.querySelector<HTMLButtonElement>('[data-trigger="connections"]')?.click()}>
                  Connect Platforms
                </Button>
              </div>
            )}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default VenuePostsContent;
