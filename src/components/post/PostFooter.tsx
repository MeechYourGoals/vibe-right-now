
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, MessageCircle, Share, Bookmark } from "lucide-react";
import CommentList from "@/components/CommentList";
import { Post, Comment } from "@/types";

interface PostFooterProps {
  post: Post;
  comments: Comment[];
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
  onSave: () => void;
  showComments: boolean;
  setShowComments: (show: boolean) => void;
}

const PostFooter: React.FC<PostFooterProps> = ({
  post,
  comments = [],
  onLike,
  onComment,
  onShare,
  onSave,
  showComments,
  setShowComments
}) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      // Handle comment submission
      console.log("Submitting comment:", newComment);
      setNewComment("");
    }
  };

  return (
    <div className="p-4 border-t border-border">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onLike}>
            <Heart className="h-4 w-4 mr-1" />
            {post.likes}
          </Button>
          <Button variant="ghost" size="sm" onClick={onComment}>
            <MessageCircle className="h-4 w-4 mr-1" />
            {comments.length}
          </Button>
          <Button variant="ghost" size="sm" onClick={onShare}>
            <Share className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="ghost" size="sm" onClick={onSave}>
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>

      {showComments && (
        <div className="space-y-3">
          <CommentList comments={comments} />
          <form onSubmit={handleSubmitComment} className="flex gap-2">
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1"
            />
            <Button type="submit" size="sm">
              Post
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostFooter;
