
import React, { useState, useEffect } from 'react';
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import SocialMediaSettings from "@/components/venue/SocialMediaSettings";
import { SocialMediaApiKeys } from '@/services/SocialMediaService';
import { toast } from 'sonner';

interface SocialMediaConnectionsSheetProps {
  onConnectedPlatformsChange: (platforms: Record<string, boolean>) => void;
}

const SocialMediaConnectionsSheet: React.FC<SocialMediaConnectionsSheetProps> = ({
  onConnectedPlatformsChange
}) => {
  // State for social media API keys 
  const [socialMediaApiKeys, setSocialMediaApiKeys] = useState<SocialMediaApiKeys>({
    instagram: '',
    tiktok: '',
    yelp: '',
    tripadvisor: '',
    foursquare: '',
    google: '',
    franki: '',
    other: ''
  });
  
  // Load saved API keys on component mount
  useEffect(() => {
    const savedKeys = localStorage.getItem('socialMediaApiKeys');
    if (savedKeys) {
      try {
        const parsedKeys = JSON.parse(savedKeys);
        setSocialMediaApiKeys(parsedKeys);
      } catch (error) {
        console.error('Error parsing saved API keys:', error);
      }
    }
  }, []);
  
  // Handle saving API keys
  const handleSaveApiKeys = (keys: SocialMediaApiKeys) => {
    setSocialMediaApiKeys(keys);
    
    // Update connected platforms based on provided keys
    const connected: Record<string, boolean> = {};
    Object.keys(keys).forEach(key => {
      connected[key] = !!keys[key];
    });
    onConnectedPlatformsChange(connected);
    
    // Save keys to localStorage
    localStorage.setItem('socialMediaApiKeys', JSON.stringify(keys));
    toast.success('Social media connections updated');
  };
  
  return (
    <SheetContent className="min-w-[400px] sm:max-w-[540px]">
      <SheetHeader>
        <SheetTitle>Social Media Integration</SheetTitle>
        <SheetDescription>
          Connect external platforms to aggregate content about this venue
        </SheetDescription>
      </SheetHeader>
      <div className="mt-4">
        <SocialMediaSettings 
          onSaveApiKeys={handleSaveApiKeys}
          initialApiKeys={socialMediaApiKeys}
        />
      </div>
    </SheetContent>
  );
};

export default SocialMediaConnectionsSheet;
