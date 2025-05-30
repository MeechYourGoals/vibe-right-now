
import { useState, useMemo } from "react";
import { mockPosts, mockComments, mockUsers } from "@/mock/data";
import PostCard from "@/components/post/PostCard";
import SearchVibes from "@/components/SearchVibes";
import { Post, User, Media } from "@/types";
import { isWithinThreeMonths } from "@/mock/time-utils";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { vibeTags } from "@/hooks/useVibeTags";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface PostFeedProps {
  celebrityFeatured?: string[];
}

// Helper function to ensure media is in the correct format
const ensureMediaFormat = (media: any[]): Media[] => {
  return media.map((item, index) => {
    if (typeof item === 'string') {
      const isVideo = item.endsWith('.mp4') || item.endsWith('.mov') || item.endsWith('.avi');
      return {
        id: `media-${index}`,
        type: isVideo ? 'video' : 'image',
        url: item
      };
    } else if (typeof item === 'object' && item !== null) {
      return {
        id: item.id || `media-${index}`,
        type: item.type || 'image',
        url: item.url
      };
    }
    
    return {
      id: `media-${index}`,
      type: 'image',
      url: 'https://via.placeholder.com/500'
    };
  });
};

// Helper function to ensure location has all required properties
const ensureLocationFormat = (location: any) => {
  if (!location) {
    return {
      id: 'default',
      name: 'Unknown Location',
      address: '',
      city: '',
      state: null,
      zip: '',
      latitude: 0,
      longitude: 0,
      lat: 0,
      lng: 0,
      category: '',
      type: 'other' as const,
      rating: 0,
      reviewCount: 0,
      price: '',
      imageUrl: '',
      isFeatured: false,
      verified: false,
      country: '',
      formattedPhoneNumber: '',
      website: '',
      reservable: false,
      source: 'mock'
    };
  }

  return {
    ...location,
    source: location.source || 'mock',
    type: location.type || location.category || 'other',
    lat: location.lat || location.latitude || 0,
    lng: location.lng || location.longitude || 0
  };
};

const PostFeed = ({ celebrityFeatured }: PostFeedProps) => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVibeTags, setSelectedVibeTags] = useState<string[]>([]);

  const handleSearch = (query: string, filterType: string) => {
    setSearchQuery(query);
    if (filterType !== "All") {
      setFilter(filterType.toLowerCase());
    } else {
      setFilter("all");
    }
  };

  const toggleVibeTag = (tag: string) => {
    if (selectedVibeTags.includes(tag)) {
      setSelectedVibeTags(selectedVibeTags.filter(t => t !== tag));
    } else {
      setSelectedVibeTags([...selectedVibeTags, tag]);
    }
  };

  // Generate vibe tags for posts and ensure proper structure
  const postsWithVibeTags = useMemo(() => {
    return mockPosts.map(post => {
      // Ensure location is properly formatted
      const safeLocation = ensureLocationFormat(post.location);
      
      // Ensure post has required properties
      const enhancedPost = {
        ...post,
        user: post.user || post.author,
        location: safeLocation,
        comments: post.comments || [],
        vibedHere: post.vibedHere || false
      };

      // Ensure post has vibe tags - use vibeTag if vibeTags doesn't exist
      if (!enhancedPost.vibeTags || enhancedPost.vibeTags.length === 0) {
        if (enhancedPost.vibeTag) {
          enhancedPost.vibeTags = [enhancedPost.vibeTag];
        } else {
          const seed = parseInt(enhancedPost.id) || enhancedPost.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
          const tagCount = 1 + (seed % 4);
          const shuffledTags = [...vibeTags].sort(() => 0.5 - (seed * 0.0001));
          const postVibeTags = shuffledTags.slice(0, tagCount);
          enhancedPost.vibeTags = postVibeTags;
        }
      }
      
      // Ensure media is in the correct format
      if (enhancedPost.media) {
        enhancedPost.media = ensureMediaFormat(enhancedPost.media);
      }
      
      return enhancedPost as Post;
    });
  }, []);

  // Filter posts to only show those from the past 3 months
  const recentPosts = useMemo(() => {
    return postsWithVibeTags.filter(post => {
      // Add safety check for location
      if (!post.location || !post.location.id) {
        console.warn('Post missing location data:', post.id);
        return false;
      }
      return isWithinThreeMonths(post.timestamp);
    });
  }, [postsWithVibeTags]);

  // Prioritize posts from featured users if provided
  const prioritizedPosts = useMemo(() => {
    if (!celebrityFeatured || celebrityFeatured.length === 0) {
      return recentPosts;
    }

    const featuredUsernames = celebrityFeatured.map(username => username.toLowerCase());
    const featuredUserPosts = recentPosts.filter(post => 
      featuredUsernames.includes(post.user.username.toLowerCase())
    );
    const otherPosts = recentPosts.filter(post => 
      !featuredUsernames.includes(post.user.username.toLowerCase())
    );
    
    return [...featuredUserPosts, ...otherPosts];
  }, [recentPosts, celebrityFeatured]);

  const filteredPosts = useMemo(() => {
    return prioritizedPosts.filter((post) => {
      if (filter !== "all" && post.location?.type !== filter) {
        return false;
      }
      
      if (selectedVibeTags.length > 0) {
        const hasMatchingTag = post.vibeTags?.some(tag => selectedVibeTags.includes(tag));
        if (!hasMatchingTag) return false;
      }
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          post.location?.name?.toLowerCase().includes(query) ||
          post.location?.city?.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.vibeTags?.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      return true;
    });
  }, [prioritizedPosts, filter, searchQuery, selectedVibeTags]);

  const getPostComments = (postId: string) => {
    return mockComments.filter(comment => comment.postId === postId);
  };

  const renderVibeTags = (post: Post) => {
    if (!post.vibeTags || post.vibeTags.length === 0) return null;
    
    return (
      <div className="flex flex-wrap gap-1 mt-2">
        {post.vibeTags.map((tag, index) => (
          <Badge 
            key={index} 
            variant="outline" 
            className={`${selectedVibeTags.includes(tag) ? 'bg-primary text-white' : 'bg-primary/10 text-primary'} text-xs`}
          >
            <Sparkles className="h-3 w-3 mr-1" />
            {tag}
          </Badge>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4">
        <SearchVibes onSearch={handleSearch} />
        
        <div className="mt-2 flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant={selectedVibeTags.length > 0 ? "default" : "outline"} 
                size="sm" 
                className="flex items-center gap-1"
              >
                <Filter className="h-4 w-4" />
                Vibe Filters {selectedVibeTags.length > 0 && `(${selectedVibeTags.length})`}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" align="start">
              <div className="grid grid-cols-2 gap-1 min-w-[280px]">
                {vibeTags.map(tag => (
                  <Badge 
                    key={tag}
                    variant={selectedVibeTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer justify-start"
                    onClick={() => toggleVibeTag(tag)}
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
              {selectedVibeTags.length > 0 && (
                <Button 
                  variant="link" 
                  size="sm" 
                  className="mt-2" 
                  onClick={() => setSelectedVibeTags([])}
                >
                  Clear all filters
                </Button>
              )}
            </PopoverContent>
          </Popover>
          
          {selectedVibeTags.length > 0 && (
            <div className="flex flex-wrap gap-1 items-center">
              {selectedVibeTags.map(tag => (
                <Badge 
                  key={tag}
                  variant="default"
                  className="cursor-pointer"
                  onClick={() => toggleVibeTag(tag)}
                >
                  {tag} ×
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} className="space-y-2">
              <PostCard 
                post={post}
                onComment={(postId, comment) => console.log('Comment added:', postId, comment)}
                onLike={(postId) => console.log('Post liked:', postId)}
                onShare={(postId) => console.log('Post shared:', postId)}
              />
              <div className="pl-4">
                {renderVibeTags(post)}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <h3 className="text-xl font-semibold mb-2">No vibes found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or post your own vibe!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostFeed;
