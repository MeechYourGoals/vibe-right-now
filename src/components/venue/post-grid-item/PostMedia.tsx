
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

  const firstMedia = post.media[0];
  const isMediaObject = typeof firstMedia === 'object' && firstMedia !== null;
  const mediaType = isMediaObject ? firstMedia.type : 'image';
  const mediaUrl = isMediaObject ? firstMedia.url : (firstMedia as unknown as string);

  if (mediaType === "image") {
    return (
      <ImageWithFallback
        src={mediaUrl}
        alt={`Post by ${post.user.username}`}
        className="h-full w-full object-cover transition-transform group-hover:scale-105"
      />
    );
  }
  
  return (
    <video
      src={mediaUrl}
      className="h-full w-full object-cover"
      poster="https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=500&q=80&auto=format&fit=crop"
    />
  );
};

export default PostMedia;
