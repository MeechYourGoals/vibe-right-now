
import { useState, useMemo } from "react";
import { mockPosts, mockComments } from "@/mock/data";
import { PostCard } from "@/components/post";
import SearchVibes from "@/components/SearchVibes";
import { Post, User, Media } from "@/types";
import { isWithinThreeMonths } from "@/mock/time-utils";
import { vibeTags } from "@/hooks/useUserProfile";
import VibeFilterButton from "@/components/VibeFilterButton";

interface PostFeedProps {
  celebrityFeatured?: string[];
}

// Helper function to ensure media is in the correct format
const ensureMediaFormat = (media: any[]): Media[] => {
  if (!media || !Array.isArray(media)) return [];
  
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
  const [selectedVibeTags, setSelectedVibeTags] = useState<string[]>([]);

  const handleSearch = (query: string, filterType: string) => {
    setSearchQuery(query);
    if (filterType !== "All") {
      setFilter(filterType.toLowerCase());
    } else {
      setFilter("all");
    }
  };

  // Toggle vibe tag selection
  const toggleVibeTag = (tag: string) => {
    if (selectedVibeTags.includes(tag)) {
      setSelectedVibeTags(selectedVibeTags.filter(t => t !== tag));
    } else {
      setSelectedVibeTags([...selectedVibeTags, tag]);
    }
  };
  
  // Clear all selected vibe tags
  const clearVibeTags = () => {
    setSelectedVibeTags([]);
  };

  // Generate vibe tags for posts
  const postsWithVibeTags = useMemo(() => {
    return mockPosts.map(post => {
      if (!post || !post.user) return null;
      
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
    }).filter(Boolean) as Post[];
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

    // Find posts from featured users (safely check for user existence)
    const featuredUserPosts = recentPosts.filter(post => 
      post.user && post.user.username && featuredUsernames.includes(post.user.username.toLowerCase())
    );
    
    // Get the remaining posts
    const otherPosts = recentPosts.filter(post => 
      !(post.user && post.user.username && featuredUsernames.includes(post.user.username.toLowerCase()))
    );
    
    // Combine them with featured posts first
    return [...featuredUserPosts, ...otherPosts];
  }, [recentPosts, celebrityFeatured]);

  const filteredPosts = useMemo(() => {
    return prioritizedPosts.filter((post) => {
      // Filter by location type if specified
      if (filter !== "all" && post.location && post.location.type !== filter) {
        return false;
      }
      
      // Filter by vibe tags if any are selected (inclusive filtering)
      if (selectedVibeTags.length > 0) {
        // Check if post has ANY of the selected vibe tags
        const hasAnySelectedTag = post.vibeTags?.some(tag => selectedVibeTags.includes(tag));
        if (!hasAnySelectedTag) return false;
      }
      
      // Filter by search query if specified
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          post.location?.name?.toLowerCase().includes(query) ||
          post.location?.city?.toLowerCase().includes(query) ||
          post.content?.toLowerCase().includes(query) ||
          post.vibeTags?.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      return true;
    });
  }, [prioritizedPosts, filter, searchQuery, selectedVibeTags]);

  // Group posts by location
  const postsGroupedByLocation = useMemo(() => {
    const groupedPosts: Record<string, Post[]> = {};
    
    filteredPosts.forEach(post => {
      if (!post.location) return;
      
      const locationId = post.location.id;
      if (!groupedPosts[locationId]) {
        groupedPosts[locationId] = [];
      }
      groupedPosts[locationId].push(post);
    });
    
    // Sort each location's posts by timestamp (most recent first)
    Object.keys(groupedPosts).forEach(locationId => {
      groupedPosts[locationId].sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    });
    
    return groupedPosts;
  }, [filteredPosts]);

  // Calculate the number of posts per location
  // For demo purposes, add variation to the counts
  const locationPostCounts = (() => {
    const counts: Record<string, number> = {};
    
    // Define specific counts for certain locations to ensure variety
    const specificCounts: Record<string, number> = {
      "1": 15, // Sunset Lounge
      "2": 23, // Artisan Coffee House
      "3": 8,  // Summer Music Festival
      "4": 3,  // Modern Art Museum
      "5": 42, // Skyline Rooftop Bar
      "6": 67, // Madison Square Garden
      "7": 89, // Encore Beach Club
      "8": 35, // Christ the Redeemer
      "9": 12, // Aspen Highlands
      "10": 121, // Allegiant Stadium (Super Bowl)
      "13": 78, // Houston Rodeo
      "14": 19, // Laugh Factory
      "18": 53, // Sydney Opera House
      "19": 145, // Eiffel Tower
      "20": 104, // Coachella Valley Music Festival
      "21": 31, // Gucci Pop-Up
    };
    
    // Apply the specific counts where defined, and calculate naturally for others
    filteredPosts.forEach(post => {
      if (!post.location) return;
      
      const locationId = post.location.id;
      if (locationId in specificCounts) {
        counts[locationId] = specificCounts[locationId];
      } else {
        counts[locationId] = (counts[locationId] || 0) + Math.floor(Math.random() * 50) + 1;
      }
    });
    
    return counts;
  })();

  // Get post comments
  const getPostComments = (postId: string) => {
    return mockComments.filter(comment => comment.postId === postId);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4">
        <SearchVibes onSearch={handleSearch} />
        
        <div className="mt-2">
          <VibeFilterButton 
            selectedTags={selectedVibeTags}
            toggleTag={toggleVibeTag}
            clearTags={clearVibeTags}
          />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {Object.keys(postsGroupedByLocation).length > 0 ? (
          Object.entries(postsGroupedByLocation).map(([locationId, posts]) => (
            <div key={locationId} className="space-y-2">
              <PostCard 
                posts={posts} 
                locationPostCount={locationPostCounts[locationId]}
                getComments={getPostComments}
              />
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
