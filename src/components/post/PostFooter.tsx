
import React, { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Post } from "@/types";

interface PostFooterProps {
  post: Post;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onSave?: () => void;
  isDetailView?: boolean;
}

const PostFooter: React.FC<PostFooterProps> = ({
  post,
  onLike,
  onComment,
  onShare,
  onSave,
  isDetailView = false
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(post.saved || false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    onLike?.();
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave?.();
  };

  const handleComment = () => {
    onComment?.();
  };

  const handleShare = () => {
    onShare?.();
  };

  return (
    <div className="flex items-center justify-between pt-3 border-t border-border">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center space-x-2 ${isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
          onClick={handleLike}
        >
          <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
          <span>{likesCount}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex items-center space-x-2 text-muted-foreground"
          onClick={handleComment}
        >
          <MessageCircle className="h-5 w-5" />
          <span>{(post.comments || []).length}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex items-center space-x-2 text-muted-foreground"
          onClick={handleShare}
        >
          <Share2 className="h-5 w-5" />
          <span>{post.shares || 0}</span>
        </Button>
      </div>

      <Button
        variant="ghost"
        size="sm"
        className={`${isSaved ? 'text-primary' : 'text-muted-foreground'}`}
        onClick={handleSave}
      >
        <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
      </Button>
    </div>
  );
};

export default PostFooter;
