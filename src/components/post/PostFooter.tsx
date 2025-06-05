
import React from 'react';
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Post } from "@/types";

interface PostFooterProps {
  post: Post;
  isDetailView?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
}

const PostFooter: React.FC<PostFooterProps> = ({
  post,
  isDetailView = false,
  onLike,
  onComment,
  onShare,
  onBookmark
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-border">
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center space-x-1 hover:text-red-500"
          onClick={onLike}
        >
          <Heart className="h-4 w-4" />
          <span className="text-sm">{post.likes}</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center space-x-1 hover:text-blue-500"
          onClick={onComment}
        >
          <MessageCircle className="h-4 w-4" />
          <span className="text-sm">{post.comments}</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center space-x-1 hover:text-green-500"
          onClick={onShare}
        >
          <Share2 className="h-4 w-4" />
          <span className="text-sm">{post.shares}</span>
        </Button>
      </div>
      
      <Button 
        variant="ghost" 
        size="sm" 
        className="hover:text-yellow-500"
        onClick={onBookmark}
      >
        <Bookmark className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default PostFooter;
