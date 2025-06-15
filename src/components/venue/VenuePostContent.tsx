
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

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
  // Make sure content is always a string
  const displayContent = content || "";
  const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });

  return (
    <>
      <p className="mb-3">{displayContent}</p>
      <div className="rounded-lg overflow-hidden bg-muted">
        {media.type === "image" ? (
          <ImageWithFallback
            src={media.url}
            alt={`Media content`}
            className="w-full h-auto object-contain max-h-[300px] mx-auto"
          />
        ) : (
          <video
            src={media.url}
            controls
            className="w-full h-auto max-h-[300px]"
            poster="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
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
