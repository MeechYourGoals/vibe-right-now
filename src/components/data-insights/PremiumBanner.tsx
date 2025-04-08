
import { Crown, CreditCard, Star, ChartBar, BarChart3, FileAnalytics } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PremiumBannerProps {
  onUpgrade: (tier: string) => void;
}

const PremiumBanner = ({ onUpgrade }: PremiumBannerProps) => {
  return (
    <Card className="mb-6 border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800/30">
      <CardHeader>
        <CardTitle className="flex items-center text-amber-700 dark:text-amber-400">
          <Crown className="mr-2 h-5 w-5" />
          Upgrade Your Venue Subscription
        </CardTitle>
        <CardDescription className="text-amber-600 dark:text-amber-500">
          Choose the perfect tier to grow your venue's presence on Vibe Right Now
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="plus" className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-6">
            <TabsTrigger value="plus">Plus</TabsTrigger>
            <TabsTrigger value="premium">Premium</TabsTrigger>
            <TabsTrigger value="pro">Pro</TabsTrigger>
          </TabsList>
          
          <TabsContent value="plus">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white dark:bg-amber-950/40 shadow-sm">
                <h3 className="font-semibold mb-2">Pin User Posts</h3>
                <p className="text-sm text-muted-foreground">Highlight the best user-generated content on your venue page</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white dark:bg-amber-950/40 shadow-sm">
                <h3 className="font-semibold mb-2">Offer Discounts</h3>
                <p className="text-sm text-muted-foreground">Create and manage special offers to attract more customers</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white dark:bg-amber-950/40 shadow-sm">
                <h3 className="font-semibold mb-2">Basic Analytics</h3>
                <p className="text-sm text-muted-foreground">Access foundational insights about your venue's performance</p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-lg font-medium mb-4">$29.99/month</p>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                onClick={() => onUpgrade('plus')}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Upgrade to Plus
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="premium">
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
                <h3 className="font-semibold mb-2">Vernon Concierge</h3>
                <p className="text-sm text-muted-foreground">Get personalized suggestions from our AI concierge service</p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-lg font-medium mb-4">$49.99/month</p>
              <Button 
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                onClick={() => onUpgrade('premium')}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Upgrade to Premium
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="pro">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white dark:bg-amber-950/40 shadow-sm">
                <h3 className="font-semibold mb-2">AI-Powered Analysis</h3>
                <p className="text-sm text-muted-foreground">Upload financial records for advanced AI insights and recommendations</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white dark:bg-amber-950/40 shadow-sm">
                <h3 className="font-semibold mb-2">Promoted Listings</h3>
                <p className="text-sm text-muted-foreground">Your venue automatically highlighted in trending and recommended sections</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white dark:bg-amber-950/40 shadow-sm">
                <h3 className="font-semibold mb-2">Priority Support</h3>
                <p className="text-sm text-muted-foreground">Get dedicated support and monthly marketing consultations</p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-lg font-medium mb-4">$99.99/month</p>
              <Button 
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                onClick={() => onUpgrade('pro')}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Upgrade to Pro
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-xs text-muted-foreground text-center max-w-xl">
          All plans include basic venue profile features. Upgrade anytime to access more powerful tools to grow your business. Annual billing available with a 15% discount.
        </p>
      </CardFooter>
    </Card>
  );
};

export default PremiumBanner;
