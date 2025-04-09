
import { SocialMediaPost } from '../types';
import { mockYelpReviews } from '../mockData';

export const YelpService = {
  async getReviews(businessId: string, apiKey: string): Promise<SocialMediaPost[]> {
    try {
      console.log('Fetching Yelp reviews for:', businessId);
      
      // In a real implementation, we would call the Yelp Fusion API
      // This is a mock implementation for demonstration purposes
      return mockYelpReviews.filter(review => 
        review.source === 'yelp' && 
        review.venueName.toLowerCase() === businessId.toLowerCase()
      );
    } catch (error) {
      console.error('Error fetching Yelp reviews:', error);
      return [];
    }
  }
};
