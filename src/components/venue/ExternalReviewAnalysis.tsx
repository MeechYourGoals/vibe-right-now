
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Lock, Sparkles } from "lucide-react";
import { useUserSubscription } from "@/hooks/useUserSubscription";

interface ExternalReviewAnalysisProps {
  venueId: string;
  venueName: string;
}

// Mock data for demo venues
const getMockAnalysis = (venueId: string, venueName: string) => {
  const mockAnalyses = {
    "1": `Based on reviews across multiple platforms, ${venueName} receives consistently positive feedback for its atmosphere and world-class music lineup, with customers frequently praising the "incredible desert vibes" and "unforgettable performances." 

Service quality appears strong during the festival, with staff described as "helpful" and "well-organized" in 89% of recent reviews. However, some attendees note challenges with food vendor wait times and parking logistics.

The most commonly mentioned positives include: exceptional artist lineup, stunning desert backdrop, and vibrant festival atmosphere. Areas for improvement based on customer feedback include: faster food service, improved parking solutions, and more shade areas during peak sun hours.`,
    
    "3": `Based on reviews across multiple platforms, ${venueName} receives consistently positive feedback for its atmosphere and coffee quality, with customers frequently praising the "cozy artisan vibe" and "perfect blend profiles." 

Service quality appears to be a strong point, with staff described as "knowledgeable" and "passionate about coffee" in 92% of recent reviews. However, some customers note that seating can be limited during peak morning hours.

The most commonly mentioned positives include: exceptional single-origin coffee, skilled baristas, and Instagram-worthy latte art. Areas for improvement based on customer feedback include: expanded seating area, faster service during rush hours, and more pastry options.`
  };
  
  return mockAnalyses[venueId] || null;
};

const ExternalReviewAnalysis: React.FC<ExternalReviewAnalysisProps> = ({
  venueId,
  venueName
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const { canAccessFeature, tier } = useUserSubscription();
  const isPremium = canAccessFeature('premium');

  // Check if this is a demo venue (Coachella Valley or Artisan Coffee House)
  const isDemoVenue = venueId === "1" || venueId === "3";
  const showMockData = isPremium && isDemoVenue;

  useEffect(() => {
    // Listen for subscription changes
    const handleSubscriptionChange = () => {
      setAnalysis(null); // Reset analysis when subscription changes
    };

    window.addEventListener('subscriptionTierChanged', handleSubscriptionChange);
    return () => window.removeEventListener('subscriptionTierChanged', handleSubscriptionChange);
  }, []);

  const handleAnalyzeReviews = async () => {
    if (!showMockData) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      const mockAnalysis = getMockAnalysis(venueId, venueName);
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            External Review Analysis
            {isPremium ? (
              <Badge variant="outline" className="bg-purple-100 text-purple-700">
                Premium
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-gray-100 text-gray-600">
                Premium Required
              </Badge>
            )}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {!isPremium ? (
          <div className="text-center py-6">
            <Lock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-muted-foreground mb-4">
              Upgrade to premium to chat with Review Summaries
            </p>
            <Button disabled>
              Upgrade to Premium
            </Button>
          </div>
        ) : !isDemoVenue ? (
          <div className="text-center py-6">
            <Sparkles className="mx-auto h-12 w-12 text-purple-500 mb-4" />
            <p className="text-muted-foreground mb-4">
              Premium feature available for select venues
            </p>
            <Button disabled className="bg-gray-400">
              <Lock className="mr-2 h-4 w-4" />
              Coming Soon
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {!analysis ? (
              <div className="text-center py-6">
                <Sparkles className="mx-auto h-12 w-12 text-purple-500 mb-4" />
                <p className="text-muted-foreground mb-4">
                  Analyze reviews from connected review platforms using AI
                </p>
                <Button 
                  onClick={handleAnalyzeReviews}
                  disabled={isAnalyzing}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing Reviews...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Analyze External Reviews
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg border">
                  <h4 className="font-semibold text-purple-900 mb-2">AI Review Analysis</h4>
                  <p className="text-purple-800 whitespace-pre-line">{analysis}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Analysis based on reviews from connected platforms
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setAnalysis(null)}
                  >
                    Generate New Analysis
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExternalReviewAnalysis;
