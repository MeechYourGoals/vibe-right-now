
import { useState } from "react";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VenueInsights from "@/components/VenueInsights";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, FileLock, Upload, ChartBar } from "lucide-react";
import PremiumBanner from "@/components/data-insights/PremiumBanner";
import AnalyticsTab from "@/components/data-insights/AnalyticsTab";
import AdvertisingTab from "@/components/data-insights/marketing/AdvertisingTab";
import VernonProBanner from "@/components/data-insights/VernonProBanner";
import VernonNext from "@/components/VernonNext";

// Subscription tier types
type SubscriptionTier = 'standard' | 'plus' | 'premium' | 'pro';

const DataInsights = () => {
  const [subscriptionTier, setSubscriptionTier] = useState<SubscriptionTier>('pro');
  const isPremium = subscriptionTier === 'premium' || subscriptionTier === 'pro';
  const isPro = subscriptionTier === 'pro';
  
  const handleUpgrade = (tier: SubscriptionTier) => {
    setSubscriptionTier(tier);
  };
  
  const getTierBadge = () => {
    switch(subscriptionTier) {
      case 'standard':
        return null;
      case 'plus':
        return (
          <Badge variant="outline" className="ml-2 bg-blue-600/20 text-blue-500 dark:text-blue-400 border-blue-300">
            Plus
          </Badge>
        );
      case 'premium':
        return (
          <Badge variant="outline" className="ml-2 bg-purple-600/20 text-purple-600 dark:text-purple-400 border-purple-300">
            Premium
          </Badge>
        );
      case 'pro':
        return (
          <Badge variant="outline" className="ml-2 bg-amber-600/20 text-amber-600 dark:text-amber-400 border-amber-300">
            Pro
          </Badge>
        );
    }
  };
  
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Header />
      
      <main className="container py-6">
        <div className="max-w-6xl mx-auto">
          {/* Vernon Pro Banner - Only show for Pro users */}
          {isPro && (
            <div className="mb-6">
              <VernonProBanner subscriptionTier={subscriptionTier} />
            </div>
          )}
          
          <Tabs defaultValue="overview" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <h1 className="text-3xl font-bold text-white">Data Insights</h1>
                {getTierBadge()}
              </div>
              
              {subscriptionTier === 'standard' && (
                <div className="flex gap-2">
                  <Button 
                    className="bg-gradient-to-r from-plus-primary to-plus-secondary hover:from-purple-600 hover:to-teal-600 text-white"
                    onClick={() => handleUpgrade('plus')}
                  >
                    <Crown className="mr-2 h-4 w-4" />
                    Upgrade to Plus
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-premium-primary to-premium-secondary hover:from-green-600 hover:to-blue-600 text-white"
                    onClick={() => handleUpgrade('premium')}
                  >
                    <Crown className="mr-2 h-4 w-4" />
                    Upgrade to Premium
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-pro-primary to-pro-secondary hover:from-amber-700 hover:to-orange-700 text-white"
                    onClick={() => handleUpgrade('pro')}
                  >
                    <Crown className="mr-2 h-4 w-4" />
                    Upgrade to Pro
                  </Button>
                </div>
              )}
              
              {subscriptionTier === 'plus' && (
                <div className="flex gap-2">
                  <Button 
                    className="bg-gradient-to-r from-premium-primary to-premium-secondary hover:from-green-600 hover:to-blue-600 text-white"
                    onClick={() => handleUpgrade('premium')}
                  >
                    <Crown className="mr-2 h-4 w-4" />
                    Upgrade to Premium
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-pro-primary to-pro-secondary hover:from-amber-700 hover:to-orange-700 text-white"
                    onClick={() => handleUpgrade('pro')}
                  >
                    <Crown className="mr-2 h-4 w-4" />
                    Upgrade to Pro
                  </Button>
                </div>
              )}
              
              {subscriptionTier === 'premium' && (
                <Button 
                  className="bg-gradient-to-r from-pro-primary to-pro-secondary hover:from-amber-700 hover:to-orange-700 text-white"
                  onClick={() => handleUpgrade('pro')}
                >
                  <Crown className="mr-2 h-4 w-4" />
                  Upgrade to Pro
                </Button>
              )}
            </div>
            
            <TabsList className="mb-4 bg-neutral-800 border-neutral-700">
              <TabsTrigger value="overview" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-300">Overview</TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-300">
                <div className="flex items-center">
                  <ChartBar className="mr-2 h-4 w-4" />
                  Analytics
                  {subscriptionTier === 'standard' && <FileLock className="ml-2 h-3 w-3 text-neutral-500" />}
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="advertising" 
                disabled={subscriptionTier === 'standard' || subscriptionTier === 'plus'}
                className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-300 disabled:text-neutral-600"
              >
                <div className="flex items-center">
                  Advertising
                  {(subscriptionTier === 'standard' || subscriptionTier === 'plus') && (
                    <FileLock className="ml-2 h-3 w-3" />
                  )}
                </div>
              </TabsTrigger>
            </TabsList>
            
            {subscriptionTier === 'standard' && (
              <PremiumBanner 
                onUpgrade={(tier) => handleUpgrade(tier as SubscriptionTier)} 
              />
            )}
            
            <TabsContent value="overview" className="mt-0">
              <VenueInsights />
            </TabsContent>
            
            <TabsContent value="analytics" className="mt-0">
              <AnalyticsTab isPremium={isPremium} subscriptionTier={subscriptionTier} />
            </TabsContent>
            
            <TabsContent value="advertising" className="mt-0">
              <AdvertisingTab isPremium={isPremium} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Vernon Chat - Only show for Pro users */}
      {isPro && <VernonNext />}
    </div>
  );
};

export default DataInsights;
