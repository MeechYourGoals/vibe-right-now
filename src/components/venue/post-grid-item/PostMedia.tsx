
import React from 'react';
import { Post } from "@/types";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

// Enforce 4:5 aspect ratio for all post media
const ASPECT_RATIO = "aspect-[4/5]";

interface PostMediaProps {
  post: Post;
}

const PostMedia: React.FC<PostMediaProps> = ({ post }) => {
  if (!post.media || post.media.length === 0) {
    return (
      <div className={`flex h-full w-full items-center justify-center bg-muted ${ASPECT_RATIO}`}>
        <p className="p-2 text-center text-sm">
          {post.content.slice(0, 100)}{post.content.length > 100 ? '...' : ''}
        </p>
      </div>
    );
  }

  if (post.media[0].type === "image") {
    return (
      <div className={`w-full h-full ${ASPECT_RATIO}`}>
        <ImageWithFallback
          src={post.media[0].url}
          alt={`Post by ${post.user.username}`}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
    );
  }
  
  return (
    <div className={`w-full h-full ${ASPECT_RATIO}`}>
      <video
        src={post.media[0].url}
        className="w-full h-full object-cover"
        poster="https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=500&q=80&auto=format&fit=crop"
      />
    </div>
  );
};

export default PostMedia;
