
import { useState } from "react";
import { Play } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Media } from "@/types"; // Add proper import for Media type

interface PostMediaProps {
  media: Media | Media[];
  aspectRatio?: number;
  showControls?: boolean;
}

export function PostMedia({ 
  media,
  aspectRatio = 16 / 9, 
  showControls = false
}: PostMediaProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Handle array or single media item
  const mediaItem: Media = Array.isArray(media) ? media[0] : media;
  
  return (
    <AspectRatio ratio={aspectRatio} className="overflow-hidden rounded-md bg-muted">
      {mediaItem.type === "image" ? (
        <img 
          src={mediaItem.url}
          alt="Post media" 
          className="object-cover w-full h-full"
          loading="lazy"
        />
      ) : (
        <div className="relative w-full h-full">
          <video
            src={mediaItem.url}
            poster={mediaItem.thumbnail}
            controls={showControls || isPlaying}
            className="object-cover w-full h-full"
            onClick={() => setIsPlaying(true)}
          />
          {!isPlaying && !showControls && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button 
                className="bg-black/50 rounded-full p-2 text-white"
                onClick={() => setIsPlaying(true)}
              >
                <Play className="w-8 h-8" />
              </button>
            </div>
          )}
        </div>
      )}
    </AspectRatio>
  );
}
