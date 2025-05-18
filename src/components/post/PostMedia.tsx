
import React, { useState, useEffect } from "react";
import { Media } from "@/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PostMediaProps {
  media: Media[];
}

const PostMedia: React.FC<PostMediaProps> = ({ media }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasError, setHasError] = useState<boolean[]>(media.map(() => false));
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const hasMultipleMedia = media.length > 1;
  
  const fallbackImage = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&q=80&auto=format&fit=crop";

  useEffect(() => {
    // Reset media loaded state when media changes or index changes
    setMediaLoaded(false);
  }, [media, currentIndex]);

  const nextMedia = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };

  const prevMedia = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  const handleError = (index: number) => {
    const newErrors = [...hasError];
    newErrors[index] = true;
    setHasError(newErrors);

    // If we have multiple media, try to show the next non-errored media
    if (hasMultipleMedia) {
      // Find the next valid media index
      let nextValidIndex = -1;
      for (let i = 1; i < media.length; i++) {
        const checkIndex = (index + i) % media.length;
        if (!newErrors[checkIndex]) {
          nextValidIndex = checkIndex;
          break;
        }
      }
      
      // If found a valid media, switch to it
      if (nextValidIndex !== -1) {
        setCurrentIndex(nextValidIndex);
      }
    }
  };

  const currentMedia = media[currentIndex];
  const currentHasError = hasError[currentIndex];

  return (
    <div className="relative mb-2">
      {currentMedia.type === "image" ? (
        currentHasError ? (
          <div className="w-full bg-muted flex items-center justify-center h-[300px]">
            <p className="text-muted-foreground">Image could not be loaded</p>
          </div>
        ) : (
          <>
            {!mediaLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              </div>
            )}
            <img
              src={currentMedia.url}
              alt="Post media"
              className={`w-full object-cover max-h-[500px] ${mediaLoaded ? 'opacity-100' : 'opacity-0'}`}
              onError={() => handleError(currentIndex)}
              onLoad={() => setMediaLoaded(true)}
              loading="lazy"
            />
          </>
        )
      ) : (
        <video
          src={currentMedia.url}
          controls
          className="w-full max-h-[500px]"
          poster={currentMedia.thumbnail || fallbackImage}
          onError={() => handleError(currentIndex)}
        />
      )}

      {hasMultipleMedia && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 text-white hover:bg-black/40 rounded-full h-8 w-8"
            onClick={prevMedia}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 text-white hover:bg-black/40 rounded-full h-8 w-8"
            onClick={nextMedia}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {media.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full ${
                  index === currentIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PostMedia;
