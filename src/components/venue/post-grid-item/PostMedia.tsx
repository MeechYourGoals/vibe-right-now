
import React from "react";
import { Media } from "@/types";

interface PostMediaProps {
  media: Media[];
  className?: string;
}

const PostMedia: React.FC<PostMediaProps> = ({ media, className = "" }) => {
  if (!media || media.length === 0) {
    return null;
  }

  // Helper function to ensure media is in the correct format
  const ensureMediaFormat = (mediaItem: any): Media => {
    if (typeof mediaItem === 'string') {
      // Determine type based on extension
      const isVideo = mediaItem.endsWith('.mp4') || mediaItem.endsWith('.mov') || mediaItem.endsWith('.avi');
      return {
        type: isVideo ? 'video' : 'image',
        url: mediaItem
      };
    } else if (typeof mediaItem === 'object' && mediaItem !== null && 'type' in mediaItem && 'url' in mediaItem) {
      // Already in correct format
      return mediaItem as Media;
    }
    
    // Default fallback
    return {
      type: 'image',
      url: 'https://via.placeholder.com/500'
    };
  };

  const firstMedia = ensureMediaFormat(media[0]);

  return (
    <div className={`relative ${className}`}>
      {firstMedia.type === "image" ? (
        <img 
          src={firstMedia.url}
          alt="Post media"
          className="w-full h-full object-cover"
        />
      ) : (
        <video
          src={firstMedia.url}
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        />
      )}
      
      {media.length > 1 && (
        <div className="absolute top-2 right-2 bg-black/60 rounded-full px-2 py-1 text-white text-xs">
          +{media.length - 1}
        </div>
      )}
    </div>
  );
};

export default PostMedia;
