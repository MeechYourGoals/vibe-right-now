
import { useState, useEffect } from 'react';
import { UserSubscription, UserSubscriptionTier, TIER_FEATURES } from '@/types/subscription';

export const useUserSubscription = () => {
  const [subscription, setSubscription] = useState<UserSubscription>({
    tier: 'free',
    isActive: true,
    features: TIER_FEATURES.free
  });

  useEffect(() => {
    // Load subscription from localStorage or API
    const savedSubscription = localStorage.getItem('userSubscription');
    if (savedSubscription) {
      const parsed = JSON.parse(savedSubscription);
      setSubscription({
        ...parsed,
        features: TIER_FEATURES[parsed.tier as UserSubscriptionTier]
      });
    }
  }, []);

  const updateSubscriptionTier = (newTier: UserSubscriptionTier) => {
    const updatedSubscription: UserSubscription = {
      tier: newTier,
      isActive: true,
      features: TIER_FEATURES[newTier],
      expiresAt: newTier !== 'free' ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : undefined
    };

    setSubscription(updatedSubscription);
    localStorage.setItem('userSubscription', JSON.stringify(updatedSubscription));
  };

  const hasFeature = (featureName: keyof typeof TIER_FEATURES.free): boolean => {
    return subscription.features[featureName] || false;
  };

  const canAccessFeature = (requiredTier: UserSubscriptionTier): boolean => {
    const tierOrder: UserSubscriptionTier[] = ['free', 'plus', 'premium', 'pro'];
    const currentTierIndex = tierOrder.indexOf(subscription.tier);
    const requiredTierIndex = tierOrder.indexOf(requiredTier);
    return currentTierIndex >= requiredTierIndex;
  };

  return {
    subscription,
    updateSubscriptionTier,
    hasFeature,
    canAccessFeature,
    isSubscribed: subscription.tier !== 'free',
    tier: subscription.tier
  };
};
