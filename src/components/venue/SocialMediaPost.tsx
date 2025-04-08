
import React from 'react';
import { formatDistanceToNow } from "date-fns";
import { SocialMediaPost as SocialMediaPostType } from "@/services/SocialMediaService";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Star, ExternalLink } from "lucide-react";

interface SocialMediaPostProps {
  post: SocialMediaPostType;
}

const SocialMediaPost: React.FC<SocialMediaPostProps> = ({ post }) => {
  const timeAgo = formatDistanceToNow(new Date(post.timestamp), { addSuffix: true });
  
  // Function to get platform-specific colors and icons
  const getPlatformStyles = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return {
          bgColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
          textColor: 'text-white',
          icon: '📷'
        };
      case 'tiktok':
        return {
          bgColor: 'bg-black',
          textColor: 'text-white',
          icon: '🎵'
        };
      case 'yelp':
        return {
          bgColor: 'bg-red-600',
          textColor: 'text-white',
          icon: '★'
        };
      default:
        return {
          bgColor: 'bg-primary',
          textColor: 'text-primary-foreground',
          icon: '📱'
        };
    }
  };
  
  const platformStyles = getPlatformStyles(post.source);
  
  // Render star rating for Yelp reviews
  const renderRating = () => {
    if (post.source === 'yelp' && post.rating) {
      return (
        <div className="flex items-center mt-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`w-4 h-4 ${
                index < post.rating! ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="overflow-hidden border-2 border-muted/50">
      <CardHeader className={`p-3 ${platformStyles.bgColor} ${platformStyles.textColor}`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-lg">{platformStyles.icon}</span>
            <span className="font-medium capitalize">{post.source}</span>
          </div>
          <span className="text-xs">{timeAgo}</span>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar>
            <AvatarImage src={post.userAvatar} alt={post.username} />
            <AvatarFallback>{post.username[0]}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="font-medium">@{post.username}</div>
            {renderRating()}
            <p className="mt-2">{post.content}</p>
            
            {post.mediaUrl && (
              <div className="mt-3 rounded-lg overflow-hidden">
                {post.mediaType === 'image' ? (
                  <img 
                    src={post.mediaUrl} 
                    alt={`${post.username}'s post`}
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  <video 
                    src={post.mediaUrl}
                    controls
                    className="w-full h-auto"
                    poster="https://source.unsplash.com/random/500x300/?nightlife"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-3 bg-muted/20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm">
            <Heart className="w-4 h-4" />
            <span>{post.likes || 0}</span>
          </div>
          
          <div className="flex items-center gap-1 text-sm">
            <MessageCircle className="w-4 h-4" />
            <span>{post.comments || 0}</span>
          </div>
        </div>
        
        <a
          href={`https://${post.source}.com`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground flex items-center hover:underline"
        >
          View on {post.source} <ExternalLink className="w-3 h-3 ml-1" />
        </a>
      </CardFooter>
    </Card>
  );
};

export default SocialMediaPost;
