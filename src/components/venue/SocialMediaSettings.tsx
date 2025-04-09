import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SocialMediaApiKeys } from '@/services/SocialMediaService';
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface SocialMediaSettingsProps {
  onSaveApiKeys: (keys: SocialMediaApiKeys) => void;
  initialApiKeys?: SocialMediaApiKeys;
}

const SocialMediaSettings: React.FC<SocialMediaSettingsProps> = ({ 
  onSaveApiKeys,
  initialApiKeys 
}) => {
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
  
  const [activeTab, setActiveTab] = useState('content');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [otherPlatformName, setOtherPlatformName] = useState('');

  // Load saved keys on component mount
  useEffect(() => {
    if (initialApiKeys) {
      setApiKeys(initialApiKeys);
    } else {
      const savedKeys = localStorage.getItem('socialMediaApiKeys');
      if (savedKeys) {
        try {
          const parsedKeys = JSON.parse(savedKeys);
          setApiKeys(parsedKeys);
          
          // Also load custom platform name if it exists
          const savedPlatformName = localStorage.getItem('otherPlatformName');
          if (savedPlatformName) {
            setOtherPlatformName(savedPlatformName);
          }
        } catch (error) {
          console.error('Error parsing saved API keys:', error);
        }
      }
    }
  }, [initialApiKeys]);

  const handleInputChange = (platform: keyof SocialMediaApiKeys, value: string) => {
    setApiKeys(prev => ({
      ...prev,
      [platform]: value
    }));
  };

  const handleSave = () => {
    // Save to localStorage for persistence
    localStorage.setItem('socialMediaApiKeys', JSON.stringify(apiKeys));
    
    // Save custom platform name if provided
    if (otherPlatformName) {
      localStorage.setItem('otherPlatformName', otherPlatformName);
    }
    
    // Call the provided callback with the updated keys
    onSaveApiKeys(apiKeys);
    
    // Show success message
    setSaveStatus('Settings saved successfully');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const clearAll = () => {
    const emptyKeys: SocialMediaApiKeys = {
      instagram: '',
      tiktok: '',
      yelp: '',
      tripadvisor: '',
      foursquare: '',
      google: '',
      franki: '',
      other: '',
      otherUrl: ''
    };
    
    setApiKeys(emptyKeys);
    setOtherPlatformName('');
    localStorage.removeItem('socialMediaApiKeys');
    localStorage.removeItem('otherPlatformName');
    onSaveApiKeys(emptyKeys);
    
    setSaveStatus('All connections cleared');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="content">Content Platforms</TabsTrigger>
          <TabsTrigger value="integrations">Review Platforms</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="space-y-4 pt-4">
          <Alert className="bg-blue-500/10 border-blue-500/30 text-blue-700">
            <Info className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Connect social media platforms to automatically fetch content posted about this venue
            </AlertDescription>
          </Alert>
          
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="instagram">Instagram API Key <Badge className="ml-1" variant="outline">Content</Badge></Label>
              <Input
                id="instagram"
                type="text"
                value={apiKeys.instagram}
                onChange={(e) => handleInputChange('instagram', e.target.value)}
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
                onChange={(e) => handleInputChange('tiktok', e.target.value)}
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
                onChange={(e) => handleInputChange('franki', e.target.value)}
                placeholder="Enter Franki API Key"
              />
              <p className="text-xs text-muted-foreground">
                Used to fetch Franki posts and recommendations for this venue
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="integrations" className="space-y-4 pt-4">
          <Alert className="bg-blue-500/10 border-blue-500/30 text-blue-700">
            <Info className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Connect review platforms to gather visitor reviews and ratings about this venue
            </AlertDescription>
          </Alert>
          
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="yelp">Yelp API Key <Badge className="ml-1" variant="outline">Reviews</Badge></Label>
              <Input
                id="yelp"
                type="text"
                value={apiKeys.yelp}
                onChange={(e) => handleInputChange('yelp', e.target.value)}
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
                onChange={(e) => handleInputChange('tripadvisor', e.target.value)}
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
                onChange={(e) => handleInputChange('google', e.target.value)}
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
                onChange={(e) => handleInputChange('foursquare', e.target.value)}
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
                  onChange={(e) => handleInputChange('other', e.target.value)}
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
                  onChange={(e) => handleInputChange('otherUrl', e.target.value)}
                  placeholder="https://example.com/api"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Connect any additional review or content platform
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {saveStatus && (
        <div className="bg-green-500/10 text-green-600 p-2 rounded text-sm text-center">
          {saveStatus}
        </div>
      )}
      
      <div className="flex justify-between pt-4">
        <Button variant="outline" size="sm" onClick={clearAll}>
          Clear All
        </Button>
        <Button onClick={handleSave}>
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default SocialMediaSettings;
