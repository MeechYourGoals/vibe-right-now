
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProMarketingFeatures from "./ProMarketingFeatures";
import UpgradeToProBanner from "./UpgradeToProBanner";

interface MarketingSettingsCardProps {
  isPro: boolean;
}

const MarketingSettingsCard = ({ isPro }: MarketingSettingsCardProps) => {
  return (
    <Card className="bg-pro-bg-dark text-white">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-amber-100">Marketing Settings</CardTitle>
            <CardDescription className="text-pro-light">
              Manage marketing campaigns, promotions, and customer engagement settings.
            </CardDescription>
          </div>
          {isPro && (
            <Badge className="bg-pro-primary hover:bg-pro-secondary text-white font-medium">Pro Feature</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isPro ? <ProMarketingFeatures /> : <UpgradeToProBanner />}
      </CardContent>
    </Card>
  );
};

export default MarketingSettingsCard;
