
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Heart, Calendar, Pin, Clock, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Post } from "@/types";
import { deletePost } from "@/utils/venue/postManagementUtils";

interface PostGridItemProps {
  post: Post;
  isVenuePost?: boolean;
  timeAgo?: string;
  isDetailView?: boolean;
  canDelete?: boolean;
  venue?: { id: string; name: string };
  onPostDeleted?: (postId: string) => void;
}

const PostGridItem: React.FC<PostGridItemProps> = ({ 
  post, 
  isVenuePost = false, 
  timeAgo,
  isDetailView = false,
  canDelete = false,
  venue,
  onPostDeleted
}) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setLiked(!liked);
  };
  
  const navigateToUserProfile = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/user/${post.user.username}`);
  };

  const handleDeletePost = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (venue && deletePost(post.id, venue)) {
      if (onPostDeleted) {
        onPostDeleted(post.id);
      }
    }
  };

  // Get the day of the week
  const date = new Date(post.timestamp);
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
  const dayOnly = dayOfWeek.substring(0, 3);
  const timeString = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

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
    <Link 
      to={`/post/${post.id}`} 
      className={`group relative block aspect-square overflow-hidden rounded-lg ${
        isVenuePost ? 'ring-2 ring-amber-500' : ''
      }`}
    >
      {post.media[0]?.type === "image" ? (
        <img 
          src={post.media[0].url}
          alt={`Post by ${post.user.username}`}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      ) : post.media[0]?.type === "video" ? (
        <video
          src={post.media[0].url}
          className="h-full w-full object-cover"
          poster="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-muted">
          <p className="p-2 text-center text-sm">{post.content.slice(0, 100)}{post.content.length > 100 ? '...' : ''}</p>
        </div>
      )}
      
      {post.isPinned && (
        <div className="absolute top-2 right-2 z-10">
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-300 flex items-center">
            <Pin className="h-3 w-3 mr-1" />
            Pinned
          </Badge>
        </div>
      )}
      
      {canDelete && !isVenuePost && (
        <div className="absolute top-2 right-2 z-10">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8 opacity-75 hover:opacity-100"
                  onClick={handleDeletePost}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete post</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="flex items-center justify-between gap-2">
            <Avatar 
              className="h-6 w-6 border border-white cursor-pointer" 
              onClick={navigateToUserProfile}
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
              onClick={handleLike} 
              className="h-8 px-2 text-white hover:bg-black/20"
            >
              <Heart className={`h-4 w-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
              <span className="ml-1">{post.likes + (liked ? 1 : 0)}</span>
            </Button>
            <span 
              className="text-xs text-white hover:underline cursor-pointer"
              onClick={navigateToUserProfile}
            >
              @{post.user.username}
            </span>
          </div>
          
          {/* Only show expiration time in detail view */}
          {isDetailView && !post.isPinned && post.expiresAt && (
            <div className="mt-1 flex items-center justify-end text-xs text-white/80">
              <Clock className="h-3 w-3 mr-1" />
              <span>Expires in {formatExpiryTime()}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PostGridItem;
