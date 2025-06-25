
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, ExternalLink } from "lucide-react";
import SocialMediaFeed from "@/components/venue/SocialMediaFeed";
import { toast } from 'sonner';
import { SocialMediaApiKeys } from '@/services/SocialMediaService';

interface VenuePostsExternalTabProps {
  venueName: string;
  connectedPlatforms: Record<string, boolean>;
  subscriptionTier: 'free' | 'plus' | 'premium' | 'pro';
  canEmbed: boolean;
  onUpgradeSubscription: () => void;
}

const VenuePostsExternalTab: React.FC<VenuePostsExternalTabProps> = ({
  venueName,
  connectedPlatforms,
  subscriptionTier,
  canEmbed,
  onUpgradeSubscription
}) => {
  // Get API keys from localStorage for embedded content
  const getApiKeys = (): SocialMediaApiKeys => {
    try {
      const savedKeys = localStorage.getItem('socialMediaApiKeys');
      if (savedKeys) {
        return JSON.parse(savedKeys);
      }
    } catch (error) {
      console.error('Error parsing API keys:', error);
    }
    
    return {
      instagram: '',
      tiktok: '',
      yelp: '',
      tripadvisor: '',
      foursquare: '',
      google: '',
      franki: '',
      other: ''
    };
  };
  
  const handleUpgradeClick = () => {
    toast.info("This would navigate to subscription upgrade page. Premium and Pro accounts have full embedding capability.");
    onUpgradeSubscription();
  };
  
  return (
    <>
      <div className="mb-4 p-4 border rounded-lg bg-muted/10">
        <h3 className="text-sm font-medium mb-2">Connected External Platforms</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.entries(connectedPlatforms).map(([platform, isConnected]) => (
            <div 
              key={platform}
              className={`p-2 rounded-md text-center text-xs border 
                ${isConnected 
                  ? 'bg-green-500/10 border-green-500/30 text-green-600' 
                  : 'bg-muted/20 border-muted/30 text-muted-foreground'}`}
            >
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
              {isConnected ? ' ✓' : ''}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-muted-foreground">
            Content is aggregated from connected platforms to provide a comprehensive view of this venue
          </p>
          <div className="text-xs py-1 px-2 rounded-full bg-primary/10 text-primary">
            {subscriptionTier.toUpperCase()} ACCOUNT
          </div>
        </div>
      </div>
      
      <div className="flex justify-end mb-4">
        <Button variant="default" size="sm" onClick={handleUpgradeClick}>
          <Plus className="h-4 w-4 mr-1" />
          {subscriptionTier === 'free' || subscriptionTier === 'plus'
            ? 'Upgrade to Premium' 
            : 'Connect Platform'}
        </Button>
      </div>
      
      {canEmbed ? (
        <SocialMediaFeed 
          venueName={venueName} 
          apiKeys={getApiKeys()} 
        />
      ) : (
        <div className="space-y-4">
          <div className="p-6 border border-dashed rounded-lg text-center">
            <h3 className="text-lg font-medium mb-2">Upgrade to Premium</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Premium and Pro accounts can embed external content directly in the feed.
              With your current {subscriptionTier.toUpperCase()} account, links to external platforms are provided.
            </p>
            <Button onClick={handleUpgradeClick}>
              Upgrade Account
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(connectedPlatforms)
              .filter(([_, isConnected]) => isConnected)
              .map(([platform]) => (
                <a 
                  key={platform}
                  href={`https://${platform}.com/search?q=${encodeURIComponent(venueName)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                >
                  <div>
                    <h4 className="font-medium">{platform.charAt(0).toUpperCase() + platform.slice(1)}</h4>
                    <p className="text-sm text-muted-foreground">View on {platform}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </a>
              ))}
          </div>
          
          {Object.values(connectedPlatforms).filter(Boolean).length === 0 && (
            <div className="text-center p-4 bg-muted/10 rounded-lg">
              <p>No external platforms connected.</p>
              <Button variant="outline" size="sm" className="mt-2" onClick={() => document.querySelector<HTMLButtonElement>('[data-trigger="connections"]')?.click()}>
                Connect Platforms
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default VenuePostsExternalTab;
