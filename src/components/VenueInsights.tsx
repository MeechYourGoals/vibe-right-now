import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Assuming Tabs, TabsContent, TabsList, TabsTrigger might be used elsewhere or were part of a larger context.
// For now, they are not directly used in this specific version of VenueInsights content structure.
// If they are needed, they would have to be part of a specific layout not shown in the conflicting snippet.
import { Button } from "@/components/ui/button";
import QuickActions from "@/components/venue/QuickActions";
import PerformanceMetrics from "@/components/venue/PerformanceMetrics";
import MediaEngagementChart from "@/components/data-insights/MediaEngagementChart";
import AudienceInsights from "@/components/venue/AudienceInsights";
import UpcomingEvents from "@/components/venue/UpcomingEvents";
import VernonVenueAssistant from "@/components/venue/VernonVenueAssistant";
import CompetitorAnalysis from "@/components/venue/CompetitorAnalysis";
import SocialMediaIntegration from "@/components/venue/SocialMediaIntegration";
import { generateWeeklyData } from "@/utils/insightsData"; // Assuming this path is correct
import { Badge } from "@/components/ui/badge";
import { Brain, FileSpreadsheet, Bot } from "lucide-react";

const VenueInsights = () => {
  const [subscriptionTier, setSubscriptionTier] = useState<'standard' | 'plus' | 'premium' | 'pro'>('pro');
  const mediaData = generateWeeklyData();

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

  const upgradeSubscription = (tier: string) => {
    setSubscriptionTier(tier as 'standard' | 'plus' | 'premium' | 'pro');
  };

  return (
    <div className="space-y-6 min-h-screen bg-neutral-950 text-white p-6"> {/* bg-neutral-950 was in user's latest snippet, keeping it for now */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <PerformanceMetrics venueInsights={mockVenueInsights} />
        </div>
        <div>
          <QuickActions onTierChange={upgradeSubscription} currentTier={subscriptionTier} />
        </div>
      </div>

      {/* Gemini Agent Mode Section - Green Gradient Theme */}
      <Card className="border border-emerald-700 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 backdrop-blur-sm p-4 md:p-6">
        <CardHeader className="pb-2 px-0 pt-0">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center text-white">
              <Brain className="mr-2 h-5 w-5 text-emerald-200" /> 
              Gemini Agent Mode & Notebook LM Analytics
            </CardTitle>
            <Badge variant="outline" className="bg-emerald-700 text-white border-emerald-600">
              Pro Features
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pb-2 px-0">
          <p className="text-sm text-emerald-50">
            Gemini Agent Mode automatically processes your business data to provide actionable insights. 
            Notebook LM helps analyze financial documents, P&L sheets, and generates executive summaries.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-800">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Upload Business Documents
            </Button>
            <Button className="bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-800">
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
