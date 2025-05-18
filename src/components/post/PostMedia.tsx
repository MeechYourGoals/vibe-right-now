
import React, { useState } from "react";
import { Media } from "@/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PostMediaProps {
  media: Media[];
}

const PostMedia: React.FC<PostMediaProps> = ({ media }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasError, setHasError] = useState<boolean[]>(media.map(() => false));
  const hasMultipleMedia = media.length > 1;
  
  const fallbackImage = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&q=80&auto=format&fit=crop";

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
          <img
            src={currentMedia.url}
            alt="Post media"
            className="w-full object-cover max-h-[500px]"
            onError={() => handleError(currentIndex)}
          />
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
