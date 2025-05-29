
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
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="yelp">Yelp API Key <Badge className="ml-1" variant="outline">Reviews</Badge></Label>
        <Input
          id="yelp"
          type="text"
          value={apiKeys.yelp}
          onChange={(e) => onInputChange('yelp', e.target.value)}
          placeholder="Enter Yelp API Key"
        />
        <p className="text-xs text-muted-foreground">
          Used to fetch customer reviews from Yelp
        </p>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="tripadvisor">TripAdvisor API Key <Badge className="ml-1" variant="outline">Reviews</Badge></Label>
        <Input
          id="tripadvisor"
          type="text"
          value={apiKeys.tripadvisor}
          onChange={(e) => onInputChange('tripadvisor', e.target.value)}
          placeholder="Enter TripAdvisor API Key"
        />
        <p className="text-xs text-muted-foreground">
          Used to fetch TripAdvisor reviews and ratings
        </p>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="google">Google Business API Key <Badge className="ml-1" variant="outline">Reviews</Badge></Label>
        <Input
          id="google"
          type="text"
          value={apiKeys.google}
          onChange={(e) => onInputChange('google', e.target.value)}
          placeholder="Enter Google API Key"
        />
        <p className="text-xs text-muted-foreground">
          Used to fetch Google My Business reviews
        </p>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="foursquare">Foursquare API Key <Badge className="ml-1" variant="outline">Reviews</Badge></Label>
        <Input
          id="foursquare"
          type="text"
          value={apiKeys.foursquare}
          onChange={(e) => onInputChange('foursquare', e.target.value)}
          placeholder="Enter Foursquare API Key"
        />
        <p className="text-xs text-muted-foreground">
          Used to fetch tips and reviews from Foursquare
        </p>
      </div>
      
      <div className="grid gap-2 border-t pt-4 mt-4">
        <Label htmlFor="other">Other Platform API Key <Badge className="ml-1" variant="outline">Custom</Badge></Label>
        <div className="grid grid-cols-3 gap-2">
          <Input
            className="col-span-2"
            id="other"
            type="text"
            value={apiKeys.other}
            onChange={(e) => onInputChange('other', e.target.value)}
            placeholder="Enter API Key"
          />
          <Input
            value={otherPlatformName}
            onChange={(e) => setOtherPlatformName(e.target.value)}
            placeholder="Platform Name"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="otherUrl">Platform URL</Label>
          <Input
            id="otherUrl"
            type="text"
            value={apiKeys.otherUrl}
            onChange={(e) => onInputChange('otherUrl', e.target.value)}
            placeholder="https://example.com/api"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Connect any additional review or content platform
        </p>
      </div>
    </div>
  );
};

export default ReviewPlatformSettings;
