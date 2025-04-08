
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

// Subscription tier types
type SubscriptionTier = 'standard' | 'plus' | 'premium' | 'pro';

const DataInsights = () => {
  const [subscriptionTier, setSubscriptionTier] = useState<SubscriptionTier>('standard');
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
          <Badge variant="outline" className="ml-2 bg-blue-500/10 text-blue-500 border-blue-200">
            Plus
          </Badge>
        );
      case 'premium':
        return (
          <Badge variant="outline" className="ml-2 bg-purple-500/10 text-purple-500 border-purple-200">
            Premium
          </Badge>
        );
      case 'pro':
        return (
          <Badge variant="outline" className="ml-2 bg-amber-500/10 text-amber-500 border-amber-200">
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
              
              {subscriptionTier === 'standard' && (
                <div className="flex gap-2">
                  <Button 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    onClick={() => handleUpgrade('plus')}
                  >
                    <Crown className="mr-2 h-4 w-4" />
                    Upgrade to Plus
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                    onClick={() => handleUpgrade('premium')}
                  >
                    <Crown className="mr-2 h-4 w-4" />
                    Upgrade to Premium
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
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
                    className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                    onClick={() => handleUpgrade('premium')}
                  >
                    <Crown className="mr-2 h-4 w-4" />
                    Upgrade to Premium
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                    onClick={() => handleUpgrade('pro')}
                  >
                    <Crown className="mr-2 h-4 w-4" />
                    Upgrade to Pro
                  </Button>
                </div>
              )}
              
              {subscriptionTier === 'premium' && (
                <Button 
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                  onClick={() => handleUpgrade('pro')}
                >
                  <Crown className="mr-2 h-4 w-4" />
                  Upgrade to Pro
                </Button>
              )}
            </div>
            
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">
                <div className="flex items-center">
                  <ChartBar className="mr-2 h-4 w-4" />
                  Analytics
                  {subscriptionTier === 'standard' && <FileLock className="ml-2 h-3 w-3" />}
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="advertising" 
                disabled={subscriptionTier === 'standard' || subscriptionTier === 'plus'}
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
    </div>
  );
};

export default DataInsights;
