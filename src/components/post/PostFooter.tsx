
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { Post } from "@/types";

interface PostFooterProps {
  post: Post;
  isDetailView?: boolean;
  onComment?: () => void;
  onShare?: () => void;
  onLike?: () => void;
  onSave?: () => void;
}

const PostFooter: React.FC<PostFooterProps> = ({ 
  post, 
  isDetailView = false,
  onComment,
  onShare,
  onLike,
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
    <div className="flex items-center justify-between p-4 border-t">
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleLike}
          className={liked ? "text-red-500" : ""}
        >
          <Heart className={`h-4 w-4 mr-1 ${liked ? "fill-current" : ""}`} />
          {post.likes + (liked ? 1 : 0)}
        </Button>
        
        <Button variant="ghost" size="sm" onClick={onComment}>
          <MessageCircle className="h-4 w-4 mr-1" />
          Comment
        </Button>
        
        <Button variant="ghost" size="sm" onClick={onShare}>
          <Share2 className="h-4 w-4 mr-1" />
          Share
        </Button>
      </div>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={handleSave}
        className={saved ? "text-blue-500" : ""}
      >
        <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
      </Button>
    </div>
  );
};

export default PostFooter;
