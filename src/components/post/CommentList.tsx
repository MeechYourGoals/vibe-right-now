
import React, { useState } from 'react';
import { Comment } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface CommentListProps {
  comments: Comment[];
  onAddComment?: (postId: string, comment: string) => void;
}

const CommentList = ({ comments, onAddComment }: CommentListProps) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && onAddComment) {
      onAddComment('', newComment);
      setNewComment('');
    }
  };

  return (
    <div className="space-y-3 p-4 border-t">
      {comments.map((comment) => (
        <div key={comment.id} className="flex items-start space-x-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
            <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center space-x-1">
              <span className="text-sm font-semibold">{comment.user.username}</span>
              <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
            </div>
            <p className="text-sm">{comment.content}</p>
          </div>
        </div>
      ))}
      
      {onAddComment && (
        <form onSubmit={handleSubmit} className="flex space-x-2 mt-3">
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1"
          />
          <Button type="submit" size="sm">Post</Button>
        </form>
      )}
    </div>
  );
};

export default CommentList;
