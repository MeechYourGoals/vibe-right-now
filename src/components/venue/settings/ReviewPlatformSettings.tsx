
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { SocialMediaApiKeys } from '@/services/SocialMediaService';

interface ReviewPlatformSettingsProps {
  apiKeys: SocialMediaApiKeys;
  onInputChange: (platform: keyof SocialMediaApiKeys, value: string) => void;
  otherPlatformName: string;
  setOtherPlatformName: (name: string) => void;
}

const ReviewPlatformSettings: React.FC<ReviewPlatformSettingsProps> = ({
  apiKeys,
  onInputChange,
  otherPlatformName,
  setOtherPlatformName
}) => {
  return (
    <div className="space-y-4 bg-neutral-900 p-4 rounded-lg">
      <div className="grid gap-2">
        <Label htmlFor="yelp" className="text-white">Yelp API Key <Badge className="ml-1" variant="outline">Reviews</Badge></Label>
        <Input
          id="yelp"
          type="text"
          value={apiKeys.yelp}
          onChange={(e) => onInputChange('yelp', e.target.value)}
          placeholder="Enter Yelp API Key"
          className="bg-neutral-800 border-neutral-700 text-white"
        />
        <p className="text-xs text-neutral-400">
          Used to fetch customer reviews from Yelp
        </p>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="google" className="text-white">Google Business API Key <Badge className="ml-1" variant="outline">Reviews</Badge></Label>
        <Input
          id="google"
          type="text"
          value={apiKeys.google}
          onChange={(e) => onInputChange('google', e.target.value)}
          placeholder="Enter Google API Key"
          className="bg-neutral-800 border-neutral-700 text-white"
        />
        <p className="text-xs text-neutral-400">
          Used to fetch Google My Business reviews
        </p>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="franki" className="text-white">Franki API Key <Badge className="ml-1" variant="outline">Content</Badge></Label>
        <Input
          id="franki"
          type="text"
          value={apiKeys.franki}
          onChange={(e) => onInputChange('franki', e.target.value)}
          placeholder="Enter Franki API Key"
          className="bg-neutral-800 border-neutral-700 text-white"
        />
        <p className="text-xs text-neutral-400">
          Used to fetch Franki posts and recommendations for this venue
        </p>
      </div>
    </div>
  );
};

export default ReviewPlatformSettings;
