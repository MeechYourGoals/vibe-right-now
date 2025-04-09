
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2, Instagram, ExternalLink, RefreshCw, Link as LinkIcon } from "lucide-react";
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

  // Get all platforms that are potentially available
  const allPlatforms = [
    { id: 'all', name: 'All' },
    { id: 'instagram', name: 'Instagram' },
    { id: 'tiktok', name: 'TikTok' },
    { id: 'yelp', name: 'Yelp' },
    { id: 'tripadvisor', name: 'TripAdvisor' },
    { id: 'google', name: 'Google' },
    { id: 'foursquare', name: 'Foursquare' },
    { id: 'franki', name: 'Franki' },
    { id: 'other', name: localStorage.getItem('otherPlatformName') || 'Other' }
  ];
  
  // Filter to only platforms that have content
  const [activePlatforms, setActivePlatforms] = useState(allPlatforms);

  useEffect(() => {
    fetchAllPosts();
  }, [venueName, apiKeys]);

  const fetchAllPosts = async () => {
    setIsLoading(true);
    try {
      const allPosts = await SocialMediaService.getAllSocialMediaContent(venueName, apiKeys);
      setPosts(allPosts);
      
      // Determine which platforms have content
      const platformsWithContent = new Set(['all']);
      allPosts.forEach(post => platformsWithContent.add(post.source));
      
      // Filter the tabs to only show platforms with content
      setActivePlatforms(
        allPlatforms.filter(platform => 
          platform.id === 'all' || platformsWithContent.has(platform.id)
        )
      );
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

  // Get post count for each platform
  const getPostCount = (platform: string) => {
    if (platform === 'all') return posts.length;
    return posts.filter(post => post.source === platform).length;
  };

  // Get the direct URL for a platform based on venue name
  const getPlatformUrl = (platform: string) => {
    const encodedName = encodeURIComponent(venueName);
    switch (platform) {
      case 'instagram':
        return `https://www.instagram.com/explore/tags/${encodedName.replace(/\s+/g, '')}`;
      case 'tiktok':
        return `https://www.tiktok.com/search?q=${encodedName}`;
      case 'yelp':
        return `https://www.yelp.com/search?find_desc=${encodedName}`;
      case 'tripadvisor':
        return `https://www.tripadvisor.com/Search?q=${encodedName}`;
      case 'google':
        return `https://www.google.com/search?q=${encodedName}+reviews`;
      case 'foursquare':
        return `https://foursquare.com/explore?q=${encodedName}`;
      case 'franki':
        return `https://www.franki.io/search?term=${encodedName}`;
      default:
        return `https://www.google.com/search?q=${encodedName}`;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">External Content</h3>
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
        <div className="overflow-x-auto">
          <TabsList className="flex w-auto min-w-full">
            {activePlatforms.map(platform => (
              <TabsTrigger key={platform.id} value={platform.id} className="flex-shrink-0">
                {platform.name} {getPostCount(platform.id) > 0 && 
                  <span className="ml-1 text-xs bg-primary/20 px-1.5 rounded-full">
                    {getPostCount(platform.id)}
                  </span>
                }
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        {activePlatforms.map(platform => (
          <TabsContent key={platform.id} value={platform.id} className="mt-4">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filterPostsByPlatform(platform.id).length > 0 ? (
              <div className="space-y-4">
                {platform.id !== 'all' && (
                  <div className="flex justify-between items-center mb-4 p-2 bg-muted/20 rounded-lg">
                    <p className="text-sm">Showing content from {platform.name}</p>
                    <a 
                      href={getPlatformUrl(platform.id)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-xs text-primary hover:underline"
                    >
                      <LinkIcon className="h-3 w-3 mr-1" />
                      Visit {platform.name}
                    </a>
                  </div>
                )}
                
                {filterPostsByPlatform(platform.id).map(post => (
                  <SocialMediaPost 
                    key={post.id} 
                    post={post} 
                    showExternalLink={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted/20 rounded-lg">
                <h4 className="text-lg font-medium mb-2">No posts found</h4>
                <p className="text-muted-foreground mb-4">
                  {platform.id === 'all' 
                    ? "We couldn't find any social media mentions for this venue." 
                    : `We couldn't find any ${platform.name} posts for this venue.`}
                </p>
                <Button variant="outline" asChild>
                  <a 
                    href={getPlatformUrl(platform.id === 'all' ? 'google' : platform.id)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center"
                  >
                    Visit {platform.id === 'all' ? 'social media platforms' : platform.name}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="border-t pt-4">
        <p className="text-xs text-muted-foreground text-center">
          Content is aggregated from external platforms and links to the original posts.
          This helps showcase what people are saying about this venue across the web.
        </p>
      </div>
    </div>
  );
};

export default SocialMediaFeed;
