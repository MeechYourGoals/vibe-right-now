
import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, MapPin } from "lucide-react";
import { Post } from "@/types";

interface PostFooterProps {
  post: Post;
  isLiked?: boolean;
  likesCount?: number;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
}

const PostFooter = ({ 
  post, 
  isLiked = false, 
  likesCount = 0, 
  onLike, 
  onComment, 
  onShare 
}: PostFooterProps) => {
  return (
    <div className="px-4 py-3 border-t">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : ''}`}
            onClick={onLike}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            <span className="text-sm">{likesCount}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
            onClick={onComment}
          >
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm">{post.comments?.length || 0}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
            onClick={onShare}
          >
            <Share2 className="h-4 w-4" />
            <span className="text-sm">Share</span>
          </Button>
        </div>
        
        {post.vibedHere && (
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>Vibed here</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostFooter;
