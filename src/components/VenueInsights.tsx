
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import QuickActions from "@/components/venue/QuickActions";
import PerformanceMetrics from "@/components/venue/PerformanceMetrics";
import MediaEngagementChart from "@/components/data-insights/MediaEngagementChart";
import AudienceInsights from "@/components/venue/AudienceInsights";
import UpcomingEvents from "@/components/venue/UpcomingEvents";
import VernonVenueAssistant from "@/components/venue/VernonVenueAssistant";
import CompetitorAnalysis from "@/components/venue/CompetitorAnalysis";
import SocialMediaIntegration from "@/components/venue/SocialMediaIntegration";
import { generateWeeklyData } from "@/utils/insightsData";
import { Badge } from "@/components/ui/badge";
import { Brain, FileSpreadsheet, Bot } from "lucide-react";

const VenueInsights = () => {
  const [subscriptionTier, setSubscriptionTier] = useState<'standard' | 'plus' | 'premium' | 'pro'>('pro');
  const mediaData = generateWeeklyData();
  
  // Add mock venue insights data for PerformanceMetrics
  const mockVenueInsights = {
    visitors: 1520,
    visitorsChange: 8.3,
    posts: 34,
    postsChange: 12.5,
    likes: 876,
    likesChange: 15.2,
    mentions: 45,
    mentionsChange: 6.7,
    checkins: 128,
    checkinsChange: 9.4,
    reviews: 22,
    reviewsChange: 4.8,
    rating: 4.7,
    ratingChange: 0.3
  };
  
  // Function to simulate upgrading subscription
  const upgradeSubscription = (tier: string) => {
    setSubscriptionTier(tier as 'standard' | 'plus' | 'premium' | 'pro');
  };
  
  return (
    <div className="space-y-6 min-h-screen bg-neutral-950 text-white p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <PerformanceMetrics venueInsights={mockVenueInsights} />
        </div>
        <div>
          <QuickActions onTierChange={upgradeSubscription} currentTier={subscriptionTier} />
        </div>
      </div>
      
      <Card className="border-2 border-green-600 bg-neutral-900 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center text-green-400">
              <Brain className="mr-2 h-5 w-5" /> 
              Gemini Agent Mode & Notebook LM Analytics
            </CardTitle>
            <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-600">
              Pro Features
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pb-4">
          <p className="text-sm text-green-200">
            Gemini Agent Mode automatically processes your business data to provide actionable insights. 
            Notebook LM helps analyze financial documents, P&L sheets, and generates executive summaries.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="border-green-600 text-green-400 hover:bg-green-900/20 bg-green-950/30">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Upload Business Documents
            </Button>
            <Button variant="outline" className="border-green-600 text-green-400 hover:bg-green-900/20 bg-green-950/30">
              <Bot className="mr-2 h-4 w-4" />
              Run Gemini Analysis
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-white">Media Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <MediaEngagementChart data={mediaData} />
          </CardContent>
        </Card>
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-white">Audience Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <AudienceInsights />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <SocialMediaIntegration 
          subscriptionTier={subscriptionTier} 
          venueName="The Rooftop" 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UpcomingEvents />
        </div>
        <div>
          <VernonVenueAssistant />
        </div>
      </div>
      
      <CompetitorAnalysis />
    </div>
  );
};

export default VenueInsights;
