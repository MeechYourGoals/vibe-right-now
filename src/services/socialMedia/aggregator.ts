
import { SocialMediaApiKeys, SocialMediaPost } from './types';
import { InstagramService } from './platforms/instagramService';
import { TikTokService } from './platforms/tiktokService';
import { YelpService } from './platforms/yelpService';
import { TripAdvisorService } from './platforms/tripAdvisorService';
import { FoursquareService } from './platforms/foursquareService';
import { GoogleService } from './platforms/googleService';
import { FrankiService } from './platforms/frankiService';
import { OtherPlatformService } from './platforms/otherPlatformService';
import { mockInstagramPosts, mockTripAdvisorPosts, mockYelpReviews, mockTikTokPosts } from './mockData';

export const SocialMediaAggregator = {
  async getAllSocialMediaContent(venueName: string, apiKeys: SocialMediaApiKeys): Promise<SocialMediaPost[]> {
    try {
      // Create an array of promises for each platform that has an API key
      const promises: Promise<SocialMediaPost[]>[] = [];
      
      if (apiKeys.instagram) promises.push(InstagramService.getPosts(venueName, apiKeys.instagram));
      if (apiKeys.tiktok) promises.push(TikTokService.getPosts(venueName, apiKeys.tiktok));
      if (apiKeys.yelp) promises.push(YelpService.getReviews(venueName, apiKeys.yelp));
      if (apiKeys.tripadvisor) promises.push(TripAdvisorService.getContent(venueName, apiKeys.tripadvisor));
      if (apiKeys.foursquare) promises.push(FoursquareService.getContent(venueName, apiKeys.foursquare));
      if (apiKeys.google) promises.push(GoogleService.getReviews(venueName, apiKeys.google));
      if (apiKeys.franki) promises.push(FrankiService.getPosts(venueName, apiKeys.franki));
      if (apiKeys.other) promises.push(OtherPlatformService.getContent(venueName, apiKeys.other, apiKeys.otherUrl || ''));
      
      // If no API keys are provided, return mock data for demonstration
      if (promises.length === 0) {
        const mockData = [
          ...mockInstagramPosts.slice(0, 1),
          ...mockTripAdvisorPosts.slice(0, 1),
          ...mockYelpReviews.slice(0, 1),
          ...mockTikTokPosts.slice(0, 1)
        ].filter(post => post.venueName.toLowerCase() === venueName.toLowerCase());
        
        return mockData.sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      }
      
      // Execute all promises and combine results
      const results = await Promise.all(promises);
      const allPosts = results.flat();
      
      // Combine and sort all posts by timestamp (newest first)
      return allPosts.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    } catch (error) {
      console.error('Error fetching social media content:', error);
      return [];
    }
  }
};
