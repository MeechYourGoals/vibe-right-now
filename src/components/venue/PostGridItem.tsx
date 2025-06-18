
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Post } from "@/types";
import PostMedia from "./post-grid-item/PostMedia";
import PostOverlay from "./post-grid-item/PostOverlay";
import UserDropdown from "./post-grid-item/UserDropdown";
import DeleteButton from "./post-grid-item/DeleteButton";
import PostBadges from "./post-grid-item/PostBadges";

interface PostGridItemProps {
  post: Post;
  isVenuePost?: boolean;
  canDelete?: boolean;
  onDelete?: (postId: string) => void;
  onUserProfileClick?: () => void;
  isDetailView?: boolean;
}

const PostGridItem = ({ 
  post, 
  isVenuePost = false, 
  canDelete = false, 
  onDelete,
  onUserProfileClick,
  isDetailView = false
}: PostGridItemProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleUserProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUserProfileClick?.();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(post.id);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return `${Math.floor(diffInMinutes / 1440)}d`;
  };

  const timeAgo = post.timestamp ? formatTimeAgo(post.timestamp) : '';

  return (
    <Card className="relative overflow-hidden aspect-square group cursor-pointer hover:scale-105 transition-transform duration-200">
      {/* Background Media */}
      <PostMedia post={post} />

      {/* Top Badges */}
      <PostBadges post={post} isVenuePost={isVenuePost} />

      {/* Top Right Controls */}
      <div className="absolute top-2 right-2 flex space-x-2">
        {onUserProfileClick && (
          <UserDropdown 
            user={post.author} 
            onProfileClick={handleUserProfileClick}
          />
        )}
        {canDelete && onDelete && (
          <DeleteButton onDelete={handleDelete} />
        )}
      </div>

      {/* Post Overlay - removing isVenuePost prop */}
      <PostOverlay 
        post={post}
      />
    </Card>
  );
};

export default PostGridItem;
