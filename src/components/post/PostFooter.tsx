
import React, { useState } from 'react';
import { Heart, MessageCircle, Share, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Post } from '@/types';

interface PostFooterProps {
  post: Post;
  isDetailView?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onSave?: () => void;
}

const PostFooter = ({ 
  post, 
  isDetailView = false, 
  onLike, 
  onComment, 
  onShare, 
  onSave 
}: PostFooterProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(post.saved || false);
  const [likesCount, setLikesCount] = useState(post.likes || 0);

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
    <div className="flex items-center justify-between py-3 px-4">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          className={`flex items-center space-x-1 ${
            isLiked ? 'text-red-500' : 'text-muted-foreground'
          } hover:text-red-500`}
        >
          <Heart 
            className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} 
          />
          <span>{likesCount}</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onComment}
          className="flex items-center space-x-1 text-muted-foreground hover:text-blue-500"
        >
          <MessageCircle className="h-4 w-4" />
          <span>{post.comments || 0}</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onShare}
          className="flex items-center space-x-1 text-muted-foreground hover:text-green-500"
        >
          <Share className="h-4 w-4" />
        </Button>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={handleSave}
        className={`${
          isSaved ? 'text-blue-500' : 'text-muted-foreground'
        } hover:text-blue-500`}
      >
        <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
      </Button>
    </div>
  );
};

export default PostFooter;
