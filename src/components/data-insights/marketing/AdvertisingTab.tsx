
import { FileLock } from "lucide-react";
import AiMarketingTools from "./AiMarketingTools";
import AiMarketerSuggestions from "./AiMarketerSuggestions";
import DiscountCodeAnalysis from "./DiscountCodeAnalysis";

interface AdvertisingTabProps {
  isPremium: boolean;
}

const AdvertisingTab = ({ isPremium }: AdvertisingTabProps) => {
  if (!isPremium) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">
          Upgrade to premium to access advertising tools
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AiMarketingTools />
        <AiMarketerSuggestions />
      </div>
      <DiscountCodeAnalysis />
    </div>
  );
};

export default AdvertisingTab;
