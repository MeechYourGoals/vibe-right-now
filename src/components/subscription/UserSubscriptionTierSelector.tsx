
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserSubscriptionTier } from '@/types/subscription';
import { useUserSubscription } from '@/hooks/useUserSubscription';
import { Star, Crown, Zap } from "lucide-react";

interface UserSubscriptionTierSelectorProps {
  className?: string;
}

const UserSubscriptionTierSelector: React.FC<UserSubscriptionTierSelectorProps> = ({ 
  className = "" 
}) => {
  const { tier, updateSubscriptionTier } = useUserSubscription();

  const getTierIcon = (tierName: UserSubscriptionTier) => {
    switch (tierName) {
      case 'plus': return <Star className="h-3 w-3" />;
      case 'premium': return <Crown className="h-3 w-3" />;
      case 'pro': return <Zap className="h-3 w-3" />;
      default: return null;
    }
  };

  const getTierColor = (tierName: UserSubscriptionTier) => {
    switch (tierName) {
      case 'free': return tier === 'free' ? 'bg-gray-500 text-white' : 'bg-muted text-muted-foreground';
      case 'plus': return tier === 'plus' ? 'bg-blue-500 text-white' : 'bg-muted text-muted-foreground';
      case 'premium': return tier === 'premium' ? 'bg-purple-500 text-white' : 'bg-muted text-muted-foreground';
      case 'pro': return tier === 'pro' ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white' : 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className={`flex items-center gap-2 text-xs ${className}`}>
      <Button 
        onClick={() => updateSubscriptionTier('free')}
        className={`px-2 py-1 rounded text-xs h-auto ${getTierColor('free')}`}
        variant="ghost"
      >
        Free
      </Button>
      <Button 
        onClick={() => updateSubscriptionTier('plus')}
        className={`px-2 py-1 rounded text-xs h-auto ${getTierColor('plus')} flex items-center gap-1`}
        variant="ghost"
      >
        {getTierIcon('plus')}
        Plus
      </Button>
      <Button 
        onClick={() => updateSubscriptionTier('premium')}
        className={`px-2 py-1 rounded text-xs h-auto ${getTierColor('premium')} flex items-center gap-1`}
        variant="ghost"
      >
        {getTierIcon('premium')}
        Premium
      </Button>
      <Button 
        onClick={() => updateSubscriptionTier('pro')}
        className={`px-2 py-1 rounded text-xs h-auto ${getTierColor('pro')} flex items-center gap-1`}
        variant="ghost"
      >
        {getTierIcon('pro')}
        Pro
      </Button>
    </div>
  );
};

export default UserSubscriptionTierSelector;
