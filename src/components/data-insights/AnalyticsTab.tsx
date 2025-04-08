
import { Card } from "@/components/ui/card";
import FreeTierAnalyticsCard from "./analytics/FreeTierAnalyticsCard";
import AnalyticsTabContent from "./analytics/AnalyticsTabContent";

interface AnalyticsTabProps {
  isPremium: boolean;
  subscriptionTier: 'standard' | 'plus' | 'premium' | 'pro';
}

const AnalyticsTab = ({ isPremium, subscriptionTier }: AnalyticsTabProps) => {
  const isPro = subscriptionTier === 'pro';
  
  if (!isPremium) {
    return (
      <div className="space-y-6">
        <FreeTierAnalyticsCard />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <AnalyticsTabContent isPremium={isPremium} isPro={isPro} />
    </div>
  );
};

export default AnalyticsTab;
