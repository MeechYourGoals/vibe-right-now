
import React from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Post } from '@/types';

export interface PostFooterProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
  isDetailView?: boolean;
}

const PostFooter: React.FC<PostFooterProps> = ({
  post,
  onLike,
  onComment,
  onShare,
  isDetailView = false
}) => {
  return (
    <div className="p-4 border-t space-y-3">
      {/* Action buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1 text-muted-foreground hover:text-red-500"
            onClick={() => onLike?.(post.id)}
          >
            <Heart className="h-4 w-4" />
            <span>{post.likes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1 text-muted-foreground hover:text-blue-500"
            onClick={() => onComment?.(post.id)}
          >
            <MessageCircle className="h-4 w-4" />
            <span>{post.comments}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1 text-muted-foreground hover:text-green-500"
            onClick={() => onShare?.(post.id)}
          >
            <Share2 className="h-4 w-4" />
            <span>{post.shares}</span>
          </Button>
        </div>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Vibe tags */}
      {post.vibeTags && post.vibeTags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {post.vibeTags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostFooter;
