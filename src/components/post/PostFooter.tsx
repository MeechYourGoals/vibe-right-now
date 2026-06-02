
import React, { useState } from "react";
import { Heart, MessageCircle, Share, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Post } from "@/types";
import { postsRepo } from "@/services/data";
import { getCurrentUserId } from "@/services/posts/currentUser";
import { toast } from "sonner";

interface PostFooterProps {
  post: Post;
  onComment: () => void;
  isDetailView?: boolean;
}

const PostFooter: React.FC<PostFooterProps> = ({
  post,
  onComment,
  isDetailView = false
}) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(Boolean(post.saved));
  const [likesCount, setLikesCount] = useState(post.likes);
  const [likePending, setLikePending] = useState(false);
  const [savePending, setSavePending] = useState(false);

  const handleLike = async () => {
    if (likePending) return;
    const userId = await getCurrentUserId();
    if (!userId) {
      toast("Sign in to like posts");
      return;
    }

    const nextLiked = !liked;
    // Optimistic update
    setLiked(nextLiked);
    setLikesCount((prev) => (nextLiked ? prev + 1 : Math.max(0, prev - 1)));
    setLikePending(true);

    try {
      await postsRepo.toggleLike(post.id, userId, nextLiked);
    } catch (error) {
      // Revert on error
      setLiked(!nextLiked);
      setLikesCount((prev) => (nextLiked ? Math.max(0, prev - 1) : prev + 1));
      toast.error("Couldn't update your like. Please try again.");
      console.error("toggleLike failed", error);
    } finally {
      setLikePending(false);
    }
  };

  const handleSave = async () => {
    if (savePending) return;
    const userId = await getCurrentUserId();
    if (!userId) {
      toast("Sign in to save posts");
      return;
    }

    const nextSaved = !saved;
    // Optimistic update
    setSaved(nextSaved);
    setSavePending(true);

    try {
      await postsRepo.toggleSave(post.id, userId, nextSaved);
      toast(nextSaved ? "Saved to Pinned Vibes" : "Removed from Pinned Vibes");
    } catch (error) {
      // Revert on error
      setSaved(!nextSaved);
      toast.error("Couldn't update your save. Please try again.");
      console.error("toggleSave failed", error);
    } finally {
      setSavePending(false);
    }
  };

  return (
    <div className="px-4 py-3 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              disabled={likePending}
              className={`flex items-center gap-2 h-10 ${liked ? 'text-red-500' : ''}`}
            >
              <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
              <span>{likesCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onComment}
              className="flex items-center gap-2 h-10"
            >
            <MessageCircle className="h-4 w-4" />
            <span>{post.comments}</span>
          </Button>

            <Button variant="ghost" size="sm" className="flex items-center gap-2 h-10">
            <Share className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            disabled={savePending}
            className={`h-10 ${saved ? 'text-blue-500' : ''}`}
          >
          <Bookmark className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />
        </Button>
      </div>

      {post.vibeTags && post.vibeTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {post.vibeTags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostFooter;
