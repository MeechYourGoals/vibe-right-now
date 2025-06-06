
import { Heart, MessageCircle, Share, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Post } from "@/types";

interface PostFooterProps {
  post: Post;
  isDetailView?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onSave?: () => void;
}

const PostFooter = ({ 
  post, 
  isDetailView = false, 
  onLike, 
  onComment, 
  onShare, 
  onSave 
}: PostFooterProps) => {
  return (
    <div className="flex items-center justify-between pt-3">
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-muted-foreground hover:text-red-500"
          onClick={onLike}
        >
          <Heart className="h-4 w-4 mr-1" />
          {post.likes}
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-muted-foreground hover:text-blue-500"
          onClick={onComment}
        >
          <MessageCircle className="h-4 w-4 mr-1" />
          {post.comments}
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-muted-foreground hover:text-green-500"
          onClick={onShare}
        >
          <Share className="h-4 w-4" />
        </Button>
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        className={`text-muted-foreground hover:text-yellow-500 ${post.saved ? 'text-yellow-500' : ''}`}
        onClick={onSave}
      >
        <Bookmark className={`h-4 w-4 ${post.saved ? 'fill-current' : ''}`} />
      </Button>
    </div>
  );
};

export default PostFooter;
