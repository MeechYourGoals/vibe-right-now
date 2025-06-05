
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
      const isVideo = item.endsWith('.mp4') || item.endsWith('.mov') || item.endsWith('.avi');
      return {
        type: isVideo ? 'video' : 'image',
        url: item
      };
    } else if (typeof item === 'object' && item !== null) {
      return item;
    }
    
    return {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80&auto=format&fit=crop'
    };
  });
};

const PostGridItem = ({ post }: PostGridItemProps) => {
  const [liked, setLiked] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  
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

  const getUserCount = () => {
    const seed = post.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return Math.floor((seed % 100) + 10);
  };

  const getFallbackImage = () => {
    const typeImages = {
      restaurant: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80&auto=format&fit=crop",
      bar: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&q=80&auto=format&fit=crop",
      event: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80&auto=format&fit=crop",
      attraction: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&q=80&auto=format&fit=crop",
      sports: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80&auto=format&fit=crop",
      other: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80&auto=format&fit=crop"
    };
    
    return typeImages[post.location.type as keyof typeof typeImages] || typeImages.other;
  };

  return (
    <div className="group relative block aspect-square overflow-hidden rounded-lg">
      {formattedMedia.length > 0 && formattedMedia[0].type === "image" ? (
        <img 
          src={imageError ? getFallbackImage() : formattedMedia[0].url}
          alt={`Post by ${post.user.username} at ${post.location.name}`}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
          onError={() => setImageError(true)}
          loading="lazy"
        />
      ) : formattedMedia.length > 0 && formattedMedia[0].type === "video" ? (
        <video
          src={formattedMedia[0].url}
          className="h-full w-full object-cover"
          poster={getFallbackImage()}
          onError={() => setImageError(true)}
        />
      ) : (
        <div 
          className="flex h-full w-full items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${getFallbackImage()})` }}
        >
          <div className="bg-black/60 rounded-lg p-2 text-center max-w-[80%]">
            <p className="text-white text-sm line-clamp-3">
              {post.content.slice(0, 100)}{post.content.length > 100 ? '...' : ''}
            </p>
          </div>
        </div>
      )}
      
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
