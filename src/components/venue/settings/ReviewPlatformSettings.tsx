
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SocialMediaApiKeys } from "@/services/socialMedia/types";
import { Star } from "lucide-react";

interface ReviewPlatformSettingsProps {
  apiKeys: SocialMediaApiKeys;
  onApiKeyChange: (platform: keyof SocialMediaApiKeys, value: string) => void;
}

const ReviewPlatformSettings = ({ apiKeys, onApiKeyChange }: ReviewPlatformSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Review Platform Settings</CardTitle>
        <CardDescription>
          Configure which review platforms to display on your venue page.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Yelp */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Star className="h-5 w-5 text-red-500" />
              <div>
                <Label htmlFor="yelp-enabled">Yelp Reviews</Label>
                <p className="text-sm text-muted-foreground">Display Yelp reviews and ratings</p>
              </div>
            </div>
            <Switch 
              id="yelp-enabled"
              checked={!!apiKeys.yelp}
              disabled={!apiKeys.yelp}
            />
          </div>
          {!apiKeys.yelp && (
            <Input
              placeholder="Enter Yelp API key"
              type="password"
              onChange={(e) => onApiKeyChange('yelp', e.target.value)}
            />
          )}
        </div>

        {/* Google */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-5 w-5 bg-blue-500 rounded-full" />
              <div>
                <Label htmlFor="google-reviews-enabled">Google Reviews</Label>
                <p className="text-sm text-muted-foreground">Show Google Business reviews</p>
              </div>
            </div>
            <Switch 
              id="google-reviews-enabled"
              checked={!!apiKeys.google}
              disabled={!apiKeys.google}
            />
          </div>
          {!apiKeys.google && (
            <Input
              placeholder="Enter Google Places API key"
              type="password"
              onChange={(e) => onApiKeyChange('google', e.target.value)}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewPlatformSettings;
