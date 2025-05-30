
import { useState } from "react";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdvertiserDashboard from "@/components/advertiser/AdvertiserDashboard";
import AdCreationStudio from "@/components/advertiser/AdCreationStudio";
import TargetingSegmentation from "@/components/advertiser/TargetingSegmentation";
import AdvertiserReporting from "@/components/advertiser/AdvertiserReporting";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Target, BarChart3, Palette } from "lucide-react";

const Advertiser = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold">Advertiser Hub</h1>
              <Badge variant="outline" className="ml-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-600 dark:text-purple-400 border-purple-300">
                Powered by Google AI
              </Badge>
            </div>
            
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
              <Crown className="mr-2 h-4 w-4" />
              Upgrade Plan
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 bg-neutral-800">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white">
                <div className="flex items-center">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Dashboard
                </div>
              </TabsTrigger>
              <TabsTrigger value="creation" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white">
                <div className="flex items-center">
                  <Palette className="mr-2 h-4 w-4" />
                  Ad Creation Studio
                </div>
              </TabsTrigger>
              <TabsTrigger value="targeting" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white">
                <div className="flex items-center">
                  <Target className="mr-2 h-4 w-4" />
                  Targeting
                </div>
              </TabsTrigger>
              <TabsTrigger value="reporting" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white">
                <div className="flex items-center">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Reporting
                </div>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="mt-0">
              <AdvertiserDashboard />
            </TabsContent>
            
            <TabsContent value="creation" className="mt-0">
              <AdCreationStudio />
            </TabsContent>
            
            <TabsContent value="targeting" className="mt-0">
              <TargetingSegmentation />
            </TabsContent>
            
            <TabsContent value="reporting" className="mt-0">
              <AdvertiserReporting />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Advertiser;
