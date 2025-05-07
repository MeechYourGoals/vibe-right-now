
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Post, Comment } from "@/types";
import { Grid, List } from "lucide-react";
import VenuePost from "@/components/VenuePost";
import { getVenuePosts, getPostComments } from "@/services/PostService";

interface VenuePostsProps {
  venueId: string;
  viewMode?: 'grid' | 'list';
  setViewMode?: (mode: 'grid' | 'list') => void;
  canDelete?: boolean;
}

const VenuePosts = ({ 
  venueId,
  viewMode = 'grid', 
  setViewMode = () => {},
  canDelete = false
}: VenuePostsProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("recent");

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const venuePosts = await getVenuePosts(venueId);
        setPosts(venuePosts);
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, [venueId]);

  const loadComments = async (postId: string) => {
    try {
      return await getPostComments(postId);
    } catch (error) {
      console.error("Error loading comments:", error);
      return [];
    }
  };

  const getSortedPosts = () => {
    if (activeTab === "recent") {
      return [...posts].sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    } else {
      return [...posts].sort((a, b) => b.likes - a.likes);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="border rounded-md p-4 space-y-3 animate-pulse">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gray-200"></div>
              <div className="h-4 bg-gray-200 w-24"></div>
            </div>
            <div className="h-3 bg-gray-200 w-full"></div>
            <div className="h-3 bg-gray-200 w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Tabs defaultValue="recent" className="w-full" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex border rounded-md">
          <Button 
            variant={viewMode === 'grid' ? "secondary" : "ghost"} 
            size="icon"
            onClick={() => setViewMode('grid')}
            className="h-8 w-8 rounded-none rounded-l-md"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button 
            variant={viewMode === 'list' ? "secondary" : "ghost"} 
            size="icon"
            onClick={() => setViewMode('list')}
            className="h-8 w-8 rounded-none rounded-r-md"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <TabsContent value="recent" className="space-y-4 mt-4">
        {getSortedPosts().map(post => (
          <VenuePost 
            key={post.id} 
            venue={post.location}
            content={post.content}
            media={post.media}
            timestamp={post.timestamp}
            likes={post.likes}
            comments={post.comments}
          />
        ))}
      </TabsContent>
      <TabsContent value="popular" className="space-y-4 mt-4">
        {getSortedPosts().map(post => (
          <VenuePost 
            key={post.id} 
            venue={post.location}
            content={post.content}
            media={post.media}
            timestamp={post.timestamp}
            likes={post.likes}
            comments={post.comments}
          />
        ))}
      </TabsContent>
    </div>
  );
};

export default VenuePosts;
