
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Bookmark, Share2, ThumbsUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Post, Comment } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import CommentList from '@/components/CommentList';

interface PostFooterProps {
  post: Post;
  comments?: Comment[];
  isDetailView?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onSave?: () => void;
  onShare?: () => void;
}

const PostFooter: React.FC<PostFooterProps> = ({
  post,
  comments,
  isDetailView = false,
  onLike,
  onComment,
  onSave,
  onShare
}) => {
  const [newComment, setNewComment] = useState('');
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  
  const postComments = comments || post.comments || [];
  
  const commentDate = new Date(post.timestamp);
  const timeAgo = formatDistanceToNow(commentDate, { addSuffix: true });
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    // Here you would typically call an API to add the comment
    // For now, we'll just log it
    console.log('Submitting comment:', newComment);
    
    setNewComment('');
    // Optionally close the comment input after submitting
    // setShowCommentInput(false);
  };
  
  return (
    <div className="space-y-3">
      <div className="flex gap-4 justify-between items-center">
        <div className="flex gap-2 items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 px-2 h-8"
            onClick={onLike}
          >
            <Heart 
              className={`h-5 w-5 ${post.saved ? 'fill-red-500 text-red-500' : ''}`} 
            />
            <span className="text-sm">{post.likes}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 px-2 h-8"
            onClick={() => setShowCommentInput(prev => !prev)}
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm">{postComments.length}</span>
          </Button>
        </div>
        
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={onSave}
          >
            <Bookmark className={`h-5 w-5 ${post.saved ? 'fill-primary text-primary' : ''}`} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={onShare}
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="text-xs text-muted-foreground">
        {timeAgo}
      </div>
      
      {/* Comments section */}
      {postComments.length > 0 && (
        <div className="space-y-3">
          <CommentList 
            comments={postComments} 
            limit={showAllComments ? undefined : 2} 
          />
          
          {!showAllComments && postComments.length > 2 && (
            <button 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setShowAllComments(true)}
            >
              View all {postComments.length} comments
            </button>
          )}
        </div>
      )}
      
      {/* Comment input */}
      {showCommentInput && (
        <form onSubmit={handleSubmitComment} className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Your avatar" />
            <AvatarFallback>YA</AvatarFallback>
          </Avatar>
          
          <div className="relative flex-1">
            <input
              type="text"
              className="w-full py-2 px-3 pr-10 rounded-full bg-muted/50 border-0 text-sm focus:ring-1 focus:ring-primary"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            
            {newComment.trim() && (
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary hover:text-primary/80 transition-colors"
              >
                <ThumbsUp className="h-4 w-4" />
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default PostFooter;
