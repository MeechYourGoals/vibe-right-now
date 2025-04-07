
import React from 'react';
import { Button } from "@/components/ui/button";
import { Grid2X2, ListIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VenuePostsList from "@/components/venue/VenuePostsList";
import PostCard from "@/components/PostCard";
import VenuePost from "@/components/VenuePost";
import { Post, Comment, Location } from "@/types";

interface VenuePostsContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  viewMode: "list" | "grid";
  setViewMode: (mode: "list" | "grid") => void;
  allPosts: Post[];
  filteredPosts: Post[];
  generatedVenuePosts: any[];
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
  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <TabsList className="grid grid-cols-3 w-[300px]">
          <TabsTrigger value="all">All Posts</TabsTrigger>
          <TabsTrigger value="ugv">User Vibes</TabsTrigger>
          <TabsTrigger value="vgv">Venue Vibes</TabsTrigger>
        </TabsList>
        
        {(activeTab === "ugv" || activeTab === "all") && (
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
        )}
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
        {filteredPosts.length > 0 ? (
          viewMode === "list" ? (
            <PostCard 
              posts={filteredPosts} 
              locationPostCount={filteredPosts.length}
              getComments={getPostComments} 
            />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredPosts.map((post) => (
                <VenuePostsList 
                  key="grid-view" 
                  posts={filteredPosts} 
                  venue={venue} 
                  viewMode="grid" 
                  getComments={getPostComments} 
                />
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-10">
            <h3 className="text-xl font-semibold mb-2">No user vibes yet</h3>
            <p className="text-muted-foreground">Be the first to post a vibe here!</p>
            <Button className="mt-4 bg-gradient-vibe">Post a Vibe</Button>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="vgv" className="mt-4 space-y-4">
        {generatedVenuePosts.length > 0 ? (
          generatedVenuePosts
            .filter(post => 
              selectedDays.length === 0 || 
              selectedDays.includes(new Date(post.timestamp).getDay())
            )
            .map((post, index) => (
              <div key={index} className="border-2 border-amber-500/50 rounded-lg overflow-hidden">
                <VenuePost 
                  venue={venue}
                  content={post.content}
                  media={post.media}
                  timestamp={post.timestamp}
                />
              </div>
            ))
        ) : (
          <div className="text-center py-10">
            <h3 className="text-xl font-semibold mb-2">No venue posts available</h3>
            <p className="text-muted-foreground">Check back later for updates from this venue!</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default VenuePostsContent;
