
import React, { useState, useEffect } from 'react';
import { Post } from "@/types";

interface PostMediaProps {
  post: Post;
}

const PostMedia: React.FC<PostMediaProps> = ({ post }) => {
  const [imageError, setImageError] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [mediaLoaded, setMediaLoaded] = useState(false);
  
  const fallbackImage = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&q=80&auto=format&fit=crop";
  
  // Try loading the next image in the array if one fails
  const tryNextImage = () => {
    if (post.media && post.media.length > currentMediaIndex + 1) {
      setCurrentMediaIndex(prevIndex => prevIndex + 1);
      setImageError(false);
    } else {
      setImageError(true);
    }
  };

  // Reset on post change
  useEffect(() => {
    setImageError(false);
    setCurrentMediaIndex(0);
    setMediaLoaded(false);
  }, [post.id]);
  
  // Handle case with no media
  if (!post.media || post.media.length === 0 || imageError) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted">
        {imageError ? (
          <div className="p-2 text-center">
            <p className="text-sm text-muted-foreground">Media could not be loaded</p>
            <p className="text-xs text-muted-foreground mt-1">{post.content.slice(0, 50)}{post.content.length > 50 ? '...' : ''}</p>
          </div>
        ) : (
          <p className="p-2 text-center text-sm">
            {post.content.slice(0, 100)}{post.content.length > 100 ? '...' : ''}
          </p>
        )}
      </div>
    );
  }

  // Get current media item
  const currentMedia = post.media[currentMediaIndex];

  if (currentMedia.type === "image") {
    // Try to load the image with error handling and fallback
    return (
      <>
        {!mediaLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        )}
        <img 
          src={currentMedia.url}
          alt={`Post by ${post.user.username}`}
          className={`h-full w-full object-cover transition-transform group-hover:scale-105 ${mediaLoaded ? 'opacity-100' : 'opacity-0'}`}
          onError={() => tryNextImage()}
          onLoad={() => setMediaLoaded(true)}
          loading="lazy"
        />
      </>
    );
  }
  
  return (
    <video
      src={currentMedia.url}
      className="h-full w-full object-cover"
      poster={fallbackImage}
      onError={() => tryNextImage()}
      controls={false}
      muted
    />
  );
};

export default PostMedia;
