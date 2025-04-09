
import { Button } from "@/components/ui/button";
import { Megaphone } from "lucide-react";

const UpgradeToProBanner = () => {
  return (
    <div className="bg-pro-bg-dark/70 p-4 rounded-lg border border-pro-dark text-center">
      <Megaphone className="h-12 w-12 text-pro-light mx-auto mb-2" />
      <h3 className="text-lg font-medium mb-2 text-amber-100">Upgrade to Pro</h3>
      <p className="text-sm text-pro-light mb-4">
        Unlock advanced marketing tools and campaign management features.
      </p>
      <Button className="bg-gradient-to-r from-pro-primary to-pro-secondary hover:from-amber-700 hover:to-orange-700 text-white">
        Upgrade to Pro
      </Button>
    </div>
  );
};

export default UpgradeToProBanner;
