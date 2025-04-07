
import { useState } from "react";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VenueInsights from "@/components/VenueInsights";
import { Button } from "@/components/ui/button";
import { Crown, FileLock } from "lucide-react";
import PremiumBanner from "@/components/data-insights/PremiumBanner";
import AnalyticsTab from "@/components/data-insights/AnalyticsTab";
import AdvertisingTab from "@/components/data-insights/marketing/AdvertisingTab";

const DataInsights = () => {
  const [isPremium, setIsPremium] = useState(false);
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="overview" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold">Data Insights</h1>
              
              {!isPremium && (
                <Button 
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                  onClick={() => setIsPremium(true)}
                >
                  <Crown className="mr-2 h-4 w-4" />
                  Upgrade to Premium
                </Button>
              )}
            </div>
            
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="advertising" disabled={!isPremium}>
                Advertising
                {!isPremium && <FileLock className="ml-2 h-3 w-3" />}
              </TabsTrigger>
            </TabsList>
            
            {!isPremium && <PremiumBanner onUpgrade={() => setIsPremium(true)} />}
            
            <TabsContent value="overview" className="mt-0">
              <VenueInsights />
            </TabsContent>
            
            <TabsContent value="analytics" className="mt-0">
              <AnalyticsTab isPremium={isPremium} />
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
