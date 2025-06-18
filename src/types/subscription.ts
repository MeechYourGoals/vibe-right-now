
export type UserSubscriptionTier = 'free' | 'plus' | 'premium' | 'pro';

export interface UserSubscription {
  tier: UserSubscriptionTier;
  isActive: boolean;
  expiresAt?: string;
  features: UserSubscriptionFeatures;
}

export interface UserSubscriptionFeatures {
  basicExploration: boolean;
  savePreferences: boolean;
  groupTrips: boolean;
  aiRecommendations: boolean;
  urlReviewSummaries: boolean;
  externalReviewsAISummaries: boolean;
  venueMessaging: boolean;
  periodicBonusPoints: boolean;
  vibeWithMe: boolean;
  linkTicketingTransportation: boolean;
  basicVernonChat: boolean;
  vernonConcierge: boolean;
  enhancedVernonChat: boolean;
  vernonReviewChat: boolean;
  vernonAgenticBooking: boolean;
  influencerMarketplace: boolean;
  earlyAccessARXR: boolean;
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
    features: ['Basic exploration and browsing', 'Standard venue search', 'Save Preferences for better Recommendations', 'Group Trips']
  },
  {
    tier: 'plus',
    name: 'Plus',
    price: 9.99,
    billingPeriod: 'month',
    features: ['AI recommendations', 'URL-based External Review Summaries', 'Venue Messaging', 'Periodic Bonus Points'],
    isPopular: true
  },
  {
    tier: 'premium',
    name: 'Premium',
    price: 14.99,
    billingPeriod: 'month',
    features: ['Vibe With Me mode', 'Link Ticketing and Transportation accounts', 'Basic Vernon Chat', 'Vernon Review Chat for summaries', 'Access to Vernon Concierge']
  },
  {
    tier: 'pro',
    name: 'Pro',
    price: 19.99,
    billingPeriod: 'month',
    features: ['Enhanced Vernon Chat with Preference Memory', 'Vernon Agentic Booking w/ Wallet Vault', 'Influencer Marketplace', 'Early Access when AR/XR Glasses features become available']
  }
];

export const TIER_FEATURES: Record<UserSubscriptionTier, UserSubscriptionFeatures> = {
  free: {
    basicExploration: true,
    savePreferences: true,
    groupTrips: true,
    aiRecommendations: false,
    urlReviewSummaries: false,
    externalReviewsAISummaries: false,
    venueMessaging: false,
    periodicBonusPoints: false,
    vibeWithMe: false,
    linkTicketingTransportation: false,
    basicVernonChat: false,
    vernonConcierge: false,
    enhancedVernonChat: false,
    vernonReviewChat: false,
    vernonAgenticBooking: false,
    influencerMarketplace: false,
    earlyAccessARXR: false
  },
  plus: {
    basicExploration: true,
    savePreferences: true,
    groupTrips: true,
    aiRecommendations: true,
    urlReviewSummaries: true,
    externalReviewsAISummaries: true,
    venueMessaging: true,
    periodicBonusPoints: true,
    vibeWithMe: false,
    linkTicketingTransportation: false,
    basicVernonChat: false,
    vernonConcierge: false,
    enhancedVernonChat: false,
    vernonReviewChat: false,
    vernonAgenticBooking: false,
    influencerMarketplace: false,
    earlyAccessARXR: false
  },
  premium: {
    basicExploration: true,
    savePreferences: true,
    groupTrips: true,
    aiRecommendations: true,
    urlReviewSummaries: true,
    externalReviewsAISummaries: true,
    venueMessaging: true,
    periodicBonusPoints: true,
    vibeWithMe: true,
    linkTicketingTransportation: true,
    basicVernonChat: true,
    vernonConcierge: true,
    enhancedVernonChat: false,
    vernonReviewChat: true,
    vernonAgenticBooking: false,
    influencerMarketplace: false,
    earlyAccessARXR: false
  },
  pro: {
    basicExploration: true,
    savePreferences: true,
    groupTrips: true,
    aiRecommendations: true,
    urlReviewSummaries: true,
    externalReviewsAISummaries: true,
    venueMessaging: true,
    periodicBonusPoints: true,
    vibeWithMe: true,
    linkTicketingTransportation: true,
    basicVernonChat: true,
    vernonConcierge: true,
    enhancedVernonChat: true,
    vernonReviewChat: true,
    vernonAgenticBooking: true,
    influencerMarketplace: true,
    earlyAccessARXR: true
  }
};
