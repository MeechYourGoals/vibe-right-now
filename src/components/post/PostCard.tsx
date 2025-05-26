
import React from 'react';
import { Post, Comment, Location } from "@/types";
import { Card } from "@/components/ui/card";
import PostHeader from "@/components/post/PostHeader";
import PostMedia from "@/components/post/PostMedia";
import PostFooter from "@/components/post/PostFooter";

interface PostCardProps {
  post: Post;
  comments: Comment[];
  canDelete?: boolean;
  venue?: Location;
  onPostDeleted?: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  comments, 
  canDelete = false, 
  venue,
  onPostDeleted 
}) => {
  return (
    <Card className="overflow-hidden">
      <PostHeader 
        post={post} 
        canDelete={canDelete}
        venue={venue}
        onPostDeleted={onPostDeleted}
      />
      <PostMedia post={post} />
      <PostFooter 
        post={post} 
        comments={comments}
      />
    </Card>
  );
};

export default PostCard;
