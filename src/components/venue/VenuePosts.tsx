
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Location, Media } from "@/types";
import VenuePost from "./VenuePost";

interface VenuePostsProps {
  venue: Location;
}

const VenuePosts: React.FC<VenuePostsProps> = ({ venue }) => {
  const [activeTab, setActiveTab] = useState<string>("recent");
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Mock posts data
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const mockPosts = [
        {
          id: "1",
          content: "Just had an amazing time at this venue! The atmosphere was electric, and the service was top-notch. Will definitely be coming back soon!",
          media: { type: "image", url: "https://source.unsplash.com/random/800x600/?restaurant" },
          timestamp: "2 hours ago",
          likes: 42,
          comments: 8,
          user: {
            name: "Alex Johnson",
            username: "alexj",
            avatar: "https://source.unsplash.com/random/100x100/?portrait"
          }
        },
        {
          id: "2",
          content: "Great happy hour deals and the best nachos in town! Met some cool people and had a blast.",
          media: { type: "image", url: "https://source.unsplash.com/random/800x600/?drinks" },
          timestamp: "Yesterday",
          likes: 29,
          comments: 5,
          user: {
            name: "Sophia Lee",
            username: "sophialee",
            avatar: "https://source.unsplash.com/random/100x100/?woman"
          }
        },
        {
          id: "3",
          content: "This venue has the most incredible live music! The acoustics are perfect, and the crowd was so into it. Can't wait for the next show!",
          media: { type: "image", url: "https://source.unsplash.com/random/800x600/?concert" },
          timestamp: "3 days ago",
          likes: 67,
          comments: 12,
          user: {
            name: "Marcus Rivera",
            username: "marcusrivs",
            avatar: "https://source.unsplash.com/random/100x100/?man"
          }
        }
      ];

      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, [venue.id]);

  // Filter posts based on active tab
  const filteredPosts = () => {
    switch (activeTab) {
      case "popular":
        return [...posts].sort((a, b) => b.likes - a.likes);
      case "vibe-right-now":
        return posts.filter(post => post.timestamp.includes("hour"));
      default:
        return posts;
    }
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-24 bg-gray-200 rounded mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <Tabs defaultValue="recent" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="vibe-right-now">Vibe Right Now</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent" className="space-y-6">
          {filteredPosts().map(post => (
            <VenuePost
              key={post.id}
              venue={venue}
              content={post.content}
              media={post.media}
              timestamp={post.timestamp}
              likes={post.likes}
              comments={post.comments}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="popular" className="space-y-6">
          {filteredPosts().map(post => (
            <VenuePost
              key={post.id}
              venue={venue}
              content={post.content}
              media={post.media}
              timestamp={post.timestamp}
              likes={post.likes}
              comments={post.comments}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="vibe-right-now" className="space-y-6">
          {filteredPosts().length > 0 ? (
            filteredPosts().map(post => (
              <VenuePost
                key={post.id}
                venue={venue}
                content={post.content}
                media={post.media}
                timestamp={post.timestamp}
                likes={post.likes}
                comments={post.comments}
              />
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8">No real-time vibes yet. Be the first to post!</p>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default VenuePosts;
