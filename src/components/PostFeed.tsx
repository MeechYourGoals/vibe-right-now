
import { useState, useEffect, useCallback } from "react";
import { Post, Comment } from "@/types";
// Data layer: reads from Supabase, transparently falls back to mock data.
import { postsRepo, commentsRepo } from "@/services/data";
import PostCard from "./post/PostCard";
import { useToast } from "@/hooks/use-toast";

interface PostFeedProps {
  celebrityFeatured?: string[];
  feedType?: string;
}

const PostFeed = ({ celebrityFeatured = [], feedType = "for-you" }: PostFeedProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [sourcePosts, setSourcePosts] = useState<Post[]>([]);
  const [commentsByPost, setCommentsByPost] = useState<Record<string, Comment[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const { toast } = useToast();

  const getComments = useCallback((postId: string): Comment[] => {
    return commentsByPost[postId] ?? [];
  }, [commentsByPost]);

  const getFilteredPosts = useCallback((type: string): Post[] => {
    const allPosts = [...sourcePosts];
    
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
            const aTime = new Date(a.timestamp).getTime();
            const bTime = new Date(b.timestamp).getTime();
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
      default: {
        // Mix of trending and recent with featured users
        const featuredPosts = allPosts.filter(post => {
          const username = post.user?.username;
          return username && celebrityFeatured.includes(username);
        });
        const otherPosts = allPosts.filter(post => {
          const username = post.user?.username;
          return !username || !celebrityFeatured.includes(username);
        });
        
        // Combine and sort by engagement and recency
        return [...featuredPosts, ...otherPosts]
          .sort((a, b) => {
            const aLikes = a.likes || 0;
            const bLikes = b.likes || 0;
            const aTime = new Date(a.timestamp).getTime();
            const bTime = new Date(b.timestamp).getTime();
            const aScore = aLikes * 0.7 + (Date.now() - aTime) / (1000 * 60 * 60) * 0.3;
            const bScore = bLikes * 0.7 + (Date.now() - bTime) / (1000 * 60 * 60) * 0.3;
            return bScore - aScore;
          })
          .slice(0, 20);
      }
    }
  }, [celebrityFeatured, getComments, sourcePosts]);

  // Load the base post list once (from Supabase or mock fallback).
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    postsRepo
      .getFeed()
      .then(async (fetched) => {
        if (!active) return;
        setSourcePosts(fetched);
        // Fetch comments for the loaded posts in parallel.
        const entries = await Promise.all(
          fetched.map(async (p) => [p.id, await commentsRepo.getForPost(p.id)] as const),
        );
        if (!active) return;
        setCommentsByPost(Object.fromEntries(entries));
      })
      .catch((err) => {
        if (!active) return;
        console.error("[PostFeed] failed to load feed", err);
        setError("We couldn't load the live feed. Check your connection and try again.");
        setSourcePosts([]);
        setCommentsByPost({});
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [reloadKey]);

  // Re-apply sort/filter whenever the feed type, source posts, or comments change.
  useEffect(() => {
    setPosts(getFilteredPosts(feedType));
  }, [feedType, getFilteredPosts]);

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

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center">
        <p className="font-medium text-destructive">Live feed unavailable</p>
        <p className="mt-2 text-sm text-muted-foreground">{error}</p>
        <button
          type="button"
          className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          onClick={() => setReloadKey((key) => key + 1)}
        >
          Retry
        </button>
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
          <p className="font-medium">No live vibes yet.</p>
          <p className="mt-1 text-sm text-muted-foreground">Be the first to create a post once you are signed in.</p>
        </div>
      )}
    </div>
  );
};

export default PostFeed;
