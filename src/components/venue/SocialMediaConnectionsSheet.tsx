
import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import SocialMediaSettings from './SocialMediaSettings';
import SocialMediaIntegration from './SocialMediaIntegration';
import { SocialMediaApiKeys } from '@/services/SocialMediaService';

interface SocialMediaConnectionsSheetProps {
  onConnectedPlatformsChange?: (connectedPlatforms: Record<string, boolean>) => void;
}

const SocialMediaConnectionsSheet: React.FC<SocialMediaConnectionsSheetProps> = ({ 
  onConnectedPlatformsChange 
}) => {
  const [activeTab, setActiveTab] = useState<'connect' | 'settings'>('connect');
  const [apiKeys, setApiKeys] = useState<SocialMediaApiKeys>({
    instagram: '',
    tiktok: '',
    yelp: '',
    tripadvisor: '',
    foursquare: '',
    google: '',
    franki: '',
    other: '',
    otherUrl: ''
  });
  
  const handleSaveApiKeys = (keys: SocialMediaApiKeys) => {
    setApiKeys(keys);
    // This would typically connect to a backend API
    console.log('Saving API keys:', keys);
    
    // Update connected platforms based on which keys are set
    if (onConnectedPlatformsChange) {
      const connectedPlatforms: Record<string, boolean> = {};
      Object.keys(keys).forEach(key => {
        // Skip otherUrl as it's not a platform
        if (key !== 'otherUrl') {
          connectedPlatforms[key] = !!keys[key as keyof SocialMediaApiKeys];
        }
      });
      onConnectedPlatformsChange(connectedPlatforms);
    }
  };
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary" className="mt-4">Manage Social Media Connections</Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-auto">
        <SheetHeader>
          <SheetTitle>Social Media Connections</SheetTitle>
          <SheetDescription>
            Connect your social media accounts to share content and gather insights.
          </SheetDescription>
        </SheetHeader>
        
        <div className="my-6">
          <div className="flex border-b mb-4">
            <button
              className={`pb-2 px-4 ${activeTab === 'connect' ? 'border-b-2 border-primary font-semibold' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('connect')}
            >
              Connect Accounts
            </button>
            <button
              className={`pb-2 px-4 ${activeTab === 'settings' ? 'border-b-2 border-primary font-semibold' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('settings')}
            >
              API Settings
            </button>
          </div>
          
          {activeTab === 'connect' ? (
            <SocialMediaIntegration 
              subscriptionTier="standard"
              venueName="The Rooftop"
            />
          ) : (
            <SocialMediaSettings 
              onSaveApiKeys={handleSaveApiKeys}
            />
          )}
        </div>
        
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SocialMediaConnectionsSheet;
