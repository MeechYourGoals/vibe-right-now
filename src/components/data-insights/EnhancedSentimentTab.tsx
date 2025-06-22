
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, RefreshCw, MessageSquare, Lock, TrendingUp, Globe, Plus, ExternalLink } from 'lucide-react';
import ExternalReviewAnalysis from "@/components/venue/ExternalReviewAnalysis";
import AudioOverviewCard from "@/components/venue/AudioOverviewCard";

interface EnhancedSentimentTabProps {
  venueId: string;
  isPremium: boolean;
}

const EnhancedSentimentTab: React.FC<EnhancedSentimentTabProps> = ({ venueId, isPremium }) => {
  const [loading, setLoading] = useState(false);
  const [venueName] = useState('Artisan Coffee House');
  const [platformName, setPlatformName] = useState('');
  const [platformUrl, setPlatformUrl] = useState('');
  const [connectedPlatforms, setConnectedPlatforms] = useState<Array<{name: string, url: string}>>([]);

  const handleAddPlatform = () => {
    if (platformName && platformUrl) {
      setConnectedPlatforms([...connectedPlatforms, { name: platformName, url: platformUrl }]);
      setPlatformName('');
      setPlatformUrl('');
    }
  };

  if (!isPremium) {
    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center text-foreground">
            <Sparkles className="mr-2 h-5 w-5" />
            Enhanced Review Analysis
            <Badge variant="outline" className="ml-2 bg-purple-500/20 text-purple-400 border-purple-500/30">
              Premium Feature
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Lock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Premium Feature Required</h3>
            <p className="text-muted-foreground mb-4">
              Get comprehensive AI-powered analysis of reviews from multiple platforms, plus audio summaries and universal review insights.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground mb-6">
              <div className="flex items-center justify-center gap-2">
                <Globe className="h-4 w-4" />
                <span>Universal Review Summaries from any platform</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>AI Audio Overviews</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>Advanced sentiment tracking</span>
              </div>
            </div>
            <Button disabled className="bg-muted text-muted-foreground">
              Upgrade to Premium to Access
            </Button>
          </div>
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
              <Sparkles className="mr-2 h-5 w-5" />
              Enhanced Review Analysis
              <Badge variant="outline" className="ml-2 bg-purple-500/20 text-purple-400 border-purple-500/30">
                Premium
              </Badge>
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              disabled={loading}
              className="border-border hover:bg-muted"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Comprehensive AI-powered review analysis with universal platform support and audio summaries.
          </p>
          
          {/* Platform URLs and AI Chat Analysis Tabs */}
          <Tabs defaultValue="platform-urls" className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-2 bg-muted">
              <TabsTrigger value="platform-urls" className="data-[state=active]:bg-background">Platform URLs</TabsTrigger>
              <TabsTrigger value="ai-chat" className="data-[state=active]:bg-background">AI Chat Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="platform-urls" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="platform-name" className="text-foreground">Platform Name</Label>
                  <Input
                    id="platform-name"
                    placeholder="e.g., Yelp, Google Reviews, TripAdvisor"
                    value={platformName}
                    onChange={(e) => setPlatformName(e.target.value)}
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platform-url" className="text-foreground">Platform URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="platform-url"
                      placeholder="https://www.yelp.com/biz/your-venue"
                      value={platformUrl}
                      onChange={(e) => setPlatformUrl(e.target.value)}
                      className="bg-background border-border text-foreground"
                    />
                    <Button 
                      onClick={handleAddPlatform}
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium text-foreground mb-3">Connected Platforms</h4>
                {connectedPlatforms.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No platforms added yet. Add URLs from review sites to get started.</p>
                ) : (
                  <div className="space-y-2">
                    {connectedPlatforms.map((platform, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border">
                        <div>
                          <p className="font-medium text-foreground">{platform.name}</p>
                          <p className="text-sm text-muted-foreground">{platform.url}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="ai-chat" className="space-y-4 mt-4">
              <div className="text-center py-8">
                <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">AI Chat Analysis</h3>
                <p className="text-muted-foreground mb-4">
                  Chat with AI to analyze your review data and get insights.
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Start AI Chat
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Universal Review Summaries and Audio Overviews */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ExternalReviewAnalysis 
              venueId={venueId} 
              venueName={venueName}
            />
            
            <AudioOverviewCard
              venueId={venueId}
              venueName={venueName}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedSentimentTab;
