
import React from 'react';
import { Heart, MessageCircle, Share, Bookmark } from 'lucide-react';
import { Post } from '@/types';

export interface PostFooterProps {
  post: Post;
  isDetailView: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
}

const PostFooter: React.FC<PostFooterProps> = ({ 
  post, 
  isDetailView,
  onLike,
  onComment,
  onShare,
  onBookmark
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-t border-gray-100 dark:border-gray-800">
      <div className="flex items-center space-x-6">
        <button 
          onClick={onLike}
          className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors"
        >
          <Heart className="w-5 h-5" />
          <span className="text-sm font-medium">{post.likes}</span>
        </button>
        
        <button 
          onClick={onComment}
          className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium">{post.comments}</span>
        </button>
        
        <button 
          onClick={onShare}
          className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors"
        >
          <Share className="w-5 h-5" />
          <span className="text-sm font-medium">{post.shares}</span>
        </button>
      </div>
      
      <button 
        onClick={onBookmark}
        className="text-gray-500 hover:text-yellow-500 transition-colors"
      >
        <Bookmark className="w-5 h-5" />
      </button>
    </div>
  );
};

export default PostFooter;
