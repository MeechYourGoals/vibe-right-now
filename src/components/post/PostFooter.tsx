
import React, { useState } from "react";
import { Heart, MessageCircle, Share, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Post } from "@/types";

interface PostFooterProps {
  post: Post;
  onComment: () => void;
  isDetailView?: boolean;
}

const PostFooter: React.FC<PostFooterProps> = ({
  post,
  onComment,
  isDetailView = false
}) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(post.saved);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  return (
    <div className="px-4 py-3 border-t">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`flex items-center space-x-2 ${liked ? 'text-red-500' : ''}`}
          >
            <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
            <span>{likesCount}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onComment}
            className="flex items-center space-x-2"
          >
            <MessageCircle className="h-4 w-4" />
            <span>{post.comments}</span>
          </Button>

          <Button variant="ghost" size="sm" className="flex items-center space-x-2">
            <Share className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleSave}
          className={saved ? 'text-blue-500' : ''}
        >
          <Bookmark className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />
        </Button>
      </div>
      
      {post.vibeTags && post.vibeTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {post.vibeTags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostFooter;
