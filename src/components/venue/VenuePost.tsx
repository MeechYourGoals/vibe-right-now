
import React from "react";
import { Location, Media } from "@/types";

interface VenuePostProps {
  venue: Location;
  content: string;
  media?: Media[] | string[];
  timestamp: string;
  comments?: number;
  likes?: number;
}

const VenuePost: React.FC<VenuePostProps> = ({
  venue,
  content,
  media,
  timestamp,
  comments = 0,
  likes = 0
}) => {
  // Function to render media based on type
  const renderMedia = () => {
    if (!media || !Array.isArray(media) || media.length === 0) {
      return null;
    }
    
    // Handle string array (URLs)
    if (typeof media[0] === 'string') {
      return <img src={media[0]} alt="Post" className="w-full h-40 object-cover my-2 rounded" />;
    }
    
    // Handle Media objects
    const firstMedia = media[0] as Media;
    return <img src={firstMedia.url} alt="Post" className="w-full h-40 object-cover my-2 rounded" />;
  };

  return (
    <div className="border p-4 rounded-lg">
      <div className="font-semibold">{venue.name}</div>
      <div className="text-sm text-gray-600 mb-2">{timestamp}</div>
      <p>{content}</p>
      {renderMedia()}
      <div className="flex justify-between text-sm text-gray-600">
        <span>{likes} likes</span>
        <span>{comments} comments</span>
      </div>
    </div>
  );
};

export default VenuePost;
