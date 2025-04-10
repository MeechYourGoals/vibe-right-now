
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Post } from "@/types";
import { deletePost } from "@/utils/venue/postManagementUtils";
import { 
  PostBadges,
  DeleteButton,
  PostMedia,
  PostOverlay
} from './post-grid-item';

interface PostGridItemProps {
  post: Post;
  isVenuePost?: boolean;
  timeAgo?: string;
  isDetailView?: boolean;
  canDelete?: boolean;
  venue?: { id: string; name: string };
  onPostDeleted?: (postId: string) => void;
}

const PostGridItem: React.FC<PostGridItemProps> = ({ 
  post, 
  isVenuePost = false, 
  timeAgo,
  isDetailView = false,
  canDelete = false,
  venue,
  onPostDeleted
}) => {
  const navigate = useNavigate();
  
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    // Like functionality is handled in the PostOverlay component
  };
  
  const navigateToUserProfile = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/user/${post.user.username}`);
  };

  const handleDeletePost = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (venue && deletePost(post.id, venue)) {
      if (onPostDeleted) {
        onPostDeleted(post.id);
      }
    }
  };

  return (
    <Link 
      to={`/post/${post.id}`} 
      className={`group relative block aspect-square overflow-hidden rounded-lg ${
        isVenuePost ? 'ring-2 ring-amber-500' : ''
      }`}
    >
      <PostMedia post={post} />
      
      {/* Show pinned badge if applicable, but not venue badge */}
      {post.isPinned && (
        <PostBadges post={post} isVenuePost={false} />
      )}
      
      {/* Show delete button if applicable */}
      {canDelete && !isVenuePost && (
        <DeleteButton onDelete={handleDeletePost} />
      )}
      
      <PostOverlay
        post={post}
        isVenuePost={false} // Don't show venue badge in overlay
        timeAgo={timeAgo}
        isDetailView={isDetailView}
        onUserProfileClick={navigateToUserProfile}
        onLike={handleLike}
      />
    </Link>
  );
};

export default PostGridItem;
