
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StarRating from "@/components/ui/star-rating";
import { 
  MessageSquare, 
  ExternalLink, 
  Plus, 
  Trash2, 
  Send, 
  Bot,
  User as UserIcon,
  Sparkles
} from 'lucide-react';
import { toast } from "sonner";

interface PlatformUrl {
  id: string;
  name: string;
  url: string;
  lastAnalyzed?: string;
  sentiment?: number;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
}

interface EnhancedSentimentTabProps {
  venueId: string;
  isPremium: boolean;
}

const EnhancedSentimentTab: React.FC<EnhancedSentimentTabProps> = ({ 
  venueId, 
  isPremium 
}) => {
  const [platformUrls, setPlatformUrls] = useState<PlatformUrl[]>([]);
  const [newUrl, setNewUrl] = useState('');
  const [newPlatformName, setNewPlatformName] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const [connectedPlatforms, setConnectedPlatforms] = useState<Record<string, boolean>>({
    google: false,
    yelp: false,
    tripadvisor: false,
    facebook: false,
    instagram: false,
    tiktok: false
  });

  const addPlatformUrl = () => {
    if (!newUrl || !newPlatformName) {
      toast.error('Please enter both platform name and URL');
      return;
    }

    const newPlatform: PlatformUrl = {
      id: Date.now().toString(),
      name: newPlatformName,
      url: newUrl,
    };

    setPlatformUrls(prev => [...prev, newPlatform]);
    setNewUrl('');
    setNewPlatformName('');
    toast.success('Platform URL added successfully');
  };

  const removePlatformUrl = (id: string) => {
    setPlatformUrls(prev => prev.filter(platform => platform.id !== id));
    toast.success('Platform URL removed');
  };

  const analyzePlatform = async (platformId: string) => {
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setPlatformUrls(prev => prev.map(platform => 
        platform.id === platformId 
          ? { 
              ...platform, 
              lastAnalyzed: new Date().toISOString(),
              sentiment: Math.random() * 2 - 1 // Random sentiment between -1 and 1
            }
          : platform
      ));
      setIsAnalyzing(false);
      toast.success('Analysis completed');
    }, 3000);
  };

  const connectPlatform = (platform: string) => {
    setConnectedPlatforms(prev => ({
      ...prev,
      [platform]: !prev[platform]
    }));
    
    if (!connectedPlatforms[platform]) {
      toast.success(`${platform.charAt(0).toUpperCase() + platform.slice(1)} connected successfully`);
    } else {
      toast.success(`${platform.charAt(0).toUpperCase() + platform.slice(1)} disconnected`);
    }
  };

  const sendChatMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date().toISOString()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsChatting(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(currentMessage),
        timestamp: new Date().toISOString()
      };
      
      setChatMessages(prev => [...prev, aiMessage]);
      setIsChatting(false);
    }, 2000);
  };

  const generateAIResponse = (question: string): string => {
    if (question.toLowerCase().includes('complain')) {
      return "Based on the analyzed reviews, the main customer complaints include: slow service during peak hours (mentioned in 23% of negative reviews), limited parking availability, and inconsistent food temperature. However, these issues are outweighed by positive feedback about atmosphere and staff friendliness.";
    } else if (question.toLowerCase().includes('like') || question.toLowerCase().includes('positive')) {
      return "Customers consistently praise: the cozy atmosphere and ambiance (87% positive mentions), friendly and knowledgeable staff (79% positive mentions), high-quality coffee and beverages (82% positive mentions), and Instagram-worthy interior design (45% positive mentions).";
    } else {
      return "I can help you analyze various aspects of your reviews. Try asking about specific topics like 'What do customers complain about most?' or 'What do customers like about the service?'";
    }
  };

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.3) return 'text-green-600';
    if (sentiment < -0.3) return 'text-red-600';
    return 'text-yellow-600';
  };

  const getSentimentLabel = (sentiment: number) => {
    if (sentiment > 0.5) return 'Very Positive';
    if (sentiment > 0.1) return 'Positive';
    if (sentiment > -0.1) return 'Neutral';
    if (sentiment > -0.5) return 'Negative';
    return 'Very Negative';
  };

  // Convert sentiment (-1 to 1) to star rating (0 to 5)
  const sentimentToStars = (sentiment: number) => {
    return ((sentiment + 1) / 2) * 5;
  };

  // Calculate average rating from all platforms
  const getAverageRating = () => {
    if (platformUrls.length === 0) return 4.2; // Default rating for demo
    const validSentiments = platformUrls.filter(p => p.sentiment !== undefined);
    if (validSentiments.length === 0) return 4.2;
    const avgSentiment = validSentiments.reduce((sum, p) => sum + (p.sentiment || 0), 0) / validSentiments.length;
    return sentimentToStars(avgSentiment);
  };

  const getPlatformIcon = (platform: string) => {
    const icons: Record<string, string> = {
      google: '🔴',
      yelp: '🟡', 
      tripadvisor: '🟢',
      facebook: '🔵',
      instagram: '🟣',
      tiktok: '⚫'
    };
    return icons[platform] || '🌐';
  };

  if (!isPremium) {
    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center text-foreground">
            <MessageSquare className="mr-2 h-5 w-5" />
            Enhanced Review Analysis
            <Badge variant="outline" className="ml-2">Premium Feature</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Add URLs from review platforms and chat with AI about your reviews to get deeper insights.
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
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center text-foreground">
            <Sparkles className="mr-2 h-5 w-5 text-purple-500" />
            Enhanced Review Analysis
            <Badge variant="outline" className="ml-2 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">Premium</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="platforms" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted">
              <TabsTrigger value="platforms" className="data-[state=active]:bg-background data-[state=active]:text-foreground">Platform URLs</TabsTrigger>
              <TabsTrigger value="chat" className="data-[state=active]:bg-background data-[state=active]:text-foreground">AI Chat Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="platforms" className="space-y-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="platform-name" className="text-foreground">Platform Name</Label>
                    <Input
                      id="platform-name"
                      placeholder="e.g., Yelp, Google Reviews, TripAdvisor"
                      value={newPlatformName}
                      onChange={(e) => setNewPlatformName(e.target.value)}
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="platform-url" className="text-foreground">Platform URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="platform-url"
                        placeholder="https://www.yelp.com/biz/your-venue"
                        value={newUrl}
                        onChange={(e) => setNewUrl(e.target.value)}
                        className="bg-background border-border text-foreground"
                      />
                      <Button onClick={addPlatformUrl} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Connected Platforms</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {Object.entries({
                      google: 'Google',
                      yelp: 'Yelp',
                      tripadvisor: 'TripAdvisor',
                      facebook: 'Facebook Business',
                      instagram: 'Instagram',
                      tiktok: 'TikTok'
                    }).map(([platform, displayName]) => (
                      <Button
                        key={platform}
                        variant={connectedPlatforms[platform] ? "default" : "outline"}
                        size="sm"
                        onClick={() => connectPlatform(platform)}
                        className={`flex items-center gap-2 justify-start ${
                          connectedPlatforms[platform] 
                            ? 'bg-green-600 hover:bg-green-700 text-white' 
                            : 'bg-background border-border text-foreground hover:bg-muted'
                        }`}
                      >
                        <span className="text-lg">{getPlatformIcon(platform)}</span>
                        <span className="text-xs">{displayName}</span>
                      </Button>
                    ))}
                  </div>
                  {Object.values(connectedPlatforms).every(connected => !connected) && (
                    <p className="text-muted-foreground text-sm">
                      Connect to review platforms to start analyzing customer sentiment.
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Manual Platform URLs</h4>
                  {platformUrls.length === 0 ? (
                    <p className="text-muted-foreground text-sm">
                      No platforms added yet. Add URLs from review sites to get started.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {platformUrls.map((platform) => (
                        <div key={platform.id} className="flex items-center justify-between p-3 border border-border rounded-lg bg-card">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h5 className="font-medium text-foreground">{platform.name}</h5>
                              {platform.sentiment !== undefined && (
                                <div className="flex items-center gap-2">
                                  <StarRating rating={sentimentToStars(platform.sentiment)} size="sm" showValue={false} />
                                  <Badge 
                                    variant="outline" 
                                    className={getSentimentColor(platform.sentiment)}
                                  >
                                    {getSentimentLabel(platform.sentiment)}
                                  </Badge>
                                </div>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              {platform.url}
                            </p>
                            {platform.lastAnalyzed && (
                              <p className="text-xs text-muted-foreground">
                                Last analyzed: {new Date(platform.lastAnalyzed).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => analyzePlatform(platform.id)}
                              disabled={isAnalyzing}
                            >
                              {isAnalyzing ? (
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-600"></div>
                              ) : (
                                <ExternalLink className="h-3 w-3" />
                              )}
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => removePlatformUrl(platform.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="chat" className="space-y-4">
              <div className="border border-border rounded-lg p-4 h-96 overflow-y-auto bg-card">
                {chatMessages.length === 0 ? (
                  <div className="text-center py-8">
                    <Bot className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">
                      Ask me questions about your reviews! Try: "What do customers complain about most?"
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {chatMessages.map((message) => (
                      <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex gap-2 max-w-xs ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-blue-500' : 'bg-purple-500'}`}>
                            {message.type === 'user' ? (
                              <UserIcon className="h-4 w-4 text-white" />
                            ) : (
                              <Bot className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <div className={`p-3 rounded-lg ${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-background border border-border text-foreground'}`}>
                            <p className="text-sm">{message.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isChatting && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-background border border-border p-3 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about your reviews..."
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                  className="bg-background border-border text-foreground"
                />
                <Button onClick={sendChatMessage} disabled={isChatting || !currentMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedSentimentTab;
```
