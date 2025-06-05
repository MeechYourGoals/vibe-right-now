
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share, MapPin, Bookmark } from "lucide-react";
import { Post, Comment } from "@/types";

export interface PostFooterProps {
  post: Post;
  isDetailView?: boolean;
  onComment?: () => void;
  onLike?: () => void;
  onShare?: () => void;
  comments?: Comment[];
}

const PostFooter: React.FC<PostFooterProps> = ({ 
  post, 
  isDetailView = false,
  onComment,
  onLike,
  onShare,
  comments
}) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    onLike?.();
  };

  const handleComment = () => {
    onComment?.();
  };

  const handleShare = () => {
    onShare?.();
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <div className="px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center space-x-1 ${liked ? 'text-red-500' : ''}`}
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
            <span className="text-sm">{post.likes + (liked ? 1 : 0)}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
            onClick={handleComment}
          >
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm">{post.comments}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
            onClick={handleShare}
          >
            <Share className="h-4 w-4" />
            <span className="text-sm">{post.shares}</span>
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          {post.location && (
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{post.location.name}</span>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            className={bookmarked ? 'text-yellow-500' : ''}
            onClick={handleBookmark}
          >
            <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>

      {post.vibeTags && post.vibeTags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {post.vibeTags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
          {post.vibeTags.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{post.vibeTags.length - 3} more
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default PostFooter;
