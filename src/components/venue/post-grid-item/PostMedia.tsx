
import React from "react";
import { Media } from "@/types";

interface PostMediaProps {
  media: Media[];
}

const PostMedia: React.FC<PostMediaProps> = ({ media }) => {
  if (!media || media.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      {media[0].type === "video" ? (
        <video 
          src={media[0].url} 
          className="w-full h-48 object-cover"
          controls={false}
          muted
        />
      ) : (
        <img 
          src={media[0].url} 
          alt="Post media"
          className="w-full h-48 object-cover"
        />
      )}
      {media.length > 1 && (
        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
          +{media.length - 1}
        </div>
      )}
    </div>
  );
};

export default PostMedia;
