
import React from 'react';
import { Pin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/types";

interface PostBadgesProps {
  post: Post;
  isVenuePost?: boolean;
}

const PostBadges: React.FC<PostBadgesProps> = ({ post, isVenuePost }) => {
  if (!post.isPinned) return null;
  
  return (
    <div className="absolute top-2 right-2 z-10">
      {post.isPinned && (
        <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-300 flex items-center">
          <Pin className="h-3 w-3 mr-1" />
          Pinned
        </Badge>
      )}
    </div>
  );
};

export default PostBadges;
