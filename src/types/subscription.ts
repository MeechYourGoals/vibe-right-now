
export type UserSubscriptionTier = 'free' | 'plus' | 'premium' | 'pro';

export interface UserSubscription {
  tier: UserSubscriptionTier;
  isActive: boolean;
  expiresAt?: string;
  features: UserSubscriptionFeatures;
}

export interface UserSubscriptionFeatures {
  basicExploration: boolean;
  enhancedPreferences: boolean;
  aiRecommendations: boolean;
  notifications: boolean;
  vibeWithMe: boolean;
  ticketingAccounts: boolean;
  transportationOptions: boolean;
  vernonChat: boolean;
  walletFeatures: boolean;
  influencerMarketplace: boolean;
  arXrGlasses: boolean;
}

export interface SubscriptionPlan {
  tier: UserSubscriptionTier;
  name: string;
  price: number;
  billingPeriod: 'month' | 'year';
  features: string[];
  isPopular?: boolean;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    tier: 'free',
    name: 'Free',
    price: 0,
    billingPeriod: 'month',
    features: ['Basic exploration and browsing', 'Standard venue search', 'Basic user profile']
  },
  {
    tier: 'plus',
    name: 'Plus',
    price: 9.99,
    billingPeriod: 'month',
    features: ['Enhanced preferences', 'AI recommendations', 'Push notifications', 'Priority support'],
    isPopular: true
  },
  {
    tier: 'premium',
    name: 'Premium',
    price: 14.99,
    billingPeriod: 'month',
    features: ['Vibe With Me mode', 'Ticketing accounts', 'Transportation options', 'Advanced filters']
  },
  {
    tier: 'pro',
    name: 'Pro',
    price: 19.99,
    billingPeriod: 'month',
    features: ['Vernon Chat access', 'Wallet features', 'Influencer Marketplace', 'AR/XR Google Glasses (coming soon)']
  }
];

export const TIER_FEATURES: Record<UserSubscriptionTier, UserSubscriptionFeatures> = {
  free: {
    basicExploration: true,
    enhancedPreferences: false,
    aiRecommendations: false,
    notifications: false,
    vibeWithMe: false,
    ticketingAccounts: false,
    transportationOptions: false,
    vernonChat: false,
    walletFeatures: false,
    influencerMarketplace: false,
    arXrGlasses: false
  },
  plus: {
    basicExploration: true,
    enhancedPreferences: true,
    aiRecommendations: true,
    notifications: true,
    vibeWithMe: false,
    ticketingAccounts: false,
    transportationOptions: false,
    vernonChat: false,
    walletFeatures: false,
    influencerMarketplace: false,
    arXrGlasses: false
  },
  premium: {
    basicExploration: true,
    enhancedPreferences: true,
    aiRecommendations: true,
    notifications: true,
    vibeWithMe: true,
    ticketingAccounts: true,
    transportationOptions: true,
    vernonChat: false,
    walletFeatures: false,
    influencerMarketplace: false,
    arXrGlasses: false
  },
  pro: {
    basicExploration: true,
    enhancedPreferences: true,
    aiRecommendations: true,
    notifications: true,
    vibeWithMe: true,
    ticketingAccounts: true,
    transportationOptions: true,
    vernonChat: true,
    walletFeatures: true,
    influencerMarketplace: true,
    arXrGlasses: true
  }
};
