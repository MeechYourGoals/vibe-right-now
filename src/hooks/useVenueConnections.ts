
import { useState, useEffect } from 'react';

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
  
  // State to track subscription tier
  const [subscriptionTier, setSubscriptionTier] = useState<'standard' | 'plus' | 'premium' | 'pro'>('standard');
  
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
    
    // Check for subscription tier in localStorage
    const savedTier = localStorage.getItem('subscriptionTier');
    if (savedTier) {
      setSubscriptionTier(savedTier as 'standard' | 'plus' | 'premium' | 'pro');
    }
  }, [venueId]);
  
  // Handle upgrading subscription
  const handleUpgradeSubscription = () => {
    // For demo purposes, cycle through subscription tiers
    const tiers: Array<'standard' | 'plus' | 'premium' | 'pro'> = ['standard', 'plus', 'premium', 'pro'];
    const currentIndex = tiers.indexOf(subscriptionTier);
    const nextTier = tiers[(currentIndex + 1) % tiers.length];
    setSubscriptionTier(nextTier);
    localStorage.setItem('subscriptionTier', nextTier);
  };
  
  // Check if embedding is allowed (premium/pro tiers only)
  const canEmbed = subscriptionTier === 'premium' || subscriptionTier === 'pro';
  
  return {
    connectedPlatforms,
    setConnectedPlatforms,
    subscriptionTier,
    handleUpgradeSubscription,
    canEmbed
  };
};
