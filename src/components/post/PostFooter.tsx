
import React from 'react';
import { Heart, MessageCircle, Share, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Post } from '@/types';

interface PostFooterProps {
  post: Post;
  isDetailView: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onSave?: () => void;
}

const PostFooter: React.FC<PostFooterProps> = ({ 
  post, 
  isDetailView, 
  onLike, 
  onComment, 
  onShare, 
  onSave 
}) => {
  return (
    <div className="flex items-center justify-between pt-3">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center space-x-1 hover:text-red-500"
          onClick={onLike}
        >
          <Heart className="h-4 w-4" />
          <span className="text-sm">{post.likes}</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center space-x-1 hover:text-blue-500"
          onClick={onComment}
        >
          <MessageCircle className="h-4 w-4" />
          <span className="text-sm">{post.comments}</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center space-x-1 hover:text-green-500"
          onClick={onShare}
        >
          <Share className="h-4 w-4" />
          <span className="text-sm">{post.shares}</span>
        </Button>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        className={`hover:text-yellow-500 ${post.saved ? 'text-yellow-500' : ''}`}
        onClick={onSave}
      >
        <Bookmark className={`h-4 w-4 ${post.saved ? 'fill-current' : ''}`} />
      </Button>
    </div>
  );
};

export default PostFooter;
