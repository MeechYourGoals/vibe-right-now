
import { Post, Comment } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

// Create a new post
export const createPost = async (postData: Partial<Post>): Promise<Post> => {
  try {
    // Generate an ID if one isn't provided
    const postId = postData.id || uuidv4();
    
    // Create timestamp if not provided
    const timestamp = postData.timestamp || new Date().toISOString();
    
    const newPost: Post = {
      id: postId,
      content: postData.content || '',
      authorId: postData.authorId || 'anonymous',
      locationId: postData.locationId || postData.venueId || '',
      timestamp,
      media: postData.media || [],
      location: postData.location || { 
        id: postData.locationId || postData.venueId || '', 
        name: '',
        address: '',
        city: '',
        state: '',
        lat: 0,
        lng: 0
      }
    };
    
    // For now, just return the mock post since we don't have a backend
    // In a real implementation, this would be saved to Supabase
    
    toast.success('Post created successfully!');
    return newPost;
  } catch (error) {
    console.error('Error creating post:', error);
    toast.error('Failed to create post');
    throw error;
  }
};

// Get posts for a venue
export const getVenuePosts = async (venueId: string): Promise<Post[]> => {
  try {
    // In a real implementation, this would fetch from Supabase
    // For now, return some mock data
    const mockPosts: Post[] = [
      {
        id: '1',
        content: 'Loving the atmosphere at this place!',
        authorId: 'user1',
        locationId: venueId,
        timestamp: new Date().toISOString(),
        likes: 12,
        comments: 3,
        location: {
          id: venueId,
          name: 'Venue Name',
          address: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          lat: 0,
          lng: 0
        },
        user: {
          id: 'user1',
          name: 'John Doe',
          username: 'johndoe',
          email: 'john@example.com',
          avatar: 'https://i.pravatar.cc/150?img=1'
        }
      },
      {
        id: '2',
        content: 'Great food and service!',
        authorId: 'user2',
        locationId: venueId,
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        likes: 8,
        comments: 1,
        location: {
          id: venueId,
          name: 'Venue Name',
          address: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          lat: 0,
          lng: 0
        },
        user: {
          id: 'user2',
          name: 'Jane Smith',
          username: 'janesmith',
          email: 'jane@example.com',
          avatar: 'https://i.pravatar.cc/150?img=2'
        }
      }
    ];
    
    return mockPosts;
  } catch (error) {
    console.error('Error fetching venue posts:', error);
    return [];
  }
};

// Get comments for a post
export const getPostComments = async (postId: string): Promise<Comment[]> => {
  try {
    // In a real implementation, this would fetch from Supabase
    // For now, return some mock data
    const mockComments: Comment[] = [
      {
        id: '1',
        postId,
        authorId: 'user3',
        content: 'Totally agree!',
        timestamp: new Date().toISOString(),
        likes: 2,
        author: {
          id: 'user3',
          name: 'Alice Johnson',
          username: 'alicej',
          email: 'alice@example.com',
          avatar: 'https://i.pravatar.cc/150?img=3'
        }
      },
      {
        id: '2',
        postId,
        authorId: 'user4',
        content: 'I need to visit this place!',
        timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        likes: 1,
        author: {
          id: 'user4',
          name: 'Bob Wilson',
          username: 'bobw',
          email: 'bob@example.com',
          avatar: 'https://i.pravatar.cc/150?img=4'
        }
      }
    ];
    
    return mockComments;
  } catch (error) {
    console.error('Error fetching post comments:', error);
    return [];
  }
};

// Like a post
export const likePost = async (postId: string): Promise<boolean> => {
  try {
    // In a real implementation, this would update Supabase
    toast.success('Post liked!');
    return true;
  } catch (error) {
    console.error('Error liking post:', error);
    toast.error('Failed to like post');
    return false;
  }
};

// Delete a post
export const deletePost = async (postId: string): Promise<boolean> => {
  try {
    // In a real implementation, this would delete from Supabase
    toast.success('Post deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting post:', error);
    toast.error('Failed to delete post');
    return false;
  }
};
