
import { Location, Media } from "@/types";

// Get media for a location with improved fallback system
export const getMediaForLocation = (location: Location): Media => {
  // Enhanced image mapping with more specific venue images
  const imageMap: Record<string, string> = {
    // Sports venues - more specific images
    "30": "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=600&q=80&auto=format&fit=crop",  // Lakers - basketball
    "31": "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=600&q=80&auto=format&fit=crop",  // Rams - football
    "32": "https://images.unsplash.com/photo-1566577134624-d9b13555e288?w=600&q=80&auto=format&fit=crop",  // Dodgers - baseball
    "33": "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&q=80&auto=format&fit=crop",  // LA Galaxy - soccer
    "34": "https://images.unsplash.com/photo-1530915872-13619796d013?w=600&q=80&auto=format&fit=crop",    // Volleyball
    "35": "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80&auto=format&fit=crop",  // Golf
    
    // Popular venues
    "1": "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&q=80&auto=format&fit=crop",   // Sunset Lounge
    "2": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80&auto=format&fit=crop",   // Coffee house
    "3": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80&auto=format&fit=crop",   // Music festival
    "4": "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&q=80&auto=format&fit=crop",   // Art museum
    "5": "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=600&q=80&auto=format&fit=crop",   // Rooftop bar
  };

  // Enhanced type-based defaults with more variety
  const typeDefaultMedia: Record<string, string> = {
    "restaurant": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80&auto=format&fit=crop",
    "bar": "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&q=80&auto=format&fit=crop",
    "event": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80&auto=format&fit=crop",
    "attraction": "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&q=80&auto=format&fit=crop",
    "sports": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80&auto=format&fit=crop",
    "other": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80&auto=format&fit=crop",
  };

  // Fallback image that's guaranteed to work
  const fallbackImage = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80&auto=format&fit=crop";

  // Get the appropriate image URL
  const imageUrl = imageMap[location.id] || 
                  typeDefaultMedia[location.type as string] || 
                  fallbackImage;

  return {
    type: "image" as const,
    url: imageUrl
  };
};
