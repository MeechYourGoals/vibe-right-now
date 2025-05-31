
import React from 'react';
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
  return (
    <div className="flex items-center justify-between p-4 border-t">
      <div className="flex items-center space-x-4">
        <button 
          onClick={onLike}
          className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
        >
          <Heart className="h-5 w-5" />
          <span className="text-sm">{post.likes}</span>
        </button>
        
        <button 
          onClick={onComment}
          className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-sm">{post.comments}</span>
        </button>
        
        <button 
          onClick={onShare}
          className="flex items-center space-x-1 text-gray-600 hover:text-green-500 transition-colors"
        >
          <Share className="h-5 w-5" />
          <span className="text-sm">{post.shares}</span>
        </button>
      </div>
      
      <button 
        onClick={onSave}
        className="text-gray-600 hover:text-yellow-500 transition-colors"
      >
        <Bookmark className={`h-5 w-5 ${post.saved ? 'fill-current text-yellow-500' : ''}`} />
      </button>
    </div>
  );
};

export default PostFooter;
