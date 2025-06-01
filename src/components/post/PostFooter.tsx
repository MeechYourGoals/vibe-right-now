
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share, Bookmark } from 'lucide-react';
import { Post } from '@/types';

interface PostFooterProps {
  post: Post;
  isDetailView?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onSave?: () => void;
}

const PostFooter: React.FC<PostFooterProps> = ({
  post,
  isDetailView = false,
  onLike,
  onComment,
  onShare,
  onSave
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(post.saved || false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    onLike?.();
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave?.();
  };

  return (
    <div className="flex items-center justify-between pt-3">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          className={`p-2 ${isLiked ? 'text-red-500' : 'text-gray-600'}`}
        >
          <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
          <span className="ml-1">{likeCount}</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onComment}
          className="p-2 text-gray-600"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="ml-1">{post.comments}</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onShare}
          className="p-2 text-gray-600"
        >
          <Share className="h-5 w-5" />
          <span className="ml-1">{post.shares}</span>
        </Button>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={handleSave}
        className={`p-2 ${isSaved ? 'text-blue-500' : 'text-gray-600'}`}
      >
        <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
      </Button>
    </div>
  );
};

export default PostFooter;
