
import React, { useState } from "react";
import { Post, Comment } from "@/types";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Share2 } from "lucide-react";

interface PostFooterProps {
  post: Post;
  comments: Comment[];
  isDetailView?: boolean;
}

const PostFooter: React.FC<PostFooterProps> = ({ 
  post, 
  comments, 
  isDetailView = false 
}) => {
  const [liked, setLiked] = useState(false);
  
  const handleLike = () => {
    setLiked(!liked);
  };
  
  // Helper function to get comment count safely
  const getCommentCount = (post: Post): number => {
    if (typeof post.comments === 'number') {
      return post.comments;
    }
    if (Array.isArray(post.comments)) {
      return post.comments.length;
    }
    return 0;
  };
  
  const renderComments = () => {
    if (isDetailView) {
      return null; // Comments are rendered separately in detail view
    }
    
    if (!comments || comments.length === 0) {
      return null;
    }
    
    // Show the most recent comment
    const latestComment = comments[0];
    
    return (
      <div className="px-4 py-2 border-t text-sm">
        <div className="flex items-start gap-2">
          <span className="font-semibold">{latestComment.user?.username}</span>
          <p className="text-xs whitespace-pre-wrap">{latestComment.content || latestComment.text}</p>
        </div>
        
        {comments.length > 1 && (
          <Link to={`/post/${post.id}`} className="text-muted-foreground text-xs mt-1 block">
            View all {getCommentCount(post)} comments
          </Link>
        )}
      </div>
    );
  };
  
  return (
    <div className="px-4 pb-2">
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 px-2"
            onClick={handleLike}
          >
            <Heart 
              className={`h-5 w-5 ${liked ? 'fill-red-500 text-red-500' : ''}`} 
            />
            <span>{post.likes + (liked ? 1 : 0)}</span>
          </Button>
          
          <Link to={`/post/${post.id}`}>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1 px-2"
            >
              <MessageCircle className="h-5 w-5" />
              <span>{getCommentCount(post)}</span>
            </Button>
          </Link>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="rounded-full h-8 w-8 p-0"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
      
      {renderComments()}
    </div>
  );
};

export default PostFooter;
