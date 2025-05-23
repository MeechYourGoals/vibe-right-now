
import { Crown, CreditCard, Star, ChartBar, BarChart3, FileText, Instagram, Phone, Video, Image } from "lucide-react";
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
                <h3 className="font-semibold mb-2">Social Media Links</h3>
                <p className="text-sm text-muted-foreground">Link to your external platforms like Yelp, TikTok, Instagram, and more</p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-lg font-medium mb-4">$29.99/month</p>
              <Button 
                className="bg-gradient-to-r from-plus-primary to-plus-secondary hover:from-purple-600 hover:to-teal-600"
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
                <h3 className="font-semibold mb-2">Weekly Content Import</h3>
                <p className="text-sm text-muted-foreground">Automatically import and display your content from Yelp, Google, TikTok, Instagram, and more</p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-lg font-medium mb-4">$49.99/month</p>
              <Button 
                className="bg-gradient-to-r from-premium-primary to-premium-secondary hover:from-green-600 hover:to-blue-600"
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
                <p className="text-sm text-muted-foreground">Use Notebook LM to analyze financial records and get advanced insights</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white dark:bg-amber-950/40 shadow-sm">
                <div className="flex items-center">
                  <Video className="h-4 w-4 mr-1 text-amber-600" />
                  <h3 className="font-semibold mb-2">Veo 3 Video Generation</h3>
                </div>
                <p className="text-sm text-muted-foreground">Create auto-generated promo videos for social media in just 15 seconds</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white dark:bg-amber-950/40 shadow-sm">
                <div className="flex items-center">
                  <Image className="h-4 w-4 mr-1 text-amber-600" />
                  <h3 className="font-semibold mb-2">Imagen 4 Graphics</h3>
                </div>
                <p className="text-sm text-muted-foreground">Generate high-quality posters, banners and promotional images for your venue</p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-lg font-medium mb-4">$99.99/month</p>
              <Button 
                className="bg-gradient-to-r from-pro-primary to-pro-secondary hover:from-amber-600 hover:to-orange-600"
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
          All plans include basic venue profile features. Upgrade to Pro for access to Google's cutting-edge Gemini, Veo, Imagen, and Notebook LM technologies to grow your business. Annual billing available with a 15% discount.
        </p>
      </CardFooter>
    </Card>
  );
};

export default PremiumBanner;
