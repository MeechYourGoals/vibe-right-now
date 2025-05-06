
import { Post, Comment } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { generateMockUserData } from "@/mock/mockUserData";

// Mock posts data for demonstration
const mockPosts: Post[] = [];

// Create a new post
export const createPost = async (postData: {
  content: string;
  locationId: string;
}): Promise<Post> => {
  try {
    const { content, locationId } = postData;
    const user = generateMockUserData();
    
    const newPost: Post = {
      id: uuidv4(),
      content: content,
      timestamp: new Date().toISOString(),
      likes: Math.floor(Math.random() * 50),
      comments: Math.floor(Math.random() * 10),
      authorId: user.id,
      locationId: locationId,
      user: user
    };
    
    mockPosts.unshift(newPost);
    toast.success("Post created successfully");
    return newPost;
  } catch (error) {
    console.error("Error creating post:", error);
    toast.error("Failed to create post");
    throw error;
  }
};

// Get all posts
export const getAllPosts = async (): Promise<Post[]> => {
  try {
    return mockPosts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    toast.error("Failed to fetch posts");
    return [];
  }
};

// Get posts by venue ID
export const getVenuePosts = async (venueId: string): Promise<Post[]> => {
  try {
    const user = generateMockUserData();
    
    // Generate mock posts
    const posts: Post[] = [];
    
    for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
      posts.push({
        id: uuidv4(),
        content: `This is a great place to ${["eat", "hang out", "spend time", "enjoy", "relax"][i % 5]} with friends!`,
        timestamp: new Date(Date.now() - i * 86400000).toISOString(),
        likes: Math.floor(Math.random() * 50),
        comments: Math.floor(Math.random() * 10),
        authorId: user.id,
        locationId: venueId,
        user: user
      });
    }
    
    return posts;
  } catch (error) {
    console.error("Error fetching venue posts:", error);
    toast.error("Failed to fetch venue posts");
    return [];
  }
};

// Delete a post
export const deletePost = async (postId: string): Promise<void> => {
  try {
    const index = mockPosts.findIndex(post => post.id === postId);
    if (index !== -1) {
      mockPosts.splice(index, 1);
      toast.success("Post deleted successfully");
    } else {
      toast.error("Post not found");
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    toast.error("Failed to delete post");
    throw error;
  }
};

// Get comments for a post
export const getPostComments = async (postId: string): Promise<Comment[]> => {
  try {
    const user = generateMockUserData();
    
    // Generate mock comments
    const comments: Comment[] = [];
    
    for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
      comments.push({
        id: uuidv4(),
        postId: postId,
        content: `This is comment ${i + 1}!`,
        timestamp: new Date(Date.now() - i * 3600000).toISOString(),
        authorId: user.id,
        author: user,
        likes: Math.floor(Math.random() * 10),
        vibedHere: Math.random() > 0.5
      });
    }
    
    return comments;
  } catch (error) {
    console.error("Error fetching post comments:", error);
    return [];
  }
};
