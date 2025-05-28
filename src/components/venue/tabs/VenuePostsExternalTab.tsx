
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Instagram, MessageCircle, Star } from "lucide-react";
import { Location } from '@/types';

interface VenuePostsExternalTabProps {
  venue?: Location;
  venueName?: string;
  connectedPlatforms?: Record<string, boolean>;
  onConnectedPlatformsChange?: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  instagramKey?: string;
  yelpKey?: string;
  googleKey?: string;
  subscriptionTier?: 'standard' | 'plus' | 'premium' | 'pro';
}

const VenuePostsExternalTab: React.FC<VenuePostsExternalTabProps> = ({
  venue,
  venueName,
  connectedPlatforms = { instagram: false, google: false, yelp: false },
  onConnectedPlatformsChange,
  subscriptionTier = 'standard'
}) => {
  const [isConnecting, setIsConnecting] = useState<string | null>(null);

  const displayName = venue?.name || venueName || 'Venue';

  const handleConnect = async (platform: string) => {
    setIsConnecting(platform);
    
    // Simulate API connection
    setTimeout(() => {
      if (onConnectedPlatformsChange) {
        onConnectedPlatformsChange(prev => ({
          ...prev,
          [platform]: true
        }));
      }
      setIsConnecting(null);
    }, 2000);
  };

  const handleDisconnect = (platform: string) => {
    if (onConnectedPlatformsChange) {
      onConnectedPlatformsChange(prev => ({
        ...prev,
        [platform]: false
      }));
    }
  };

  const platforms = [
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      description: 'Show Instagram posts and stories mentioning your venue',
      color: 'text-pink-500'
    },
    {
      id: 'google',
      name: 'Google Reviews',
      icon: Star,
      description: 'Display Google Business reviews and ratings',
      color: 'text-blue-500'
    },
    {
      id: 'yelp',
      name: 'Yelp Reviews',
      icon: MessageCircle,
      description: 'Show Yelp reviews and customer feedback',
      color: 'text-red-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Social Media Integration</h3>
        <p className="text-muted-foreground">
          Connect social platforms to display customer posts and reviews about {displayName}
        </p>
      </div>

      <div className="grid gap-4">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          const isConnected = connectedPlatforms[platform.id];
          const isLoading = isConnecting === platform.id;

          return (
            <Card key={platform.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-6 w-6 ${platform.color}`} />
                    <div>
                      <CardTitle className="text-base">{platform.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {platform.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isConnected && (
                      <Badge variant="secondary" className="text-xs">
                        Connected
                      </Badge>
                    )}
                    <Switch
                      checked={isConnected}
                      disabled={isLoading}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handleConnect(platform.id);
                        } else {
                          handleDisconnect(platform.id);
                        }
                      }}
                    />
                  </div>
                </div>
              </CardHeader>
              
              {isConnected && (
                <CardContent className="pt-0">
                  <div className="text-sm text-muted-foreground">
                    Showing recent {platform.name.toLowerCase()} activity for {displayName}
                  </div>
                </CardContent>
              )}
              
              {isLoading && (
                <CardContent className="pt-0">
                  <div className="text-sm text-muted-foreground">
                    Connecting to {platform.name}...
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {Object.values(connectedPlatforms).every(connected => !connected) && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">
              No platforms connected yet. Connect your social media accounts to start displaying customer content.
            </p>
            <Button variant="outline" onClick={() => handleConnect('instagram')}>
              Get Started with Instagram
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VenuePostsExternalTab;
