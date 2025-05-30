
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share } from "lucide-react";
import { Post, Comment } from "@/types";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostMedia from "./PostMedia";
import CommentList from "../CommentList";

export interface PostCardProps {
  post: Post;
  onComment: (postId: string, comment: string) => void;
  onLike: (postId: string) => void;
  onShare: (postId: string) => void;
}

const PostCard = ({ post, onComment, onLike, onShare }: PostCardProps) => {
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(post.id);
  };

  const handleComment = (comment: string) => {
    onComment(post.id, comment);
  };

  const handleShare = () => {
    onShare(post.id);
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardContent className="p-4 space-y-3">
        <PostHeader 
          user={post.user}
          timestamp={post.timestamp}
          location={post.location}
        />
        
        <PostContent content={post.content} />
        
        {post.media && post.media.length > 0 && (
          <PostMedia media={post.media} />
        )}
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLike}
              className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : ''}`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{post.likes + (isLiked ? 1 : 0)}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-1"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{post.comments.length}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleShare}
              className="flex items-center space-x-1"
            >
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {showComments && (
          <CommentList 
            postId={post.id}
            commentsCount={post.comments.length}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;
