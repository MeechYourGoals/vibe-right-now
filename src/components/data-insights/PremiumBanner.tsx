
import { Crown, CreditCard, Star, ChartBar, BarChart3, FileText, Instagram, Phone, Video, Image } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface PremiumBannerProps {
  onUpgrade: (tier: string) => void;
}

const PremiumBanner = ({ onUpgrade }: PremiumBannerProps) => {
  return (
    <Card className="mb-6 bg-neutral-800 border-amber-800/30 text-gray-100">
      <CardHeader>
        <CardTitle className="flex items-center text-amber-400">
          <Crown className="mr-2 h-5 w-5" />
          Upgrade Your Venue Subscription
        </CardTitle>
        <CardDescription className="text-amber-300/80">
          Choose the perfect tier to grow your venue's presence on Vibe Right Now
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="plus" className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-6 bg-neutral-900">
            <TabsTrigger value="plus" className="data-[state=active]:bg-plus-primary data-[state=active]:text-white">Plus</TabsTrigger>
            <TabsTrigger value="premium" className="data-[state=active]:bg-premium-primary data-[state=active]:text-white">Premium</TabsTrigger>
            <TabsTrigger value="pro" className="data-[state=active]:bg-pro-primary data-[state=active]:text-white">Pro</TabsTrigger>
          </TabsList>
          
          <TabsContent value="plus">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-neutral-700 shadow-sm">
                <h3 className="font-semibold mb-2">Pin User Posts</h3>
                <p className="text-sm text-gray-300">Highlight the best user-generated content on your venue page</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-neutral-700 shadow-sm">
                <h3 className="font-semibold mb-2">Offer Discounts</h3>
                <p className="text-sm text-gray-300">Create and manage special offers to attract more customers</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-neutral-700 shadow-sm">
                <h3 className="font-semibold mb-2">Social Media Links</h3>
                <p className="text-sm text-gray-300">Link to your external platforms like Yelp, TikTok, Instagram, and more</p>
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
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-neutral-700 shadow-sm">
                <h3 className="font-semibold mb-2">Full Analytics</h3>
                <p className="text-sm text-gray-300">Access detailed insights about visitor demographics and behavior patterns</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-neutral-700 shadow-sm">
                <h3 className="font-semibold mb-2">Advertising Tools</h3>
                <p className="text-sm text-gray-300">Create targeted promotions and track their performance in real-time</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-neutral-700 shadow-sm">
                <div className="flex flex-col items-center">
                  <FileText className="mb-2 h-5 w-5 text-premium-light" />
                  <h3 className="font-semibold mb-2">Gemini & Notebook LM</h3>
                </div>
                <p className="text-sm text-gray-300">AI document analysis tools to extract insights from your business data</p>
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
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-neutral-700 shadow-sm relative">
                <Badge className="absolute -top-2 right-1/2 transform translate-x-1/2 bg-blue-500">Google Veo</Badge>
                <div className="flex flex-col items-center">
                  <Video className="mb-2 h-5 w-5 text-amber-400" />
                  <h3 className="font-semibold mb-2">Veo Marketing Videos</h3>
                </div>
                <p className="text-sm text-gray-300">
                  Generate professional 15-second video clips for social media with Google's Veo technology
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-neutral-700 shadow-sm relative">
                <Badge className="absolute -top-2 right-1/2 transform translate-x-1/2 bg-blue-500">Google Imagen</Badge>
                <div className="flex flex-col items-center">
                  <Image className="mb-2 h-5 w-5 text-amber-400" />
                  <h3 className="font-semibold mb-2">Imagen AI Graphics</h3>
                </div>
                <p className="text-sm text-gray-300">
                  Create custom posters, banners, and social media graphics with Google's Imagen 4
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-neutral-700 shadow-sm relative">
                <Badge className="absolute -top-2 right-1/2 transform translate-x-1/2 bg-blue-500">Google AI</Badge>
                <div className="flex flex-col items-center">
                  <FileText className="mb-2 h-5 w-5 text-amber-400" />
                  <h3 className="font-semibold mb-2">AI Business Analysis</h3>
                </div>
                <p className="text-sm text-gray-300">
                  Advanced financial analysis and recommendations powered by Gemini and Notebook LM
                </p>
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
        <p className="text-xs text-gray-400 text-center max-w-xl">
          All plans include basic venue profile features. Upgrade to Pro for exclusive access to Google's cutting-edge Veo and Imagen AI tools for marketing content creation.
          Annual billing available with a 15% discount.
        </p>
      </CardFooter>
    </Card>
  );
};

export default PremiumBanner;
