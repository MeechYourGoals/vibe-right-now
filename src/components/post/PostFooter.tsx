
import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share, Bookmark } from "lucide-react";
import { Post, Comment } from "@/types";

interface PostFooterProps {
  post: Post;
  showStats?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onSave?: () => void;
  getComments?: (postId: string) => Comment[];
}

const PostFooter = ({ 
  post, 
  showStats = true, 
  onLike, 
  onComment, 
  onShare, 
  onSave,
  getComments 
}: PostFooterProps) => {
  const comments = getComments ? getComments(post.id) : post.comments || [];
  
  return (
    <div className="p-4 border-t border-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center space-x-1 text-muted-foreground hover:text-red-500"
            onClick={onLike}
          >
            <Heart className="h-4 w-4" />
            {showStats && <span>{post.likes}</span>}
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center space-x-1 text-muted-foreground hover:text-blue-500"
            onClick={onComment}
          >
            <MessageCircle className="h-4 w-4" />
            {showStats && <span>{comments.length}</span>}
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center space-x-1 text-muted-foreground hover:text-green-500"
            onClick={onShare}
          >
            <Share className="h-4 w-4" />
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-muted-foreground hover:text-yellow-500"
          onClick={onSave}
        >
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PostFooter;
