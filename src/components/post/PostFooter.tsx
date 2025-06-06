
import React from "react";
import { Heart, MessageCircle, Share, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Post } from "@/types";

interface PostFooterProps {
  post: Post;
  isDetailView?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onSave?: () => void;
}

const PostFooter = ({ 
  post, 
  isDetailView = false, 
  onLike, 
  onComment, 
  onShare, 
  onSave 
}: PostFooterProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-t">
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center space-x-1"
          onClick={onLike}
        >
          <Heart className="h-4 w-4" />
          <span>{post.likes}</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center space-x-1"
          onClick={onComment}
        >
          <MessageCircle className="h-4 w-4" />
          <span>{post.comments}</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onShare}
        >
          <Share className="h-4 w-4" />
        </Button>
      </div>
      
      <Button 
        variant="ghost" 
        size="sm"
        onClick={onSave}
      >
        <Bookmark className={`h-4 w-4 ${post.saved ? 'fill-current' : ''}`} />
      </Button>
    </div>
  );
};

export default PostFooter;
