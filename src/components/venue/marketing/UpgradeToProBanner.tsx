
import { Button } from "@/components/ui/button";
import { Megaphone } from "lucide-react";

const UpgradeToProBanner = () => {
  return (
    <div className="bg-amber-900/70 p-4 rounded-lg border border-amber-700 text-center">
      <Megaphone className="h-12 w-12 text-amber-400 mx-auto mb-2" />
      <h3 className="text-lg font-medium mb-2 text-amber-100">Upgrade to Pro</h3>
      <p className="text-sm text-amber-200 mb-4">
        Unlock advanced marketing tools and campaign management features.
      </p>
      <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white">
        Upgrade to Pro
      </Button>
    </div>
  );
};

export default UpgradeToProBanner;
