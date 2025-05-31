
import React from 'react';
import { Comment } from '@/types';
import { Heart, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CommentListProps {
  comments: Comment[];
  onCommentLike?: (commentId: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({ comments, onCommentLike }) => {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d`;
    }
  };

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <div key={comment.id} className="flex space-x-3">
          <img
            src={comment.user.avatar}
            alt={comment.user.name}
            className="w-8 h-8 rounded-full flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                  {comment.user.name}
                </span>
                <span className="text-xs text-gray-500">
                  {formatTimestamp(comment.timestamp)}
                </span>
              </div>
              <p className="text-sm text-gray-800 dark:text-gray-200">
                {comment.content}
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-1 ml-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCommentLike?.(comment.id)}
                className="text-xs text-gray-500 hover:text-red-500 p-0 h-auto"
              >
                <Heart className="w-3 h-3 mr-1" />
                {comment.likes > 0 && comment.likes}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-gray-500 p-0 h-auto"
              >
                Reply
              </Button>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-400 p-1 h-auto">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
