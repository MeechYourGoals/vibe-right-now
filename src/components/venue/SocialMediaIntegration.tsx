
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Instagram, Twitter, Facebook, Youtube, ExternalLink, Key } from "lucide-react";
import { SocialMediaPost } from '@/types';

interface SocialMediaIntegrationProps {
  subscriptionTier: string;
  venueName: string;
}

const SocialMediaIntegration: React.FC<SocialMediaIntegrationProps> = ({
  subscriptionTier,
  venueName
}) => {
  const [connectedPlatforms, setConnectedPlatforms] = useState({
    instagram: false,
    twitter: false,
    facebook: false,
    youtube: false
  });

  const [posts, setPosts] = useState<SocialMediaPost[]>([]);

  const mockPosts: SocialMediaPost[] = [
    {
      id: 'sm-1',
      content: 'Amazing night at this venue! The atmosphere is incredible 🔥',
      author: 'John Doe',
      username: 'johndoe',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      timestamp: '2024-01-15T20:30:00Z',
      platform: 'Instagram',
      source: 'instagram' as const,
      likes: 245,
      comments: 23,
      media: [{
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=600&fit=crop'
      }]
    }
  ];

  const handleConnect = (platform: string) => {
    setConnectedPlatforms(prev => ({
      ...prev,
      [platform]: !prev[platform as keyof typeof prev]
    }));
    
    // Simulate fetching posts when connecting
    if (!connectedPlatforms[platform as keyof typeof connectedPlatforms]) {
      setPosts(mockPosts);
    }
  };

  const platforms = [
    {
      name: 'Instagram',
      icon: Instagram,
      key: 'instagram',
      description: 'Connect your Instagram Business account',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      key: 'twitter',
      description: 'Link your Twitter profile',
      color: 'bg-blue-500'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      key: 'facebook',
      description: 'Connect your Facebook Page',
      color: 'bg-blue-600'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      key: 'youtube',
      description: 'Link your YouTube channel',
      color: 'bg-red-500'
    }
  ];

  const isPremium = ['plus', 'premium', 'pro'].includes(subscriptionTier);

  return (
    <Card className="bg-neutral-900 border-neutral-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white">Social Media Integration</CardTitle>
            <CardDescription className="text-neutral-400">
              Connect your social media accounts to aggregate posts and reviews
            </CardDescription>
          </div>
          {!isPremium && (
            <Badge variant="outline" className="text-amber-400 border-amber-600">
              Premium Feature
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {platforms.map((platform) => {
            const IconComponent = platform.icon;
            const isConnected = connectedPlatforms[platform.key as keyof typeof connectedPlatforms];
            
            return (
              <div key={platform.key} className="p-4 border border-neutral-700 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${platform.color}`}>
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{platform.name}</h4>
                      <p className="text-sm text-neutral-400">{platform.description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={isConnected}
                    onCheckedChange={() => handleConnect(platform.key)}
                    disabled={!isPremium}
                  />
                </div>
                
                {isConnected && isPremium && (
                  <div className="space-y-2">
                    <Label htmlFor={`${platform.key}-key`} className="text-sm text-neutral-300">
                      API Key
                    </Label>
                    <div className="flex space-x-2">
                      <Input
                        id={`${platform.key}-key`}
                        type="password"
                        placeholder="Enter API key..."
                        className="bg-neutral-800 border-neutral-600 text-white"
                      />
                      <Button variant="outline" size="sm" className="border-neutral-600">
                        <Key className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!isPremium && (
          <div className="p-4 bg-amber-900/20 border border-amber-600/30 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <ExternalLink className="h-5 w-5 text-amber-400" />
              <h4 className="font-medium text-amber-400">Upgrade to Premium</h4>
            </div>
            <p className="text-sm text-amber-200 mb-3">
              Connect unlimited social media accounts and aggregate all your venue mentions in one place.
            </p>
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">
              Upgrade Now
            </Button>
          </div>
        )}

        {posts.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium text-white">Recent Social Media Posts</h4>
            <div className="space-y-3">
              {posts.map((post) => (
                <div key={post.id} className="p-3 bg-neutral-800 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <img 
                      src={post.userAvatar} 
                      alt={post.author}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm font-medium text-white">{post.author}</span>
                    <Badge variant="outline" className="text-xs text-neutral-400">
                      {post.platform}
                    </Badge>
                  </div>
                  <p className="text-sm text-neutral-300 mb-2">{post.content}</p>
                  <div className="flex space-x-4 text-xs text-neutral-400">
                    <span>{post.likes} likes</span>
                    <span>{post.comments} comments</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SocialMediaIntegration;
