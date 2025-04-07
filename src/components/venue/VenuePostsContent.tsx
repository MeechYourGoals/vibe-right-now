
import React from 'react';
import { Button } from "@/components/ui/button";
import { Grid2X2, ListIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VenuePostsList from "@/components/venue/VenuePostsList";
import { Post, Comment, Location } from "@/types";

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
      
  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <TabsList className="grid grid-cols-3 w-[300px]">
          <TabsTrigger value="all">All Posts</TabsTrigger>
          <TabsTrigger value="ugv">User Vibes</TabsTrigger>
          <TabsTrigger value="vgv">Venue Vibes</TabsTrigger>
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
    </Tabs>
  );
};

export default VenuePostsContent;
