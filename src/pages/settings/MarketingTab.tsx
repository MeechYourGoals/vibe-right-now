
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import InfluencerMarketplace from "@/components/venue/marketplace/InfluencerMarketplace";
import UpcomingEvents from "@/components/venue/UpcomingEvents";
import MarketingSettingsCard from "@/components/venue/marketing/MarketingSettingsCard";

interface MarketingTabProps {
  subscriptionTier: 'standard' | 'plus' | 'premium' | 'pro';
}

const MarketingTab = ({ subscriptionTier }: MarketingTabProps) => {
  const isPro = subscriptionTier === 'pro';

  return (
    <div className="space-y-6">
      <InfluencerMarketplace subscriptionTier={subscriptionTier} />
      <MarketingSettingsCard isPro={isPro} />
      {isPro && <UpcomingEvents />}
    </div>
  );
};

export default MarketingTab;
