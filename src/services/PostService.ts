
import { Post, Comment } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

// Mock data storage (would be replaced with real database in production)
const mockPosts: Post[] = [];
const mockComments: Record<string, Comment[]> = {};

// Direct exports for compatibility
export const createPost = async (postData: Partial<Post>): Promise<Post> => {
  return await PostService.createPost(postData);
};

export const getVenuePosts = async (venueId: string): Promise<Post[]> => {
  return await PostService.getVenuePosts(venueId);
};

export const getPostComments = async (postId: string): Promise<Comment[]> => {
  return await PostService.getPostComments(postId);
};

// Main service object
export const PostService = {
  /**
   * Get posts for a specific location/venue
   */
  async getVenuePosts(venueId: string): Promise<Post[]> {
    try {
      // In a real implementation, this would query from a posts table
      // For now, return mock posts filtered by venue ID or generate new ones
      const existingPosts = mockPosts.filter(post => post.locationId === venueId);
      
      if (existingPosts.length > 0) {
        return existingPosts;
      }
      
      // Generate some mock posts if none exist
      const newPosts: Post[] = Array(3).fill(null).map((_, i) => ({
        id: `post-${venueId}-${i}`,
        content: `This is a test post ${i + 1} for venue ${venueId}`,
        timestamp: new Date(Date.now() - i * 86400000).toISOString(),
        likes: Math.floor(Math.random() * 100),
        comments: Math.floor(Math.random() * 20),
        authorId: `user-${i + 1}`,
        locationId: venueId,
        media: i % 2 === 0 ? [{ type: 'image', url: 'https://picsum.photos/400/300' }] : undefined
      }));
      
      // Add to mock storage
      mockPosts.push(...newPosts);
      return newPosts;
    } catch (error) {
      console.error('Error fetching venue posts:', error);
      return [];
    }
  },
  
  /**
   * Get posts for a specific location/venue (alias for API compatibility)
   */
  async getPostsForLocation(locationId: string): Promise<Post[]> {
    return this.getVenuePosts(locationId);
  },
  
  /**
   * Create a new post
   */
  async createPost(postData: Partial<Post>): Promise<Post> {
    const newPost: Post = {
      id: uuidv4(),
      content: postData.content || '',
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      authorId: postData.authorId || 'current-user',
      locationId: postData.locationId || '',
      media: postData.media || [],
      vibeTags: postData.vibeTags || [],
      isPinned: false,
      isVenuePost: true,
      saved: false
    };
    
    // In a real implementation, this would save to a database
    mockPosts.unshift(newPost);
    
    return newPost;
  },
  
  /**
   * Get comments for a specific post
   */
  async getPostComments(postId: string): Promise<Comment[]> {
    // Check if we have cached comments
    if (mockComments[postId]) {
      return mockComments[postId];
    }
    
    // Generate mock comments
    const commentCount = Math.floor(Math.random() * 5);
    const comments: Comment[] = Array(commentCount).fill(null).map((_, i) => ({
      id: `comment-${postId}-${i}`,
      content: `This is comment ${i + 1} on post ${postId}`,
      timestamp: new Date(Date.now() - i * 3600000).toISOString(),
      user: {
        id: `user-${i + 10}`,
        name: `User ${i + 10}`,
        username: `user${i + 10}`,
        avatar: `https://i.pravatar.cc/150?u=${i + 10}`,
        verified: i === 0
      },
      authorId: `user-${i + 10}`,
      postId: postId,
      vibedHere: i % 2 === 0
    }));
    
    // Cache for future use
    mockComments[postId] = comments;
    
    return comments;
  },
  
  /**
   * Add a comment to a post
   */
  async addComment(postData: { postId: string; content: string; userId: string }): Promise<Comment> {
    const { postId, content, userId } = postData;
    
    // Create new comment
    const newComment: Comment = {
      id: uuidv4(),
      content: content,
      timestamp: new Date().toISOString(),
      user: {
        id: userId,
        name: `User ${userId}`,
        username: `user${userId}`,
        avatar: `https://i.pravatar.cc/150?u=${userId}`,
        verified: false
      },
      authorId: userId,
      postId: postId,
      vibedHere: true
    };
    
    // Initialize comment array for this post if needed
    if (!mockComments[postId]) {
      mockComments[postId] = [];
    }
    
    // Add comment to mock storage
    mockComments[postId].push(newComment);
    
    // Update comment count on the post
    const post = mockPosts.find(p => p.id === postId);
    if (post) {
      post.comments += 1;
    }
    
    return newComment;
  },
  
  /**
   * Get comments for a specific post (older API method name)
   */
  async getCommentsForPost(postId: string): Promise<Comment[]> {
    return this.getPostComments(postId);
  },
};

export default PostService;
