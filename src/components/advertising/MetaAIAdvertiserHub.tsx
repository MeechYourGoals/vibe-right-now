
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Calendar, TrendingUp, Target, Brain, Settings } from "lucide-react";
import MetaAIAdvertiserCampaigns from "./MetaAIAdvertiserCampaigns";
import MetaAIAdvertiserAnalytics from "./MetaAIAdvertiserAnalytics";
import MetaAIAdvertiserSettings from "./MetaAIAdvertiserSettings";

const MetaAIAdvertiserHub = () => {
  const [activeSubTab, setActiveSubTab] = useState("campaigns");

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20">
            <Brain className="h-8 w-8 text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Meta AI Advertising Suite
            </h2>
            <p className="text-muted-foreground">
              Advanced AI-powered advertising for third-party advertisers
            </p>
          </div>
        </div>
        
        <div className="flex gap-2 justify-center mb-6">
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-300">
            Full Suite Coming 2026
          </Badge>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-300">
            Beta Features Available
          </Badge>
          <Badge className="bg-green-500/20 text-green-400 border-green-300">
            LLaMA 3.2 Powered
          </Badge>
        </div>
      </div>

      {/* Meta AI Sub-Navigation */}
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="campaigns" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Auto Campaigns
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            AI Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns">
          <MetaAIAdvertiserCampaigns />
        </TabsContent>

        <TabsContent value="analytics">
          <MetaAIAdvertiserAnalytics />
        </TabsContent>

        <TabsContent value="settings">
          <MetaAIAdvertiserSettings />
        </TabsContent>
      </Tabs>

      {/* 2026 Vision Card */}
      <Card className="border-purple-500/20 bg-gradient-to-r from-purple-500/5 to-blue-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Calendar className="h-5 w-5" />
            Meta AI 2026 Vision
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2 text-blue-400">Complete Automation</h4>
              <p className="text-sm text-muted-foreground">
                Full campaign creation, optimization, and management powered by advanced Meta AI models
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2 text-purple-400">Cross-Platform Intelligence</h4>
              <p className="text-sm text-muted-foreground">
                Unified advertising across Meta platforms with real-time audience insights
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2 text-green-400">Predictive Performance</h4>
              <p className="text-sm text-muted-foreground">
                AI predicts campaign outcomes and automatically adjusts for optimal ROI
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetaAIAdvertiserHub;
