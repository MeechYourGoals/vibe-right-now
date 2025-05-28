
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Video, 
  Image as ImageIcon, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Zap,
  Brain,
  Target
} from "lucide-react";

interface GoogleAIIntegrationProps {
  className?: string;
}

const GoogleAIIntegration: React.FC<GoogleAIIntegrationProps> = ({ className }) => {
  const [activeDemo, setActiveDemo] = useState("imagen");

  const aiMetrics = {
    imagesGenerated: 324,
    videosGenerated: 89,
    ctrImprovement: 42,
    timeSaved: 147
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* AI Performance Overview */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-700 dark:text-blue-300">
            <Sparkles className="mr-2 h-6 w-6" />
            Google AI Performance Dashboard
          </CardTitle>
          <CardDescription className="text-blue-600 dark:text-blue-400">
            Real-time metrics for Imagen 3 and Veo generated advertising content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center">
                  <ImageIcon className="h-4 w-4 mr-1 text-blue-600" />
                  Images Created
                </span>
                <span className="text-2xl font-bold text-blue-700">{aiMetrics.imagesGenerated}</span>
              </div>
              <Progress value={85} className="h-2" />
              <p className="text-xs text-blue-600">Imagen 3 generated</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center">
                  <Video className="h-4 w-4 mr-1 text-green-600" />
                  Videos Generated
                </span>
                <span className="text-2xl font-bold text-green-700">{aiMetrics.videosGenerated}</span>
              </div>
              <Progress value={65} className="h-2" />
              <p className="text-xs text-green-600">Veo generated</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1 text-purple-600" />
                  CTR Improvement
                </span>
                <span className="text-2xl font-bold text-green-600">+{aiMetrics.ctrImprovement}%</span>
              </div>
              <Progress value={95} className="h-2" />
              <p className="text-xs text-purple-600">vs non-AI content</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-amber-600" />
                  Time Saved
                </span>
                <span className="text-2xl font-bold text-amber-700">{aiMetrics.timeSaved}h</span>
              </div>
              <Progress value={78} className="h-2" />
              <p className="text-xs text-amber-600">vs manual creation</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Demo Tabs */}
      <Tabs value={activeDemo} onValueChange={setActiveDemo} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="imagen" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Imagen 3 Demo
          </TabsTrigger>
          <TabsTrigger value="veo" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Veo Demo
          </TabsTrigger>
          <TabsTrigger value="optimization" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Optimization
          </TabsTrigger>
        </TabsList>

        <TabsContent value="imagen" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ImageIcon className="mr-2 h-5 w-5 text-blue-600" />
                Imagen 3 Image Generation
              </CardTitle>
              <CardDescription>
                Generate high-quality marketing images instantly with Google's latest AI model
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium">Sample Generated Images</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="aspect-square bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    <Zap className="h-3 w-3 mr-1" />
                    Generated in 3.2 seconds
                  </Badge>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">Performance Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Brand Consistency</span>
                      <span className="text-sm font-medium text-green-600">98%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Safety Score</span>
                      <span className="text-sm font-medium text-green-600">100%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Engagement Rate</span>
                      <span className="text-sm font-medium text-green-600">+35%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="veo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Video className="mr-2 h-5 w-5 text-green-600" />
                Veo Video Generation
              </CardTitle>
              <CardDescription>
                Create professional promotional videos in seconds with Google's Veo model
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium">Sample Generated Videos</h4>
                  <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                    <Video className="h-12 w-12 text-green-600" />
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    <Clock className="h-3 w-3 mr-1" />
                    6-second MomentCard ready
                  </Badge>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">Video Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Completion Rate</span>
                      <span className="text-sm font-medium text-green-600">89%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">View-through Rate</span>
                      <span className="text-sm font-medium text-green-600">76%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Share Rate</span>
                      <span className="text-sm font-medium text-green-600">+52%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-5 w-5 text-purple-600" />
                AI Campaign Optimization
              </CardTitle>
              <CardDescription>
                Machine learning insights for maximum campaign performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg bg-blue-50/50">
                  <Target className="h-6 w-6 text-blue-600 mb-2" />
                  <h4 className="font-medium mb-1">Smart Targeting</h4>
                  <p className="text-sm text-muted-foreground">
                    AI identifies optimal audience segments automatically
                  </p>
                </div>
                <div className="p-4 border rounded-lg bg-green-50/50">
                  <TrendingUp className="h-6 w-6 text-green-600 mb-2" />
                  <h4 className="font-medium mb-1">Budget Optimization</h4>
                  <p className="text-sm text-muted-foreground">
                    Real-time budget allocation for maximum ROAS
                  </p>
                </div>
                <div className="p-4 border rounded-lg bg-purple-50/50">
                  <Sparkles className="h-6 w-6 text-purple-600 mb-2" />
                  <h4 className="font-medium mb-1">Creative Testing</h4>
                  <p className="text-sm text-muted-foreground">
                    A/B test variants generated automatically
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick AI Actions</CardTitle>
          <CardDescription>Generate content and optimize campaigns with one click</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-auto p-4 flex flex-col items-center gap-2 bg-blue-600 hover:bg-blue-700">
              <ImageIcon className="h-5 w-5" />
              <span className="text-sm">Generate Images</span>
              <span className="text-xs opacity-75">with Imagen 3</span>
            </Button>
            <Button className="h-auto p-4 flex flex-col items-center gap-2 bg-green-600 hover:bg-green-700">
              <Video className="h-5 w-5" />
              <span className="text-sm">Create Videos</span>
              <span className="text-xs opacity-75">with Veo</span>
            </Button>
            <Button className="h-auto p-4 flex flex-col items-center gap-2 bg-purple-600 hover:bg-purple-700">
              <Target className="h-5 w-5" />
              <span className="text-sm">Optimize Targeting</span>
              <span className="text-xs opacity-75">AI suggestions</span>
            </Button>
            <Button className="h-auto p-4 flex flex-col items-center gap-2 bg-amber-600 hover:bg-amber-700">
              <Brain className="h-5 w-5" />
              <span className="text-sm">Analyze Performance</span>
              <span className="text-xs opacity-75">Deep insights</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleAIIntegration;
