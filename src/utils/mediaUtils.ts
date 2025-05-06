
import { Media, MediaObject } from "@/types";

/**
 * Checks if a media item is a string or an object and returns its type
 */
export const getMediaType = (media: Media): "image" | "video" => {
  if (typeof media === "string") {
    // Determine type based on extension for string media
    const isVideo = media.endsWith('.mp4') || 
                   media.endsWith('.mov') || 
                   media.endsWith('.avi') ||
                   media.endsWith('.webm');
    return isVideo ? "video" : "image";
  }
  
  // It's a MediaObject
  return media.type;
};

/**
 * Gets the URL from a media item regardless of format
 */
export const getMediaUrl = (media: Media): string => {
  if (typeof media === "string") {
    return media;
  }
  
  return media.url;
};

/**
 * Gets the thumbnail URL if available, otherwise returns the media URL
 */
export const getMediaThumbnail = (media: Media): string => {
  if (typeof media === "string") {
    return media;
  }
  
  return media.thumbnail || media.url;
};

/**
 * Safely formats media items to ensure they're in the MediaObject format
 */
export const ensureMediaFormat = (media?: Media[]): MediaObject[] => {
  if (!media || media.length === 0) {
    return [];
  }
  
  return media.map(item => {
    if (typeof item === 'string') {
      // Determine type based on extension
      const isVideo = item.endsWith('.mp4') || 
                     item.endsWith('.mov') || 
                     item.endsWith('.avi') ||
                     item.endsWith('.webm');
      return {
        type: isVideo ? 'video' : 'image',
        url: item
      };
    }
    
    // Already in correct format
    return item;
  });
};

/**
 * Checks if a post has any media
 */
export const hasMedia = (media?: Media[]): boolean => {
  return !!media && media.length > 0;
};
