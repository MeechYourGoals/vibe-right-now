
import React from "react";
import { Card } from "@/components/ui/card";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostMedia from "./PostMedia";
import PostFooter from "./PostFooter";
import { Post } from "@/types";

interface PostCardProps {
  post: Post;
  isDetailView?: boolean;
  onUserClick?: (userId: string) => void;
  onLocationClick?: (locationId: string) => void;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onSave?: () => void;
}

const PostCard = ({ 
  post, 
  isDetailView = false,
  onUserClick,
  onLocationClick,
  onLike,
  onComment,
  onShare,
  onSave
}: PostCardProps) => {
  return (
    <Card className="overflow-hidden">
      <PostHeader 
        user={post.user}
        location={post.location}
        timestamp={post.timestamp}
        onUserClick={onUserClick}
        onLocationClick={onLocationClick}
      />
      
      <PostContent 
        content={post.content}
        location={post.location}
      />
      
      {post.media && post.media.length > 0 && (
        <PostMedia media={post.media} />
      )}
      
      <PostFooter 
        post={post}
        isDetailView={isDetailView}
        onLike={onLike}
        onComment={onComment}
        onShare={onShare}
        onSave={onSave}
      />
    </Card>
  );
};

export default PostCard;
