
import { SocialMediaPost, SocialMediaApiKeys } from '@/types';

export class SocialMediaService {
  private static apiKeys: SocialMediaApiKeys = {};

  static setApiKeys(keys: SocialMediaApiKeys) {
    this.apiKeys = { ...this.apiKeys, ...keys };
  }

  static async fetchInstagramPosts(venueId: string): Promise<SocialMediaPost[]> {
    // Mock implementation
    return [
      {
        id: 'ig-1',
        content: 'Amazing vibes at this place! 🔥',
        author: '@foodie_explorer',
        username: 'foodie_explorer',
        userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b890?w=100&h=100&fit=crop',
        timestamp: '2024-01-15T19:30:00Z',
        platform: 'Instagram',
        source: 'instagram',
        likes: 245,
        comments: 23,
        media: [{
          type: 'image',
          url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=600&fit=crop'
        }]
      }
    ];
  }

  static async fetchGoogleReviews(venueId: string): Promise<SocialMediaPost[]> {
    // Mock implementation
    return [
      {
        id: 'google-1',
        content: 'Excellent food and great atmosphere. Highly recommend!',
        author: 'John Smith',
        username: 'johnsmith',
        rating: 5,
        timestamp: '2024-01-14T16:20:00Z',
        platform: 'Google',
        source: 'google',
        likes: 12,
        comments: 3
      }
    ];
  }

  static async fetchYelpReviews(venueId: string): Promise<SocialMediaPost[]> {
    // Mock implementation
    return [
      {
        id: 'yelp-1',
        content: 'Great service and delicious food. Will definitely come back!',
        author: 'Sarah M.',
        username: 'sarahm',
        rating: 4,
        timestamp: '2024-01-13T20:15:00Z',
        platform: 'Yelp',
        source: 'yelp',
        likes: 8,
        comments: 1
      }
    ];
  }

  static async fetchAllPosts(venueId: string): Promise<SocialMediaPost[]> {
    const [instagram, google, yelp] = await Promise.all([
      this.fetchInstagramPosts(venueId),
      this.fetchGoogleReviews(venueId),
      this.fetchYelpReviews(venueId)
    ]);

    return [...instagram, ...google, ...yelp];
  }
}

export default SocialMediaService;
