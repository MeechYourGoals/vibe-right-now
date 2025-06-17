
import { useState, useEffect } from "react";
import { Post, Comment } from "@/types";
// Use centralized mock data imports
import { mockPosts, mockComments } from "@/mock";
import PostCard from "./post/PostCard";
import { useToast } from "@/components/ui/use-toast";

interface PostFeedProps {
  celebrityFeatured?: string[];
  feedType?: string;
}

const PostFeed = ({ celebrityFeatured = [], feedType = "for-you" }: PostFeedProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const getComments = (postId: string): Comment[] => {
    return mockComments.filter(comment => comment.postId === postId);
  };

  const getFilteredPosts = (type: string): Post[] => {
    const allPosts = [...mockPosts];
    
    switch (type) {
      case "trending":
        // Sort by engagement (likes + comments) with deterministic randomization
        return allPosts
          .sort((a, b) => {
            const aLikes = a.likes || 0;
            const bLikes = b.likes || 0;
            const aEngagement = aLikes + getComments(a.id).length;
            const bEngagement = bLikes + getComments(b.id).length;
            // Add deterministic randomization for trending
            const randomFactor = (parseInt(a.id) % 7) - (parseInt(b.id) % 7);
            return bEngagement - aEngagement + randomFactor * 0.1;
          })
          .slice(0, 20);
          
      case "recent":
        // Sort by timestamp (most recent first)
        return allPosts
          .sort((a, b) => {
            const aTime = a.timestamp ? new Date(a.timestamp).getTime() : new Date(a.createdAt).getTime();
            const bTime = b.timestamp ? new Date(b.timestamp).getTime() : new Date(b.createdAt).getTime();
            return bTime - aTime;
          })
          .slice(0, 20);
          
      case "nearby":
        // Mock nearby sorting with different randomization seed
        return allPosts
          .sort((a, b) => {
            const aLikes = a.likes || 0;
            const bLikes = b.likes || 0;
            // Mock distance calculation with deterministic randomization
            const aDistance = (parseInt(a.id) % 13) + aLikes * 0.1;
            const bDistance = (parseInt(b.id) % 13) + bLikes * 0.1;
            return aDistance - bDistance;
          })
          .slice(0, 20);
          
      case "for-you":
      default:
        // Mix of trending and recent with featured users
        const featuredPosts = allPosts.filter(post => {
          const username = post.user?.username || post.author?.username;
          return username && celebrityFeatured.includes(username);
        });
        const otherPosts = allPosts.filter(post => {
          const username = post.user?.username || post.author?.username;
          return !username || !celebrityFeatured.includes(username);
        });
        
        // Combine and sort by engagement and recency
        return [...featuredPosts, ...otherPosts]
          .sort((a, b) => {
            const aLikes = a.likes || 0;
            const bLikes = b.likes || 0;
            const aTime = a.timestamp ? new Date(a.timestamp).getTime() : new Date(a.createdAt).getTime();
            const bTime = b.timestamp ? new Date(b.timestamp).getTime() : new Date(b.createdAt).getTime();
            const aScore = aLikes * 0.7 + (Date.now() - aTime) / (1000 * 60 * 60) * 0.3;
            const bScore = bLikes * 0.7 + (Date.now() - bTime) / (1000 * 60 * 60) * 0.3;
            return bScore - aScore;
          })
          .slice(0, 20);
    }
  };

  useEffect(() => {
    setLoading(true);
    
    // Simulate loading delay
    const timer = setTimeout(() => {
      const filteredPosts = getFilteredPosts(feedType);
      setPosts(filteredPosts);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [feedType, celebrityFeatured]);

  const handlePostDeleted = (postId: string) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
    toast({
      title: "Post deleted",
      description: "The post has been successfully deleted.",
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-card rounded-lg p-4 animate-pulse">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-muted rounded-full"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-24"></div>
                <div className="h-3 bg-muted rounded w-16"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          comments={getComments(post.id)}
          canDelete={false}
          onPostDeleted={handlePostDeleted}
        />
      ))}
      
      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts found for this feed.</p>
        </div>
      )}
    </div>
  );
};

export default PostFeed;
