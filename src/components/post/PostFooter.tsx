
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Post } from '@/types';

interface PostFooterProps {
  post: Post;
  isDetailView?: boolean;
  onComment?: () => void;
  onLike?: () => void;
  onShare?: () => void;
  onSave?: () => void;
}

export const PostFooter: React.FC<PostFooterProps> = ({
  post,
  isDetailView = false,
  onComment,
  onLike,
  onShare,
  onSave
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(post.saved || false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    onLike?.();
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave?.();
  };

  return (
    <div className="flex items-center justify-between p-4 border-t">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : ''}`}
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          <span>{likesCount}</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onComment}
          className="flex items-center space-x-1"
        >
          <MessageCircle className="h-4 w-4" />
          <span>{post.comments}</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onShare}
          className="flex items-center space-x-1"
        >
          <Share2 className="h-4 w-4" />
          <span>{post.shares}</span>
        </Button>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={handleSave}
        className={`${isSaved ? 'text-blue-500' : ''}`}
      >
        <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
      </Button>
    </div>
  );
};

export default PostFooter;
