
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { SocialMediaApiKeys } from '@/services/SocialMediaService';

interface ContentPlatformSettingsProps {
  apiKeys: SocialMediaApiKeys;
  onInputChange: (platform: keyof SocialMediaApiKeys, value: string) => void;
}

const ContentPlatformSettings: React.FC<ContentPlatformSettingsProps> = ({ 
  apiKeys, 
  onInputChange 
}) => {
  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="instagram">Instagram API Key <Badge className="ml-1" variant="outline">Content</Badge></Label>
        <Input
          id="instagram"
          type="text"
          value={apiKeys.instagram}
          onChange={(e) => onInputChange('instagram', e.target.value)}
          placeholder="Enter Instagram API Key"
        />
        <p className="text-xs text-muted-foreground">
          Used to fetch images and videos posted on Instagram about this venue
        </p>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="tiktok">TikTok API Key <Badge className="ml-1" variant="outline">Content</Badge></Label>
        <Input
          id="tiktok"
          type="text"
          value={apiKeys.tiktok}
          onChange={(e) => onInputChange('tiktok', e.target.value)}
          placeholder="Enter TikTok API Key"
        />
        <p className="text-xs text-muted-foreground">
          Used to fetch TikTok videos tagged with this venue
        </p>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="franki">Franki API Key <Badge className="ml-1" variant="outline">Content</Badge></Label>
        <Input
          id="franki"
          type="text"
          value={apiKeys.franki}
          onChange={(e) => onInputChange('franki', e.target.value)}
          placeholder="Enter Franki API Key"
        />
        <p className="text-xs text-muted-foreground">
          Used to fetch Franki posts and recommendations for this venue
        </p>
      </div>
    </div>
  );
};

export default ContentPlatformSettings;
