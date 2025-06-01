
import { useState, useEffect } from 'react';
import { UserSubscription, UserSubscriptionTier, SubscriptionPlan } from '@/types/subscription';

// Subscription plans with AR/XR feature added to Pro
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    billingCycle: 'monthly',
    icon: '🆓',
    features: [
      'Explore and browse events',
      'Basic event discovery'
    ]
  },
  {
    id: 'plus',
    name: 'Plus',
    price: 9.99,
    billingCycle: 'monthly',
    icon: '💫',
    features: [
      'Save preferences (artists, teams, genres)',
      'AI-personalized event recommendations',
      'Home city event notifications'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 14.99,
    billingCycle: 'monthly',
    icon: '🚀',
    popular: true,
    features: [
      'Everything in Plus',
      'Unlock "Vibe With Me" broadcast mode',
      'Connect external ticketing accounts',
      'Set default transportation options'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 19.99,
    billingCycle: 'monthly',
    icon: '🧠',
    features: [
      'Everything in Premium',
      'Access to Vernon Chat (Gemini-powered)',
      'Personalized chat responses with preferences',
      'Agentic booking via Google Project Mariner',
      'Use saved wallet cards for transactions',
      'Custom spending limits',
      'Access to Influencer Marketplace',
      'Early access to AR/XR features on Google Glasses (coming soon)'
    ]
  }
];

export const useUserSubscription = () => {
  const [subscription, setSubscription] = useState<UserSubscription>({
    tier: 'free',
    status: 'active',
    billingCycle: 'monthly',
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    cancelAtPeriodEnd: false
  });

  // Check if user has access to a specific feature
  const hasFeatureAccess = (feature: string): boolean => {
    const tierHierarchy = ['free', 'plus', 'premium', 'pro'];
    const currentTierIndex = tierHierarchy.indexOf(subscription.tier);

    switch (feature) {
      case 'preferences':
      case 'aiRecommendations':
      case 'notifications':
        return currentTierIndex >= 1; // Plus and above
      case 'vibeWithMe':
      case 'ticketingAccounts':
      case 'transportationOptions':
        return currentTierIndex >= 2; // Premium and above
      case 'vernonChat':
      case 'agenticBooking':
      case 'wallet':
      case 'influencerMarketplace':
      case 'arXrFeatures':
        return currentTierIndex >= 3; // Pro only
      default:
        return true; // Free features
    }
  };

  // Upgrade subscription
  const upgradeTo = (tier: UserSubscriptionTier) => {
    setSubscription(prev => ({
      ...prev,
      tier,
      status: 'active',
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    }));
  };

  // Get current plan details
  const getCurrentPlan = (): SubscriptionPlan => {
    return SUBSCRIPTION_PLANS.find(plan => plan.id === subscription.tier) || SUBSCRIPTION_PLANS[0];
  };

  return {
    subscription,
    hasFeatureAccess,
    upgradeTo,
    getCurrentPlan,
    plans: SUBSCRIPTION_PLANS
  };
};
