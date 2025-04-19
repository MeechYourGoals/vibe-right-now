
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Post, Media } from "@/types";
import { formatDistanceToNow } from "date-fns";
import UserDropdown from "@/components/venue/post-grid-item/UserDropdown";

interface PostGridItemProps {
  post: Post;
}

// Helper function to ensure media is in the correct format
const ensureMediaFormat = (media: any[]): Media[] => {
  if (!media || media.length === 0) {
    return [];
  }
  
  return media.map(item => {
    if (typeof item === 'string') {
      // Determine type based on extension
      const isVideo = item.endsWith('.mp4') || item.endsWith('.mov') || item.endsWith('.avi');
      return {
        type: isVideo ? 'video' : 'image',
        url: item
      };
    } else if (typeof item === 'object' && item !== null) {
      // Already in correct format
      return item;
    }
    
    // Default fallback
    return {
      type: 'image',
      url: 'https://via.placeholder.com/500'
    };
  });
};

const PostGridItem = ({ post }: PostGridItemProps) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  
  // Ensure post has a valid user
  if (!post.user) {
    console.error('Post is missing user information:', post);
    return null;
  }
  
  // Ensure media is in the correct format
  const formattedMedia = ensureMediaFormat(post.media);
  
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
  };
  
  const navigateToUserProfile = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/user/${post.user.username}`);
  };

  // Generate a semi-random user count based on post ID
  const getUserCount = () => {
    const seed = post.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return Math.floor((seed % 100) + 10);
  };

  return (
    <div className="group relative block aspect-square overflow-hidden rounded-lg">
      {formattedMedia.length > 0 && formattedMedia[0].type === "image" ? (
        <img 
          src={formattedMedia[0].url}
          alt={`Post by ${post.user.username}`}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      ) : formattedMedia.length > 0 && formattedMedia[0].type === "video" ? (
        <video
          src={formattedMedia[0].url}
          className="h-full w-full object-cover"
          poster="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-muted">
          <p className="p-2 text-center text-sm">{post.content.slice(0, 100)}{post.content.length > 100 ? '...' : ''}</p>
        </div>
      )}
      
      {/* Add user count dropdown */}
      <div className="absolute top-2 right-2 z-10">
        <UserDropdown userCount={getUserCount()} post={post} />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="flex items-center gap-2">
            <Avatar 
              className="h-6 w-6 border border-white cursor-pointer hover:ring-2 hover:ring-primary transition-all"
              onClick={navigateToUserProfile}
            >
              <AvatarImage src={post.user.avatar} alt={post.user.name} />
              <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span 
              className="text-xs font-medium text-white cursor-pointer hover:underline"
              onClick={navigateToUserProfile}
            >
              @{post.user.username}
            </span>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLike} 
                className="h-8 px-2 text-white hover:bg-black/20"
              >
                <Heart className={`h-4 w-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
                <span className="ml-1">{post.likes + (liked ? 1 : 0)}</span>
              </Button>
            </div>
            
            <span className="text-xs text-white">
              {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostGridItem;
