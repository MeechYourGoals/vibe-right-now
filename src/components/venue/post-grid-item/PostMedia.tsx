
import React, { useState } from 'react';
import { Post } from "@/types";

interface PostMediaProps {
  post: Post;
}

const PostMedia: React.FC<PostMediaProps> = ({ post }) => {
  const [imageError, setImageError] = useState(false);
  
  // Ensure we have media and handle the case where media might be empty
  const media = post.media && post.media.length > 0 ? post.media[0] : null;
  
  if (!media || imageError) {
    // Generate a fallback image based on post content or location type
    const getFallbackImage = () => {
      const locationTypeImages = {
        restaurant: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80&auto=format&fit=crop",
        bar: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&q=80&auto=format&fit=crop",
        event: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80&auto=format&fit=crop",
        attraction: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&q=80&auto=format&fit=crop",
        sports: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80&auto=format&fit=crop",
        other: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80&auto=format&fit=crop"
      };
      
      return locationTypeImages[post.location.type as keyof typeof locationTypeImages] || locationTypeImages.other;
    };

    return (
      <div className="relative h-full w-full">
        <img 
          src={getFallbackImage()}
          alt={`${post.location.name} - ${post.location.type}`}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="bg-white/90 rounded-lg p-2 text-center max-w-[80%]">
            <p className="text-xs text-gray-800 line-clamp-3">
              {post.content.slice(0, 100)}{post.content.length > 100 ? '...' : ''}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (media.type === "image") {
    return (
      <img 
        src={media.url}
        alt={`Post by ${post.user.username} at ${post.location.name}`}
        className="h-full w-full object-cover transition-transform group-hover:scale-105"
        onError={() => setImageError(true)}
        loading="lazy"
      />
    );
  }
  
  return (
    <video
      src={media.url}
      className="h-full w-full object-cover"
      poster="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=600&q=80&auto=format&fit=crop"
      onError={() => setImageError(true)}
    />
  );
};

export default PostMedia;
