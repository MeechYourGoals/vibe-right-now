
import React, { useState } from 'react';
import { Heart, MessageCircle, Share, Bookmark } from 'lucide-react';
import { Comment } from '@/types';
import { Button } from '@/components/ui/button';

interface PostFooterProps {
  likes: number;
  commentCount: number;
  isLiked: boolean;
  isSaved: boolean;
  toggleLike: () => void;
  toggleSave: () => void;
  comments?: Comment[];
}

const PostFooter: React.FC<PostFooterProps> = ({
  likes,
  commentCount,
  isLiked,
  isSaved,
  toggleLike,
  toggleSave,
  comments = []
}) => {
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="p-4 pt-2">
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={`px-2 ${isLiked ? 'text-red-500' : ''}`}
            onClick={toggleLike}
          >
            <Heart
              className={`w-5 h-5 mr-1 ${isLiked ? 'fill-red-500 text-red-500' : ''}`}
            />
            <span>{likes}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="px-2"
            onClick={toggleComments}
          >
            <MessageCircle className="w-5 h-5 mr-1" />
            <span>{commentCount}</span>
          </Button>

          <Button variant="ghost" size="sm" className="px-2">
            <Share className="w-5 h-5 mr-1" />
          </Button>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className={`px-2 ${isSaved ? 'text-primary' : ''}`}
          onClick={toggleSave}
        >
          <Bookmark
            className={`w-5 h-5 ${isSaved ? 'fill-primary text-primary' : ''}`}
          />
        </Button>
      </div>

      {showComments && comments.length > 0 && (
        <div className="mt-4 space-y-3">
          {comments.slice(0, 3).map(comment => (
            <div key={comment.id} className="flex gap-2">
              <img
                src={comment.user.avatar || `https://ui-avatars.com/api/?name=${comment.user.name}`}
                alt={comment.user.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{comment.user.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{comment.content || comment.text}</p>
              </div>
            </div>
          ))}
          
          {comments.length > 3 && (
            <Button variant="link" size="sm" className="px-0">
              View all {comments.length} comments
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default PostFooter;
