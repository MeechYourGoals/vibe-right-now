
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus, RefreshCw } from "lucide-react";
import { sentimentAnalysisService, VenueSentimentAnalysis, SentimentTrend } from "@/services/sentimentAnalysisService";

interface SentimentAnalysisTabProps {
  venueId: string;
}

const SentimentAnalysisTab: React.FC<SentimentAnalysisTabProps> = ({ venueId }) => {
  const [sentimentData, setSentimentData] = useState<VenueSentimentAnalysis[]>([]);
  const [sentimentTrends, setSentimentTrends] = useState<SentimentTrend[]>([]);
  const [insights, setInsights] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const sentiment = await sentimentAnalysisService.getVenueSentiment(venueId);
        setSentimentData(sentiment);

        const trends = await sentimentAnalysisService.getSentimentTrends(venueId);
        setSentimentTrends(trends);

        const generatedInsights = await sentimentAnalysisService.generateInsights(venueId);
        setInsights(generatedInsights);
      } catch (err: any) {
        setError(err.message || "Failed to load sentiment data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [venueId]);

  const overallSentiment = sentimentData.reduce((acc, curr) => acc + curr.overall_sentiment, 0) / sentimentData.length;

  const getSentimentBadge = () => {
    if (overallSentiment > 0.5) {
      return <Badge variant="success">Positive</Badge>;
    } else if (overallSentiment < -0.5) {
      return <Badge variant="destructive">Negative</Badge>;
    } else {
      return <Badge variant="secondary">Neutral</Badge>;
    }
  };

  const getSentimentIcon = () => {
    if (overallSentiment > 0.5) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    } else if (overallSentiment < -0.5) {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    } else {
      return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const sentiment = await sentimentAnalysisService.getVenueSentiment(venueId);
      setSentimentData(sentiment);

      const trends = await sentimentAnalysisService.getSentimentTrends(venueId);
      setSentimentTrends(trends);

      const generatedInsights = await sentimentAnalysisService.generateInsights(venueId);
      setInsights(generatedInsights);
    } catch (err: any) {
      setError(err.message || "Failed to refresh sentiment data.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <RefreshCw className="h-6 w-6 animate-spin" />
            <span className="ml-2">Loading sentiment analysis...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent>
          <div className="flex items-center justify-center h-32 text-red-500">
            Error: {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getSentimentIcon()}
          Sentiment Analysis
          {getSentimentBadge()}
        </CardTitle>
        <Button variant="outline" size="sm" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Overall Sentiment</h3>
          <Progress value={overallSentiment * 50 + 50} />
          <p className="text-xs text-muted-foreground">
            Based on {sentimentData.reduce((acc, curr) => acc + curr.review_count, 0)} reviews across multiple platforms.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Key Insights</h3>
          {insights.length > 0 ? (
            <ul className="list-disc pl-4">
              {insights.map((insight, index) => (
                <li key={index} className="text-xs">{insight}</li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-muted-foreground">No insights available.</p>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Sentiment Trends</h3>
          {sentimentTrends.length > 0 ? (
            <div className="flex flex-col">
              {sentimentTrends.map((trend) => (
                <div key={trend.date} className="flex items-center justify-between">
                  <span className="text-xs">{trend.date}</span>
                  <Progress value={trend.sentiment * 50 + 50} className="w-1/2" />
                  <span className="text-xs">{trend.review_count} reviews</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">No trend data available.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentAnalysisTab;
