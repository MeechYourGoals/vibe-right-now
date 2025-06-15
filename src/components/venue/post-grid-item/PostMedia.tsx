
import React, { useState } from 'react';
import { Post } from "@/types";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface PostMediaProps {
  post: Post;
}

const PostMedia: React.FC<PostMediaProps> = ({ post }) => {
  if (!post.media || post.media.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted">
        <p className="p-2 text-center text-sm">
          {post.content.slice(0, 100)}{post.content.length > 100 ? '...' : ''}
        </p>
      </div>
    );
  }

  if (post.media[0].type === "image") {
    return (
      <ImageWithFallback
        src={post.media[0].url}
        alt={`Post by ${post.user.username}`}
        className="h-full w-full object-contain bg-muted transition-transform group-hover:scale-105"
      />
    );
  }
  
  return (
    <video
      src={post.media[0].url}
      className="h-full w-full object-contain bg-muted"
      poster="https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=500&q=80&auto=format&fit=crop"
    />
  );
};

export default PostMedia;
