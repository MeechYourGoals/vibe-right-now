
import React from 'react';
import { Comment, User } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from './ui/badge';
import { Heart } from 'lucide-react';

interface CommentListProps {
  comments: Comment[];
  limit?: number;
}

const CommentList: React.FC<CommentListProps> = ({ comments, limit = 3 }) => {
  const displayComments = limit ? comments.slice(0, limit) : comments;
  
  return (
    <div className="space-y-4">
      {displayComments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
      
      {comments.length > limit && (
        <button className="text-xs text-muted-foreground hover:text-primary transition-colors">
          View all {comments.length} comments
        </button>
      )}
    </div>
  );
};

interface CommentItemProps {
  comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const commentDate = new Date(comment.timestamp);
  const timeAgo = formatDistanceToNow(commentDate, { addSuffix: true });
  const displayText = comment.text || comment.content || '';
  
  return (
    <div className="flex items-start gap-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
        <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 space-y-1">
        <div className="flex items-center flex-wrap gap-1">
          <span className="text-sm font-medium">{comment.user.name}</span>
          {comment.user.verified && (
            <Badge variant="outline" className="h-4 px-1 text-[10px] bg-blue-500/10 text-blue-500 border-blue-500/20">Verified</Badge>
          )}
          {comment.vibedHere && (
            <Badge variant="outline" className="h-4 px-1 text-[10px] bg-purple-500/10 text-purple-500 border-purple-500/20">Vibed Here</Badge>
          )}
          <span className="text-xs text-muted-foreground ml-auto">{timeAgo}</span>
        </div>
        
        <p className="text-sm">{displayText}</p>
        
        <div className="flex items-center gap-1">
          <button className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
            <Heart className="h-3 w-3" />
            {comment.likes}
          </button>
          <button className="text-xs text-muted-foreground hover:text-primary">Reply</button>
        </div>
      </div>
    </div>
  );
};

export default CommentList;
