
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Heart, MessageCircle, Eye } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Media } from "@/types";

interface RecentVibesProps {
  locationId: string;
}

const RecentVibes = ({ locationId }: RecentVibesProps) => {
  // Mock recent posts for this location
  const recentPosts = [
    {
      id: "1",
      user: {
        name: "Alex Johnson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        username: "alexj"
      },
      content: "Amazing rooftop vibes! The sunset view is incredible 🌅",
      timestamp: "2 hours ago",
      media: [{ 
        id: "media-1",
        type: "image" as const, 
        url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop" 
      }] as Media[],
      likes: 24,
      comments: 8,
      views: 156
    },
    {
      id: "2", 
      user: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        username: "sarahc"
      },
      content: "Best cocktails in the city! The bartender knows his craft 🍸",
      timestamp: "4 hours ago",
      media: [{ 
        id: "media-2",
        type: "image" as const, 
        url: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&h=300&fit=crop" 
      }] as Media[],
      likes: 18,
      comments: 5,
      views: 89
    }
  ];

  return (
    <Card className="bg-neutral-900 border-neutral-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-lg flex items-center">
          Recent Vibes
          <Badge variant="secondary" className="ml-2 bg-green-600 text-white">
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentPosts.map((post) => (
          <div key={post.id} className="bg-neutral-800 rounded-lg p-3 space-y-3">
            <div className="flex items-start space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={post.user.avatar} alt={post.user.name} />
                <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-white text-sm">{post.user.name}</span>
                  <span className="text-neutral-400 text-xs">@{post.user.username}</span>
                  <span className="text-neutral-500 text-xs flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {post.timestamp}
                  </span>
                </div>
                <p className="text-neutral-200 text-sm mt-1">{post.content}</p>
              </div>
            </div>
            
            {post.media && post.media.length > 0 && (
              <div className="rounded-lg overflow-hidden">
                <img 
                  src={post.media[0].url} 
                  alt="Post content"
                  className="w-full h-40 object-cover"
                />
              </div>
            )}
            
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <Heart className="w-3 h-3 mr-1" />
                  {post.likes}
                </span>
                <span className="flex items-center">
                  <MessageCircle className="w-3 h-3 mr-1" />
                  {post.comments}
                </span>
                <span className="flex items-center">
                  <Eye className="w-3 h-3 mr-1" />
                  {post.views}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentVibes;
