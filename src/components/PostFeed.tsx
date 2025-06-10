
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, Calendar, MapPin, Heart, MessageCircle, Share, Bookmark, Filter, RefreshCw } from "lucide-react";
import PostCard from "@/components/post/PostCard";
import { mockPosts } from "@/mock/posts";
import { mockComments } from "@/mock/comments";
import { Post, Comment } from "@/types";

const PostFeed = () => {
  const [activeTab, setActiveTab] = useState("for-you");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadPosts();
  }, [activeTab]);

  const loadPosts = () => {
    setIsLoading(true);
    
    setTimeout(() => {
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
      
      setPosts(filteredPosts);
      setIsLoading(false);
    }, 500);
  };

  const getComments = (postId: string): Comment[] => {
    return mockComments.filter(comment => comment.postId === postId);
  };

  const handleRefresh = () => {
    loadPosts();
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
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard 
                key={post.id}
                post={post}
                onUserClick={(userId) => console.log('User clicked:', userId)}
                onLocationClick={(locationId) => console.log('Location clicked:', locationId)}
                onLike={() => console.log('Like clicked')}
                onComment={() => console.log('Comment clicked')}
                onShare={() => console.log('Share clicked')}
                onSave={() => console.log('Save clicked')}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PostFeed;
