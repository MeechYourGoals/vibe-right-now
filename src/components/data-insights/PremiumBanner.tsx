
import { Crown, CreditCard, Star, ChartBar, BarChart3, FileText, Instagram, Phone, Video, Image } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PremiumBannerProps {
  onUpgrade: (tier: string) => void;
}

const PremiumBanner = ({ onUpgrade }: PremiumBannerProps) => {
  return (
    <Card className="mb-6 border-2 border-neutral-700 bg-neutral-900 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-amber-400">
          <Crown className="mr-2 h-5 w-5" />
          Upgrade Your Venue Subscription
        </CardTitle>
        <CardDescription className="text-neutral-400">
          Choose the perfect tier to grow your venue's presence on Vibe Right Now
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="plus" className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-6 bg-neutral-800 border border-neutral-700">
            <TabsTrigger value="plus" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-neutral-300">Plus</TabsTrigger>
            <TabsTrigger value="premium" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-neutral-300">Premium</TabsTrigger>
            <TabsTrigger value="pro" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white text-neutral-300">Pro</TabsTrigger>
          </TabsList>
          
          <TabsContent value="plus">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-neutral-800 border border-neutral-700">
                <h3 className="font-semibold mb-2 text-white">Pin User Posts</h3>
                <p className="text-sm text-neutral-400">Highlight the best user-generated content on your venue page</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-neutral-800 border border-neutral-700">
                <h3 className="font-semibold mb-2 text-white">Offer Discounts</h3>
                <p className="text-sm text-neutral-400">Create and manage special offers to attract more customers</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-neutral-800 border border-neutral-700">
                <h3 className="font-semibold mb-2 text-white">Social Media Links</h3>
                <p className="text-sm text-neutral-400">Link to your external platforms like Yelp, Instagram, and more</p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-lg font-medium mb-4 text-white">$29.99/month</p>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0"
                onClick={() => onUpgrade('plus')}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Upgrade to Plus
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="premium">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-neutral-800 border border-neutral-700">
                <h3 className="font-semibold mb-2 text-white">Gemini Deep Research Analytics</h3>
                <p className="text-sm text-neutral-400">Access detailed insights powered by Google's Gemini AI about visitor demographics and behavior patterns</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-neutral-800 border border-neutral-700">
                <h3 className="font-semibold mb-2 text-white">Advertising Tools</h3>
                <p className="text-sm text-neutral-400">Create targeted promotions and track their performance in real-time</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-neutral-800 border border-neutral-700">
                <h3 className="font-semibold mb-2 text-white">Notebook LM Podcast Reports</h3>
                <p className="text-sm text-neutral-400">Generate AI-powered podcast summaries of your weekly insights using Google Notebook LM</p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-lg font-medium mb-4 text-white">$49.99/month</p>
              <Button 
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white border-0"
                onClick={() => onUpgrade('premium')}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Upgrade to Premium
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="pro">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-neutral-800 border border-neutral-700">
                <h3 className="font-semibold mb-2 text-white">AI-Powered Financial Analysis</h3>
                <p className="text-sm text-neutral-400">Use Gemini and Notebook LM to analyze financial records and get advanced conversational insights</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-neutral-800 border border-neutral-700">
                <div className="flex items-center justify-center mb-2">
                  <Video className="h-4 w-4 mr-1 text-amber-400" />
                  <h3 className="font-semibold text-white">Veo 3 Video Generation</h3>
                </div>
                <p className="text-sm text-neutral-400">Create auto-generated promo videos for social media in just 15 seconds using Google's Veo AI</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-neutral-800 border border-neutral-700">
                <div className="flex items-center justify-center mb-2">
                  <Image className="h-4 w-4 mr-1 text-amber-400" />
                  <h3 className="font-semibold text-white">Imagen 4 Graphics</h3>
                </div>
                <p className="text-sm text-neutral-400">Generate high-quality posters, banners and promotional images for your venue using Google's Imagen AI</p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-lg font-medium mb-4 text-white">$99.99/month</p>
              <Button 
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white border-0"
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
        <p className="text-xs text-neutral-500 text-center max-w-xl">
          All plans include basic venue profile features. Upgrade to Pro for access to Google's cutting-edge Gemini, Veo, Imagen, and Notebook LM technologies to grow your business. Project Mariner handles bookings automatically. Annual billing available with a 15% discount.
        </p>
      </CardFooter>
    </Card>
  );
};

export default PremiumBanner;
