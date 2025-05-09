
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

const VenueInsights = () => {
  const [subscriptionTier, setSubscriptionTier] = useState<'standard' | 'plus' | 'premium' | 'pro'>('standard');
  const mediaData = generateWeeklyData();
  
  // Function to simulate upgrading subscription
  const upgradeSubscription = (tier: string) => {
    setSubscriptionTier(tier as 'standard' | 'plus' | 'premium' | 'pro');
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <PerformanceMetrics />
        </div>
        <div>
          <QuickActions onTierChange={upgradeSubscription} currentTier={subscriptionTier} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Media Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <MediaEngagementChart data={mediaData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Audience Insights</CardTitle>
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
