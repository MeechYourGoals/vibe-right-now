
import React, { useState } from 'react';
import { formatDistanceToNow } from "date-fns";
import { Heart, Calendar, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/types";

interface PostOverlayProps {
  post: Post;
  isVenuePost?: boolean;
  timeAgo?: string;
  isDetailView?: boolean;
  onUserProfileClick: (e: React.MouseEvent) => void;
  onLike: (e: React.MouseEvent) => void;
}

const PostOverlay: React.FC<PostOverlayProps> = ({ 
  post,
  isVenuePost,
  timeAgo,
  isDetailView,
  onUserProfileClick,
  onLike
}) => {
  const [liked, setLiked] = useState(false);
  
  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setLiked(!liked);
    onLike(e);
  };

  // Get the day of the week
  const date = new Date(post.timestamp);
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
  const dayOnly = dayOfWeek.substring(0, 3);
  
  // Calculate expiration time for detail view
  const formatExpiryTime = () => {
    if (!post.expiresAt) return null;
    
    const now = new Date();
    const expiry = new Date(post.expiresAt);
    const diffHours = Math.max(0, Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60 * 60)));
    
    if (diffHours < 24) {
      return `${diffHours}h`;
    } else if (diffHours < 24 * 7) {
      const days = Math.floor(diffHours / 24);
      return `${days} day${days > 1 ? 's' : ''}`;
    } else if (diffHours < 24 * 30) {
      const weeks = Math.floor(diffHours / (24 * 7));
      return `${weeks} week${weeks > 1 ? 's' : ''}`;
    } else {
      const months = Math.floor(diffHours / (24 * 30));
      return `${months} month${months > 1 ? 's' : ''}`;
    }
  };

  return (
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <div className="flex items-center justify-between gap-2">
          <Avatar 
            className="h-6 w-6 border border-white cursor-pointer" 
            onClick={onUserProfileClick}
          >
            <AvatarImage src={post.user.avatar} alt={post.user.name} />
            <AvatarFallback>{post.user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-1">
            {isVenuePost && <Badge className="bg-amber-500 text-[0.6rem] mr-1">Venue</Badge>}
            <Badge variant="outline" className="text-[0.6rem] bg-black/30 text-white border-white/20 flex items-center">
              <Calendar className="h-3 w-3 mr-0.5" />
              {timeAgo || dayOnly}
            </Badge>
          </div>
        </div>
        
        <p className="mt-1 text-xs text-white line-clamp-2 overflow-hidden">
          {post.content.slice(0, 60)}{post.content.length > 60 ? '...' : ''}
        </p>
        
        <div className="mt-2 flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLikeClick} 
            className="h-8 px-2 text-white hover:bg-black/20"
          >
            <Heart className={`h-4 w-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
            <span className="ml-1">{post.likes + (liked ? 1 : 0)}</span>
          </Button>
          <span 
            className="text-xs text-white hover:underline cursor-pointer"
            onClick={onUserProfileClick}
          >
            @{post.user.username}
          </span>
        </div>
        
        {isDetailView && !post.isPinned && post.expiresAt && (
          <div className="mt-1 flex items-center justify-end text-xs text-white/80">
            <Clock className="h-3 w-3 mr-1" />
            <span>Expires in {formatExpiryTime()}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostOverlay;
