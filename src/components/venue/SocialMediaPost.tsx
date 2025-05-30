
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Heart, MessageCircle, Share, ExternalLink } from "lucide-react";
import { SocialMediaPost as SocialMediaPostType } from '@/types';

interface SocialMediaPostProps {
  post: SocialMediaPostType;
}

const SocialMediaPost: React.FC<SocialMediaPostProps> = ({ post }) => {
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return '📷';
      case 'google':
        return '🔍';
      case 'yelp':
        return '🍽️';
      default:
        return '📱';
    }
  };

  return (
    <Card className="bg-neutral-900 border-neutral-700 text-white">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {post.userAvatar && (
              <img 
                src={post.userAvatar}
                alt={post.author}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            <div>
              <h4 className="font-medium text-white">{post.author}</h4>
              {post.username && (
                <p className="text-sm text-neutral-400">@{post.username}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-neutral-300 border-neutral-600">
              {getPlatformIcon(post.platform)} {post.platform}
            </Badge>
            <span className="text-xs text-neutral-400">
              {formatTimestamp(post.timestamp)}
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-neutral-200 leading-relaxed">{post.content}</p>
        
        {post.rating && (
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i}
                className={`w-4 h-4 ${
                  i < post.rating! ? 'text-yellow-500 fill-current' : 'text-neutral-600'
                }`}
              />
            ))}
            <span className="text-sm text-neutral-400 ml-2">
              {post.rating}/5
            </span>
          </div>
        )}
        
        {post.media && post.media.length > 0 && (
          <div className="space-y-2">
            {post.media.map((mediaItem, index) => (
              <div key={index} className="rounded-lg overflow-hidden">
                {mediaItem.type === 'image' ? (
                  <img 
                    src={mediaItem.url}
                    alt="Post media"
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <video 
                    src={mediaItem.url}
                    className="w-full h-64 object-cover"
                    controls
                    poster={mediaItem.url}
                  />
                )}
              </div>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between pt-2 border-t border-neutral-700">
          <div className="flex items-center space-x-4 text-sm text-neutral-400">
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{post.likes || 0}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>{post.comments || 0}</span>
            </div>
            {post.engagement?.shares && (
              <div className="flex items-center space-x-1">
                <Share className="w-4 h-4" />
                <span>{post.engagement.shares}</span>
              </div>
            )}
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-neutral-400 hover:text-white"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            View Original
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialMediaPost;
