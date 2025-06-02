
import { Button } from "@/components/ui/button";
import { UserSubscriptionTier } from "@/types/subscription";

interface SubscriptionTierSelectorProps {
  subscriptionTier: UserSubscriptionTier;
  onTierChange: (tier: UserSubscriptionTier) => void;
}

const SubscriptionTierSelector = ({ 
  subscriptionTier, 
  onTierChange 
}: SubscriptionTierSelectorProps) => {
  return (
    <div className="flex items-center gap-2 text-xs">
      <Button 
        onClick={() => onTierChange('free')}
        className={`px-2 py-1 rounded ${subscriptionTier === 'free' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
      >
        Free
      </Button>
      <Button 
        onClick={() => onTierChange('plus')}
        className={`px-2 py-1 rounded ${subscriptionTier === 'plus' ? 'bg-blue-500 text-white' : 'bg-muted'}`}
      >
        Plus
      </Button>
      <Button 
        onClick={() => onTierChange('premium')}
        className={`px-2 py-1 rounded ${subscriptionTier === 'premium' ? 'bg-purple-500 text-white' : 'bg-muted'}`}
      >
        Premium
      </Button>
      <Button 
        onClick={() => onTierChange('pro')}
        className={`px-2 py-1 rounded ${subscriptionTier === 'pro' ? 'bg-pink-500 text-white' : 'bg-muted'}`}
      >
        Pro
      </Button>
    </div>
  );
};

export default SubscriptionTierSelector;
