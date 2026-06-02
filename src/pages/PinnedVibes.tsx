
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { Post } from "@/types";
import { postsRepo } from "@/services/data";
import { getCurrentUserId } from "@/services/posts/currentUser";
import PostCard from "@/components/post/PostCard";

const PinnedVibes = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      try {
        // Use the signed-in user id, falling back to the first mock user so the demo
        // renders saved content even when signed out (repo falls back to mock data).
        const userId = (await getCurrentUserId()) ?? "user-1";
        const saved = await postsRepo.getSaved(userId);
        // Everything on this page is, by definition, saved — reflect that in the UI.
        if (active) setPosts(saved.map((p) => ({ ...p, saved: true })));
      } catch (error) {
        console.error("Failed to load saved posts", error);
        if (active) {
          toast.error("Couldn't load your saved vibes.");
          setPosts([]);
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  const handlePostDeleted = (postId: string) => {
    // PostFooter's save toggle removes it server-side; reflect removals locally too.
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-6">Pinned Vibes</h1>
        <p className="text-muted-foreground mb-6">Your saved posts and places for quick access.</p>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Loading your saved vibes...
          </div>
        ) : posts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
              <Bookmark className="h-10 w-10 mb-3 opacity-50" />
              <p className="font-medium">No saved vibes yet</p>
              <p className="text-sm mt-1">Tap the bookmark on any post to pin it here.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onPostDeleted={handlePostDeleted}
              />
            ))}
          </div>
        )}

        <div className="mt-8 rounded-lg bg-muted/50 p-4 text-xs text-muted-foreground">
          <p className="font-medium">Community Guidelines</p>
          <p className="mt-1">Post vibes that make others want to visit. No memes, flyers, or unrelated posts please.</p>
        </div>
      </div>
    </Layout>
  );
};

export default PinnedVibes;
