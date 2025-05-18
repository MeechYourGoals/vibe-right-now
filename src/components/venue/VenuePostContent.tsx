
import React, { useState } from "react";
import { formatDistanceToNow } from 'date-fns';
import { Media } from '@/types';
import { getMediaForLocation } from "@/utils/map/locationMediaUtils";

interface VenuePostContentProps {
  content: string;
  media?: Media;
  timestamp: string;
  venueType?: string;
  onMediaError?: () => void;
}

const VenuePostContent: React.FC<VenuePostContentProps> = ({
  content,
  media,
  timestamp,
  venueType,
  onMediaError
}) => {
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [mediaError, setMediaError] = useState(false);
  const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  
  // Type-specific fallback images for better relevance
  const getFallbackImage = () => {
    if (!venueType) return "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=600";
    
    const typeMap: Record<string, string> = {
      "restaurant": "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=600",
      "bar": "https://images.pexels.com/photos/34631/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
      "event": "https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=600",
      "attraction": "https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=600",
      "sports": "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=600",
    };
    
    return typeMap[venueType] || "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=600";
  };
  
  const handleMediaError = () => {
    setMediaError(true);
    if (onMediaError) onMediaError();
  };
  
  return (
    <div>
      <p className="whitespace-pre-wrap mb-4">{content}</p>
      
      {media && (
        <div className="relative rounded-md overflow-hidden bg-muted mt-2">
          {!mediaLoaded && !mediaError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          )}
          
          {media.type === 'image' ? (
            mediaError ? (
              <img
                src={getFallbackImage()}
                alt="Venue content"
                className="w-full object-cover rounded"
                style={{ maxHeight: '300px' }}
                onLoad={() => setMediaLoaded(true)}
                onError={(e) => {
                  // Ultimate fallback if even the type-specific fallback fails
                  (e.target as HTMLImageElement).src = "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=600";
                }}
              />
            ) : (
              <img
                src={media.url}
                alt="Venue content"
                className={`w-full object-cover rounded ${mediaLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ maxHeight: '300px' }}
                onLoad={() => setMediaLoaded(true)}
                onError={handleMediaError}
              />
            )
          ) : (
            <video
              src={media.url}
              controls
              className="w-full"
              style={{ maxHeight: '300px' }}
              poster={getFallbackImage()}
              onError={handleMediaError}
            />
          )}
        </div>
      )}
      
      <div className="text-xs text-muted-foreground mt-2">{timeAgo}</div>
    </div>
  );
};

export default VenuePostContent;
