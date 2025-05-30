
import { useState } from "react";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, Zap, Eye, Crown } from "lucide-react";
import AdvertiserDashboard from "@/components/data-insights/advertiser/AdvertiserDashboard";
import AdCreationStudio from "@/components/data-insights/advertiser/AdCreationStudio";
import TargetingSegmentation from "@/components/data-insights/advertiser/TargetingSegmentation";
import AdvertiserReporting from "@/components/data-insights/advertiser/AdvertiserReporting";
import VernonNext from "@/components/VernonNext";

// Subscription tier types
type SubscriptionTier = 'standard' | 'plus' | 'premium' | 'pro';

const Advertiser = () => {
  const [subscriptionTier, setSubscriptionTier] = useState<SubscriptionTier>('pro');
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
          <Badge variant="outline" className="ml-2 bg-purple-600/20 text-purple-400 border-purple-500">
            Plus
          </Badge>
        );
      case 'premium':
        return (
          <Badge variant="outline" className="ml-2 bg-green-600/20 text-green-400 border-green-500">
            Premium
          </Badge>
        );
      case 'pro':
        return (
          <Badge variant="outline" className="ml-2 bg-amber-600/20 text-amber-400 border-amber-500">
            Pro
          </Badge>
        );
    }
  };
  
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Header />
      
      <main className="container py-6 bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="dashboard" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <h1 className="text-3xl font-bold text-white">Advertiser Suite</h1>
                {getTierBadge()}
              </div>
              
              {subscriptionTier === 'standard' && (
                <div className="flex gap-2">
                  <Button 
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                    onClick={() => handleUpgrade('plus')}
                  >
                    <Crown className="mr-2 h-4 w-4" />
                    Upgrade to Plus
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                    onClick={() => handleUpgrade('premium')}
                  >
                    <Crown className="mr-2 h-4 w-4" />
                    Upgrade to Premium
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white"
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
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                    onClick={() => handleUpgrade('premium')}
                  >
                    <Crown className="mr-2 h-4 w-4" />
                    Upgrade to Premium
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white"
                    onClick={() => handleUpgrade('pro')}
                  >
                    <Crown className="mr-2 h-4 w-4" />
                    Upgrade to Pro
                  </Button>
                </div>
              )}
              
              {subscriptionTier === 'premium' && (
                <Button 
                  className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white"
                  onClick={() => handleUpgrade('pro')}
                >
                  <Crown className="mr-2 h-4 w-4" />
                  Upgrade to Pro
                </Button>
              )}
            </div>
            
            <TabsList className="mb-4 bg-neutral-800 border-neutral-700 w-full">
              <TabsTrigger 
                value="dashboard" 
                className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-300"
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger 
                value="creation" 
                className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-300"
              >
                <Zap className="mr-2 h-4 w-4" />
                Ad Creation
              </TabsTrigger>
              <TabsTrigger 
                value="targeting" 
                className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-300"
              >
                <Target className="mr-2 h-4 w-4" />
                Targeting
              </TabsTrigger>
              <TabsTrigger 
                value="reporting" 
                className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-300"
              >
                <Eye className="mr-2 h-4 w-4" />
                Reporting
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="mt-0 bg-neutral-950">
              <AdvertiserDashboard subscriptionTier={subscriptionTier} />
            </TabsContent>
            
            <TabsContent value="creation" className="mt-0 bg-neutral-950">
              <AdCreationStudio subscriptionTier={subscriptionTier} />
            </TabsContent>
            
            <TabsContent value="targeting" className="mt-0 bg-neutral-950">
              <TargetingSegmentation subscriptionTier={subscriptionTier} />
            </TabsContent>
            
            <TabsContent value="reporting" className="mt-0 bg-neutral-950">
              <AdvertiserReporting subscriptionTier={subscriptionTier} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Vernon Chat - Only show for Pro users */}
      {isPro && <VernonNext />}
    </div>
  );
};

export default Advertiser;
