import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Link, Lock, Unlock } from "lucide-react";

interface SocialMediaIntegrationProps {
  subscriptionTier: 'standard' | 'plus' | 'premium' | 'pro';
  venueName: string;
}

interface PlatformCardProps {
  platform: string;
  name: string;
  description: string;
  isConnected: boolean;
  onConnect: () => void;
  isAvailable: boolean;
  subscriptionTier: string;
}

const SocialMediaIntegration = ({ subscriptionTier, venueName }: SocialMediaIntegrationProps) => {
  const [connectedPlatforms, setConnectedPlatforms] = useState<Record<string, boolean>>({
    instagram: false,
    tiktok: false,
    yelp: false,
    google: false,
    franki: false
  });

  const [apiKeys, setApiKeys] = useState<Record<string, string>>({
    instagram: '',
    tiktok: '',
    yelp: '',
    google: '',
    franki: ''
  });
  
  useEffect(() => {
    const savedPlatforms = localStorage.getItem('connectedPlatforms');
    if (savedPlatforms) {
      setConnectedPlatforms(JSON.parse(savedPlatforms));
    }
    
    const savedKeys = localStorage.getItem('socialMediaApiKeys');
    if (savedKeys) {
      setApiKeys(JSON.parse(savedKeys));
    }
  }, []);

  const PlatformCard: React.FC<PlatformCardProps> = ({
    platform,
    name,
    description,
    isConnected,
    onConnect,
    isAvailable,
    subscriptionTier
  }) => {
    const isPremiumOrPro = subscriptionTier === 'premium' || subscriptionTier === 'pro';
    const canConnect = isAvailable;
    
    return (
      <Card className={`bg-neutral-800 border-neutral-700 text-white ${!canConnect ? 'opacity-50' : ''}`}>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            {name}
            {isConnected ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <Circle className="h-5 w-5 text-neutral-500" />
            )}
          </CardTitle>
          <CardDescription className="text-neutral-400">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {canConnect ? (
            <Button 
              variant="outline" 
              onClick={onConnect}
              disabled={isConnected}
              className="w-full bg-neutral-900 text-white hover:bg-neutral-700"
            >
              {isConnected ? 'Connected' : 'Connect'}
            </Button>
          ) : (
            <div className="text-center text-neutral-400">
              <Lock className="h-4 w-4 inline-block mr-1" />
              Upgrade to {subscriptionTier === 'standard' ? 'Premium' : 'Pro'} to connect
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const handleConnectPlatform = (platform: string) => {
    console.log(`Connecting to ${platform}`);
    const updatedPlatforms = {
      ...connectedPlatforms,
      [platform]: true
    };
    setConnectedPlatforms(updatedPlatforms);
    
    // Save to localStorage
    localStorage.setItem('connectedPlatforms', JSON.stringify(updatedPlatforms));
    
    setApiKeys(prev => ({
      ...prev,
      [platform]: `demo_${platform}_key_${Date.now()}`
    }));

    toast.success(`Successfully connected to ${platform.charAt(0).toUpperCase() + platform.slice(1)}!`);
  };

  return (
    <Card className="bg-neutral-900 border-neutral-700">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-white">Social Media Integration</CardTitle>
          <Badge variant="outline" className="bg-neutral-800 text-green-400 border-green-600">
            {subscriptionTier === 'premium' || subscriptionTier === 'pro' ? 'Active' : 'Limited'}
          </Badge>
        </div>
        <CardDescription className="text-neutral-400">
          Connect your social media accounts to automatically import content and reviews
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Google ecosystem platforms only */}
        <div className="grid gap-4">
          <PlatformCard
            platform="google"
            name="Google My Business"
            description="Import reviews and business insights"
            isConnected={connectedPlatforms.google}
            onConnect={() => handleConnectPlatform('google')}
            isAvailable={subscriptionTier === 'premium' || subscriptionTier === 'pro'}
            subscriptionTier={subscriptionTier}
          />
          
          <PlatformCard
            platform="yelp"
            name="Yelp"
            description="Sync reviews and ratings from Yelp"
            isConnected={connectedPlatforms.yelp}
            onConnect={() => handleConnectPlatform('yelp')}
            isAvailable={subscriptionTier === 'premium' || subscriptionTier === 'pro'}
            subscriptionTier={subscriptionTier}
          />
          
          <PlatformCard
            platform="instagram"
            name="Instagram"
            description="Import posts and stories tagged at your venue"
            isConnected={connectedPlatforms.instagram}
            onConnect={() => handleConnectPlatform('instagram')}
            isAvailable={subscriptionTier === 'premium' || subscriptionTier === 'pro'}
            subscriptionTier={subscriptionTier}
          />
          
          <PlatformCard
            platform="tiktok"
            name="TikTok"
            description="Discover videos featuring your venue"
            isConnected={connectedPlatforms.tiktok}
            onConnect={() => handleConnectPlatform('tiktok')}
            isAvailable={subscriptionTier === 'premium' || subscriptionTier === 'pro'}
            subscriptionTier={subscriptionTier}
          />
          
          <PlatformCard
            platform="franki"
            name="Franki"
            description="Connect with Franki for event discovery"
            isConnected={connectedPlatforms.franki}
            onConnect={() => handleConnectPlatform('franki')}
            isAvailable={subscriptionTier === 'premium' || subscriptionTier === 'pro'}
            subscriptionTier={subscriptionTier}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialMediaIntegration;
