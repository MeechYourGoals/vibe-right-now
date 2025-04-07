
import { FileLock } from "lucide-react";
import AiMarketingTools from "./AiMarketingTools";
import AiMarketerSuggestions from "./AiMarketerSuggestions";
import DiscountCodeAnalysis from "./DiscountCodeAnalysis";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

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
      <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border-blue-200 dark:border-blue-800/50">
        <AlertTitle className="text-blue-800 dark:text-blue-300">Marketing Suite Enabled</AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-400">
          Your premium account includes access to all AI-powered marketing tools and industry-standard templates.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AiMarketingTools />
        <AiMarketerSuggestions />
      </div>
      
      <DiscountCodeAnalysis />
      
      <div className="flex justify-center">
        <Button className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600">
          Schedule Marketing Consultation
        </Button>
      </div>
    </div>
  );
};

export default AdvertisingTab;
