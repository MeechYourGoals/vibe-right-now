
import ModeToggle from "./ModeToggle";
import SubscriptionTierSelector from "./SubscriptionTierSelector";
import UserSubscriptionTierSelector from "../subscription/UserSubscriptionTierSelector";

interface SettingsHeaderProps {
  isVenueMode: boolean;
  onModeToggle: () => void;
  subscriptionTier: 'standard' | 'plus' | 'premium' | 'pro';
  onTierChange: (tier: 'standard' | 'plus' | 'premium' | 'pro') => void;
}

const SettingsHeader = ({
  isVenueMode,
  onModeToggle,
  subscriptionTier,
  onTierChange
}: SettingsHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      
      <div className="flex flex-wrap items-center gap-4">
        <ModeToggle isVenueMode={isVenueMode} onToggle={onModeToggle} />
        
        {isVenueMode ? (
          <SubscriptionTierSelector 
            subscriptionTier={subscriptionTier}
            onTierChange={onTierChange}
          />
        ) : (
          <UserSubscriptionTierSelector />
        )}
      </div>
    </div>
  );
};

export default SettingsHeader;
