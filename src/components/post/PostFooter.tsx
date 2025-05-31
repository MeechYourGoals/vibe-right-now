
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
  onBookmark?: () => void;
}

const PostFooter: React.FC<PostFooterProps> = ({
  post,
  isDetailView = false,
  onLike,
  onComment,
  onShare,
  onBookmark
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    onLike?.();
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark?.();
  };

  return (
    <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          <span>{likeCount}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onComment}
          className="flex items-center space-x-1 text-gray-500 hover:text-blue-500"
        >
          <MessageCircle className="w-5 h-5" />
          <span>{post.comments}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onShare}
          className="flex items-center space-x-1 text-gray-500 hover:text-green-500"
        >
          <Share className="w-5 h-5" />
          <span>{post.shares}</span>
        </Button>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleBookmark}
        className={`${isBookmarked ? 'text-blue-500' : 'text-gray-500'}`}
      >
        <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
      </Button>
    </div>
  );
};

export default PostFooter;
