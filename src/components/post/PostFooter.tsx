
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Post } from '@/types';

export interface PostFooterProps {
  post: Post;
  isDetailView?: boolean;
  onComment?: () => void;
}

const PostFooter: React.FC<PostFooterProps> = ({ 
  post, 
  isDetailView = false,
  onComment
}) => {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleComment = () => {
    if (onComment) {
      onComment();
    }
  };

  const handleShare = () => {
    // Share functionality
    console.log('Sharing post:', post.id);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="border-t border-gray-200 pt-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`p-2 ${isLiked ? 'text-red-500' : 'text-gray-600'}`}
          >
            <Heart className={`h-5 w-5 mr-1 ${isLiked ? 'fill-current' : ''}`} />
            <span className="text-sm">{likes}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleComment}
            className="p-2 text-gray-600"
          >
            <MessageCircle className="h-5 w-5 mr-1" />
            <span className="text-sm">{post.comments}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="p-2 text-gray-600"
          >
            <Share2 className="h-5 w-5 mr-1" />
            <span className="text-sm">{post.shares}</span>
          </Button>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBookmark}
          className={`p-2 ${isBookmarked ? 'text-blue-500' : 'text-gray-600'}`}
        >
          <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
        </Button>
      </div>
    </div>
  );
};

export default PostFooter;
