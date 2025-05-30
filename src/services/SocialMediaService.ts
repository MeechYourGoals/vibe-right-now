
export interface SocialMediaApiKeys {
  instagram: string;
  tiktok: string;
  franki: string;
  yelp: string;
  google: string;
}

export class SocialMediaService {
  static getDefaultApiKeys(): SocialMediaApiKeys {
    return {
      instagram: '',
      tiktok: '',
      franki: '',
      yelp: '',
      google: ''
    };
  }

  static async fetchContent(platform: string, apiKey: string, venueId: string): Promise<any[]> {
    // Mock implementation - would integrate with actual APIs
    console.log(`Fetching content from ${platform} for venue ${venueId}`);
    return [];
  }
}
