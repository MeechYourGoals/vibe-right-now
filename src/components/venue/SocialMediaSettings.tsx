
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { SocialMediaApiKeys } from "@/services/socialMedia/types";
import { Instagram, Star, Save } from "lucide-react";
import { toast } from "sonner";

const SocialMediaSettings = () => {
  const [apiKeys, setApiKeys] = useLocalStorage<SocialMediaApiKeys>('social_media_keys', {
    instagram: '',
    yelp: '',
    google: ''
  });

  const [tempKeys, setTempKeys] = useState(apiKeys);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setApiKeys(tempKeys);
      toast.success('Social media settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (platform: keyof SocialMediaApiKeys, value: string) => {
    setTempKeys(prev => ({
      ...prev,
      [platform]: value
    }));
  };

  const hasChanges = JSON.stringify(tempKeys) !== JSON.stringify(apiKeys);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Media Integration</CardTitle>
        <CardDescription>
          Connect your social media platforms to display reviews and posts from customers.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Instagram */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Instagram className="h-5 w-5 text-pink-500" />
            <Label htmlFor="instagram">Instagram API Key</Label>
          </div>
          <Input
            id="instagram"
            type="password"
            placeholder="Enter Instagram API key"
            value={tempKeys.instagram}
            onChange={(e) => handleInputChange('instagram', e.target.value)}
          />
        </div>

        {/* Yelp */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-red-500" />
            <Label htmlFor="yelp">Yelp API Key</Label>
          </div>
          <Input
            id="yelp"
            type="password"
            placeholder="Enter Yelp API key"
            value={tempKeys.yelp}
            onChange={(e) => handleInputChange('yelp', e.target.value)}
          />
        </div>

        {/* Google */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 bg-blue-500 rounded-full" />
            <Label htmlFor="google">Google Places API Key</Label>
          </div>
          <Input
            id="google"
            type="password"
            placeholder="Enter Google Places API key"
            value={tempKeys.google}
            onChange={(e) => handleInputChange('google', e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <Button 
            onClick={handleSave} 
            disabled={!hasChanges || isLoading}
            className="flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>{isLoading ? 'Saving...' : 'Save Settings'}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialMediaSettings;
