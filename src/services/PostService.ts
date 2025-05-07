
import { Post, Comment } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { generateMockPosts, generateMockComments } from '@/utils/generateData';

export const PostService = {
  /**
   * Get posts for a venue
   */
  async getVenuePosts(venueId: string): Promise<Post[]> {
    try {
      // Try to get from Supabase if connected
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('location_id', venueId);
      
      if (!error && data && data.length > 0) {
        return data as unknown as Post[];
      }
    } catch (e) {
      console.log("Error fetching from Supabase, using mock data", e);
    }
    
    // Fall back to mock data
    return generateMockPosts(venueId, 5);
  },
  
  /**
   * Create a post
   */
  async createPost(post: Partial<Post>): Promise<Post> {
    try {
      // Try to insert into Supabase if connected
      const { data, error } = await supabase
        .from('posts')
        .insert([post])
        .select()
        .single();
      
      if (!error && data) {
        return data as unknown as Post;
      }
    } catch (e) {
      console.log("Error inserting into Supabase, using mock data", e);
    }
    
    // Fall back to mock data
    return {
      id: `mock-${Date.now()}`,
      content: post.content || '',
      user: post.user || {
        id: '1',
        username: 'user',
        displayName: 'User',
        avatar: 'https://i.pravatar.cc/150',
        verified: false,
        following: 100,
        followers: 500,
        bio: 'Mock user bio',
      },
      location: post.location || {
        id: '1',
        name: 'Mock Location',
        city: 'Mock City',
        address: 'Mock Address',
        state: 'CA',
        lat: 0,
        lng: 0
      },
      media: post.media,
      likesCount: 0,
      commentsCount: 0,
      timestamp: new Date().toISOString(),
      vibeScore: Math.floor(Math.random() * 100),
    };
  },
  
  /**
   * Get comments for a post
   */
  async getPostComments(postId: string): Promise<Comment[]> {
    try {
      // Try to get from Supabase if connected
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId);
      
      if (!error && data && data.length > 0) {
        return data as unknown as Comment[];
      }
    } catch (e) {
      console.log("Error fetching from Supabase, using mock data", e);
    }
    
    // Fall back to mock data
    return generateMockComments(postId, 3);
  },
  
  /**
   * Add a comment to a post
   */
  async addComment(postId: string, comment: string, user: any): Promise<Comment> {
    try {
      // Try to insert into Supabase if connected
      const newComment = {
        post_id: postId,
        content: comment,
        user: user
      };
      
      const { data, error } = await supabase
        .from('comments')
        .insert([newComment])
        .select()
        .single();
      
      if (!error && data) {
        return data as unknown as Comment;
      }
    } catch (e) {
      console.log("Error inserting into Supabase, using mock data", e);
    }
    
    // Fall back to mock data
    return {
      id: `mock-${Date.now()}`,
      content: comment,
      user: user,
      timestamp: new Date().toISOString(),
      likes: 0
    };
  }
};

// Export a default instance for compatibility with existing imports
export default PostService;
