
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2, Instagram, ExternalLink, RefreshCw } from "lucide-react";
import SocialMediaPost from './SocialMediaPost';
import { SocialMediaService, SocialMediaPost as SocialMediaPostType, SocialMediaApiKeys } from '@/services/SocialMediaService';

interface SocialMediaFeedProps {
  venueName: string;
  apiKeys: SocialMediaApiKeys;
}

const SocialMediaFeed: React.FC<SocialMediaFeedProps> = ({ venueName, apiKeys }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [posts, setPosts] = useState<SocialMediaPostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchAllPosts();
  }, [venueName, apiKeys]);

  const fetchAllPosts = async () => {
    setIsLoading(true);
    try {
      const allPosts = await SocialMediaService.getAllSocialMediaContent(venueName, apiKeys);
      setPosts(allPosts);
    } catch (error) {
      console.error('Error fetching social media posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshPosts = async () => {
    setIsRefreshing(true);
    await fetchAllPosts();
    setIsRefreshing(false);
  };

  const filterPostsByPlatform = (platform: string) => {
    if (platform === 'all') return posts;
    return posts.filter(post => post.source === platform);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Social Media Mentions</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={refreshPosts} 
          disabled={isRefreshing}
          className="flex items-center gap-1"
        >
          {isRefreshing ? (
            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-1" />
          )}
          Refresh
        </Button>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="instagram">Instagram</TabsTrigger>
          <TabsTrigger value="tiktok">TikTok</TabsTrigger>
          <TabsTrigger value="yelp">Yelp</TabsTrigger>
        </TabsList>
        
        {['all', 'instagram', 'tiktok', 'yelp'].map(platform => (
          <TabsContent key={platform} value={platform} className="mt-4">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filterPostsByPlatform(platform).length > 0 ? (
              <div className="space-y-4">
                {filterPostsByPlatform(platform).map(post => (
                  <SocialMediaPost key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted/20 rounded-lg">
                <h4 className="text-lg font-medium mb-2">No posts found</h4>
                <p className="text-muted-foreground mb-4">
                  {platform === 'all' 
                    ? "We couldn't find any social media mentions for this venue." 
                    : `We couldn't find any ${platform} posts for this venue.`}
                </p>
                <Button variant="outline" asChild>
                  <a 
                    href={`https://${platform === 'all' ? 'instagram' : platform}.com`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center"
                  >
                    Visit {platform === 'all' ? 'social media platforms' : platform}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SocialMediaFeed;
