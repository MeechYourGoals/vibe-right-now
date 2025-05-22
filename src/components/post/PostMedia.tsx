
import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Media } from '@/types';

interface PostMediaProps {
  media: Media | Media[];
}

const PostMedia: React.FC<PostMediaProps> = ({ media }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Convert to array if single media item
  const mediaArray = Array.isArray(media) ? media : [media];
  const mediaItem = mediaArray[activeIndex];
  
  if (!mediaItem) return null;

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="relative">
      <AspectRatio ratio={16 / 9} className="bg-muted overflow-hidden">
        {mediaItem.type === 'image' ? (
          <img 
            src={mediaItem.url} 
            alt="Post media" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="relative w-full h-full">
            <video 
              src={mediaItem.url}
              poster={mediaItem.thumbnail}
              controls={isPlaying}
              className="w-full h-full object-cover"
              onClick={handlePlay}
            />
            {!isPlaying && (
              <button 
                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
                onClick={handlePlay}
              >
                <Play className="w-12 h-12 text-white" />
              </button>
            )}
          </div>
        )}
      </AspectRatio>
      
      {/* Multiple media navigation */}
      {mediaArray.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
          {mediaArray.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${index === activeIndex ? 'bg-white' : 'bg-white/50'}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostMedia;
