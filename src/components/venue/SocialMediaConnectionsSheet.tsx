
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { SocialMediaApiKeys } from "@/services/socialMedia/types";
import { Instagram, Star } from "lucide-react";

interface SocialMediaConnectionsSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const SocialMediaConnectionsSheet = ({ isOpen, onClose }: SocialMediaConnectionsSheetProps) => {
  const [apiKeys, setApiKeys] = useLocalStorage<SocialMediaApiKeys>('social_media_keys', {
    instagram: '',
    yelp: '',
    google: ''
  });

  const [tempKeys, setTempKeys] = useState(apiKeys);

  const handleSave = () => {
    setApiKeys(tempKeys);
    onClose();
  };

  const handleInputChange = (platform: keyof SocialMediaApiKeys, value: string) => {
    setTempKeys(prev => ({
      ...prev,
      [platform]: value
    }));
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Connect Social Media Platforms</SheetTitle>
          <SheetDescription>
            Add your API keys to connect social media platforms and display reviews/posts.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-6 py-4">
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
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SocialMediaConnectionsSheet;
