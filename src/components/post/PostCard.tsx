
import React, { useState } from 'react';
import { Post, Location, Comment } from '@/types';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostMedia from './PostMedia';
import PostFooter from './PostFooter';
import { Card } from '@/components/ui/card';
import { getRandomUser } from '@/mock/users';
import VerifiedBadge from '../user/VerifiedBadge';

interface PostCardProps {
  post?: Post;
  posts?: Post[];
  locationPostCount?: number;
  getComments?: (postId: string) => Comment[];
  comments?: Comment[];
  canDelete?: boolean;
  venue?: Location;
  onPostDeleted?: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  posts,
  locationPostCount,
  getComments = () => [],
  comments: propComments,
  canDelete = false,
  venue,
  onPostDeleted
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [likeCount, setLikeCount] = useState(post?.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(post?.saved || false);

  // If we don't have a post, but we have posts, use the first one
  const currentPost = post || (posts && posts[0]);

  if (!currentPost) return null;
  
  const comments = propComments || getComments(currentPost.id);

  const toggleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const toggleSave = () => {
    setIsSaved(!isSaved);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDelete = () => {
    if (onPostDeleted) {
      onPostDeleted(currentPost.id);
    }
  };

  return (
    <Card className="overflow-hidden border-gray-200 dark:border-gray-800">
      <PostHeader 
        user={currentPost.user} 
        location={currentPost.location} 
        timestamp={currentPost.timestamp} 
        locationPostCount={locationPostCount}
        canDelete={canDelete}
        onDelete={handleDelete}
        venue={venue}
      />
      
      <PostContent 
        content={currentPost.content || currentPost.text || ''} 
        isExpanded={isExpanded} 
        toggleExpanded={toggleExpanded}
      />
      
      {currentPost.media && currentPost.media.length > 0 && (
        <PostMedia media={currentPost.media} />
      )}
      
      <PostFooter 
        likes={likeCount} 
        commentCount={currentPost.comments || (comments ? comments.length : 0)}
        isLiked={isLiked}
        isSaved={isSaved} 
        toggleLike={toggleLike}
        toggleSave={toggleSave}
        comments={comments}
      />
    </Card>
  );
};

export default PostCard;
