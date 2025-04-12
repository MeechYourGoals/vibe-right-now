import { Location, Media } from '@/types';

interface LocationMedia {
  url: string;
  type: 'image' | 'video';
  id: string;
  thumbnail?: string;
}

// Get an appropriate media item for a location
export const getMediaForLocation = (location: Location): LocationMedia => {
  // Default media if no location is provided
  if (!location) {
    return {
      id: 'default',
      type: 'image',
      url: 'https://source.unsplash.com/random/200x200/?city'
    };
  }
  
  // If location has photos, use the first one
  if (location.photos && location.photos.length > 0) {
    return {
      id: `${location.id}-photo-1`,
      type: 'image',
      url: location.photos[0]
    };
  }
  
  // Otherwise, generate a random image based on the location type
  let category = 'place';
  if (location.type) {
    if (location.type.toLowerCase().includes('restaurant') || 
        location.type.toLowerCase().includes('food')) {
      category = 'restaurant';
    } else if (location.type.toLowerCase().includes('bar') || 
               location.type.toLowerCase().includes('club')) {
      category = 'nightlife';
    } else if (location.type.toLowerCase().includes('park') || 
               location.type.toLowerCase().includes('outdoor')) {
      category = 'nature';
    } else if (location.type.toLowerCase().includes('museum') || 
               location.type.toLowerCase().includes('gallery')) {
      category = 'art';
    }
  }
  
  return {
    id: `${location.id}-default`,
    type: 'image',
    url: `https://source.unsplash.com/random/200x200/?${category},${location.city}`
  };
};

export default { getMediaForLocation };
