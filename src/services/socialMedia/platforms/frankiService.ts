
import { SocialMediaPost } from '../types';
import { mockFrankiPosts } from '../mockData';

export const FrankiService = {
  async getPosts(venueName: string, apiKey: string): Promise<SocialMediaPost[]> {
    try {
      console.log('Fetching Franki posts for:', venueName);
      
      // In a real implementation, we would call the Franki API
      // This is a mock implementation for demonstration purposes
      return mockFrankiPosts.filter(post => 
        post.source === 'franki' && 
        post.venueName.toLowerCase() === venueName.toLowerCase()
      );
    } catch (error) {
      console.error('Error fetching Franki posts:', error);
      return [];
    }
  }
};
