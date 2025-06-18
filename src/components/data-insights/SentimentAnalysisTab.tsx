import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, MessageSquare, Star, RefreshCw, ExternalLink, Edit3 } from 'lucide-react';
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
  const [analyzedVenue, setAnalyzedVenue] = useState<string>('Artisan Coffee House');
  const [isEditingVenue, setIsEditingVenue] = useState(false);

  // Mock data for Artisan Coffee House
  const getMockCoffeeHouseData = (): PlatformSentimentSummary[] => [
    {
      platform: 'Google Reviews',
      sentiment: 0.7,
      mentions: 45,
      overallSentiment: 0.7,
      summary: 'Customers love the cozy atmosphere and quality coffee, with frequent praise for the matcha drinks.',
      reviewCount: 124,
      lastUpdated: new Date().toISOString(),
      themes: [
        { theme: 'Coffee Quality', sentiment: 0.8, frequency: 89, name: 'Coffee Quality', score: 0.8 },
        { theme: 'Atmosphere', sentiment: 0.9, frequency: 67, name: 'Atmosphere', score: 0.9 },
        { theme: 'Service Speed', sentiment: -0.2, frequency: 34, name: 'Service Speed', score: -0.2 },
        { theme: 'Pricing', sentiment: 0.3, frequency: 23, name: 'Pricing', score: 0.3 }
      ]
    },
    {
      platform: 'Yelp',
      sentiment: 0.6,
      mentions: 32,
      overallSentiment: 0.6,
      summary: 'Great spot for remote work with excellent wifi and comfortable seating.',
      reviewCount: 89,
      lastUpdated: new Date().toISOString(),
      themes: [
        { theme: 'Work Environment', sentiment: 0.9, frequency: 78, name: 'Work Environment', score: 0.9 },
        { theme: 'Food Options', sentiment: 0.4, frequency: 45, name: 'Food Options', score: 0.4 },
        { theme: 'Staff Friendliness', sentiment: 0.7, frequency: 56, name: 'Staff Friendliness', score: 0.7 }
      ]
    },
    {
      platform: 'TripAdvisor',
      sentiment: 0.5,
      mentions: 18,
      overallSentiment: 0.5,
      summary: 'Popular with tourists for Instagram-worthy drinks and local coffee culture experience.',
      reviewCount: 67,
      lastUpdated: new Date().toISOString(),
      themes: [
        { theme: 'Instagram Appeal', sentiment: 0.8, frequency: 56, name: 'Instagram Appeal', score: 0.8 },
        { theme: 'Tourist Experience', sentiment: 0.6, frequency: 43, name: 'Tourist Experience', score: 0.6 },
        { theme: 'Wait Times', sentiment: -0.4, frequency: 29, name: 'Wait Times', score: -0.4 }
      ]
    }
  ];

  // Customer review quotes for the overview
  const customerQuotes = [
    { text: "The matcha latte is a must-order here!", sentiment: "positive", platform: "Google Reviews" },
    { text: "Perfect spot for remote work with great wifi", sentiment: "positive", platform: "Yelp" },
    { text: "Service can be slow during peak hours", sentiment: "negative", platform: "Google Reviews" },
    { text: "Cozy atmosphere makes it great for families", sentiment: "positive", platform: "TripAdvisor" },
    { text: "Instagram-worthy drinks but pricey", sentiment: "neutral", platform: "Yelp" },
    { text: "Best coffee shop in the neighborhood!", sentiment: "positive", platform: "Google Reviews" }
  ];

  // Load sentiment data
  const loadSentimentData = async () => {
    setLoading(true);
    try {
      // Use mock data for demo
      const mockData = getMockCoffeeHouseData();
      setPlatformSummaries(mockData);
      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      console.error('Error loading sentiment data:', error);
      toast.error('Failed to load sentiment analysis');
    } finally {
      setLoading(false);
    }
  };

  // Trigger analysis with updated venue name
  const triggerAnalysis = async () => {
    setLoading(true);
    try {
      toast.success(`Sentiment analysis started for ${analyzedVenue}! Results will appear shortly.`);
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

  const handleVenueUpdate = () => {
    setIsEditingVenue(false);
    triggerAnalysis();
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

  const getQuoteColor = (sentiment: string) => {
    switch(sentiment) {
      case 'positive': return 'border-l-green-500 bg-card text-card-foreground border border-green-200 dark:border-green-800';
      case 'negative': return 'border-l-red-500 bg-card text-card-foreground border border-red-200 dark:border-red-800';
      default: return 'border-l-yellow-500 bg-card text-card-foreground border border-yellow-200 dark:border-yellow-800';
    }
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
                          <h4 className="font-medium">{platform.platform}</h4>
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

                <Card>
                  <CardHeader>
                    <CardTitle>Customer Review Highlights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {customerQuotes.map((quote, index) => (
                        <div 
                          key={index}
                          className={`p-4 border-l-4 rounded-r-lg ${getQuoteColor(quote.sentiment)}`}
                        >
                          <p className="text-sm font-medium mb-2 text-foreground">"{quote.text}"</p>
                          <p className="text-xs text-muted-foreground">— {quote.platform}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="platforms" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Venue Analysis
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setIsEditingVenue(!isEditingVenue)}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditingVenue ? (
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Label htmlFor="venue-name">Venue Name</Label>
                          <Input
                            id="venue-name"
                            value={analyzedVenue}
                            onChange={(e) => setAnalyzedVenue(e.target.value)}
                            placeholder="Enter venue name to analyze..."
                          />
                        </div>
                        <div className="flex items-end gap-2">
                          <Button onClick={handleVenueUpdate}>
                            Analyze
                          </Button>
                          <Button variant="outline" onClick={() => setIsEditingVenue(false)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium">{analyzedVenue}</h3>
                          <p className="text-sm text-muted-foreground">
                            Currently analyzing sentiment for this venue
                          </p>
                        </div>
                        <Badge variant="outline" className="bg-blue-100 text-blue-700">
                          Active Analysis
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {platformSummaries.map((platform) => (
                  <Card key={platform.platform}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center">
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
