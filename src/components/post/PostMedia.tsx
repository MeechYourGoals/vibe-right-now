
import React, { useState } from "react";
import { Media } from "@/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface PostMediaProps {
  media: Media[];
}

const PostMedia: React.FC<PostMediaProps> = ({ media }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasMultipleMedia = media.length > 1;

  const nextMedia = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };

  const prevMedia = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  const currentMedia = media[currentIndex];

  return (
    <div className="relative mb-2">
      {currentMedia.type === "image" ? (
        <ImageWithFallback
          src={currentMedia.url}
          alt="Post media"
          className="w-full object-contain bg-muted rounded-lg max-h-[400px]"
        />
      ) : (
        <video
          src={currentMedia.url}
          controls
          className="w-full max-h-[400px] rounded-lg"
          poster={currentMedia.thumbnail}
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
