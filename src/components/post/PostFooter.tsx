
import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";

interface PostFooterProps {
  isLiked: boolean;
  likesCount: number;
  commentsCount: number;
  vibedHere: boolean;
  onLike: () => void;
  onComment: () => void;
  onShare?: () => void;
}

const PostFooter: React.FC<PostFooterProps> = ({ 
  isLiked,
  likesCount,
  commentsCount,
  vibedHere,
  onLike,
  onComment,
  onShare
}) => {
  return (
    <div className="px-4 pb-2">
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 px-2"
            onClick={onLike}
          >
            <Heart 
              className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} 
            />
            <span>{likesCount}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 px-2"
            onClick={onComment}
          >
            <MessageCircle className="h-5 w-5" />
            <span>{commentsCount}</span>
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="rounded-full h-8 w-8 p-0"
          onClick={onShare}
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PostFooter;
