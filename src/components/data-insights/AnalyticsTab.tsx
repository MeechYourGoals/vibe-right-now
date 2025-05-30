
import { Card } from "@/components/ui/card";
import FreeTierAnalyticsCard from "./analytics/FreeTierAnalyticsCard";
import AnalyticsTabContent from "./analytics/AnalyticsTabContent";

interface AnalyticsTabProps {
  isPremium: boolean;
  subscriptionTier: 'standard' | 'plus' | 'premium' | 'pro';
}

const AnalyticsTab = ({ isPremium, subscriptionTier }: AnalyticsTabProps) => {
  const isPro = subscriptionTier === 'pro';
  const isPlus = subscriptionTier === 'plus';
  const isPremiumTier = subscriptionTier === 'premium';
  
  // Define appropriate theme class based on subscription tier
  const themeClass = isPro ? 'pro-theme' : 
                   isPremiumTier ? 'premium-theme' : 
                   isPlus ? 'plus-theme' : 'standard-theme';
  
  if (!isPremium) {
    return (
      <div className="space-y-6">
        <FreeTierAnalyticsCard />
      </div>
    );
  }
  
  return (
    <div className={`space-y-6 ${themeClass}`}>
      <AnalyticsTabContent isPremium={isPremium} isPro={isPro} />
    </div>
  );
};

export default AnalyticsTab;
