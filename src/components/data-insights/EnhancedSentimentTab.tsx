
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, RefreshCw, MessageSquare, Lock, TrendingUp, Globe } from 'lucide-react';
import ExternalReviewAnalysis from "@/components/venue/ExternalReviewAnalysis";
import AudioOverviewCard from "@/components/venue/AudioOverviewCard";

interface EnhancedSentimentTabProps {
  venueId: string;
  isPremium: boolean;
}

const EnhancedSentimentTab: React.FC<EnhancedSentimentTabProps> = ({ venueId, isPremium }) => {
  const [loading, setLoading] = useState(false);
  const [venueName] = useState('Artisan Coffee House');

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
