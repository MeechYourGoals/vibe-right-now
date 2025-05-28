
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Instagram, Star, ExternalLink } from "lucide-react";
import { SocialMediaPost, SocialMediaApiKeys } from '@/types';
import SocialMediaService from '@/services/SocialMediaService';

interface SocialMediaFeedProps {
  venueId: string;
  apiKeys: SocialMediaApiKeys;
  connectedPlatforms: Record<string, boolean>;
}

const SocialMediaFeed: React.FC<SocialMediaFeedProps> = ({
  venueId,
  apiKeys,
  connectedPlatforms
}) => {
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        SocialMediaService.setApiKeys(apiKeys);
        const fetchedPosts = await SocialMediaService.fetchAllPosts(venueId);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching social media posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (Object.values(connectedPlatforms).some(connected => connected)) {
      fetchPosts();
    }
  }, [venueId, apiKeys, connectedPlatforms]);

  if (isLoading) {
    return <div className="text-center py-8">Loading social media posts...</div>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id} className="bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {post.userAvatar && (
                  <img 
                    src={post.userAvatar} 
                    alt={post.author}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium text-white">{post.author}</p>
                  {post.username && (
                    <p className="text-sm text-neutral-400">@{post.username}</p>
                  )}
                </div>
              </div>
              <Badge variant="outline" className="text-neutral-300">
                <Instagram className="w-3 h-3 mr-1" />
                {post.platform}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-200 mb-3">{post.content}</p>
            
            {post.rating && (
              <div className="flex items-center mb-2">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="text-sm text-neutral-300">{post.rating}/5</span>
              </div>
            )}
            
            {post.media && post.media.length > 0 && (
              <div className="mb-3">
                {post.media[0].type === 'image' ? (
                  <img 
                    src={post.media[0].url} 
                    alt="Social media post"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ) : (
                  <video 
                    src={post.media[0].url}
                    className="w-full h-48 object-cover rounded-lg"
                    controls
                  />
                )}
              </div>
            )}
            
            <div className="flex items-center justify-between text-sm text-neutral-400">
              <div className="flex space-x-4">
                <span>{post.likes} likes</span>
                <span>{post.comments} comments</span>
              </div>
              <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-white">
                <ExternalLink className="w-4 h-4 mr-1" />
                View Original
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {posts.length === 0 && (
        <div className="text-center py-8 text-neutral-400">
          No social media posts found. Connect your platforms to see content here.
        </div>
      )}
    </div>
  );
};

export default SocialMediaFeed;
