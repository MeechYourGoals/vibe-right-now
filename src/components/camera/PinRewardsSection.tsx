
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface PinRewardsSectionProps {
  availableToPin: boolean;
  onAvailableToPinChange: (checked: boolean) => void;
}

const PinRewardsSection: React.FC<PinRewardsSectionProps> = ({
  availableToPin,
  onAvailableToPinChange
}) => {
  return (
    <div className="flex items-start space-x-2">
      <Checkbox 
        id="pinForRewards" 
        checked={availableToPin} 
        onCheckedChange={(checked) => {
          if (typeof checked === 'boolean') {
            onAvailableToPinChange(checked);
          }
        }}
      />
      <div>
        <Label 
          htmlFor="pinForRewards" 
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
        >
          Pin for Rewards 
          <span className="ml-2 reward-badge">3x Points</span>
        </Label>
        <p className="text-xs text-muted-foreground mt-1">
          Make your posts available for longer than 90 days, Eligible for more points and Rewards if a Venue pins your post to their feed
        </p>
      </div>
    </div>
  );
};

export default PinRewardsSection;
