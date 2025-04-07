
import { Crown, CreditCard } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PremiumBannerProps {
  onUpgrade: () => void;
}

const PremiumBanner = ({ onUpgrade }: PremiumBannerProps) => {
  return (
    <Card className="mb-6 border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800/30">
      <CardHeader>
        <CardTitle className="flex items-center text-amber-700 dark:text-amber-400">
          <Crown className="mr-2 h-5 w-5" />
          Upgrade to Premium
        </CardTitle>
        <CardDescription className="text-amber-600 dark:text-amber-500">
          Unlock advanced analytics and advertising tools
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white dark:bg-amber-950/40 shadow-sm">
            <h3 className="font-semibold mb-2">Full Analytics</h3>
            <p className="text-sm text-muted-foreground">Access detailed insights about visitor demographics and behavior patterns</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white dark:bg-amber-950/40 shadow-sm">
            <h3 className="font-semibold mb-2">Advertising Tools</h3>
            <p className="text-sm text-muted-foreground">Create targeted promotions and track their performance in real-time</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white dark:bg-amber-950/40 shadow-sm">
            <h3 className="font-semibold mb-2">Competitor Analysis</h3>
            <p className="text-sm text-muted-foreground">Compare your venue performance with industry averages</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button 
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
          onClick={onUpgrade}
        >
          <CreditCard className="mr-2 h-4 w-4" />
          Upgrade Now - $49.99/month
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PremiumBanner;
