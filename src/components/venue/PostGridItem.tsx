
import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Post } from "@/types";
import { deletePost } from "@/utils/venue/postManagementUtils";
import { 
  PostBadges,
  DeleteButton,
  PostMedia,
  PostOverlay
} from './post-grid-item';
import UserDropdown from './post-grid-item/UserDropdown';

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

  // Generate a semi-random user count based on post ID
  const getUserCount = () => {
    const seed = post.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return Math.floor((seed % 100) + 10);
  };

  return (
    <Link 
      to={`/post/${post.id}`} 
      className={`group relative block aspect-square overflow-hidden rounded-lg ${
        isVenuePost ? 'ring-2 ring-amber-500' : ''
      } ${post.isPinned && !isVenuePost ? 'ring-2 ring-amber-300' : ''}`}
    >
      <PostMedia post={post} />
      
      {/* Show pinned badge if applicable */}
      {post.isPinned && (
        <PostBadges post={post} isVenuePost={isVenuePost} />
      )}
      
      {/* Show delete button if applicable */}
      {canDelete && !isVenuePost && (
        <DeleteButton onDelete={handleDeletePost} />
      )}
      
      {/* Add user count dropdown */}
      <div className="absolute top-2 right-2 z-10">
        <UserDropdown userCount={getUserCount()} post={post} />
      </div>
      
      <PostOverlay
        post={post}
        isVenuePost={isVenuePost}
        timeAgo={timeAgo}
        isDetailView={isDetailView}
        onUserProfileClick={navigateToUserProfile}
        onLike={handleLike}
      />
    </Link>
  );
};

export default PostGridItem;
