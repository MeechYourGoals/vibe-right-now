
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, MessageSquare, Star, RefreshCw, ExternalLink } from 'lucide-react';
import { SentimentAnalysisService } from "@/services/sentimentAnalysisService";
import { PlatformSentimentSummary, SentimentTheme } from "@/types";
import { toast } from "sonner";

interface SentimentAnalysisTabProps {
  venueId: string;
  isPremium: boolean;
}

const SentimentAnalysisTab: React.FC<SentimentAnalysisTabProps> = ({ venueId, isPremium }) => {
  const [platformSummaries, setPlatformSummaries] = useState<PlatformSentimentSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Load sentiment data
  const loadSentimentData = async () => {
    setLoading(true);
    try {
      const summaries = await SentimentAnalysisService.getPlatformSentimentSummaries(venueId);
      setPlatformSummaries(summaries);
      if (summaries.length > 0) {
        setLastUpdated(new Date().toLocaleString());
      }
    } catch (error) {
      console.error('Error loading sentiment data:', error);
      toast.error('Failed to load sentiment analysis');
    } finally {
      setLoading(false);
    }
  };

  // Trigger analysis with mock data for demo
  const triggerAnalysis = async () => {
    setLoading(true);
    try {
      await SentimentAnalysisService.triggerMockAnalysis(venueId);
      toast.success('Sentiment analysis started! Results will appear shortly.');
      setTimeout(() => {
        loadSentimentData();
      }, 2000); // Wait for analysis to complete
    } catch (error) {
      console.error('Error triggering analysis:', error);
      toast.error('Failed to start sentiment analysis');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isPremium) {
      loadSentimentData();
    }
  }, [venueId, isPremium]);

  const getSentimentColor = (score: number) => {
    if (score > 0.3) return 'text-green-600';
    if (score < -0.3) return 'text-red-600';
    return 'text-yellow-600';
  };

  const getSentimentLabel = (score: number) => {
    if (score > 0.5) return 'Very Positive';
    if (score > 0.1) return 'Positive';
    if (score > -0.1) return 'Neutral';
    if (score > -0.5) return 'Negative';
    return 'Very Negative';
  };

  const formatThemeData = (themes: SentimentTheme[]) => {
    return themes.map(theme => ({
      name: theme.name,
      score: Math.round((theme.score + 1) * 50), // Convert -1 to 1 scale to 0-100
      originalScore: theme.score
    }));
  };

  if (!isPremium) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" />
            AI Sentiment Analysis
            <Badge variant="outline" className="ml-2">Premium Feature</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Get AI-powered sentiment analysis of customer reviews across all your connected platforms.
          </p>
          <Button disabled>
            Upgrade to Premium to Access
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              AI Sentiment Analysis
              <Badge variant="outline" className="ml-2 bg-purple-100 text-purple-700">Premium</Badge>
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={loadSentimentData}
                disabled={loading}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                onClick={triggerAnalysis}
                disabled={loading}
              >
                <Star className="mr-2 h-4 w-4" />
                Analyze Reviews
              </Button>
            </div>
          </div>
          {lastUpdated && (
            <p className="text-sm text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          )}
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="text-center">
                <RefreshCw className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">Analyzing reviews...</p>
              </div>
            </div>
          ) : platformSummaries.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No Sentiment Analysis Available</h3>
              <p className="text-muted-foreground mb-4">
                Click "Analyze Reviews" to start analyzing customer sentiment from your connected platforms.
              </p>
              <Button onClick={triggerAnalysis} disabled={loading}>
                Start Analysis
              </Button>
            </div>
          ) : (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="platforms">By Platform</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {platformSummaries.slice(0, 3).map((platform) => (
                    <Card key={platform.platform}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium capitalize">{platform.platform}</h4>
                          <Badge variant="outline" className={getSentimentColor(platform.overallSentiment)}>
                            {getSentimentLabel(platform.overallSentiment)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {platform.summary}
                        </p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MessageSquare className="mr-1 h-3 w-3" />
                          {platform.reviewCount} reviews analyzed
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {platformSummaries.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Sentiment Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={platformSummaries}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="platform" />
                          <YAxis domain={[-1, 1]} />
                          <Tooltip 
                            formatter={(value: number) => [getSentimentLabel(value), 'Sentiment']}
                          />
                          <Bar 
                            dataKey="overallSentiment" 
                            fill="#8884d8"
                            name="Overall Sentiment"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="platforms" className="space-y-4">
                {platformSummaries.map((platform) => (
                  <Card key={platform.platform}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="capitalize flex items-center">
                          {platform.platform}
                          <Badge 
                            variant="outline" 
                            className={`ml-2 ${getSentimentColor(platform.overallSentiment)}`}
                          >
                            {getSentimentLabel(platform.overallSentiment)}
                          </Badge>
                        </CardTitle>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg mb-4">{platform.summary}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3">Theme Breakdown</h4>
                          <div className="space-y-2">
                            {platform.themes.map((theme) => (
                              <div key={theme.name} className="flex items-center justify-between">
                                <span className="text-sm">{theme.name}</span>
                                <div className="flex items-center gap-2 w-32">
                                  <Progress 
                                    value={(theme.score + 1) * 50} 
                                    className="flex-1" 
                                  />
                                  <span className={`text-xs ${getSentimentColor(theme.score)}`}>
                                    {theme.score > 0 ? '+' : ''}{(theme.score * 100).toFixed(0)}%
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-3">Quick Stats</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Reviews Analyzed</span>
                              <span className="font-medium">{platform.reviewCount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Last Updated</span>
                              <span className="font-medium">
                                {new Date(platform.lastUpdated).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Sentiment Score</span>
                              <span className={`font-medium ${getSentimentColor(platform.overallSentiment)}`}>
                                {(platform.overallSentiment * 100).toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SentimentAnalysisTab;
