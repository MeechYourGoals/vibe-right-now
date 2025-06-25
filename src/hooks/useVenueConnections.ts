
import { useState, useEffect } from 'react';
import { useUserSubscription } from '@/hooks/useUserSubscription';

export const useVenueConnections = (venueId: string) => {
  // State for social media connections
  const [connectedPlatforms, setConnectedPlatforms] = useState<Record<string, boolean>>({
    instagram: false,
    tiktok: false,
    yelp: false,
    tripadvisor: false,
    foursquare: false,
    google: false,
    franki: false,
    other: false
  });
  
  // Access subscription data from the authoritative hook
  const { tier, updateSubscriptionTier } = useUserSubscription();
  
  // Load saved platforms on component mount
  useEffect(() => {
    const savedKeys = localStorage.getItem('socialMediaApiKeys');
    if (savedKeys) {
      try {
        const parsedKeys = JSON.parse(savedKeys);

        // Set platforms as connected if they have API keys
        const connected: Record<string, boolean> = {};
        Object.keys(parsedKeys).forEach(key => {
          connected[key] = !!parsedKeys[key];
        });
        setConnectedPlatforms(connected);
      } catch (error) {
        console.error('Error parsing saved API keys:', error);
      }
    }
  }, [venueId]);
  
  // Handle upgrading subscription
  const handleUpgradeSubscription = () => {
    // For demo purposes, cycle through subscription tiers
    const tiers: Array<'free' | 'plus' | 'premium' | 'pro'> = ['free', 'plus', 'premium', 'pro'];
    const currentIndex = tiers.indexOf(tier);
    const nextTier = tiers[(currentIndex + 1) % tiers.length];
    updateSubscriptionTier(nextTier);
  };
  
  // Check if embedding is allowed (premium/pro tiers only)
  const canEmbed = tier === 'premium' || tier === 'pro';
  
  return {
    connectedPlatforms,
    setConnectedPlatforms,
    subscriptionTier: tier,
    handleUpgradeSubscription,
    canEmbed
  };
};
