
import React from "react";
import { Location } from "@/types";

interface PostContentProps {
  content: string;
  location: Location;
}

const PostContent = ({ content, location }: PostContentProps) => {
  return (
    <div className="px-4 pb-4">
      <p className="text-sm mb-2">{content}</p>
      
      {location.address && (
        <p className="text-xs text-muted-foreground">
          📍 {location.address}, {location.city}
        </p>
      )}
    </div>
  );
};

export default PostContent;
