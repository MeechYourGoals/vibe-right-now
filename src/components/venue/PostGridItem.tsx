
import React from "react";
import { Post } from "@/types";
import { Card } from "@/components/ui/card";
import PostMedia from "./post-grid-item/PostMedia";
import PostOverlay from "./post-grid-item/PostOverlay";
import PostBadges from "./post-grid-item/PostBadges";

interface PostGridItemProps {
  post: Post;
  canDelete?: boolean;
  onDelete?: (postId: string) => void;
}

const PostGridItem: React.FC<PostGridItemProps> = ({ 
  post, 
  canDelete = false, 
  onDelete 
}) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(post.id);
    }
  };

  return (
    <Card className="relative overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
      <PostMedia media={post.media} />
      <PostOverlay 
        post={post}
        canDelete={canDelete}
        onDelete={handleDelete}
      />
      <PostBadges post={post} />
    </Card>
  );
};

export default PostGridItem;
