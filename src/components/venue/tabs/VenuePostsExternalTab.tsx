
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Instagram, Star, MessageCircle, Heart } from "lucide-react";
import { Location, SocialMediaPost } from '@/types';

interface VenuePostsExternalTabProps {
  venue: Location;
  connectedPlatforms: Record<string, boolean>;
  onConnectedPlatformsChange: (platforms: Record<string, boolean>) => void;
}

const VenuePostsExternalTab: React.FC<VenuePostsExternalTabProps> = ({
  venue,
  connectedPlatforms,
  onConnectedPlatformsChange
}) => {
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const mockSocialPosts: SocialMediaPost[] = [
    {
      id: 'ext-1',
      content: 'Had an amazing dinner here! The atmosphere is perfect for date night 💕',
      author: 'Sarah Johnson',
      username: 'saraheats',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b890?w=100&h=100&fit=crop',
      timestamp: '2024-01-15T19:30:00Z',
      platform: 'Instagram',
      source: 'instagram' as const,
      likes: 124,
      comments: 15,
      media: [{
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&h=600&fit=crop'
      }]
    },
    {
      id: 'ext-2',
      content: 'Great service and excellent food! Highly recommend this place.',
      author: 'Mike Chen',
      username: 'mikechen',
      rating: 5,
      timestamp: '2024-01-14T20:15:00Z',
      platform: 'Google',
      source: 'google' as const,
      likes: 8,
      comments: 2
    }
  ];

  useEffect(() => {
    if (Object.values(connectedPlatforms).some(connected => connected)) {
      setIsLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        setPosts(mockSocialPosts);
        setIsLoading(false);
      }, 1000);
    } else {
      setPosts([]);
    }
  }, [connectedPlatforms]);

  const handlePlatformToggle = (platform: string) => {
    const newPlatforms = {
      ...connectedPlatforms,
      [platform]: !connectedPlatforms[platform]
    };
    onConnectedPlatformsChange(newPlatforms);
  };

  const platforms = [
    { key: 'instagram', name: 'Instagram', icon: Instagram },
    { key: 'google', name: 'Google Reviews', icon: Star },
    { key: 'yelp', name: 'Yelp', icon: MessageCircle }
  ];

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="text-neutral-400">Loading social media posts...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-neutral-900 border-neutral-700">
        <CardHeader>
          <CardTitle className="text-white">Platform Connections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {platforms.map((platform) => {
              const IconComponent = platform.icon;
              return (
                <div key={platform.key} className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <IconComponent className="h-5 w-5 text-neutral-400" />
                    <span className="text-white">{platform.name}</span>
                  </div>
                  <Switch
                    checked={connectedPlatforms[platform.key] || false}
                    onCheckedChange={() => handlePlatformToggle(platform.key)}
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="bg-neutral-900 border-neutral-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  {post.userAvatar && (
                    <img 
                      src={post.userAvatar} 
                      alt={post.author}
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-white">{post.author}</span>
                      {post.username && (
                        <span className="text-sm text-neutral-400">@{post.username}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs text-neutral-400">
                        {post.platform}
                      </Badge>
                      {post.rating && (
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 mr-1" />
                          <span className="text-xs text-neutral-400">{post.rating}/5</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <p className="text-neutral-200 mb-3">{post.content}</p>
                
                {post.media && post.media.length > 0 && (
                  <div className="mb-3">
                    <img 
                      src={post.media[0].url} 
                      alt="Social media post"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                
                <div className="flex items-center space-x-4 text-sm text-neutral-400">
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.comments}</span>
                  </div>
                  <span className="text-xs">
                    {new Date(post.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-8 text-center">
            <div className="text-neutral-400">
              <Instagram className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No Social Media Posts</h3>
              <p className="text-sm">
                Connect your social media platforms to see posts and reviews about {venue.name}
              </p>
              <Button 
                className="mt-4" 
                onClick={() => handlePlatformToggle('instagram')}
              >
                Connect Instagram
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VenuePostsExternalTab;
