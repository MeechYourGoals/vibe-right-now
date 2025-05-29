
import { SocialMediaPost, SocialMediaApiKeys } from "@/types";

export class SocialMediaService {
  static getDefaultApiKeys(): SocialMediaApiKeys {
    return {
      instagram: process.env.INSTAGRAM_API_KEY || '',
      google: process.env.GOOGLE_API_KEY || '',
      yelp: process.env.YELP_API_KEY || ''
    };
  }

  static async getAllSocialMediaContent(venueName: string, apiKeys: SocialMediaApiKeys): Promise<SocialMediaPost[]> {
    // Mock implementation for now
    const mockPosts: SocialMediaPost[] = [
      {
        id: '1',
        content: `Great experience at ${venueName}! Amazing atmosphere and service.`,
        author: 'John Doe',
        username: 'johndoe',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
        venueName,
        rating: 5,
        timestamp: new Date().toISOString(),
        platform: 'Google',
        source: 'google' as const,
        likes: 42,
        comments: 8
      },
      {
        id: '2',
        content: `Love this place! ${venueName} never disappoints.`,
        author: 'Jane Smith',
        username: 'janesmith',
        userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&q=80',
        venueName,
        rating: 4,
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        platform: 'Yelp',
        source: 'yelp' as const,
        likes: 23,
        comments: 5
      }
    ];

    return mockPosts;
  }
}

export default SocialMediaService;
