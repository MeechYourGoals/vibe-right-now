
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProMarketingFeatures from "./ProMarketingFeatures";
import UpgradeToProBanner from "./UpgradeToProBanner";

interface MarketingSettingsCardProps {
  isPro: boolean;
}

const MarketingSettingsCard = ({ isPro }: MarketingSettingsCardProps) => {
  return (
    <Card className="bg-amber-950 text-white">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-amber-100">Marketing Settings</CardTitle>
            <CardDescription className="text-amber-200">
              Manage marketing campaigns, promotions, and customer engagement settings.
            </CardDescription>
          </div>
          {isPro && (
            <Badge className="bg-amber-500 hover:bg-amber-600 text-amber-950 font-medium">Pro Feature</Badge>
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
