import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import InfluencerMarketplace from "@/components/venue/marketplace/InfluencerMarketplace";
import UpcomingEvents from "@/components/venue/UpcomingEvents";
import MarketingSettingsCard from "@/components/venue/marketing/MarketingSettingsCard";
import MetaAIProSettings from "@/components/settings/MetaAIProSettings";

interface MarketingTabProps {
  subscriptionTier: 'standard' | 'plus' | 'premium' | 'pro';
}

const MarketingTab = ({ subscriptionTier }: MarketingTabProps) => {
  const isPro = subscriptionTier === 'pro';
  const isPremium = subscriptionTier === 'premium' || isPro;

  return (
    <div className="space-y-6">
      {/* Meta AI Auto-Promo for Pro Users */}
      {isPro && (
        <MetaAIProSettings isPro={isPro} />
      )}

      {/* Existing marketing components */}
      <InfluencerMarketplace subscriptionTier={subscriptionTier} />
      <MarketingSettingsCard isPro={isPro} />
      {isPro && <UpcomingEvents />}
    </div>
  );
};

export default MarketingTab;
