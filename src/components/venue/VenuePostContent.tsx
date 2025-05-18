
import React, { useState } from "react";
import { formatDistanceToNow } from 'date-fns';
import { Media } from '@/types';

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
  const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  
  // Fallback image
  const fallbackImage = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&q=80&auto=format&fit=crop";
  
  return (
    <div>
      <p className="whitespace-pre-wrap mb-4">{content}</p>
      
      {media && (
        <div className="relative rounded-md overflow-hidden bg-muted mt-2">
          {!mediaLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          )}
          
          {media.type === 'image' ? (
            <img
              src={media.url}
              alt="Venue content"
              className={`w-full object-cover rounded ${mediaLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{ maxHeight: '300px' }}
              onLoad={() => setMediaLoaded(true)}
              onError={() => {
                if (onMediaError) onMediaError();
              }}
            />
          ) : (
            <video
              src={media.url}
              controls
              className="w-full"
              style={{ maxHeight: '300px' }}
              poster={fallbackImage}
              onError={() => {
                if (onMediaError) onMediaError();
              }}
            />
          )}
        </div>
      )}
      
      <div className="text-xs text-muted-foreground mt-2">{timeAgo}</div>
    </div>
  );
};

export default VenuePostContent;
