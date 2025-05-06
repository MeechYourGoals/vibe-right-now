
import React from 'react';
import { Post, Media } from "@/types";

interface PostMediaProps {
  post: Post;
}

const PostMedia: React.FC<PostMediaProps> = ({ post }) => {
  if (!post.media || post.media.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted">
        <p className="p-2 text-center text-sm">
          {post.content?.slice(0, 100)}{post.content?.length > 100 ? '...' : ''}
        </p>
      </div>
    );
  }

  const media = post.media[0];
  
  if (typeof media === 'object') {
    if (media.type === "image") {
      return (
        <img 
          src={media.url}
          alt={`Post by ${post.user?.username || 'user'}`}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      );
    }
    
    return (
      <video
        src={media.url}
        className="h-full w-full object-cover"
        poster="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      />
    );
  }

  // Handle string media (legacy format)
  return (
    <img 
      src={String(media)}
      alt={`Post by ${post.user?.username || 'user'}`}
      className="h-full w-full object-cover transition-transform group-hover:scale-105"
    />
  );
};

export default PostMedia;
