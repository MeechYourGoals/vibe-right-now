
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share } from "lucide-react";

interface Media {
  id: string;
  type: 'image' | 'video';
  url: string;
}

interface RecentVibesProps {
  locationId: string;
}

const RecentVibes = ({ locationId }: RecentVibesProps) => {
  // Mock data for recent vibes at this location
  const recentPosts = [
    {
      id: "1",
      user: { name: "Sarah Johnson", avatar: "/placeholder.svg", username: "sarah_j" },
      content: "Amazing night at this place! The vibe was perfect 🎉",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 8,
      media: [
        { id: "1", type: "image" as const, url: "/placeholder.svg" }
      ]
    },
    {
      id: "2", 
      user: { name: "Mike Chen", avatar: "/placeholder.svg", username: "mike_c" },
      content: "Great cocktails and awesome music. Definitely coming back!",
      timestamp: "1 day ago",
      likes: 15,
      comments: 3,
      media: [
        { id: "2", type: "image" as const, url: "/placeholder.svg" }
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Recent Vibes</h3>
      <div className="space-y-4">
        {recentPosts.map((post) => (
          <div key={post.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center space-x-3">
              <img 
                src={post.user.avatar} 
                alt={post.user.name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="font-medium text-sm">{post.user.name}</p>
                <p className="text-xs text-muted-foreground">@{post.user.username}</p>
              </div>
              <span className="text-xs text-muted-foreground ml-auto">{post.timestamp}</span>
            </div>
            
            <p className="text-sm">{post.content}</p>
            
            {post.media.length > 0 && (
              <img 
                src={post.media[0].url} 
                alt="Post media"
                className="w-full h-32 object-cover rounded-lg"
              />
            )}
            
            <div className="flex items-center space-x-4 pt-2">
              <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                <Heart className="h-4 w-4" />
                <span>{post.likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                <MessageCircle className="h-4 w-4" />
                <span>{post.comments}</span>
              </Button>
              <Button variant="ghost" size="sm">
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentVibes;
