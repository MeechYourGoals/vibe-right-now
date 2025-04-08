
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
  
  async getAllSocialMediaContent(venueName: string, apiKeys: SocialMediaApiKeys): Promise<SocialMediaPost[]> {
    try {
      const [instagramPosts, tiktokPosts, yelpReviews] = await Promise.all([
        this.getInstagramPosts(venueName, apiKeys.instagram),
        this.getTikTokPosts(venueName, apiKeys.tiktok),
        this.getYelpReviews(venueName, apiKeys.yelp)
      ]);
      
      // Combine and sort all posts by timestamp (newest first)
      const allPosts = [...instagramPosts, ...tiktokPosts, ...yelpReviews].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      
      return allPosts;
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
  source: 'instagram' | 'tiktok' | 'yelp';
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  likes?: number;
  comments?: number;
  rating?: number;
}

export interface SocialMediaApiKeys {
  instagram: string;
  tiktok: string;
  yelp: string;
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
    comments: 14
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
    comments: 7
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
    comments: 23
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
    comments: 87
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
    comments: 213
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
    comments: 2
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
    comments: 1
  }
];
