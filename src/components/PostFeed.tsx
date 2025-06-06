
import { useState, useMemo } from "react";
import { mockPosts, mockComments } from "@/mock/data";
import { PostCard } from "@/components/post";
import SearchVibes from "@/components/SearchVibes";
import { Post, Media } from "@/types";
import { isWithinThreeMonths } from "@/mock/time-utils";
import { vibeTags } from "@/utils/vibeTags";

interface PostFeedProps {
  celebrityFeatured?: string[];
}

// Helper function to ensure media is in the correct format
const ensureMediaFormat = (media: any[]): Media[] => {
  return media.map(item => {
    if (typeof item === 'string') {
      // Determine type based on extension
      const isVideo = item.endsWith('.mp4') || item.endsWith('.mov') || item.endsWith('.avi');
      return {
        type: isVideo ? 'video' : 'image',
        url: item
      };
    } else if (typeof item === 'object' && item !== null) {
      // Already in correct format
      return item;
    }
    
    // Default fallback
    return {
      type: 'image',
      url: 'https://via.placeholder.com/500'
    };
  });
};

const PostFeed = ({ celebrityFeatured }: PostFeedProps) => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string, filterType: string) => {
    setSearchQuery(query);
    if (filterType !== "All") {
      setFilter(filterType.toLowerCase());
    } else {
      setFilter("all");
    }
  };

  // Generate vibe tags for posts (only for home page display)
  const postsWithVibeTags = useMemo(() => {
    return mockPosts.map(post => {
      // Ensure post has vibe tags
      if (!post.vibeTags || post.vibeTags.length === 0) {
        // Generate 1-4 vibe tags per post
        const seed = parseInt(post.id) || post.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
        const tagCount = 1 + (seed % 4);
        const shuffledTags = [...vibeTags].sort(() => 0.5 - (seed * 0.0001));
        const postVibeTags = shuffledTags.slice(0, tagCount);
        
        post.vibeTags = postVibeTags;
      }
      
      // Ensure media is in the correct format
      post.media = ensureMediaFormat(post.media);
      
      return post;
    });
  }, []);

  // First, filter posts to only show those from the past 3 months
  const recentPosts = useMemo(() => {
    return postsWithVibeTags.filter(post => isWithinThreeMonths(post.timestamp));
  }, [postsWithVibeTags]);

  // Prioritize posts from featured users if provided
  const prioritizedPosts = useMemo(() => {
    if (!celebrityFeatured || celebrityFeatured.length === 0) {
      return recentPosts;
    }

    // Create a map of usernames (lowercase) for case-insensitive comparison
    const featuredUsernames = celebrityFeatured.map(username => username.toLowerCase());

    // Find posts from featured users
    const featuredUserPosts = recentPosts.filter(post => 
      featuredUsernames.includes(post.user.username.toLowerCase())
    );
    
    // Get the remaining posts
    const otherPosts = recentPosts.filter(post => 
      !featuredUsernames.includes(post.user.username.toLowerCase())
    );
    
    // Combine them with featured posts first
    return [...featuredUserPosts, ...otherPosts];
  }, [recentPosts, celebrityFeatured]);

  const filteredPosts = useMemo(() => {
    return prioritizedPosts.filter((post) => {
      // Filter by location type if specified
      if (filter !== "all" && post.location.type !== filter) {
        return false;
      }
      
      // Filter by search query if specified
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          post.location.name.toLowerCase().includes(query) ||
          post.location.city.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.vibeTags?.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      return true;
    });
  }, [prioritizedPosts, filter, searchQuery]);

  // Get post comments
  const getPostComments = (postId: string) => {
    return mockComments.filter(comment => comment.postId === postId);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4">
        <SearchVibes onSearch={handleSearch} />
      </div>

      <div className="p-4 space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard 
              key={post.id} 
              post={post} 
            />
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
