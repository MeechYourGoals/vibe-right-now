import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Instagram, Star, ExternalLink, RefreshCw, Calendar, TrendingUp, Brain, Mic } from "lucide-react";
import { SocialMediaService } from "@/services/SocialMediaService";
import SocialMediaPost from "./SocialMediaPost";
import { toast } from "sonner";

interface SocialMediaIntegrationProps {
  subscriptionTier: 'standard' | 'plus' | 'premium' | 'pro';
  venueName: string;
}

const SocialMediaIntegration = ({ subscriptionTier, venueName }: SocialMediaIntegrationProps) => {
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const isProTier = subscriptionTier === 'pro';
  const isPremiumPlus = subscriptionTier === 'premium' || subscriptionTier === 'plus';

  const fetchSocialMediaContent = async () => {
    setLoading(true);
    try {
      const apiKeys = SocialMediaService.getDefaultApiKeys();
      const content = await SocialMediaService.getAllSocialMediaContent(venueName, apiKeys);
      setPosts(content);
      setLastUpdated(new Date());
      if (content.length === 0) {
        toast.info('No social media content found. Connect your accounts to see posts and reviews.');
      }
    } catch (error) {
      console.error('Error fetching social media content:', error);
      toast.error('Failed to fetch social media content');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSocialMediaContent();
  }, [venueName]);

  const filteredPosts = posts.filter(post => {
    if (activeTab === "all") return true;
    return post.platform === activeTab;
  });

  const getAnalyticsInsights = () => {
    const totalPosts = posts.length;
    const avgRating = posts.reduce((sum, post) => sum + (post.rating || 0), 0) / totalPosts || 0;
    const totalEngagement = posts.reduce((sum, post) => sum + (post.likes || 0) + (post.comments || 0), 0);

    return { totalPosts, avgRating, totalEngagement };
  };

  const { totalPosts, avgRating, totalEngagement } = getAnalyticsInsights();

  return (
    <div className="space-y-6">
      {/* Gemini Deep Research & Notebook LM Section */}
      <Card className="border-2 border-blue-600 bg-gradient-to-r from-blue-950/20 to-purple-950/20 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center text-blue-400">
              <Brain className="mr-2 h-5 w-5" />
              Gemini Deep Research Powered Analytics
            </CardTitle>
            <Badge variant="outline" className="bg-blue-900/20 text-blue-400 border-blue-600">
              {isProTier ? 'Pro Active' : 'Upgrade to Pro'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pb-4">
          <p className="text-sm text-blue-200">
            Our AI continuously analyzes your venue's social media presence using Gemini Deep Research 
            to provide comprehensive insights about customer sentiment, trending topics, and competitive positioning.
            Export your weekly insights to Google Notebook LM to generate an AI-powered podcast summary.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              className="border-blue-600 text-blue-400 hover:bg-blue-900/20 bg-blue-950/30"
              disabled={!isProTier}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Generate Deep Research Report
            </Button>
            <Button 
              variant="outline" 
              className="border-purple-600 text-purple-400 hover:bg-purple-900/20 bg-purple-950/30"
              disabled={!isProTier}
            >
              <Mic className="mr-2 h-4 w-4" />
              Create Notebook LM Podcast
            </Button>
          </div>
          {isProTier && (
            <div className="mt-3 p-3 bg-blue-950/30 rounded-lg border border-blue-800/30">
              <p className="text-xs text-blue-300">
                💡 <strong>Pro Tip:</strong> Export your weekly insights to Google Notebook LM to generate 
                an AI-powered podcast summary of your venue's performance. Perfect for staying informed 
                on-the-go or sharing with your team.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Social Media Integration - Dark Theme */}
      <Card className="bg-neutral-900 border-neutral-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">Social Media Integration</CardTitle>
              <CardDescription className="text-neutral-400">
                Monitor and manage your venue's social media presence
              </CardDescription>
            </div>
            <Button 
              onClick={fetchSocialMediaContent} 
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Analytics Summary - Dark Theme */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-neutral-800 border-neutral-600">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Instagram className="h-5 w-5 text-pink-500" />
                  <div>
                    <p className="text-sm text-neutral-400">Total Posts</p>
                    <p className="text-2xl font-bold text-white">{totalPosts}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-neutral-800 border-neutral-600">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-sm text-neutral-400">Avg Rating</p>
                    <p className="text-2xl font-bold text-white">{avgRating.toFixed(1)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-neutral-800 border-neutral-600">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-neutral-400">Engagement</p>
                    <p className="text-2xl font-bold text-white">{totalEngagement}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Posts Tabs - Dark Theme */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-neutral-800 mb-4">
              <TabsTrigger value="all" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white">
                All Posts ({posts.length})
              </TabsTrigger>
              <TabsTrigger value="google" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white">
                Google ({posts.filter(p => p.platform === 'google').length})
              </TabsTrigger>
              <TabsTrigger value="yelp" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white">
                Yelp ({posts.filter(p => p.platform === 'yelp').length})
              </TabsTrigger>
              <TabsTrigger value="instagram" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white">
                Instagram ({posts.filter(p => p.platform === 'instagram').length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              {loading ? (
                <div className="text-center py-8">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-neutral-400" />
                  <p className="text-neutral-400">Loading social media content...</p>
                </div>
              ) : filteredPosts.length > 0 ? (
                <div className="space-y-4">
                  {filteredPosts.map((post) => (
                    <SocialMediaPost key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-neutral-400 mb-4">No posts found for this platform.</p>
                  <Button variant="outline" className="border-neutral-600 text-neutral-300">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Connect Account
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {lastUpdated && (
            <div className="mt-4 text-xs text-neutral-500 flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              Last updated: {lastUpdated.toLocaleString()}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMediaIntegration;
