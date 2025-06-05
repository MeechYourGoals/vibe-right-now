
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, TrendingUp, Star, ChartBar, Square } from "lucide-react";
import AnalyticsFileUpload from "../AnalyticsFileUpload";
import OverviewPanel from "./OverviewPanel";
import AudiencePanel from "./AudiencePanel";
import TrendsPanel from "./TrendsPanel";
import SquareAIIntegration from "./SquareAIIntegration";

interface AnalyticsTabContentProps {
  isPremium: boolean;
  isPro: boolean;
}

const AnalyticsTabContent = ({ isPremium, isPro }: AnalyticsTabContentProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Analytics Dashboard</CardTitle>
        <CardDescription>
          Detailed insights about your venue's performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid ${isPro ? 'grid-cols-6' : 'grid-cols-4'} mb-8`}>
            <TabsTrigger value="overview">
              <ChartBar className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="audience">
              <Star className="mr-2 h-4 w-4" />
              Audience
            </TabsTrigger>
            <TabsTrigger value="trends">
              <TrendingUp className="mr-2 h-4 w-4" />
              Trends
            </TabsTrigger>
            {isPro && (
              <TabsTrigger value="square-ai">
                <Square className="mr-2 h-4 w-4" />
                Square AI
              </TabsTrigger>
            )}
            {isPro && (
              <TabsTrigger value="upload">
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
            <TabsContent value="square-ai" className="space-y-6">
              <SquareAIIntegration isPro={isPro} />
            </TabsContent>
          )}
          
          {isPro && (
            <TabsContent value="upload" className="space-y-6">
              <AnalyticsFileUpload />
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AnalyticsTabContent;
