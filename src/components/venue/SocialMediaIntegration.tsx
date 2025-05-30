
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Instagram, 
  Facebook, 
  Star, 
  Award, 
  MapPin, 
  Settings, 
  Clock, 
  Calendar,
  RefreshCw,
  ExternalLink,
  ArrowRight,
  AlertTriangle,
  Check
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import SocialMediaFeed from './SocialMediaFeed';

interface SocialMediaIntegrationProps {
  subscriptionTier: 'standard' | 'plus' | 'premium' | 'pro';
  venueName: string;
}

interface IntegrationLinkProps {
  platform: string;
  icon: React.ReactNode;
  color: string;
  url: string;
  isConnected: boolean;
  isEnabled: boolean;
  onConnect: () => void;
  onToggle: () => void;
}

const IntegrationLink: React.FC<IntegrationLinkProps> = ({
  platform,
  icon,
  color,
  url,
  isConnected,
  isEnabled,
  onConnect,
  onToggle
}) => {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg mb-3">
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
          {icon}
        </div>
        <div className="ml-3">
          <h3 className="font-medium">{platform}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            {isConnected ? (
              <span className="flex items-center text-green-600">
                <Check className="w-3 h-3 mr-1" /> Connected
              </span>
            ) : (
              <span className="flex items-center text-amber-600">
                <AlertTriangle className="w-3 h-3 mr-1" /> Not connected
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {isConnected ? (
          <>
            <div className="flex items-center gap-2">
              <Switch id={`${platform}-switch`} checked={isEnabled} onCheckedChange={onToggle} />
              <Label htmlFor={`${platform}-switch`} className="text-xs">
                {isEnabled ? 'Active' : 'Inactive'}
              </Label>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href={url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </>
        ) : (
          <Button variant="outline" size="sm" onClick={onConnect}>
            Connect <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
};

const SocialMediaIntegration: React.FC<SocialMediaIntegrationProps> = ({ subscriptionTier, venueName }) => {
  const isPremium = subscriptionTier === 'premium' || subscriptionTier === 'pro';
  const isPro = subscriptionTier === 'pro';
  const isPlus = subscriptionTier === 'plus';
  
  const [lastImport, setLastImport] = useState<Date | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [socialConnections, setSocialConnections] = useState({
    instagram: false,
    facebook: false,
    yelp: true,
    google: true,
    tiktok: false,
    foursquare: false
  });
  
  const [socialEnabled, setSocialEnabled] = useState({
    instagram: true,
    facebook: true,
    yelp: true,
    google: true,
    tiktok: true,
    foursquare: true
  });
  
  // Demo function to connect social media
  const connectSocialMedia = (platform: string) => {
    toast.success(`${platform} connection initiated. Check your email to complete the setup.`);
    
    // Simulate connection after 2 seconds
    setTimeout(() => {
      setSocialConnections(prev => ({
        ...prev,
        [platform.toLowerCase()]: true
      }));
      toast.success(`${platform} successfully connected!`);
    }, 2000);
  };
  
  // Demo function to toggle social media
  const toggleSocialMedia = (platform: string) => {
    setSocialEnabled(prev => ({
      ...prev,
      [platform.toLowerCase()]: !prev[platform.toLowerCase()]
    }));
    
    toast.success(`${platform} ${socialEnabled[platform.toLowerCase()] ? 'disabled' : 'enabled'}`);
  };
  
  // Demo function to trigger content import
  const importContent = () => {
    if (!isPremium) {
      toast.error("This feature requires Premium or Pro subscription");
      return;
    }
    
    setIsImporting(true);
    toast.success("Content import started. This may take a few minutes.");
    
    // Simulate import process
    setTimeout(() => {
      setIsImporting(false);
      setLastImport(new Date());
      toast.success("Content import completed successfully!");
    }, 3000);
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">Social Media Integration</CardTitle>
          {isPremium && (
            <Badge variant="outline" className={isPro ? "bg-amber-100 text-amber-800 border-amber-300" : "bg-purple-100 text-purple-800 border-purple-300"}>
              {isPro ? "Pro" : "Premium"}
            </Badge>
          )}
          {isPlus && (
            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
              Plus
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="connect">
          <TabsList className="mb-4">
            <TabsTrigger value="connect">Connect Platforms</TabsTrigger>
            <TabsTrigger value="feed" disabled={!isPremium && !isPlus}>
              {isPremium ? "Imported Content" : "External Links"}
            </TabsTrigger>
            {isPro && (
              <TabsTrigger value="curate">Content Curation</TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="connect">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium">Connect Your Platforms</h3>
                  <p className="text-sm text-muted-foreground">
                    {isPremium ? 
                      "Connect your social media accounts to automatically import content" : 
                      "Connect your social media accounts to display links on your profile"}
                  </p>
                </div>
                
                {isPremium && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={importContent} 
                    disabled={isImporting}
                    className="flex items-center gap-1"
                  >
                    {isImporting ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                        Importing...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Import Now
                      </>
                    )}
                  </Button>
                )}
              </div>
              
              {isPremium && lastImport && (
                <div className="text-sm text-muted-foreground mb-4 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Last import: {lastImport.toLocaleString()}
                  {isPremium && !isPro && (
                    <Badge variant="outline" className="ml-2 text-xs">
                      Weekly Updates with Premium
                    </Badge>
                  )}
                  {isPro && (
                    <Badge variant="outline" className="ml-2 text-xs bg-amber-50 text-amber-800 border-amber-200">
                      AI Curated with Pro
                    </Badge>
                  )}
                </div>
              )}
              
              <IntegrationLink
                platform="Instagram"
                icon={<Instagram className="h-5 w-5 text-white" />}
                color="bg-pink-500"
                url="https://instagram.com"
                isConnected={socialConnections.instagram}
                isEnabled={socialEnabled.instagram}
                onConnect={() => connectSocialMedia("Instagram")}
                onToggle={() => toggleSocialMedia("instagram")}
              />
              
              <IntegrationLink
                platform="Facebook"
                icon={<Facebook className="h-5 w-5 text-white" />}
                color="bg-blue-600"
                url="https://facebook.com"
                isConnected={socialConnections.facebook}
                isEnabled={socialEnabled.facebook}
                onConnect={() => connectSocialMedia("Facebook")}
                onToggle={() => toggleSocialMedia("facebook")}
              />
              
              <IntegrationLink
                platform="Yelp"
                icon={<Star className="h-5 w-5 text-white" />}
                color="bg-red-500"
                url="https://yelp.com"
                isConnected={socialConnections.yelp}
                isEnabled={socialEnabled.yelp}
                onConnect={() => connectSocialMedia("Yelp")}
                onToggle={() => toggleSocialMedia("yelp")}
              />
              
              <IntegrationLink
                platform="Google Reviews"
                icon={<Award className="h-5 w-5 text-white" />}
                color="bg-green-500"
                url="https://business.google.com"
                isConnected={socialConnections.google}
                isEnabled={socialEnabled.google}
                onConnect={() => connectSocialMedia("Google")}
                onToggle={() => toggleSocialMedia("google")}
              />
              
              <IntegrationLink
                platform="TikTok"
                icon={<span className="text-white font-bold">TT</span>}
                color="bg-black"
                url="https://tiktok.com"
                isConnected={socialConnections.tiktok}
                isEnabled={socialEnabled.tiktok}
                onConnect={() => connectSocialMedia("TikTok")}
                onToggle={() => toggleSocialMedia("tiktok")}
              />
              
              <IntegrationLink
                platform="Foursquare"
                icon={<MapPin className="h-5 w-5 text-white" />}
                color="bg-blue-400"
                url="https://foursquare.com"
                isConnected={socialConnections.foursquare}
                isEnabled={socialEnabled.foursquare}
                onConnect={() => connectSocialMedia("Foursquare")}
                onToggle={() => toggleSocialMedia("foursquare")}
              />
              
              <div className="p-4 bg-muted/30 rounded-lg text-sm text-center mt-6">
                {isPremium ? (
                  <p>
                    {isPro ? 
                      "Your Pro plan includes weekly AI-curated content imported from all connected platforms." :
                      "Your Premium plan includes weekly content imports from all connected platforms."}
                  </p>
                ) : (
                  <p>
                    {isPlus ? 
                      "Your Plus plan includes external links to your social media profiles. Upgrade to Premium for automatic content imports." :
                      "Connect to your social profiles to enable sharing. Upgrade to Plus or Premium for enhanced social media integration."}
                  </p>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="feed">
            {isPremium ? (
              <SocialMediaFeed
                venueName={venueName}
                apiKeys={{
                  instagram: socialConnections.instagram ? 'demo-key' : '',
                  tiktok: socialConnections.tiktok ? 'demo-key' : '',
                  yelp: socialConnections.yelp ? 'demo-key' : '',
                  google: socialConnections.google ? 'demo-key' : '',
                  foursquare: socialConnections.foursquare ? 'demo-key' : '',
                }}
              />
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">External Platform Links</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  With your Plus subscription, visitors can access your external social media profiles directly.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {socialConnections.instagram && (
                    <Button variant="outline" className="justify-start" asChild>
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <Instagram className="h-5 w-5 mr-2 text-pink-500" />
                        Visit our Instagram
                        <ExternalLink className="h-4 w-4 ml-auto" />
                      </a>
                    </Button>
                  )}
                  
                  {socialConnections.facebook && (
                    <Button variant="outline" className="justify-start" asChild>
                      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <Facebook className="h-5 w-5 mr-2 text-blue-600" />
                        Visit our Facebook
                        <ExternalLink className="h-4 w-4 ml-auto" />
                      </a>
                    </Button>
                  )}
                  
                  {socialConnections.yelp && (
                    <Button variant="outline" className="justify-start" asChild>
                      <a href="https://yelp.com" target="_blank" rel="noopener noreferrer">
                        <Star className="h-5 w-5 mr-2 text-red-500" />
                        Read our Yelp Reviews
                        <ExternalLink className="h-4 w-4 ml-auto" />
                      </a>
                    </Button>
                  )}
                  
                  {socialConnections.google && (
                    <Button variant="outline" className="justify-start" asChild>
                      <a href="https://business.google.com" target="_blank" rel="noopener noreferrer">
                        <Award className="h-5 w-5 mr-2 text-green-500" />
                        Google Reviews
                        <ExternalLink className="h-4 w-4 ml-auto" />
                      </a>
                    </Button>
                  )}
                  
                  {socialConnections.tiktok && (
                    <Button variant="outline" className="justify-start" asChild>
                      <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                        <span className="h-5 w-5 mr-2 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">TT</span>
                        Our TikTok
                        <ExternalLink className="h-4 w-4 ml-auto" />
                      </a>
                    </Button>
                  )}
                  
                  {socialConnections.foursquare && (
                    <Button variant="outline" className="justify-start" asChild>
                      <a href="https://foursquare.com" target="_blank" rel="noopener noreferrer">
                        <MapPin className="h-5 w-5 mr-2 text-blue-400" />
                        Foursquare
                        <ExternalLink className="h-4 w-4 ml-auto" />
                      </a>
                    </Button>
                  )}
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/30 rounded-lg mt-6">
                  <h3 className="font-medium text-purple-800 dark:text-purple-300 flex items-center">
                    <Award className="h-4 w-4 mr-2" />
                    Upgrade to Premium
                  </h3>
                  <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">
                    With Premium, we'll automatically import content from all your social platforms and display it directly in your venue profile.
                  </p>
                  <Button 
                    className="mt-3 bg-purple-600 hover:bg-purple-700 text-white w-full"
                    onClick={() => toast.success("Redirecting to upgrade page...")}
                  >
                    Upgrade Now
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          {isPro && (
            <TabsContent value="curate">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium">AI Content Curation</h3>
                    <p className="text-sm text-muted-foreground">
                      Our AI automatically selects your most flattering content across all platforms
                    </p>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-1" />
                    Curation Settings
                  </Button>
                </div>
                
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-lg mb-4">
                  <h3 className="font-medium text-amber-800 dark:text-amber-300 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Next Scheduled Curation
                  </h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                    Your content will be automatically curated on Sunday, April 12, 2025
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <Button 
                      variant="outline"
                      className="text-amber-800 border-amber-300 bg-amber-100 hover:bg-amber-200"
                      onClick={() => {
                        toast.success("Curation process started. This may take a few minutes.");
                        setTimeout(() => {
                          toast.success("Content curation completed! 12 new posts have been selected for your feed.");
                        }, 3000);
                      }}
                    >
                      Curate Now
                    </Button>
                    <Button 
                      variant="outline"
                      className="text-amber-800 border-amber-300"
                      onClick={() => toast.success("Curation preference saved.")}
                    >
                      Edit Schedule
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3">Curation Preferences</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Switch id="positive-only" defaultChecked />
                        <Label htmlFor="positive-only" className="ml-2">
                          Only include 4+ star ratings
                        </Label>
                      </div>
                      <span className="text-xs text-muted-foreground">Recommended</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Switch id="prioritize-images" defaultChecked />
                        <Label htmlFor="prioritize-images" className="ml-2">
                          Prioritize posts with images
                        </Label>
                      </div>
                      <span className="text-xs text-muted-foreground">Recommended</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Switch id="hide-competitors" defaultChecked />
                        <Label htmlFor="hide-competitors" className="ml-2">
                          Hide posts that mention competitors
                        </Label>
                      </div>
                      <span className="text-xs text-muted-foreground">Recommended</span>
                    </div>
                    
                    <Separator className="my-3" />
                    
                    <div>
                      <Label htmlFor="max-posts" className="mb-1 block">
                        Maximum posts per platform
                      </Label>
                      <Input type="number" id="max-posts" defaultValue={5} min={1} max={20} />
                    </div>
                    
                    <div>
                      <Label htmlFor="keywords" className="mb-1 block">
                        Highlight posts with these keywords (comma separated)
                      </Label>
                      <Input 
                        type="text" 
                        id="keywords" 
                        placeholder="amazing, delicious, recommend" 
                        defaultValue="amazing, best, love it, recommend, must visit" 
                      />
                    </div>
                  </div>
                  
                  <Button className="mt-4 w-full bg-amber-600 hover:bg-amber-700">
                    Save Preferences
                  </Button>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SocialMediaIntegration;
