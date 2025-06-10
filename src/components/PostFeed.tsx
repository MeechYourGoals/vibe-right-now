
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, TrendingUp, Calendar, MapPin, Filter, RefreshCw } from "lucide-react";
import VenuePostCard from "@/components/post/VenuePostCard";
import { mockPosts } from "@/mock/posts";
import { Post, Location } from "@/types";

interface VenueGroup {
  venue: Location;
  posts: Post[];
}

const PostFeed = () => {
  const [activeTab, setActiveTab] = useState("for-you");
  const [venueGroups, setVenueGroups] = useState<VenueGroup[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadVenueGroups();
  }, [activeTab]);

  const loadVenueGroups = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      // Group posts by venue
      const venueMap = new Map<string, VenueGroup>();
      
      let filteredPosts = [...mockPosts];
      
      switch (activeTab) {
        case "trending":
          filteredPosts = filteredPosts.sort((a, b) => (b.likes || 0) - (a.likes || 0));
          break;
        case "recent":
          filteredPosts = filteredPosts.sort((a, b) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
          break;
        case "nearby":
          filteredPosts = filteredPosts.filter(post => post.location);
          break;
        default:
          break;
      }

      // Group posts by venue
      filteredPosts.forEach(post => {
        if (!post.location) return;
        
        const venueId = post.location.id;
        if (!venueMap.has(venueId)) {
          venueMap.set(venueId, {
            venue: post.location,
            posts: []
          });
        }
        venueMap.get(venueId)!.posts.push(post);
      });

      // Convert to array and sort by venue activity (most recent post)
      const groups = Array.from(venueMap.values()).sort((a, b) => {
        const aLatest = Math.max(...a.posts.map(p => new Date(p.timestamp).getTime()));
        const bLatest = Math.max(...b.posts.map(p => new Date(p.timestamp).getTime()));
        return bLatest - aLatest;
      });

      setVenueGroups(groups);
      setIsLoading(false);
    }, 500);
  };

  const handleRefresh = () => {
    loadVenueGroups();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] mb-4"></div>
          <p className="text-muted-foreground">Loading vibes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Feed</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="for-you" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            For You
          </TabsTrigger>
          <TabsTrigger value="trending" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Trending
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Recent
          </TabsTrigger>
          <TabsTrigger value="nearby" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Nearby
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="space-y-0">
            {venueGroups.length > 0 ? (
              venueGroups.map((group) => (
                <VenuePostCard 
                  key={group.venue.id}
                  venue={group.venue}
                  posts={group.posts}
                  onVenueClick={(venueId) => console.log('Venue clicked:', venueId)}
                  onUserClick={(userId) => console.log('User clicked:', userId)}
                  onLocationClick={(locationId) => console.log('Location clicked:', locationId)}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No venues found for this filter.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PostFeed;
