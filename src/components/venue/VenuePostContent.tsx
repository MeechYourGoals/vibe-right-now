
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface VenuePostContentProps {
  content: string;
  media: {
    type: "image" | "video";
    url: string;
  };
  timestamp: string;
  venueType: string;
}

const VenuePostContent: React.FC<VenuePostContentProps> = ({ 
  content, 
  media, 
  timestamp, 
  venueType 
}) => {
  const [imageError, setImageError] = useState(false);
  const displayContent = content || "";
  const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });

  const getFallbackImage = () => {
    const typeImages = {
      restaurant: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80&auto=format&fit=crop",
      bar: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&q=80&auto=format&fit=crop",
      event: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80&auto=format&fit=crop",
      attraction: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&q=80&auto=format&fit=crop",
      sports: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80&auto=format&fit=crop",
      other: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80&auto=format&fit=crop"
    };
    
    return typeImages[venueType as keyof typeof typeImages] || typeImages.other;
  };

  return (
    <>
      <p className="mb-3">{displayContent}</p>
      <div className="rounded-lg overflow-hidden">
        {media.type === "image" ? (
          <img
            src={imageError ? getFallbackImage() : media.url}
            alt="Media content"
            className="w-full h-auto object-cover"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <video
            src={media.url}
            controls
            className="w-full h-auto"
            poster={getFallbackImage()}
            onError={() => setImageError(true)}
          />
        )}
      </div>
      <div className="flex items-center gap-2 mt-3">
        <Badge className="bg-secondary/20">Promoted</Badge>
        <Badge variant="outline" className="bg-muted">
          {venueType}
        </Badge>
        <span className="text-xs text-muted-foreground ml-auto">{timeAgo}</span>
      </div>
    </>
  );
};

export default VenuePostContent;
