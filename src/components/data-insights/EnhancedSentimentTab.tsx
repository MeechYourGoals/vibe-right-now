
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Minus, Star, MessageCircle, ThumbsUp, AlertTriangle } from "lucide-react";

const EnhancedSentimentTab = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');

  const sentimentData = {
    overall: { positive: 68, negative: 12, neutral: 20 },
    platforms: [
      { name: 'Google Reviews', positive: 72, negative: 8, neutral: 20, total: 45 },
      { name: 'Yelp', positive: 65, negative: 15, neutral: 20, total: 32 },
      { name: 'TripAdvisor', positive: 70, negative: 10, neutral: 20, total: 28 },
      { name: 'Instagram', positive: 85, negative: 5, neutral: 10, total: 156 },
      { name: 'TikTok', positive: 90, negative: 3, neutral: 7, total: 89 }
    ]
  };

  const recentReviews = [
    {
      id: 1,
      platform: 'Google',
      rating: 5,
      text: "Amazing atmosphere and great cocktails! Will definitely be back.",
      sentiment: 'positive',
      date: '2 hours ago',
      author: 'Sarah M.'
    },
    {
      id: 2,
      platform: 'Yelp',
      rating: 2,
      text: "Service was slow and drinks were overpriced. Expected better.",
      sentiment: 'negative',
      date: '5 hours ago',
      author: 'Mike R.'
    },
    {
      id: 3,
      platform: 'Instagram',
      rating: null,
      text: "This place is absolutely stunning! Perfect for date night ✨",
      sentiment: 'positive',
      date: '1 day ago',
      author: '@jenny_foodie'
    }
  ];

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'negative': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Sentiment Analysis</h3>
        <div className="flex gap-2">
          {['24h', '7d', '30d', '90d'].map((period) => (
            <Button
              key={period}
              variant={selectedTimeframe === period ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTimeframe(period)}
            >
              {period}
            </Button>
          ))}
        </div>
      </div>

      {/* Overall Sentiment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Overall Sentiment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{sentimentData.overall.positive}%</div>
              <div className="text-sm text-gray-600">Positive</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">{sentimentData.overall.neutral}%</div>
              <div className="text-sm text-gray-600">Neutral</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{sentimentData.overall.negative}%</div>
              <div className="text-sm text-gray-600">Negative</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Platform Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sentimentData.platforms.map((platform) => (
              <div key={platform.name} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{platform.name}</h4>
                  <span className="text-sm text-gray-600">{platform.total} reviews</span>
                </div>
                <div className="flex gap-4 text-sm">
                  <span className="text-green-600">{platform.positive}% Positive</span>
                  <span className="text-gray-600">{platform.neutral}% Neutral</span>
                  <span className="text-red-600">{platform.negative}% Negative</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-green-500 h-2 rounded-l-full" 
                    style={{ width: `${platform.positive}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Reviews */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Recent Reviews & Mentions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReviews.map((review) => (
              <div key={review.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{review.platform}</Badge>
                    {review.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{review.rating}</span>
                      </div>
                    )}
                    <Badge className={getSentimentColor(review.sentiment)}>
                      {getSentimentIcon(review.sentiment)}
                      {review.sentiment}
                    </Badge>
                  </div>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
                <p className="text-sm mb-2">{review.text}</p>
                <span className="text-xs text-gray-600">by {review.author}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Sentiment Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <div>
                <p className="text-sm font-medium text-red-800">Negative trend detected</p>
                <p className="text-xs text-red-600">3 negative reviews in the last 2 hours</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <ThumbsUp className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm font-medium text-green-800">Positive momentum</p>
                <p className="text-xs text-green-600">Instagram mentions up 25% this week</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedSentimentTab;
