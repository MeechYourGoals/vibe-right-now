
import React from 'react';
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

const PostFooter: React.FC<PostFooterProps> = ({
  post,
  isDetailView = false,
  onLike,
  onComment,
  onShare,
  onSave
}) => {
  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <div className="flex items-center justify-between pt-3 border-t">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          className={`gap-2 ${post.liked ? 'text-red-500' : ''}`}
          onClick={onLike}
        >
          <Heart className={`h-4 w-4 ${post.liked ? 'fill-current' : ''}`} />
          {formatCount(post.likes)}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          onClick={onComment}
        >
          <MessageCircle className="h-4 w-4" />
          {formatCount(post.comments)}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          onClick={onShare}
        >
          <Share className="h-4 w-4" />
          {formatCount(post.shares)}
        </Button>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        className={post.saved ? 'text-blue-500' : ''}
        onClick={onSave}
      >
        <Bookmark className={`h-4 w-4 ${post.saved ? 'fill-current' : ''}`} />
      </Button>
    </div>
  );
};

export default PostFooter;
