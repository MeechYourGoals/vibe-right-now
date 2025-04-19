
import React, { useState } from "react";
import { Media } from "@/types";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Play } from "lucide-react";

interface PostMediaProps {
  media: Media[];
  aspectRatio?: number;
}

const PostMedia: React.FC<PostMediaProps> = ({ 
  media, 
  aspectRatio = 4/3 
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  if (!media || media.length === 0) {
    return null;
  }
  
  const activeMedia = media[activeIndex];
  
  const handlePlayVideo = () => {
    setIsPlaying(true);
    // Find the video element and play it
    const videoElement = document.getElementById(`video-${activeIndex}`) as HTMLVideoElement;
    if (videoElement) {
      videoElement.play();
    }
  };
  
  const renderMedia = () => {
    if (!activeMedia) return null;
    
    if (activeMedia.type === "video") {
      const thumbnailUrl = activeMedia.thumbnail || activeMedia.url;
      
      return (
        <div className="relative overflow-hidden w-full h-full">
          {!isPlaying ? (
            <>
              <img 
                src={thumbnailUrl} 
                alt="Video thumbnail" 
                className="object-cover w-full h-full"
              />
              <button 
                className="absolute inset-0 flex items-center justify-center bg-black/30"
                onClick={handlePlayVideo}
              >
                <Play className="h-12 w-12 text-white" />
              </button>
            </>
          ) : (
            <video
              id={`video-${activeIndex}`}
              src={activeMedia.url}
              controls
              className="w-full h-full object-contain"
              onEnded={() => setIsPlaying(false)}
            />
          )}
        </div>
      );
    }
    
    return (
      <img 
        src={activeMedia.url} 
        alt="Post image" 
        className="object-cover w-full h-full"
      />
    );
  };
  
  return (
    <AspectRatio ratio={aspectRatio} className="overflow-hidden bg-muted">
      {renderMedia()}
      
      {media.length > 1 && (
        <div className="absolute bottom-2 w-full flex justify-center">
          <div className="flex gap-1 px-2 py-1 bg-black/40 rounded-full">
            {media.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === activeIndex ? 'bg-white' : 'bg-white/40'
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      )}
    </AspectRatio>
  );
};

export default PostMedia;
