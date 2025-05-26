
import { SocialMediaApiKeys, SocialMediaPost } from '@/types';
import { SocialMediaAggregator } from './socialMedia/aggregator';

export type { SocialMediaPost, SocialMediaApiKeys };

export const SocialMediaService = {
  async getAllSocialMediaContent(venueName: string, apiKeys: Partial<SocialMediaApiKeys>): Promise<SocialMediaPost[]> {
    return SocialMediaAggregator.getAllSocialMediaContent(venueName, apiKeys as SocialMediaApiKeys);
  }
};
