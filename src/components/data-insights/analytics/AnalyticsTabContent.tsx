
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, TrendingUp, Star, ChartBar, Brain, Mic } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AnalyticsFileUpload from "../AnalyticsFileUpload";
import OverviewPanel from "./OverviewPanel";
import AudiencePanel from "./AudiencePanel";
import TrendsPanel from "./TrendsPanel";

interface AnalyticsTabContentProps {
  isPremium: boolean;
  isPro: boolean;
}

const AnalyticsTabContent = ({ isPremium, isPro }: AnalyticsTabContentProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="space-y-6">
      {/* Gemini & Notebook LM Integration Banner */}
      <Card className="border-2 border-green-600 bg-gradient-to-r from-green-950/20 to-blue-950/20 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center text-green-400">
              <Brain className="mr-2 h-5 w-5" />
              Gemini Powered Analytics & Notebook LM Integration
            </CardTitle>
            <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-600">
              {isPro ? 'Pro Active' : 'Premium+'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pb-4">
          <p className="text-sm text-green-200">
            Advanced analytics powered by Gemini AI provides deep insights into your venue's performance. 
            Export your data analysis to Google Notebook LM to generate conversational AI podcasts that 
            summarize your key metrics and trends in an easy-to-digest format.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              className="border-green-600 text-green-400 hover:bg-green-900/20 bg-green-950/30"
              disabled={!isPremium}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Run Gemini Analysis
            </Button>
            <Button 
              variant="outline" 
              className="border-blue-600 text-blue-400 hover:bg-blue-900/20 bg-blue-950/30"
              disabled={!isPremium}
            >
              <Mic className="mr-2 h-4 w-4" />
              Generate Notebook LM Podcast
            </Button>
          </div>
          {isPremium && (
            <div className="mt-3 p-3 bg-green-950/30 rounded-lg border border-green-800/30">
              <p className="text-xs text-green-300">
                💡 <strong>Premium Feature:</strong> Transform your analytics data into engaging audio insights. 
                Perfect for busy venue managers who want to stay informed while multitasking.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Analytics Dashboard */}
      <Card className="bg-neutral-900 border-neutral-700">
        <CardHeader>
          <CardTitle className="text-white">Advanced Analytics Dashboard</CardTitle>
          <CardDescription className="text-neutral-400">
            Detailed insights about your venue's performance powered by Google AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-8 bg-neutral-800">
              <TabsTrigger value="overview" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white">
                <ChartBar className="mr-2 h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="audience" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white">
                <Star className="mr-2 h-4 w-4" />
                Audience
              </TabsTrigger>
              <TabsTrigger value="trends" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white">
                <TrendingUp className="mr-2 h-4 w-4" />
                Trends
              </TabsTrigger>
              {isPro && (
                <TabsTrigger value="upload" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white">
                  <Upload className="mr-2 h-4 w-4" />
                  File Analysis
                </TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <OverviewPanel />
            </TabsContent>
            
            <TabsContent value="audience" className="space-y-6">
              <AudiencePanel />
            </TabsContent>
            
            <TabsContent value="trends" className="space-y-6">
              <TrendsPanel />
            </TabsContent>
            
            {isPro && (
              <TabsContent value="upload" className="space-y-6">
                <AnalyticsFileUpload />
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsTabContent;
