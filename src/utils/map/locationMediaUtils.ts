
import { Media } from "@/types";

/**
 * Generates a unique ID for media items
 */
export const generateMediaId = (): string => {
  return `media_${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Formats location photos to match the Media type
 */
export const formatLocationPhotos = (photos: any[]): Media[] => {
  if (!photos || !Array.isArray(photos)) return [];
  
  return photos.map(photo => ({
    id: photo.id || generateMediaId(),
    type: "image",
    url: photo.url
  }));
};

/**
 * Creates a default media item when none is available
 */
export const createDefaultMedia = (): Media => {
  return {
    id: generateMediaId(),
    type: "image",
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
  };
};
