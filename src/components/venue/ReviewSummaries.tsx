
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star, TrendingUp, TrendingDown, RefreshCw, ExternalLink } from 'lucide-react';
import { ReviewSummary } from "@/types";
import { supabase } from '@/integrations/supabase/client';

interface ReviewSummariesProps {
  venueId: string;
  connectedPlatforms: Record<string, boolean>;
  subscriptionTier: 'standard' | 'plus' | 'premium' | 'pro';
}

const ReviewSummaries: React.FC<ReviewSummariesProps> = ({
  venueId,
  connectedPlatforms,
  subscriptionTier
}) => {
  const [summaries, setSummaries] = useState<ReviewSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  // Check if venue has premium access for review summaries
  const hasPremiumAccess = subscriptionTier === 'premium' || subscriptionTier === 'pro';
  
  // Check if venue has any connected platforms
  const hasConnectedPlatforms = Object.values(connectedPlatforms).some(connected => connected);

  useEffect(() => {
    if (hasPremiumAccess && hasConnectedPlatforms) {
      loadReviewSummaries();
    }
  }, [venueId, hasPremiumAccess, hasConnectedPlatforms]);

  const loadReviewSummaries = async () => {
    setIsLoading(true);
    try {
      // Mock data for now - would fetch from Supabase in real implementation
      const mockSummaries: ReviewSummary[] = [
        {
          id: '1',
          venueId,
          platform: 'yelp',
          overallSentiment: 0.75,
          sentimentSummary: 'Customers love the ambience and food quality but find service slow',
          totalReviews: 124,
          averageRating: 4.3,
          themes: {
            ambience: 0.9,
            food: 0.8,
            service: -0.2,
            value: 0.6,
            cleanliness: 0.7
          },
          lastUpdated: new Date().toISOString(),
          reviewsAnalyzed: 50
        },
        {
          id: '2',
          venueId,
          platform: 'instagram',
          overallSentiment: 0.85,
          sentimentSummary: 'Great atmosphere and beautiful presentation, perfect for photos',
          totalReviews: 89,
          averageRating: 4.5,
          themes: {
            atmosphere: 0.95,
            presentation: 0.9,
            music: 0.8,
            staff: 0.7
          },
          lastUpdated: new Date().toISOString(),
          reviewsAnalyzed: 35
        }
      ];
      
      setSummaries(mockSummaries);
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Error loading review summaries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshSummaries = async () => {
    if (!hasPremiumAccess || !hasConnectedPlatforms) return;
    
    setIsLoading(true);
    try {
      // Call Supabase edge function to refresh reviews
      const { data, error } = await supabase.functions.invoke('review-sentiment-analyzer', {
        body: {
          venue_id: venueId,
          platform: 'all', // Analyze all connected platforms
          refresh: true
        }
      });

      if (error) throw error;
      
      // Reload summaries after refresh
      await loadReviewSummaries();
    } catch (error) {
      console.error('Error refreshing summaries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.5) return 'text-green-600';
    if (sentiment > 0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSentimentIcon = (sentiment: number) => {
    return sentiment > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />;
  };

  if (!hasPremiumAccess) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Review Summaries
            <Badge variant="outline">Premium Feature</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Upgrade to Premium or Pro to get AI-powered review summaries from your connected social media platforms.
          </p>
          <Button variant="outline" size="sm">
            Upgrade to Premium
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!hasConnectedPlatforms) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Review Summaries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Connect your external platforms (Yelp, Instagram, TikTok, etc.) to get AI-powered review summaries.
          </p>
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            Connect Platforms
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Review Summaries
            <Badge variant="secondary">AI-Powered</Badge>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refreshSummaries}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </CardTitle>
        {lastRefresh && (
          <p className="text-xs text-muted-foreground">
            Last updated: {lastRefresh.toLocaleString()}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="text-center">
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent mb-2"></div>
              <p className="text-sm text-muted-foreground">Analyzing reviews...</p>
            </div>
          </div>
        ) : summaries.length > 0 ? (
          summaries.map((summary) => (
            <div key={summary.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="capitalize">{summary.platform}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {summary.totalReviews} reviews • {summary.reviewsAnalyzed} analyzed
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">{summary.averageRating.toFixed(1)}</span>
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </div>
              </div>

              <div className={`flex items-center gap-2 ${getSentimentColor(summary.overallSentiment)}`}>
                {getSentimentIcon(summary.overallSentiment)}
                <span className="text-sm font-medium">
                  {(summary.overallSentiment * 100).toFixed(0)}% positive sentiment
                </span>
              </div>

              <p className="text-sm text-muted-foreground">
                {summary.sentimentSummary}
              </p>

              {Object.keys(summary.themes).length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Key Themes:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(summary.themes)
                      .sort(([,a], [,b]) => b - a)
                      .slice(0, 4)
                      .map(([theme, score]) => (
                        <div key={theme} className="flex items-center justify-between text-xs">
                          <span className="capitalize">{theme}</span>
                          <span className={getSentimentColor(score)}>
                            {score > 0 ? '+' : ''}{(score * 100).toFixed(0)}%
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              <Separator />
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground py-8">
            No review summaries available yet. Try refreshing or check your platform connections.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewSummaries;
