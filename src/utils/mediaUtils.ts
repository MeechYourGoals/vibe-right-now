
import { Media } from "@/types";

// Check if the post has media content
export const hasMedia = (media: any): boolean => {
  return Array.isArray(media) && media.length > 0 && media[0] !== null && media[0] !== undefined;
};

// Determine media type (image or video)
export const getMediaType = (media: Media | string): 'image' | 'video' => {
  if (typeof media === 'string') {
    const url = media.toLowerCase();
    return url.endsWith('.mp4') || url.endsWith('.mov') || url.endsWith('.avi') || url.endsWith('.webm') 
      ? 'video' 
      : 'image';
  }
  
  if (typeof media === 'object' && media !== null && 'type' in media) {
    return media.type as 'image' | 'video';
  }
  
  // Default to image if unable to determine
  return 'image';
};

// Get the URL of the media
export const getMediaUrl = (media: Media | string): string => {
  if (typeof media === 'string') {
    return media;
  }
  
  if (typeof media === 'object' && media !== null && 'url' in media) {
    return media.url;
  }
  
  return 'https://via.placeholder.com/500';
};

// Ensure media is in the correct format
export const ensureMediaFormat = (media: any): Media[] => {
  if (!media || !Array.isArray(media)) {
    return [];
  }
  
  return media.map(item => {
    // If item is already a Media object
    if (typeof item === 'object' && item !== null && 'url' in item) {
      return {
        type: item.type || 'image',
        url: item.url,
        thumbnail: item.thumbnail || undefined
      };
    }
    
    // If item is a string
    if (typeof item === 'string') {
      const url = item.toLowerCase();
      const isVideo = url.endsWith('.mp4') || url.endsWith('.mov') || url.endsWith('.avi') || url.endsWith('.webm');
      
      return {
        type: isVideo ? 'video' : 'image',
        url: item
      };
    }
    
    // Default placeholder
    return {
      type: 'image',
      url: 'https://via.placeholder.com/500'
    };
  });
};
