
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SocialMediaApiKeys } from "@/services/socialMedia/types";
import { Instagram } from "lucide-react";

interface ContentPlatformSettingsProps {
  apiKeys: SocialMediaApiKeys;
  onApiKeyChange: (platform: keyof SocialMediaApiKeys, value: string) => void;
}

const ContentPlatformSettings = ({ apiKeys, onApiKeyChange }: ContentPlatformSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Platform Settings</CardTitle>
        <CardDescription>
          Configure which content platforms to display on your venue page.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Instagram */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Instagram className="h-5 w-5 text-pink-500" />
            <div>
              <Label htmlFor="instagram-enabled">Instagram Posts</Label>
              <p className="text-sm text-muted-foreground">Display Instagram posts from customers</p>
            </div>
          </div>
          <Switch 
            id="instagram-enabled"
            checked={!!apiKeys.instagram}
            disabled={!apiKeys.instagram}
          />
        </div>

        {/* Google */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-5 w-5 bg-blue-500 rounded-full" />
            <div>
              <Label htmlFor="google-enabled">Google Reviews</Label>
              <p className="text-sm text-muted-foreground">Show Google Business reviews</p>
            </div>
          </div>
          <Switch 
            id="google-enabled"
            checked={!!apiKeys.google}
            disabled={!apiKeys.google}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentPlatformSettings;
