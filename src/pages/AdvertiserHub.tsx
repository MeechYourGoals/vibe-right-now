
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Target, BarChart3, Brain, Zap } from "lucide-react";
import AdCreationStudio from "@/components/advertising/AdCreationStudio";
import TargetingSegmentation from "@/components/advertising/TargetingSegmentation";
import AdvertiserReporting from "@/components/advertising/AdvertiserReporting";
import GoogleAIIntegration from "@/components/advertising/GoogleAIIntegration";
import MetaAIAdvertiserHub from "@/components/advertising/MetaAIAdvertiserHub";

const AdvertiserHub = () => {
  const [activeTab, setActiveTab] = useState("creation");

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20">
              <Brain className="h-8 w-8 text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Advertiser Hub
              </h1>
              <p className="text-muted-foreground">
                Create, target, and optimize your campaigns with Google AI & Meta AI
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 mb-6">
            <Badge variant="secondary" className="bg-green-500/20 text-green-400">
              Google Imagen 3 Enabled
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
              Veo Video Generation
            </Badge>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
              Meta AI Integration
            </Badge>
            <Badge variant="secondary" className="bg-orange-500/20 text-orange-400">
              LLaMA 3.2 Powered
            </Badge>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="creation" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Ad Creation
            </TabsTrigger>
            <TabsTrigger value="targeting" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Targeting
            </TabsTrigger>
            <TabsTrigger value="reporting" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="google-ai" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Google AI
            </TabsTrigger>
            <TabsTrigger value="meta-ai" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Meta AI
            </TabsTrigger>
          </TabsList>

          <TabsContent value="creation">
            <AdCreationStudio />
          </TabsContent>

          <TabsContent value="targeting">
            <TargetingSegmentation />
          </TabsContent>

          <TabsContent value="reporting">
            <AdvertiserReporting />
          </TabsContent>

          <TabsContent value="google-ai">
            <GoogleAIIntegration />
          </TabsContent>

          <TabsContent value="meta-ai">
            <MetaAIAdvertiserHub />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdvertiserHub;
