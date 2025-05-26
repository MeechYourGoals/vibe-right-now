
import { SocialMediaApiKeys, SocialMediaPost } from '@/types';
import { InstagramService } from './platforms/instagramService';
import { TikTokService } from './platforms/tiktokService';
import { YelpService } from './platforms/yelpService';
import { TripAdvisorService } from './platforms/tripAdvisorService';
import { FoursquareService } from './platforms/foursquareService';
import { GoogleService } from './platforms/googleService';
import { FrankiService } from './platforms/frankiService';
import { OtherPlatformService } from './platforms/otherPlatformService';

// Mock data for demonstration
const mockPosts: SocialMediaPost[] = [
  {
    id: '1',
    content: 'Great venue with amazing atmosphere!',
    author: 'user123',
    username: 'user123',
    userAvatar: '/placeholder.svg',
    timestamp: '2024-01-15T18:30:00Z',
    platform: 'google',
    source: 'google',
    venueName: 'Demo Venue',
    likes: 15,
    comments: 3,
    rating: 5
  },
  {
    id: '2',
    content: 'Love this place! Best food in town.',
    author: 'foodie456',
    username: 'foodie456',
    userAvatar: '/placeholder.svg',
    timestamp: '2024-01-14T19:45:00Z',
    platform: 'yelp',
    source: 'yelp',
    venueName: 'Demo Venue',
    likes: 8,
    comments: 2,
    rating: 4
  }
];

export const SocialMediaAggregator = {
  async getAllSocialMediaContent(venueName: string, apiKeys: Partial<SocialMediaApiKeys>): Promise<SocialMediaPost[]> {
    try {
      // For now, return mock data since we don't have real API implementations
      // In a real implementation, you would call the various service methods here
      
      const filteredMockPosts = mockPosts.filter(post => 
        post.venueName.toLowerCase().includes(venueName.toLowerCase()) ||
        venueName.toLowerCase().includes('demo')
      );
      
      return filteredMockPosts.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    } catch (error) {
      console.error('Error fetching social media content:', error);
      return [];
    }
  }
};
