
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, Users, DollarSign, Eye, MousePointer, Zap, Layout } from "lucide-react";
import AdvertiserDashboard from "./AdvertiserDashboard";
import AdCreationStudio from "./AdCreationStudio";
import TargetingSegmentation from "./TargetingSegmentation";
import AdvertiserReporting from "./AdvertiserReporting";

interface AdvertiserTabProps {
  subscriptionTier: 'standard' | 'plus' | 'premium' | 'pro';
}

const AdvertiserTab: React.FC<AdvertiserTabProps> = ({ subscriptionTier }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const isPro = subscriptionTier === 'pro';
  const isPremium = subscriptionTier === 'premium' || isPro;
  
  return (
    <div className="space-y-6">
      {/* Header Card with Advertiser Overview */}
      <Card className="border-2 border-blue-600/50 bg-gradient-to-r from-blue-950/80 to-purple-950/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl text-blue-300 flex items-center">
                <Target className="mr-3 h-6 w-6" />
                Advertiser Suite
              </CardTitle>
              <p className="text-blue-200/80 mt-2">
                Comprehensive advertising platform for reaching engaged audiences through location-based experiences
              </p>
            </div>
            <Badge variant="outline" className="bg-blue-900/20 text-blue-400 border-blue-600">
              Advanced Targeting
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-950/40 p-3 rounded-lg">
              <div className="flex items-center text-blue-300">
                <Eye className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Total Impressions</span>
              </div>
              <p className="text-xl font-bold text-white mt-1">2.4M</p>
              <p className="text-xs text-blue-200/60">+12% this week</p>
            </div>
            <div className="bg-purple-950/40 p-3 rounded-lg">
              <div className="flex items-center text-purple-300">
                <MousePointer className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Click Rate</span>
              </div>
              <p className="text-xl font-bold text-white mt-1">3.2%</p>
              <p className="text-xs text-purple-200/60">+0.4% this week</p>
            </div>
            <div className="bg-green-950/40 p-3 rounded-lg">
              <div className="flex items-center text-green-300">
                <DollarSign className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">ROAS</span>
              </div>
              <p className="text-xl font-bold text-white mt-1">4.8x</p>
              <p className="text-xs text-green-200/60">+0.3x this week</p>
            </div>
            <div className="bg-amber-950/40 p-3 rounded-lg">
              <div className="flex items-center text-amber-300">
                <Users className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Reach</span>
              </div>
              <p className="text-xl font-bold text-white mt-1">890K</p>
              <p className="text-xs text-amber-200/60">+8% this week</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ad Format Showcase */}
      <Card className="border-2 border-purple-600/50 bg-gradient-to-r from-purple-950/80 to-pink-950/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center">
            <Layout className="mr-3 h-5 w-5" />
            Premium Ad Formats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-purple-950/40 p-4 rounded-lg border border-purple-600/30">
              <h4 className="font-bold text-purple-300 mb-2">MomentCard</h4>
              <p className="text-sm text-purple-200/80 mb-3">Interactive story-style ads that appear in user feeds</p>
              <Badge variant="outline" className="bg-purple-900/20 text-purple-400 border-purple-600 text-xs">
                High Engagement
              </Badge>
            </div>
            <div className="bg-blue-950/40 p-4 rounded-lg border border-blue-600/30">
              <h4 className="font-bold text-blue-300 mb-2">VibeOverlay</h4>
              <p className="text-sm text-blue-200/80 mb-3">Location-triggered augmented reality experiences</p>
              <Badge variant="outline" className="bg-blue-900/20 text-blue-400 border-blue-600 text-xs">
                AR Experience
              </Badge>
            </div>
            <div className="bg-green-950/40 p-4 rounded-lg border border-green-600/30">
              <h4 className="font-bold text-green-300 mb-2">Spawn Point</h4>
              <p className="text-sm text-green-200/80 mb-3">Virtual placement ads at specific coordinates</p>
              <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-600 text-xs">
                Geo-Targeted
              </Badge>
            </div>
            <div className="bg-amber-950/40 p-4 rounded-lg border border-amber-600/30">
              <h4 className="font-bold text-amber-300 mb-2">Heat-Ring Takeover</h4>
              <p className="text-sm text-amber-200/80 mb-3">Full-screen immersive brand experiences</p>
              <Badge variant="outline" className="bg-amber-900/20 text-amber-400 border-amber-600 text-xs">
                Premium Impact
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Advertiser Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-neutral-800 border-neutral-700 w-full">
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

        <TabsContent value="dashboard" className="mt-6">
          <AdvertiserDashboard subscriptionTier={subscriptionTier} />
        </TabsContent>

        <TabsContent value="creation" className="mt-6">
          <AdCreationStudio subscriptionTier={subscriptionTier} />
        </TabsContent>

        <TabsContent value="targeting" className="mt-6">
          <TargetingSegmentation subscriptionTier={subscriptionTier} />
        </TabsContent>

        <TabsContent value="reporting" className="mt-6">
          <AdvertiserReporting subscriptionTier={subscriptionTier} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvertiserTab;
