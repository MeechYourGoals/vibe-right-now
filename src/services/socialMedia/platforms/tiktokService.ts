
import { SocialMediaPost } from '../types';
import { mockTikTokPosts } from '../mockData';

export const TikTokService = {
  async getPosts(username: string, apiKey: string): Promise<SocialMediaPost[]> {
    try {
      console.log('Fetching TikTok posts for:', username);
      
      // In a real implementation, we would call the TikTok API
      // This is a mock implementation for demonstration purposes
      return mockTikTokPosts.filter(post => 
        post.source === 'tiktok' && 
        post.venueName.toLowerCase() === username.toLowerCase()
      );
    } catch (error) {
      console.error('Error fetching TikTok posts:', error);
      return [];
    }
  }
};
