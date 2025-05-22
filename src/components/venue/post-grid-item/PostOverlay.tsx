
import { CalendarClock, Clock, Eye, Heart, MessageCircle, Pin } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/types";

interface PostOverlayProps {
  post: Post;
  showStats?: boolean;
}

export function PostOverlay({ post, showStats = true }: PostOverlayProps) {
  // Format timestamp
  const timeAgo = formatDistanceToNow(new Date(post.timestamp), { addSuffix: true });
  
  // Calculate expiration (if exists)
  const isExpiring = post.expiresAt ? new Date(post.expiresAt) > new Date() : false;
  
  // Calculate time until expiration (if applicable)
  const expiresIn = post.expiresAt 
    ? formatDistanceToNow(new Date(post.expiresAt), { addSuffix: false }) 
    : null;
    
  return (
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        {post.isPinned && (
          <Badge variant="outline" className="bg-amber-500/90 text-white border-none">
            <Pin className="w-3 h-3 mr-1" fill="currentColor" />
            Pinned
          </Badge>
        )}
        
        {isExpiring && expiresIn && (
          <Badge variant="outline" className="bg-green-600/90 text-white border-none ml-auto">
            <CalendarClock className="w-3 h-3 mr-1" />
            {post.expiresAt && `Expires in ${expiresIn}`}
          </Badge>
        )}
      </div>
      
      <div className="space-y-1">
        {showStats && (
          <div className="flex justify-between text-xs text-white/90">
            <div className="flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              <span>{Math.floor(Math.random() * 1000) + 100}</span>
            </div>
            <div className="flex items-center">
              <Heart className="w-3 h-3 mr-1" />
              <span>{post.likes || 0}</span>
            </div>
            <div className="flex items-center">
              <MessageCircle className="w-3 h-3 mr-1" />
              <span>{post.comments || 0}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              <span>{timeAgo}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
