
import { useState } from "react";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VenueInsights from "@/components/VenueInsights";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, FileLock, ChartBar, Megaphone } from "lucide-react";
import PremiumBanner from "@/components/data-insights/PremiumBanner";
import AnalyticsTab from "@/components/data-insights/AnalyticsTab";
import AdvertisingTab from "@/components/data-insights/marketing/AdvertisingTab";

// Subscription tier types
type SubscriptionTier = 'standard' | 'plus' | 'premium' | 'pro';

const DataInsights = () => {
  const [subscriptionTier, setSubscriptionTier] = useState<SubscriptionTier>('pro');
  const isPremium = subscriptionTier === 'premium' || subscriptionTier === 'pro';
  
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
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="overview" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <h1 className="text-3xl font-bold">Data Insights</h1>
                {getTierBadge()}
              </div>
              
              {subscriptionTier !== 'pro' && (
                <Button 
                  className="bg-gradient-to-r from-pro-primary to-pro-secondary hover:from-amber-700 hover:to-orange-700 text-white"
                  onClick={() => handleUpgrade('pro')}
                >
                  <Crown className="mr-2 h-4 w-4" />
                  Upgrade to Pro
                </Button>
              )}
            </div>
            
            <TabsList className="mb-4 bg-neutral-800">
              <TabsTrigger value="overview" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white">Overview</TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white">
                <div className="flex items-center">
                  <ChartBar className="mr-2 h-4 w-4" />
                  Analytics
                  {subscriptionTier === 'standard' && <FileLock className="ml-2 h-3 w-3" />}
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="advertising" 
                disabled={subscriptionTier === 'standard' || subscriptionTier === 'plus'}
                className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white"
              >
                <div className="flex items-center">
                  <Megaphone className="mr-2 h-4 w-4" />
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
    </div>
  );
};

export default DataInsights;
