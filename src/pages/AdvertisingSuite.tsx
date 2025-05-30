
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  MousePointer, 
  DollarSign, 
  Users, 
  Video, 
  Image as ImageIcon,
  Megaphone,
  Target,
  Zap,
  PlayCircle
} from "lucide-react";
import AdvertiserDashboard from "@/components/advertising/AdvertiserDashboard";
import AdCreationStudio from "@/components/advertising/AdCreationStudio";
import TargetingSegmentation from "@/components/advertising/TargetingSegmentation";
import AdvertiserReporting from "@/components/advertising/AdvertiserReporting";

const AdvertisingSuite = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Megaphone className="h-8 w-8 text-blue-600" />
              Advertising Suite
            </h1>
            <p className="text-muted-foreground">
              Powered by Google AI • Create, target, and optimize campaigns with advanced AI tools
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-gradient-to-r from-blue-50 to-green-50 text-blue-700 border-blue-200">
              <Zap className="h-3 w-3 mr-1" />
              Google AI Enabled
            </Badge>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Create Ads
            </TabsTrigger>
            <TabsTrigger value="targeting" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Targeting
            </TabsTrigger>
            <TabsTrigger value="reporting" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Eye className="h-5 w-5 mr-2 text-blue-600" />
                    Total Impressions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-700">2.4M</div>
                  <p className="text-sm text-blue-600">+18% vs last month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <MousePointer className="h-5 w-5 mr-2 text-green-600" />
                    Click-Through Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-700">3.2%</div>
                  <p className="text-sm text-green-600">+0.8% vs last month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 border-purple-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-purple-600" />
                    Ad Spend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-700">$12.8K</div>
                  <p className="text-sm text-purple-600">Budget: $15K</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/50 dark:to-amber-900/50 border-amber-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Users className="h-5 w-5 mr-2 text-amber-600" />
                    Reach
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-700">847K</div>
                  <p className="text-sm text-amber-600">Unique users</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Video className="h-5 w-5 mr-2 text-blue-600" />
                    Google AI Performance
                  </CardTitle>
                  <CardDescription>
                    Imagen 3 & Veo AI-generated content performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Images Created (Imagen 3)</span>
                      <span className="font-medium">324</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Videos Generated (Veo)</span>
                      <span className="font-medium">89</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>AI Content CTR Improvement</span>
                      <span className="font-medium text-green-600">+42%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ad Format Performance</CardTitle>
                  <CardDescription>
                    Performance breakdown by ad unit type
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">MomentCard</span>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">2.8% CTR</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">VibeOverlay</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">15.2K Shares</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Spawn Point</span>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700">$4.2 ROAS</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Heat Ring Takeover</span>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700">+23% Foot Traffic</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-2 border-dashed border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center">
                    <ImageIcon className="h-5 w-5 mr-2 text-blue-600" />
                    Create with Imagen 3
                  </CardTitle>
                  <CardDescription>
                    Generate high-quality marketing images instantly
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Generate Images
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-dashed border-green-200 bg-green-50/50 dark:bg-green-950/20">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center">
                    <PlayCircle className="h-5 w-5 mr-2 text-green-600" />
                    Create with Veo
                  </CardTitle>
                  <CardDescription>
                    Generate professional promo videos in seconds
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Generate Videos
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-dashed border-purple-200 bg-purple-50/50 dark:bg-purple-950/20">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center">
                    <Target className="h-5 w-5 mr-2 text-purple-600" />
                    Smart Targeting
                  </CardTitle>
                  <CardDescription>
                    AI-powered audience segmentation and optimization
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Optimize Targeting
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="dashboard">
            <AdvertiserDashboard />
          </TabsContent>

          <TabsContent value="create">
            <AdCreationStudio />
          </TabsContent>

          <TabsContent value="targeting">
            <TargetingSegmentation />
          </TabsContent>

          <TabsContent value="reporting">
            <AdvertiserReporting />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdvertisingSuite;
