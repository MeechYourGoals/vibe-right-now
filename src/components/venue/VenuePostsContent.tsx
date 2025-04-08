
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Grid2X2, ListIcon, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import VenuePostsList from "@/components/venue/VenuePostsList";
import SocialMediaFeed from "@/components/venue/SocialMediaFeed";
import SocialMediaSettings from "@/components/venue/SocialMediaSettings";
import { Post, Comment, Location } from "@/types";
import { SocialMediaApiKeys } from '@/services/SocialMediaService';

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
  
  // State for social media API keys
  const [socialMediaApiKeys, setSocialMediaApiKeys] = useState<SocialMediaApiKeys>({
    instagram: '',
    tiktok: '',
    yelp: ''
  });
  
  // Load saved API keys on component mount
  useEffect(() => {
    const savedKeys = localStorage.getItem('socialMediaApiKeys');
    if (savedKeys) {
      try {
        setSocialMediaApiKeys(JSON.parse(savedKeys));
      } catch (error) {
        console.error('Error parsing saved API keys:', error);
      }
    }
  }, []);
  
  // Handle saving API keys
  const handleSaveApiKeys = (keys: SocialMediaApiKeys) => {
    setSocialMediaApiKeys(keys);
  };
      
  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <TabsList className="grid grid-cols-4 w-[400px]">
          <TabsTrigger value="all">All Posts</TabsTrigger>
          <TabsTrigger value="ugv">User Vibes</TabsTrigger>
          <TabsTrigger value="vgv">Venue Vibes</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
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
          
          {activeTab === 'social' && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-1" />
                  API Keys
                </Button>
              </SheetTrigger>
              <SheetContent className="min-w-[400px] sm:max-w-[540px]">
                <SheetHeader>
                  <SheetTitle>Social Media Integration</SheetTitle>
                  <SheetDescription>
                    Configure API keys to connect your social media accounts.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-4">
                  <SocialMediaSettings onSaveApiKeys={handleSaveApiKeys} />
                </div>
              </SheetContent>
            </Sheet>
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
      
      <TabsContent value="ugv" className="mt-4 space-y-4">
        <VenuePostsList 
          posts={filteredPosts} 
          venue={venue} 
          viewMode={viewMode} 
          getComments={getPostComments} 
        />
      </TabsContent>
      
      <TabsContent value="vgv" className="mt-4 space-y-4">
        <VenuePostsList 
          posts={filteredVenuePosts} 
          venue={venue} 
          viewMode={viewMode} 
          getComments={getPostComments} 
        />
      </TabsContent>
      
      <TabsContent value="social" className="mt-4">
        <SocialMediaFeed 
          venueName={venue.name} 
          apiKeys={socialMediaApiKeys} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default VenuePostsContent;
