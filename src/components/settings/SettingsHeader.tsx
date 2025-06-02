
import ModeToggle from "./ModeToggle";
import SubscriptionTierSelector from "./SubscriptionTierSelector";
import { UserSubscriptionTier } from "@/types/subscription";

interface SettingsHeaderProps {
  isVenueMode: boolean;
  onModeToggle: () => void;
  subscriptionTier?: UserSubscriptionTier;
  onTierChange?: (tier: UserSubscriptionTier) => void;
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
        
        {/* Show subscription tier selector only for user mode */}
        {!isVenueMode && subscriptionTier && onTierChange && (
          <SubscriptionTierSelector 
            subscriptionTier={subscriptionTier}
            onTierChange={onTierChange}
          />
        )}
      </div>
    </div>
  );
};

export default SettingsHeader;
