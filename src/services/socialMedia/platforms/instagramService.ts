
import { SocialMediaPost } from '../types';
import { mockInstagramPosts } from '../mockData';

export const InstagramService = {
  async getPosts(username: string, apiKey: string): Promise<SocialMediaPost[]> {
    try {
      console.log('Fetching Instagram posts for:', username);
      
      // In a real implementation, we would call the Instagram Graph API
      // This is a mock implementation for demonstration purposes
      return mockInstagramPosts.filter(post => 
        post.source === 'instagram' && 
        post.venueName.toLowerCase() === username.toLowerCase()
      );
    } catch (error) {
      console.error('Error fetching Instagram posts:', error);
      return [];
    }
  }
};
