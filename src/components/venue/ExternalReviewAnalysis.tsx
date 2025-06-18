
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MessageSquare, ExternalLink, Loader2, Globe, TrendingUp } from "lucide-react";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import { supabase } from "@/integrations/supabase/client";
import VernonReviewChat from './VernonReviewChat';

interface ExternalReviewAnalysisProps {
  venueId: string;
  venueName: string;
}

interface ReviewAnalysisData {
  url: string;
  domain: string;
  platform: string;
  summary: string;
  reviewCount: number;
  overallSentiment: number;
  themes: {
    positive: string[];
    negative: string[];
    neutral: string[];
  };
  analyzedAt: string;
}

const ExternalReviewAnalysis: React.FC<ExternalReviewAnalysisProps> = ({
  venueId,
  venueName
}) => {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState<ReviewAnalysisData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { canAccessFeature } = useUserSubscription();
  
  const hasUrlFeature = canAccessFeature('plus');
  const hasVernonChat = canAccessFeature('premium');

  useEffect(() => {
    const handleSubscriptionChange = () => {
      setAnalysisData(null);
      setUrl("");
      setError(null);
    };

    window.addEventListener('subscriptionTierChanged', handleSubscriptionChange);
    return () => window.removeEventListener('subscriptionTierChanged', handleSubscriptionChange);
  }, []);

  const handleAnalyzeUrl = async () => {
    if (!url.trim() || !hasUrlFeature) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      // Validate URL
      new URL(url);
      
      const { data, error: functionError } = await supabase.functions.invoke('parse-venue-reviews', {
        body: {
          url: url.trim(),
          venueId
        }
      });

      if (functionError) throw functionError;

      if (data.success) {
        setAnalysisData(data.data);
      } else {
        throw new Error('Failed to analyze reviews');
      }
    } catch (error) {
      console.error('Error analyzing reviews:', error);
      setError(error instanceof Error ? error.message : 'Invalid URL or analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 0.8) return 'text-green-600';
    if (sentiment >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSentimentText = (sentiment: number) => {
    if (sentiment >= 0.8) return 'Very Positive';
    if (sentiment >= 0.6) return 'Positive';
    if (sentiment >= 0.4) return 'Mixed';
    return 'Negative';
  };

  const getPlatformIcon = (domain: string) => {
    if (domain.includes('yelp')) return '🟡';
    if (domain.includes('tripadvisor')) return '🟢';
    if (domain.includes('opentable')) return '🔵';
    if (domain.includes('google')) return '🔴';
    if (domain.includes('facebook')) return '🔵';
    if (domain.includes('instagram')) return '🟣';
    if (domain.includes('tiktok')) return '⚫';
    return '🌐';
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-500" />
            Universal Review Summaries
            {hasUrlFeature ? (
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                Plus
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-gray-100 text-gray-600">
                Plus Required
              </Badge>
            )}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {!hasUrlFeature ? (
          <div className="text-center py-6">
            <Globe className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-muted-foreground mb-4">
              Upgrade to Plus to analyze reviews from any platform
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Get AI summaries from Yelp, TripAdvisor, OpenTable, Instagram, TikTok, Facebook, and more
            </p>
            <Button disabled>
              Upgrade to Plus
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Paste any venue URL (Yelp, TripAdvisor, OpenTable, Instagram, TikTok, Facebook...)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1"
                  disabled={isAnalyzing}
                />
                <Button 
                  onClick={handleAnalyzeUrl}
                  disabled={!url.trim() || isAnalyzing}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Analyze
                    </>
                  )}
                </Button>
              </div>
              
              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                  {error}
                </div>
              )}
              
              <div className="text-xs text-muted-foreground">
                <strong>Supported platforms:</strong> Yelp, TripAdvisor, OpenTable, Google Reviews, Facebook, Instagram, TikTok, and any site with reviews
              </div>
            </div>

            {analysisData && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-blue-900 flex items-center gap-2">
                      {getPlatformIcon(analysisData.domain)} {analysisData.platform} Summary
                    </h4>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-blue-700">{analysisData.reviewCount} reviews</span>
                      <span className={`font-medium ${getSentimentColor(analysisData.overallSentiment)}`}>
                        {getSentimentText(analysisData.overallSentiment)}
                      </span>
                    </div>
                  </div>
                  <p className="text-blue-800 text-sm whitespace-pre-line mb-3">
                    {analysisData.summary}
                  </p>
                  
                  {analysisData.themes && (
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <div className="font-medium text-green-700 mb-1">✅ Praised For:</div>
                        <div className="space-x-1">
                          {analysisData.themes.positive.slice(0, 3).map((theme, idx) => (
                            <span key={idx} className="bg-green-100 text-green-700 px-1 py-0.5 rounded">
                              {theme}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-red-700 mb-1">⚠️ Concerns:</div>
                        <div className="space-x-1">
                          {analysisData.themes.negative.slice(0, 3).map((theme, idx) => (
                            <span key={idx} className="bg-red-100 text-red-700 px-1 py-0.5 rounded">
                              {theme}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700 mb-1">📝 Mentioned:</div>
                        <div className="space-x-1">
                          {analysisData.themes.neutral.slice(0, 3).map((theme, idx) => (
                            <span key={idx} className="bg-gray-100 text-gray-700 px-1 py-0.5 rounded">
                              {theme}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-2 text-xs text-blue-600">
                    <ExternalLink className="inline h-3 w-3 mr-1" />
                    <a href={analysisData.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      View original reviews
                    </a>
                  </div>
                </div>

                {hasVernonChat && (
                  <VernonReviewChat 
                    reviewSummary={analysisData.summary}
                    venueId={venueId}
                    platform={analysisData.platform}
                  />
                )}
                
                {!hasVernonChat && (
                  <div className="text-center py-4 border border-purple-200 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                    <MessageSquare className="mx-auto h-8 w-8 text-purple-600 mb-2" />
                    <p className="text-sm text-purple-700 mb-2 font-medium">
                      Want to ask questions about these reviews?
                    </p>
                    <p className="text-xs text-purple-600 mb-3">
                      "What's the dress code?" • "Is it kid-friendly?" • "How's parking?"
                    </p>
                    <Button size="sm" variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-100">
                      Upgrade to Premium for Vernon Chat
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExternalReviewAnalysis;
