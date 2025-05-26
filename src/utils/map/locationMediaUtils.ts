
import { Location, Media } from "@/types";

export const getMediaForLocation = (location: Location): Media => {
  // Return a default image based on location type
  const defaultImages = {
    restaurant: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
    bar: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80",
    event: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80",
    attraction: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    sports: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80",
    nightlife: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=600&q=80",
    other: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"
  };

  return {
    type: "image",
    url: defaultImages[location.type] || defaultImages.other
  };
};
