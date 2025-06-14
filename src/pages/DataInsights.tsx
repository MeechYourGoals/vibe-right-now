
import { useState } from "react";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VenueInsights from "@/components/VenueInsights";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, FileLock, Upload, ChartBar, MessageSquare, Sparkles } from "lucide-react";
import PremiumBanner from "@/components/data-insights/PremiumBanner";
import AnalyticsTab from "@/components/data-insights/AnalyticsTab";
import AdvertisingTab from "@/components/data-insights/marketing/AdvertisingTab";
import SentimentAnalysisTab from "@/components/data-insights/SentimentAnalysisTab";
import EnhancedSentimentTab from "@/components/data-insights/EnhancedSentimentTab";

// Subscription tier types
type SubscriptionTier = 'standard' | 'plus' | 'premium' | 'pro';

const DataInsights = () => {
  const [subscriptionTier, setSubscriptionTier] = useState<SubscriptionTier>('premium'); // Set to premium for demo
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
                <h1 className="text-3xl font-bold text-foreground">Data Insights</h1>
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
            
            <TabsList className="mb-4 bg-card border border-border">
              <TabsTrigger value="overview" className="data-[state=active]:bg-muted data-[state=active]:text-foreground">Overview</TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-muted data-[state=active]:text-foreground">
                <div className="flex items-center">
                  <ChartBar className="mr-2 h-4 w-4" />
                  Analytics
                  {subscriptionTier === 'standard' && <FileLock className="ml-2 h-3 w-3" />}
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="sentiment" 
                disabled={subscriptionTier === 'standard' || subscriptionTier === 'plus'}
                className="data-[state=active]:bg-muted data-[state=active]:text-foreground"
              >
                <div className="flex items-center">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Basic Sentiment
                  {(subscriptionTier === 'standard' || subscriptionTier === 'plus') && (
                    <FileLock className="ml-2 h-3 w-3" />
                  )}
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="enhanced-sentiment" 
                disabled={subscriptionTier === 'standard' || subscriptionTier === 'plus'}
                className="data-[state=active]:bg-muted data-[state=active]:text-foreground"
              >
                <div className="flex items-center">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Enhanced Review Analysis
                  {(subscriptionTier === 'standard' || subscriptionTier === 'plus') && (
                    <FileLock className="ml-2 h-3 w-3" />
                  )}
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="advertising" 
                disabled={subscriptionTier === 'standard' || subscriptionTier === 'plus'}
                className="data-[state=active]:bg-muted data-[state=active]:text-foreground"
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
            
            <TabsContent value="sentiment" className="mt-0">
              <SentimentAnalysisTab 
                venueId="venue-1" 
                isPremium={isPremium} 
              />
            </TabsContent>
            
            <TabsContent value="enhanced-sentiment" className="mt-0">
              <EnhancedSentimentTab 
                venueId="venue-1" 
                isPremium={isPremium} 
              />
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
