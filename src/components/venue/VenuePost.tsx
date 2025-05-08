
import React from "react";
import { Location, Media } from "@/types";

interface VenuePostProps {
  venue: Location;
  content: string;
  media: Media | string[];
  timestamp: string;
  comments: number;
  likes: number;
}

const VenuePost: React.FC<VenuePostProps> = ({
  venue,
  content,
  media,
  timestamp,
  comments,
  likes
}) => {
  return (
    <div className="border p-4 rounded-lg">
      <div className="font-semibold">{venue.name}</div>
      <div className="text-sm text-gray-600 mb-2">{timestamp}</div>
      <p>{content}</p>
      {media && media.length > 0 && typeof media[0] === 'string' && (
        <img src={media[0]} alt="Post" className="w-full h-40 object-cover my-2 rounded" />
      )}
      {media && media.length > 0 && typeof media[0] !== 'string' && (
        <img src={media[0].url} alt="Post" className="w-full h-40 object-cover my-2 rounded" />
      )}
      <div className="flex justify-between text-sm text-gray-600">
        <span>{likes} likes</span>
        <span>{comments} comments</span>
      </div>
    </div>
  );
};

export default VenuePost;
