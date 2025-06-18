
import React from "react";
import { Media } from "@/types";
import { Play } from "lucide-react";

interface PostMediaProps {
  media: Media[];
}

const PostMedia: React.FC<PostMediaProps> = ({ media }) => {
  if (!media || media.length === 0) return null;

  return (
    <div className="px-4 pb-4">
      {media.length === 1 ? (
        <div className="relative">
          {media[0].type === 'video' ? (
            <div className="relative">
              <img 
                src={media[0].thumbnail || media[0].url} 
                alt="Video thumbnail"
                className="w-full rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/50 rounded-full p-3">
                  <Play className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          ) : (
            <img 
              src={media[0].url} 
              alt="Post media"
              className="w-full rounded-lg"
            />
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {media.map((item, index) => (
            <div key={index} className="relative">
              {item.type === 'video' ? (
                <div className="relative">
                  <img 
                    src={item.thumbnail || item.url} 
                    alt="Video thumbnail"
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/50 rounded-full p-2">
                      <Play className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              ) : (
                <img 
                  src={item.url} 
                  alt={`Post media ${index + 1}`}
                  className="w-full aspect-square object-cover rounded-lg"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostMedia;
