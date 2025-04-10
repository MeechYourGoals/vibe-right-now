
import React, { useState } from "react";
import { Post, Comment, Location } from "@/types";
import { Card } from "@/components/ui/card";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostMedia from "./PostMedia";
import PostFooter from "./PostFooter";
import { deletePost, canDeleteUserPosts } from "@/utils/venue/postManagementUtils";

interface PostCardProps {
  post: Post;
  comments: Comment[];
  isDetailView?: boolean;
  canDelete?: boolean;
  venue?: Location;
  onPostDeleted?: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  comments, 
  isDetailView = false,
  canDelete = false,
  venue,
  onPostDeleted
}) => {
  const [isDeleted, setIsDeleted] = useState(false);

  // Don't render if the post has been deleted
  if (isDeleted) {
    return null;
  }

  const handleDelete = () => {
    if (venue && deletePost(post.id, venue)) {
      setIsDeleted(true);
      if (onPostDeleted) {
        onPostDeleted(post.id);
      }
    }
  };

  const isVenuePost = post.isVenuePost || post.location?.id === venue?.id;

  return (
    <Card className="overflow-hidden">
      <PostHeader 
        user={post.user} 
        timestamp={post.timestamp} 
        location={post.location}
        isPinned={post.isPinned}
        isVenuePost={isVenuePost}
        canDelete={canDelete && !isVenuePost}
        onDelete={handleDelete}
      />
      
      <PostContent content={post.content} />
      
      {post.media && post.media.length > 0 && (
        <PostMedia media={post.media} />
      )}
      
      <PostFooter 
        post={post} 
        comments={comments} 
        isDetailView={isDetailView} 
      />
    </Card>
  );
};

export default PostCard;
