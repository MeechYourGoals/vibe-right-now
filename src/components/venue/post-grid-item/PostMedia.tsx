
import React, { useState } from 'react';
import { Post } from "@/types";

interface PostMediaProps {
  post: Post;
}

const PostMedia: React.FC<PostMediaProps> = ({ post }) => {
  const [imageError, setImageError] = useState(false);
  const fallbackImage = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&q=80&auto=format&fit=crop";
  
  if (!post.media || post.media.length === 0 || imageError) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted">
        {imageError ? (
          <p className="p-2 text-center text-sm text-muted-foreground">Media could not be loaded</p>
        ) : (
          <p className="p-2 text-center text-sm">
            {post.content.slice(0, 100)}{post.content.length > 100 ? '...' : ''}
          </p>
        )}
      </div>
    );
  }

  if (post.media[0].type === "image") {
    // Try to load the image with error handling and fallback
    return (
      <img 
        src={post.media[0].url}
        alt={`Post by ${post.user.username}`}
        className="h-full w-full object-cover transition-transform group-hover:scale-105"
        onError={() => setImageError(true)}
        loading="lazy"
      />
    );
  }
  
  return (
    <video
      src={post.media[0].url}
      className="h-full w-full object-cover"
      poster={fallbackImage}
      onError={() => setImageError(true)}
    />
  );
};

export default PostMedia;
