import React, { useState, useEffect } from 'react';
import { Post } from "@/types";
import { getMediaForLocation } from "@/utils/map/locationMediaUtils";

interface PostMediaProps {
  post: Post;
}

const PostMedia: React.FC<PostMediaProps> = ({ post }) => {
  const [imageError, setImageError] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [mediaLoaded, setMediaLoaded] = useState(false);
  
  // Helper functions to safely handle media items
  const getMediaUrl = (media: string | Media): string => {
    if (typeof media === 'string') {
      return media;
    }
    return media.url;
  };

  const getMediaType = (media: string | Media): 'image' | 'video' => {
    if (typeof media === 'string') {
      // Infer type from URL
      return media.endsWith('.mp4') || media.endsWith('.mov') ? 'video' : 'image';
    }
    return media.type;
  };

  // Use type-specific fallback images for better relevance
  const getFallbackImage = () => {
    if (!post.location) {
      return "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=600";
    }
    
    // Use the venue's image as a fallback
    const venueMedia = getMediaForLocation(post.location);
    return venueMedia.url;
  };
  
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
  
  // Generate a preview text for fallback display
  const getPreviewText = () => {
    if (post.content) {
      return post.content.slice(0, 100) + (post.content.length > 100 ? '...' : '');
    }
    return post.location?.name || "Post content";
  };
  
  // Handle case with no media
  if (!post.media || post.media.length === 0 || imageError) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted">
        {imageError ? (
          <div className="p-2 text-center">
            <img 
              src={getFallbackImage()}
              alt="Venue related content"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Final fallback if even the venue image fails
                (e.target as HTMLImageElement).src = "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=600";
              }}
            />
          </div>
        ) : (
          <p className="p-2 text-center text-sm">
            {getPreviewText()}
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
          src={getMediaUrl(currentMedia)}
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
      src={getMediaUrl(currentMedia)}
      className="h-full w-full object-cover"
      poster={getFallbackImage()}
      onError={() => tryNextImage()}
      controls={false}
      muted
    />
  );
};

export default PostMedia;
