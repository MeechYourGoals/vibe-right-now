
import { Button } from "@/components/ui/button";

interface SubscriptionTierSelectorProps {
  subscriptionTier: 'standard' | 'plus' | 'premium' | 'pro';
  onTierChange: (tier: 'standard' | 'plus' | 'premium' | 'pro') => void;
}

const SubscriptionTierSelector = ({ 
  subscriptionTier, 
  onTierChange 
}: SubscriptionTierSelectorProps) => {
  return (
    <div className="flex items-center gap-2 text-xs">
      <Button 
        onClick={() => onTierChange('standard')}
        className={`px-2 py-1 rounded ${subscriptionTier === 'standard' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
      >
        Standard
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
        className={`px-2 py-1 rounded ${subscriptionTier === 'pro' ? 'bg-amber-500 text-white' : 'bg-muted'}`}
      >
        Pro
      </Button>
    </div>
  );
};

export default SubscriptionTierSelector;
