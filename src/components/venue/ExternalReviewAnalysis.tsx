
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Lock, MessageSquare, Send } from "lucide-react";
import { useUserSubscription } from "@/hooks/useUserSubscription";

interface ExternalReviewAnalysisProps {
  venueId: string;
  venueName: string;
}

// Mock review data for demo venues
const getMockReviewData = (venueId: string, venueName: string) => {
  const mockReviews = {
    "1": {
      summary: `Based on analysis of 2,847 reviews from Yelp, TripAdvisor, and Google, ${venueName} consistently receives praise for its incredible music lineup and unique desert atmosphere. Recent reviews highlight the festival's diverse artist selection spanning electronic, indie, and alternative genres.

**Positive highlights:**
• "Best music festival experience - the desert setting is magical" (4.8/5 avg)
• "World-class artists and production quality" 
• "Amazing food vendors and art installations"

**Areas noted for improvement:**
• Parking and shuttle logistics during peak times
• Long lines at popular food vendors
• Need for more shaded areas during daytime sets

**Recent sentiment:** 89% positive, with visitors consistently praising the unique venue atmosphere and artist quality.`,
      chatResponses: [
        "The most praised aspects are the music lineup and desert atmosphere. Many reviewers call it 'magical' and 'world-class'.",
        "Common complaints include parking difficulties and long food vendor lines, especially during peak hours.",
        "Recent reviews average 4.8/5 stars, with 89% positive sentiment across all platforms.",
        "Visitors consistently recommend arriving early and bringing sun protection for daytime events."
      ]
    },
    "3": {
      summary: `Based on analysis of 1,256 reviews from Yelp, TripAdvisor, and Google, ${venueName} is consistently praised for exceptional coffee quality and knowledgeable baristas. Recent reviews emphasize the cozy atmosphere and expertly crafted single-origin brews.

**Positive highlights:**
• "Best coffee in the city - baristas really know their craft" (4.7/5 avg)
• "Amazing latte art and single-origin selections"
• "Perfect spot for remote work with great WiFi"

**Areas noted for improvement:**
• Limited seating during morning rush (7-9 AM)
• Can get noisy during peak hours
• Some reviewers want more pastry/food options

**Recent sentiment:** 92% positive, with customers particularly praising coffee quality and barista expertise.`,
      chatResponses: [
        "Coffee quality and barista knowledge are the most consistently praised aspects across all reviews.",
        "The main issue is limited seating during morning rush hours between 7-9 AM.",
        "Reviews average 4.7/5 stars with 92% positive sentiment across platforms.",
        "Many customers use it as a remote work space, praising the WiFi and atmosphere."
      ]
    }
  };
  
  return mockReviews[venueId] || null;
};

const ExternalReviewAnalysis: React.FC<ExternalReviewAnalysisProps> = ({
  venueId,
  venueName
}) => {
  const [chatQuery, setChatQuery] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{type: 'user' | 'bot', message: string}>>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const { canAccessFeature } = useUserSubscription();
  
  const isPremium = canAccessFeature('premium');
  const isDemoVenue = venueId === "1" || venueId === "3";
  const showMockData = isPremium && isDemoVenue;

  useEffect(() => {
    const handleSubscriptionChange = () => {
      setChatHistory([]);
      setShowChat(false);
    };

    window.addEventListener('subscriptionTierChanged', handleSubscriptionChange);
    return () => window.removeEventListener('subscriptionTierChanged', handleSubscriptionChange);
  }, []);

  const mockData = showMockData ? getMockReviewData(venueId, venueName) : null;

  const handleAnalyzeReviews = async () => {
    if (!showMockData) return;
    
    setIsAnalyzing(true);
    setTimeout(() => {
      setShowChat(true);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleChatSubmit = () => {
    if (!chatQuery.trim() || !mockData) return;
    
    const userMessage = chatQuery;
    setChatQuery("");
    setChatHistory(prev => [...prev, { type: 'user', message: userMessage }]);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = mockData.chatResponses;
      const response = responses[Math.floor(Math.random() * responses.length)];
      setChatHistory(prev => [...prev, { type: 'bot', message: response }]);
    }, 1000);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-500" />
            Review Summaries
            {isPremium ? (
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
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
            <MessageSquare className="mx-auto h-12 w-12 text-blue-500 mb-4" />
            <p className="text-muted-foreground mb-4">
              Premium feature available for select venues
            </p>
            <Button disabled className="bg-gray-400">
              <Lock className="mr-2 h-4 w-4" />
              Coming Soon
            </Button>
          </div>
        ) : !showChat ? (
          <div className="text-center py-6">
            <MessageSquare className="mx-auto h-12 w-12 text-blue-500 mb-4" />
            <p className="text-muted-foreground mb-4">
              Analyze reviews from multiple platforms and chat with AI insights
            </p>
            <Button 
              onClick={handleAnalyzeReviews}
              disabled={isAnalyzing}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing Reviews...
                </>
              ) : (
                <>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Analyze & Chat with Reviews
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border max-h-40 overflow-y-auto">
              <h4 className="font-semibold text-blue-900 mb-2">Review Summary</h4>
              <p className="text-blue-800 text-sm whitespace-pre-line">{mockData?.summary}</p>
            </div>
            
            {chatHistory.length > 0 && (
              <div className="max-h-32 overflow-y-auto space-y-2">
                {chatHistory.map((item, index) => (
                  <div key={index} className={`p-2 rounded text-sm ${
                    item.type === 'user' 
                      ? 'bg-gray-100 text-gray-800 ml-4' 
                      : 'bg-blue-100 text-blue-800 mr-4'
                  }`}>
                    <strong>{item.type === 'user' ? 'You: ' : 'AI: '}</strong>
                    {item.message}
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex gap-2">
              <Input
                placeholder="Ask about the reviews..."
                value={chatQuery}
                onChange={(e) => setChatQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                className="flex-1"
              />
              <Button 
                onClick={handleChatSubmit}
                disabled={!chatQuery.trim()}
                size="icon"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExternalReviewAnalysis;
