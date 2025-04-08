
// Service to interact with various social media platforms
export const SocialMediaService = {
  async getInstagramPosts(username: string, apiKey: string): Promise<SocialMediaPost[]> {
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
  },
  
  async getTikTokPosts(username: string, apiKey: string): Promise<SocialMediaPost[]> {
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
  },
  
  async getYelpReviews(businessId: string, apiKey: string): Promise<SocialMediaPost[]> {
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
  },
  
  async getTripAdvisorContent(businessId: string, apiKey: string): Promise<SocialMediaPost[]> {
    try {
      console.log('Fetching TripAdvisor content for:', businessId);
      
      // In a real implementation, we would call the TripAdvisor Content API
      // This is a mock implementation for demonstration purposes
      return mockTripAdvisorPosts.filter(post => 
        post.source === 'tripadvisor' && 
        post.venueName.toLowerCase() === businessId.toLowerCase()
      );
    } catch (error) {
      console.error('Error fetching TripAdvisor content:', error);
      return [];
    }
  },
  
  async getFoursquareContent(venueId: string, apiKey: string): Promise<SocialMediaPost[]> {
    try {
      console.log('Fetching Foursquare content for:', venueId);
      
      // In a real implementation, we would call the Foursquare Places API
      // This is a mock implementation for demonstration purposes
      return mockFoursquarePosts.filter(post => 
        post.source === 'foursquare' && 
        post.venueName.toLowerCase() === venueId.toLowerCase()
      );
    } catch (error) {
      console.error('Error fetching Foursquare content:', error);
      return [];
    }
  },
  
  async getGoogleReviews(placeId: string, apiKey: string): Promise<SocialMediaPost[]> {
    try {
      console.log('Fetching Google reviews for:', placeId);
      
      // In a real implementation, we would call the Google My Business API
      // This is a mock implementation for demonstration purposes
      return mockGoogleReviews.filter(review => 
        review.source === 'google' && 
        review.venueName.toLowerCase() === placeId.toLowerCase()
      );
    } catch (error) {
      console.error('Error fetching Google reviews:', error);
      return [];
    }
  },
  
  async getFrankiPosts(venueName: string, apiKey: string): Promise<SocialMediaPost[]> {
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
  },
  
  async getOtherPlatformContent(venueName: string, apiKey: string, url: string): Promise<SocialMediaPost[]> {
    try {
      console.log('Fetching content from custom integration for:', venueName);
      
      // In a real implementation, we would call a custom API or scraper
      // This is a mock implementation for demonstration purposes
      return mockOtherPosts.filter(post => 
        post.source === 'other' && 
        post.venueName.toLowerCase() === venueName.toLowerCase()
      );
    } catch (error) {
      console.error('Error fetching content from custom integration:', error);
      return [];
    }
  },
  
  async getAllSocialMediaContent(venueName: string, apiKeys: SocialMediaApiKeys): Promise<SocialMediaPost[]> {
    try {
      // Create an array of promises for each platform that has an API key
      const promises: Promise<SocialMediaPost[]>[] = [];
      
      if (apiKeys.instagram) promises.push(this.getInstagramPosts(venueName, apiKeys.instagram));
      if (apiKeys.tiktok) promises.push(this.getTikTokPosts(venueName, apiKeys.tiktok));
      if (apiKeys.yelp) promises.push(this.getYelpReviews(venueName, apiKeys.yelp));
      if (apiKeys.tripadvisor) promises.push(this.getTripAdvisorContent(venueName, apiKeys.tripadvisor));
      if (apiKeys.foursquare) promises.push(this.getFoursquareContent(venueName, apiKeys.foursquare));
      if (apiKeys.google) promises.push(this.getGoogleReviews(venueName, apiKeys.google));
      if (apiKeys.franki) promises.push(this.getFrankiPosts(venueName, apiKeys.franki));
      if (apiKeys.other) promises.push(this.getOtherPlatformContent(venueName, apiKeys.other, apiKeys.otherUrl || ''));
      
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

// Types for social media posts and API keys
export interface SocialMediaPost {
  id: string;
  content: string;
  timestamp: string;
  username: string;
  userAvatar: string;
  venueName: string;
  source: 'instagram' | 'tiktok' | 'yelp' | 'tripadvisor' | 'foursquare' | 'google' | 'franki' | 'other';
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  likes?: number;
  comments?: number;
  rating?: number;
  originalUrl?: string; // URL to the original post
}

export interface SocialMediaApiKeys {
  instagram: string;
  tiktok: string;
  yelp: string;
  tripadvisor?: string;
  foursquare?: string;
  google?: string;
  franki?: string;
  other?: string;
  otherUrl?: string; // Custom URL for other platform
}

// Mock data for demonstration
const mockInstagramPosts: SocialMediaPost[] = [
  {
    id: 'ig1',
    content: 'Amazing vibes at this place tonight! 🔥 #nightlife #goodtimes',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    username: 'partygoer123',
    userAvatar: 'https://source.unsplash.com/random/100x100/?portrait',
    venueName: 'The Rooftop',
    source: 'instagram',
    mediaUrl: 'https://source.unsplash.com/random/500x500/?nightclub',
    mediaType: 'image',
    likes: 127,
    comments: 14,
    originalUrl: 'https://instagram.com/p/AB123'
  },
  {
    id: 'ig2',
    content: 'Best cocktails in the city! 🍹 #cocktails #datenight',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    username: 'cocktail_lover',
    userAvatar: 'https://source.unsplash.com/random/100x100/?woman',
    venueName: 'The Rooftop',
    source: 'instagram',
    mediaUrl: 'https://source.unsplash.com/random/500x500/?cocktail',
    mediaType: 'image',
    likes: 89,
    comments: 7,
    originalUrl: 'https://instagram.com/p/CD456'
  },
  {
    id: 'ig3',
    content: 'Live music was incredible! 🎵 #livemusic #weekend',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    username: 'music_fan',
    userAvatar: 'https://source.unsplash.com/random/100x100/?man',
    venueName: 'Jazz Club',
    source: 'instagram',
    mediaUrl: 'https://source.unsplash.com/random/500x500/?concert',
    mediaType: 'image',
    likes: 215,
    comments: 23,
    originalUrl: 'https://instagram.com/p/EF789'
  }
];

const mockTikTokPosts: SocialMediaPost[] = [
  {
    id: 'tt1',
    content: 'Check out this amazing DJ set! 🎧 #nightlife #dj #vibes',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    username: 'club_hopper',
    userAvatar: 'https://source.unsplash.com/random/100x100/?dj',
    venueName: 'The Rooftop',
    source: 'tiktok',
    mediaUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    mediaType: 'video',
    likes: 1243,
    comments: 87,
    originalUrl: 'https://tiktok.com/@club_hopper/video/123456'
  },
  {
    id: 'tt2',
    content: 'This place is PACKED tonight! 🔥 #trending #hotspot',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    username: 'viral_content',
    userAvatar: 'https://source.unsplash.com/random/100x100/?selfie',
    venueName: 'The Rooftop',
    source: 'tiktok',
    mediaUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    mediaType: 'video',
    likes: 4592,
    comments: 213,
    originalUrl: 'https://tiktok.com/@viral_content/video/654321'
  }
];

const mockYelpReviews: SocialMediaPost[] = [
  {
    id: 'yelp1',
    content: 'Excellent service and amazing food. The atmosphere was perfect for a date night. Would definitely come back!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    username: 'foodie_explorer',
    userAvatar: 'https://source.unsplash.com/random/100x100/?person',
    venueName: 'The Rooftop',
    source: 'yelp',
    rating: 5,
    likes: 8,
    comments: 2,
    originalUrl: 'https://yelp.com/biz/the-rooftop/review/123'
  },
  {
    id: 'yelp2',
    content: 'Great venue but a bit overpriced. The cocktails were good but not worth $18 each. Nice views though!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    username: 'value_seeker',
    userAvatar: 'https://source.unsplash.com/random/100x100/?face',
    venueName: 'The Rooftop',
    source: 'yelp',
    rating: 3,
    likes: 4,
    comments: 1,
    originalUrl: 'https://yelp.com/biz/the-rooftop/review/456'
  }
];

const mockTripAdvisorPosts: SocialMediaPost[] = [
  {
    id: 'ta1',
    content: 'We visited during our vacation and had an exceptional experience. The staff were attentive and the views were breathtaking. Highly recommend for special occasions!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
    username: 'traveler2023',
    userAvatar: 'https://source.unsplash.com/random/100x100/?traveler',
    venueName: 'The Rooftop',
    source: 'tripadvisor',
    rating: 5,
    mediaUrl: 'https://source.unsplash.com/random/500x300/?rooftop-view',
    mediaType: 'image',
    likes: 12,
    originalUrl: 'https://tripadvisor.com/ShowUserReviews-g123-d456-r789-The_Rooftop.html'
  },
  {
    id: 'ta2',
    content: 'Food was good but service was slow. We waited almost 30 minutes for our appetizers. Location is beautiful though and worth the visit for the ambiance.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
    username: 'familytravels',
    userAvatar: 'https://source.unsplash.com/random/100x100/?family',
    venueName: 'The Rooftop',
    source: 'tripadvisor',
    rating: 3,
    likes: 5,
    originalUrl: 'https://tripadvisor.com/ShowUserReviews-g123-d456-r987-The_Rooftop.html'
  }
];

const mockFoursquarePosts: SocialMediaPost[] = [
  {
    id: 'fs1',
    content: 'Great spot for after-work drinks! The happy hour specials are a great deal.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 150).toISOString(),
    username: 'cityexplorer',
    userAvatar: 'https://source.unsplash.com/random/100x100/?professional',
    venueName: 'The Rooftop',
    source: 'foursquare',
    mediaUrl: 'https://source.unsplash.com/random/500x300/?rooftop-bar',
    mediaType: 'image',
    likes: 8,
    originalUrl: 'https://foursquare.com/v/the-rooftop/123456/tip/789'
  }
];

const mockGoogleReviews: SocialMediaPost[] = [
  {
    id: 'gr1',
    content: 'One of the best rooftop experiences in the city. Parking can be difficult so I recommend using a ride service.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 170).toISOString(),
    username: 'LocalGuide',
    userAvatar: 'https://source.unsplash.com/random/100x100/?guide',
    venueName: 'The Rooftop',
    source: 'google',
    rating: 5,
    likes: 22,
    originalUrl: 'https://g.co/kgs/abcde12'
  },
  {
    id: 'gr2',
    content: 'Beautiful view but the prices are quite steep. The service was excellent though.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 220).toISOString(),
    username: 'JohnD',
    userAvatar: 'https://source.unsplash.com/random/100x100/?man-casual',
    venueName: 'The Rooftop',
    source: 'google',
    rating: 4,
    likes: 7,
    originalUrl: 'https://g.co/kgs/fghij34'
  }
];

const mockFrankiPosts: SocialMediaPost[] = [
  {
    id: 'fr1',
    content: 'Discovered this hidden gem last weekend! Their signature cocktail is a must-try.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 130).toISOString(),
    username: 'cocktailhunter',
    userAvatar: 'https://source.unsplash.com/random/100x100/?bartender',
    venueName: 'The Rooftop',
    source: 'franki',
    mediaUrl: 'https://source.unsplash.com/random/500x300/?cocktail-fancy',
    mediaType: 'image',
    likes: 45,
    comments: 5,
    originalUrl: 'https://franki.app/venue/the-rooftop/posts/12345'
  }
];

const mockOtherPosts: SocialMediaPost[] = [
  {
    id: 'ot1',
    content: 'Featured this venue in our "Top 10 Rooftop Spots" article. The sunset views are unmatched!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 200).toISOString(),
    username: 'CityBlogger',
    userAvatar: 'https://source.unsplash.com/random/100x100/?writer',
    venueName: 'The Rooftop',
    source: 'other',
    mediaUrl: 'https://source.unsplash.com/random/500x300/?sunset-cityscape',
    mediaType: 'image',
    likes: 67,
    originalUrl: 'https://cityblog.com/articles/top-rooftop-spots'
  }
];
