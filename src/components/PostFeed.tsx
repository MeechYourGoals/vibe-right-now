
import React from "react";
import PostCard from "./feed/PostCard";
import FeedContainer from "./feed/FeedContainer";
import { useFeedState } from "./feed/useFeedState";
import { mockPosts } from "./feed/mockData";

const PostFeed = () => {
  const { posts, likedPosts, handleLike, handleComment, handleShare } = useFeedState(mockPosts);

  return (
    <FeedContainer>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          isLiked={likedPosts.has(post.id)}
          onLike={handleLike}
          onComment={handleComment}
          onShare={handleShare}
        />
      ))}
    </FeedContainer>
  );
};

export default PostFeed;
