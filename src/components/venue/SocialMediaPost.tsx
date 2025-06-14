
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Heart, MessageSquare, Star } from "lucide-react";
import { SocialMediaPost as SocialMediaPostType } from '@/services/SocialMediaService';
import { formatDistanceToNow } from 'date-fns';

interface SocialMediaPostProps {
  post: SocialMediaPostType;
  showExternalLink?: boolean;
}

const SocialMediaPost: React.FC<SocialMediaPostProps> = ({ post, showExternalLink = false }) => {
  // Function to format the platform name
  const formatPlatformName = (source: string) => {
    if (source === 'tripadvisor') return 'TripAdvisor';
    if (source === 'foursquare') return 'Foursquare';
    return source.charAt(0).toUpperCase() + source.slice(1);
  };
  
  // Get the color for platform badge
  const getPlatformColor = (source: string): string => {
    const colors: Record<string, string> = {
      instagram: 'bg-pink-500',
      tiktok: 'bg-black',
      yelp: 'bg-red-500',
      tripadvisor: 'bg-green-600',
      google: 'bg-blue-500',
      foursquare: 'bg-blue-700',
      franki: 'bg-purple-500',
      other: 'bg-gray-500'
    };
    
    return colors[source] || 'bg-primary';
  };
  
  // Function to render stars for ratings
  const renderStars = (rating: number | undefined) => {
    if (!rating) return null;
    
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex items-center">
        {Array(fullStars).fill(0).map((_, i) => (
          <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star className="h-4 w-4 text-muted" />
            <div className="absolute top-0 left-0 overflow-hidden w-1/2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        )}
        {Array(emptyStars).fill(0).map((_, i) => (
          <Star key={`empty-${i}`} className="h-4 w-4 text-muted" />
        ))}
      </div>
    );
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-3 pb-1">
        <div className="flex justify-between items-start">
          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-muted">
              <img 
                src={post.userAvatar} 
                alt={post.username} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-medium text-sm">{post.username}</div>
              <div className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
              </div>
            </div>
          </div>
          <Badge className={`${getPlatformColor(post.source)} text-white`}>
            {formatPlatformName(post.source)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-3 pt-2">
        {post.rating !== undefined && (
          <div className="mb-2">
            {renderStars(post.rating)}
          </div>
        )}
        
        <p className="text-sm">{post.content}</p>
        
        {post.mediaUrl && (
          <div className="mt-3 rounded-md overflow-hidden">
            {post.mediaType === 'image' ? (
              <img 
                src={post.mediaUrl} 
                alt="Post content" 
                className="w-full object-cover rounded"
                style={{ maxHeight: '300px' }}
              />
            ) : (
              <video
                src={post.mediaUrl}
                controls
                className="w-full rounded"
                style={{ maxHeight: '300px' }}
              />
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-2 flex justify-between items-center border-t">
        <div className="flex items-center text-muted-foreground text-xs space-x-3">
          {post.likes !== undefined && (
            <div className="flex items-center">
              <Heart className="h-3.5 w-3.5 mr-1" />
              <span>{post.likes}</span>
            </div>
          )}
          
          {post.comments !== undefined && (
            <div className="flex items-center">
              <MessageSquare className="h-3.5 w-3.5 mr-1" />
              <span>{post.comments}</span>
            </div>
          )}
        </div>
        
        {(showExternalLink && post.originalUrl) && (
          <Button variant="ghost" size="sm" asChild className="h-7 text-xs">
            <a 
              href={post.originalUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center"
            >
              View Original
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default SocialMediaPost;
