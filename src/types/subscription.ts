
// User subscription tier types
export type UserSubscriptionTier = 'free' | 'plus' | 'premium' | 'pro';

export interface UserSubscription {
  tier: UserSubscriptionTier;
  status: 'active' | 'cancelled' | 'expired';
  billingCycle: 'monthly' | 'yearly';
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}

export interface SubscriptionPlan {
  id: UserSubscriptionTier;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  icon: string;
  popular?: boolean;
}

export interface UserPreferences {
  favoriteArtists: string[];
  favoriteGenres: string[];
  favoriteTeams: string[];
  notificationsEnabled: boolean;
  aiRecommendationsEnabled: boolean;
}

export interface UserWallet {
  savedCards: SavedCard[];
  defaultCardId?: string;
  spendingLimits: {
    daily?: number;
    monthly?: number;
    perTransaction?: number;
  };
}

export interface SavedCard {
  id: string;
  lastFour: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}
