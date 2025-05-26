
import { Post, User } from "@/types";

// Default fallback user for posts without valid user data
const createFallbackUser = (postId: string): User => ({
  id: `user-${postId}`,
  name: "Anonymous User",
  username: `user${postId.slice(-4)}`,
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  isVerified: false,
  followers: 0,
  following: 0,
  posts: 0
});

// Ensure all posts have valid user data
export const sanitizePosts = (posts: Post[]): Post[] => {
  return posts.map(post => {
    if (!post || !post.user || !post.user.username) {
      console.warn(`Post ${post?.id || 'unknown'} has invalid user data, applying fallback`);
      return {
        ...post,
        user: createFallbackUser(post?.id || 'unknown')
      };
    }
    return post;
  });
};

// Ensure a single post has valid user data
export const sanitizePost = (post: Post): Post => {
  if (!post || !post.user || !post.user.username) {
    console.warn(`Post ${post?.id || 'unknown'} has invalid user data, applying fallback`);
    return {
      ...post,
      user: createFallbackUser(post?.id || 'unknown')
    };
  }
  return post;
};
