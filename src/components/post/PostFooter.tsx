
import React, { useState } from 'react';
import { Heart, MessageCircle, Share, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Post } from '@/types';

export interface PostFooterProps {
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
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(post.saved || false);

  const handleLike = () => {
    setLiked(!liked);
    onLike?.();
  };

  const handleSave = () => {
    setSaved(!saved);
    onSave?.();
  };

  return (
    <div className="flex items-center justify-between p-3 border-t">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          className={`${liked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
        >
          <Heart className={`h-5 w-5 mr-1 ${liked ? 'fill-current' : ''}`} />
          {post.likes + (liked ? 1 : 0)}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onComment}
          className="text-gray-500 hover:text-blue-500"
        >
          <MessageCircle className="h-5 w-5 mr-1" />
          {post.comments?.length || 0}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onShare}
          className="text-gray-500 hover:text-green-500"
        >
          <Share className="h-5 w-5" />
        </Button>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={handleSave}
        className={`${saved ? 'text-yellow-500' : 'text-gray-500'} hover:text-yellow-500`}
      >
        <Bookmark className={`h-5 w-5 ${saved ? 'fill-current' : ''}`} />
      </Button>
    </div>
  );
};

export default PostFooter;
