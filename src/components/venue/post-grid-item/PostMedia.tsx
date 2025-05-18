
import React, { useState } from 'react';
import { Post } from "@/types";

interface PostMediaProps {
  post: Post;
}

const PostMedia: React.FC<PostMediaProps> = ({ post }) => {
  const [imageError, setImageError] = useState(false);
  const fallbackImage = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80&auto=format&fit=crop";
  
  if (!post.media || post.media.length === 0 || imageError) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted">
        {imageError ? (
          <p className="p-2 text-center text-sm text-muted-foreground">Image could not be loaded</p>
        ) : (
          <p className="p-2 text-center text-sm">
            {post.content.slice(0, 100)}{post.content.length > 100 ? '...' : ''}
          </p>
        )}
      </div>
    );
  }

  if (post.media[0].type === "image") {
    return (
      <img 
        src={post.media[0].url}
        alt={`Post by ${post.user.username}`}
        className="h-full w-full object-cover transition-transform group-hover:scale-105"
        onError={() => setImageError(true)}
        loading="lazy"
      />
    );
  }
  
  return (
    <video
      src={post.media[0].url}
      className="h-full w-full object-cover"
      poster="https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=500&q=80&auto=format&fit=crop"
      onError={() => setImageError(true)}
    />
  );
};

export default PostMedia;
