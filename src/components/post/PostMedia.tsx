
import React from 'react';
import { Post } from "@/types";

interface PostMediaProps {
  post: Post;
}

const PostMedia: React.FC<PostMediaProps> = ({ post }) => {
  if (!post.media || post.media.length === 0) {
    return null;
  }

  // Handle both string[] and Media[] formats
  const mediaItem = typeof post.media[0] === 'string' 
    ? { url: post.media[0], type: 'image' as const }
    : post.media[0];

  return (
    <div className="aspect-square">
      {mediaItem.type === 'image' ? (
        <img 
          src={mediaItem.url}
          alt="Post content"
          className="w-full h-full object-cover"
        />
      ) : (
        <video 
          src={mediaItem.url}
          className="w-full h-full object-cover"
          controls
        />
      )}
    </div>
  );
};

export default PostMedia;
