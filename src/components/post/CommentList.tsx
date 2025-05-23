
import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Comment } from "@/types";
import VerifiedBadge from "@/components/icons/VerifiedIcon";

interface CommentListProps {
  comments: Comment[];
  onAddComment?: (postId: string, comment: string) => void;
}

const CommentList = ({ comments, onAddComment }: CommentListProps) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = () => {
    if (newComment.trim() && onAddComment) {
      onAddComment(comments[0]?.postId || '', newComment);
      setNewComment('');
    }
  };

  return (
    <div className="px-4 pb-4 space-y-3">
      {comments.map((comment) => (
        <div key={comment.id} className="flex items-start space-x-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
            <AvatarFallback className="text-xs">{comment.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-xs">{comment.user.name}</span>
              {comment.user.isVerified && <VerifiedBadge />}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{comment.content}</p>
          </div>
        </div>
      ))}
      
      <div className="flex items-center space-x-2 mt-3">
        <Input
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 text-sm"
          onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
        />
        <Button 
          size="sm" 
          onClick={handleSubmitComment}
          disabled={!newComment.trim()}
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default CommentList;
