
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, MessageSquare, Star, RefreshCw, ExternalLink, Edit3, Coffee } from 'lucide-react';
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
  const [venueName, setVenueName] = useState('Artisan Coffee House');
  const [isEditingName, setIsEditingName] = useState(false);

  // Load sentiment data
  const loadSentimentData = async () => {
    setLoading(true);
    try {
      const summaries = await SentimentAnalysisService.getPlatformSentimentSummaries(venueId, venueName);
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

  // Trigger analysis with coffee shop data
  const triggerAnalysis = async () => {
    setLoading(true);
    try {
      await SentimentAnalysisService.triggerMockAnalysis(venueId);
      toast.success('Sentiment analysis started! Analyzing customer reviews...');
      setTimeout(() => {
        loadSentimentData();
      }, 2000);
    } catch (error) {
      console.error('Error triggering analysis:', error);
      toast.error('Failed to start sentiment analysis');
    } finally {
      setLoading(false);
    }
  };

  // Handle venue name update
  const handleVenueNameUpdate = () => {
    setIsEditingName(false);
    loadSentimentData();
    toast.success(`Updated analysis for ${venueName}`);
  };

  useEffect(() => {
    if (isPremium) {
      loadSentimentData();
    }
  }, [venueId, isPremium]);

  const getSentimentColor = (score: number) => {
    if (score > 0.3) return 'text-green-400';
    if (score < -0.3) return 'text-red-400';
    return 'text-yellow-400';
  };

  const getSentimentBadgeColor = (score: number) => {
    if (score > 0.3) return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (score < -0.3) return 'bg-red-500/20 text-red-400 border-red-500/30';
    return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
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
      score: Math.round((theme.score + 1) * 50),
      originalScore: theme.score
    }));
  };

  if (!isPremium) {
    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center text-foreground">
            <MessageSquare className="mr-2 h-5 w-5" />
            AI Sentiment Analysis
            <Badge variant="outline" className="ml-2 bg-purple-500/20 text-purple-400 border-purple-500/30">
              Premium Feature
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Get AI-powered sentiment analysis of customer reviews across all your connected platforms.
            Understand what customers love about your coffee, atmosphere, and service.
          </p>
          <Button disabled className="bg-muted text-muted-foreground">
            Upgrade to Premium to Access
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center text-foreground">
              <Coffee className="mr-2 h-5 w-5" />
              AI Sentiment Analysis
              <Badge variant="outline" className="ml-2 bg-purple-500/20 text-purple-400 border-purple-500/30">
                Premium
              </Badge>
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={loadSentimentData}
                disabled={loading}
                className="border-border hover:bg-muted"
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                onClick={triggerAnalysis}
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700"
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
          {/* Venue Name Editor */}
          <Card className="mb-6 bg-muted/50 border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="venue-name" className="text-sm font-medium text-foreground">
                    Venue Name for Analysis
                  </Label>
                  {isEditingName ? (
                    <div className="flex gap-2 mt-2">
                      <Input
                        id="venue-name"
                        value={venueName}
                        onChange={(e) => setVenueName(e.target.value)}
                        className="bg-background border-border text-foreground"
                        placeholder="Enter venue name"
                      />
                      <Button 
                        size="sm" 
                        onClick={handleVenueNameUpdate}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Update
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 mt-2">
                      <h3 className="text-lg font-semibold text-foreground">{venueName}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsEditingName(true)}
                        className="h-6 w-6 p-0 hover:bg-muted"
                      >
                        <Edit3 className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Change the venue name to analyze competitor sentiment or compare different locations
              </p>
            </CardContent>
          </Card>

          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="text-center">
                <RefreshCw className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">Analyzing customer reviews...</p>
              </div>
            </div>
          ) : platformSummaries.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium text-foreground">No Sentiment Analysis Available</h3>
              <p className="text-muted-foreground mb-4">
                Click "Analyze Reviews" to start analyzing customer sentiment from your connected platforms.
              </p>
              <Button onClick={triggerAnalysis} disabled={loading} className="bg-purple-600 hover:bg-purple-700">
                Start Analysis
              </Button>
            </div>
          ) : (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-muted">
                <TabsTrigger value="overview" className="data-[state=active]:bg-background">Overview</TabsTrigger>
                <TabsTrigger value="platforms" className="data-[state=active]:bg-background">By Platform</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {platformSummaries.slice(0, 3).map((platform) => (
                    <Card key={platform.platform} className="bg-card border-border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium capitalize text-foreground">{platform.platform}</h4>
                          <Badge 
                            variant="outline" 
                            className={getSentimentBadgeColor(platform.overallSentiment)}
                          >
                            {getSentimentLabel(platform.overallSentiment)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {platform.summary}
                        </p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MessageSquare className="mr-1 h-3 w-3" />
                          {platform.reviewCount} reviews analyzed
                        </div>
                        {/* Customer Quote Highlight */}
                        {platform.themes.length > 0 && platform.themes[0].examples.length > 0 && (
                          <div className="mt-3 p-2 bg-muted/50 rounded-md border-l-2 border-purple-500">
                            <p className="text-xs text-foreground italic">
                              "{platform.themes[0].examples[0]}"
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {platformSummaries.length > 0 && (
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">Sentiment Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={platformSummaries}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis 
                            dataKey="platform" 
                            stroke="hsl(var(--foreground))"
                            className="capitalize"
                          />
                          <YAxis domain={[-1, 1]} stroke="hsl(var(--foreground))" />
                          <Tooltip 
                            formatter={(value: number) => [getSentimentLabel(value), 'Sentiment']}
                            contentStyle={{
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '6px',
                              color: 'hsl(var(--foreground))'
                            }}
                          />
                          <Bar 
                            dataKey="overallSentiment" 
                            fill="#8b5cf6"
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
                  <Card key={platform.platform} className="bg-card border-border">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="capitalize flex items-center text-foreground">
                          {platform.platform}
                          <Badge 
                            variant="outline" 
                            className={`ml-2 ${getSentimentBadgeColor(platform.overallSentiment)}`}
                          >
                            {getSentimentLabel(platform.overallSentiment)}
                          </Badge>
                        </CardTitle>
                        <Button variant="ghost" size="sm" className="hover:bg-muted">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base mb-4 text-foreground">{platform.summary}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3 text-foreground">Theme Breakdown</h4>
                          <div className="space-y-3">
                            {platform.themes.map((theme) => (
                              <div key={theme.name}>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm text-foreground">{theme.name}</span>
                                  <div className="flex items-center gap-2">
                                    <span className={`text-xs font-medium ${getSentimentColor(theme.score)}`}>
                                      {theme.score > 0 ? '+' : ''}{(theme.score * 100).toFixed(0)}%
                                    </span>
                                  </div>
                                </div>
                                <Progress 
                                  value={(theme.score + 1) * 50} 
                                  className="h-2 bg-muted"
                                />
                                {/* Customer quote for theme */}
                                {theme.examples.length > 0 && (
                                  <p className="text-xs text-muted-foreground mt-1 italic">
                                    "{theme.examples[0]}"
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-3 text-foreground">Quick Stats</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Reviews Analyzed</span>
                              <span className="font-medium text-foreground">{platform.reviewCount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Last Updated</span>
                              <span className="font-medium text-foreground">
                                {new Date(platform.lastUpdated).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Sentiment Score</span>
                              <span className={`font-medium ${getSentimentColor(platform.overallSentiment)}`}>
                                {(platform.overallSentiment * 100).toFixed(0)}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Positive Reviews</span>
                              <span className="font-medium text-green-400">
                                {(platform.sentimentDistribution.positive * 100).toFixed(0)}%
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
