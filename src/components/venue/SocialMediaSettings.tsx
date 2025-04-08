
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { SocialMediaApiKeys } from "@/services/SocialMediaService";

interface SocialMediaSettingsProps {
  onSaveApiKeys: (keys: SocialMediaApiKeys) => void;
}

const SocialMediaSettings: React.FC<SocialMediaSettingsProps> = ({ onSaveApiKeys }) => {
  const [apiKeys, setApiKeys] = useState<SocialMediaApiKeys>({
    instagram: '',
    tiktok: '',
    yelp: ''
  });

  useEffect(() => {
    // Load saved API keys from localStorage
    const savedKeys = localStorage.getItem('socialMediaApiKeys');
    if (savedKeys) {
      try {
        setApiKeys(JSON.parse(savedKeys));
      } catch (error) {
        console.error('Error parsing saved API keys:', error);
      }
    }
  }, []);

  const handleInputChange = (platform: keyof SocialMediaApiKeys, value: string) => {
    setApiKeys(prev => ({ ...prev, [platform]: value }));
  };

  const handleSaveKeys = () => {
    // Save API keys to localStorage
    localStorage.setItem('socialMediaApiKeys', JSON.stringify(apiKeys));
    onSaveApiKeys(apiKeys);
    toast.success("Social media API keys saved successfully!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Media Integration</CardTitle>
        <CardDescription>
          Connect your social media accounts to aggregate content from other platforms.
          You'll need API keys from each platform you want to integrate.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="instagram-api">Instagram API Key</Label>
          <Input
            id="instagram-api"
            type="password"
            placeholder="Enter your Instagram Graph API key"
            value={apiKeys.instagram}
            onChange={(e) => handleInputChange('instagram', e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Used to fetch Instagram posts mentioning your venue
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tiktok-api">TikTok API Key</Label>
          <Input
            id="tiktok-api"
            type="password"
            placeholder="Enter your TikTok API key"
            value={apiKeys.tiktok}
            onChange={(e) => handleInputChange('tiktok', e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Used to fetch TikTok videos tagged at your venue
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="yelp-api">Yelp API Key</Label>
          <Input
            id="yelp-api"
            type="password"
            placeholder="Enter your Yelp Fusion API key"
            value={apiKeys.yelp}
            onChange={(e) => handleInputChange('yelp', e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Used to fetch reviews of your venue from Yelp
          </p>
        </div>
        
        <Button onClick={handleSaveKeys} className="w-full">
          Save API Keys
        </Button>
        
        <p className="text-xs text-muted-foreground mt-4">
          Note: For demonstration purposes, mock data will be displayed regardless of the API keys provided.
          In a production environment, valid API keys would be required.
        </p>
      </CardContent>
    </Card>
  );
};

export default SocialMediaSettings;
