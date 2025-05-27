
import { SocialMediaPost, SocialMediaSource } from '@/types';

export class SocialMediaService {
  static async fetchPosts(venueId: string): Promise<SocialMediaPost[]> {
    // Mock data for now
    return [
      {
        id: '1',
        content: 'Amazing dinner at this place! The ambiance was perfect.',
        author: 'John D.',
        rating: 5,
        timestamp: '2024-01-15T19:30:00Z',
        platform: 'Google Reviews',
        source: 'google' as SocialMediaSource,
        engagement: {
          likes: 12,
          comments: 3,
          shares: 1
        }
      },
      {
        id: '2',
        content: 'Great cocktails and live music. Will definitely come back!',
        author: 'Sarah M.',
        rating: 4,
        timestamp: '2024-01-14T21:15:00Z',
        platform: 'Yelp',
        source: 'yelp' as SocialMediaSource,
        engagement: {
          likes: 8,
          comments: 2,
          shares: 0
        }
      }
    ];
  }

  static async getConnectedPlatforms(venueId: string): Promise<Record<string, boolean>> {
    return {
      instagram: true,
      google: true,
      yelp: true,
      facebook: false
    };
  }
}

export { SocialMediaPost, SocialMediaSource };
