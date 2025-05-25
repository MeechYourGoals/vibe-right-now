
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
      {/* Gemini & Notebook LM Integration Banner - Styled with Blue/Purple Gradient */}
      <Card className="border border-purple-700 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 backdrop-blur-sm p-4 md:p-6">
        <CardHeader className="pb-2 px-0 pt-0">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center text-white">
              <Brain className="mr-2 h-5 w-5 text-purple-300" />
              Gemini Deep Research Powered Analytics & Notebook LM Integration
            </CardTitle>
            <Badge variant="outline" className="bg-purple-600 text-white border-purple-500">
              {isPro ? 'Pro Active' : 'Premium+'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pb-2 px-0">
          <p className="text-sm text-indigo-100">
            Advanced analytics powered by Gemini Deep Research provides comprehensive insights into your venue's performance. 
            We don't just pull necessary data for venues - we give you the ability to converse and interact with your data through 
            Google Notebook LM. Export your analysis to generate conversational AI podcasts that summarize your key metrics, 
            trends, and actionable insights in an easy-to-digest audio format.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              className="border-blue-700 text-blue-200 hover:bg-blue-700/30 bg-blue-800/20 hover:text-white"
              disabled={!isPremium}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Run Gemini Deep Research Analysis
            </Button>
            <Button 
              variant="outline" 
              className="border-purple-700 text-purple-200 hover:bg-purple-700/30 bg-purple-800/20 hover:text-white"
              disabled={!isPremium}
            >
              <Mic className="mr-2 h-4 w-4" />
              Generate Notebook LM Podcast Summary
            </Button>
          </div>
          {isPremium && (
            <div className="mt-3 p-3 bg-blue-700/30 rounded-lg border border-blue-800/50">
              <p className="text-xs text-blue-200">
                💡 <strong className="font-semibold">Premium Feature:</strong> Transform your analytics data into engaging conversational audio insights. 
                Perfect for busy venue managers who want to stay informed while multitasking. Ask questions, explore trends, 
                and get actionable recommendations through natural conversation with your data.
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
            Detailed insights about your venue's performance powered by Google AI with conversational interaction capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-8 bg-neutral-800">
              <TabsTrigger value="overview" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-300">
                <ChartBar className="mr-2 h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="audience" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-300">
                <Star className="mr-2 h-4 w-4" />
                Audience
              </TabsTrigger>
              <TabsTrigger value="trends" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-300">
                <TrendingUp className="mr-2 h-4 w-4" />
                Trends
              </TabsTrigger>
              {isPro && (
                <TabsTrigger value="upload" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-300">
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
