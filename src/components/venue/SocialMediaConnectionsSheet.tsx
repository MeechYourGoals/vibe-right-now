
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

// Add the missing type definition
interface SocialMediaApiKeys {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  tiktok?: string;
  yelp?: string;
  google?: string;
}

const SocialMediaConnectionsSheet = () => {
  const [activeTab, setActiveTab] = useState<'connect' | 'settings'>('connect');
  const [apiKeys, setApiKeys] = useState<SocialMediaApiKeys>({
    facebook: '',
    instagram: '',
    twitter: '',
    tiktok: '',
    yelp: '',
    google: '',
  });
  
  const handleSaveApiKeys = (keys: SocialMediaApiKeys) => {
    setApiKeys(keys);
    // This would typically connect to a backend API
    console.log('Saving API keys:', keys);
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
            <SocialMediaIntegration />
          ) : (
            <SocialMediaSettings 
              onSaveApiKeys={handleSaveApiKeys} 
              initialApiKeys={apiKeys}
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
