
import React, { useState } from "react";
import { Post, Comment } from "@/types";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Share2, Users } from "lucide-react";
import CommentItem from "@/components/CommentItem";

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
  const [showComments, setShowComments] = useState(false);
  
  const handleLike = () => {
    setLiked(!liked);
  };
  
  const toggleComments = () => {
    setShowComments(!showComments);
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

  // Calculate how many people have vibed here before
  const getVibedHereCount = () => {
    if (!comments || comments.length === 0) return 0;
    return comments.filter(comment => comment.vibedHere).length;
  };
  
  const renderComments = () => {
    if (isDetailView) {
      return null; // Comments are rendered separately in detail view
    }
    
    if (!showComments || comments.length === 0) {
      return null;
    }
    
    // Show up to 3 comments when expanded
    const displayComments = comments.slice(0, 3);
    
    return (
      <div className="px-4 py-2 border-t space-y-2">
        {displayComments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
        
        {comments.length > 3 && (
          <Link to={`/post/${post.id}`} className="text-muted-foreground text-xs block text-center py-1">
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
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 px-2"
            onClick={toggleComments}
          >
            <MessageCircle className="h-5 w-5" />
            <span>{getCommentCount(post)}</span>
          </Button>
          
          {getVibedHereCount() > 0 && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Users className="h-3 w-3 mr-1" />
              <span>{getVibedHereCount()} vibed here</span>
            </div>
          )}
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
      
      {!showComments && comments.length > 0 && !isDetailView && (
        <div className="px-4 py-2 border-t text-sm">
          <div className="flex items-start gap-2">
            <span className="font-semibold">{comments[0].user.username}</span>
            <p className={`text-xs whitespace-pre-wrap ${comments[0].vibedHere ? 'text-amber-700 font-medium' : ''}`}>
              {comments[0].content || comments[0].text}
            </p>
          </div>
          
          {comments.length > 1 && (
            <Button 
              variant="ghost" 
              className="w-full text-sm mt-1 h-auto py-1 text-muted-foreground"
              onClick={toggleComments}
            >
              View all {getCommentCount(post)} comments
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default PostFooter;
