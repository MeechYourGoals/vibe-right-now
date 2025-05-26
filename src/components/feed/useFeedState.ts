
import { useState } from "react";
import { Post } from "@/types";

export const useFeedState = (initialPosts: Post[]) => {
  const [posts] = useState<Post[]>(initialPosts);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set(['2']));

  const handleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newLikes = new Set(prev);
      if (newLikes.has(postId)) {
        newLikes.delete(postId);
      } else {
        newLikes.add(postId);
      }
      return newLikes;
    });
  };

  const handleComment = (postId: string, comment: string) => {
    console.log('Adding comment to post:', postId, comment);
  };

  const handleShare = (postId: string) => {
    console.log('Sharing post:', postId);
  };

  return {
    posts,
    likedPosts,
    handleLike,
    handleComment,
    handleShare
  };
};
