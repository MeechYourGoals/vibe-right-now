
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Zap, Target, TrendingUp } from "lucide-react";

interface PremiumBannerProps {
  onUpgrade: (tier: string) => void;
}

const PremiumBanner = ({ onUpgrade }: PremiumBannerProps) => {
  return (
    <Card className="bg-gradient-to-r from-neutral-800/80 to-neutral-700/80 border-amber-700/50 mb-6 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Crown className="h-6 w-6 text-amber-400 mr-3" />
            <div>
              <CardTitle className="text-xl text-amber-200">Upgrade Your Venue Subscription</CardTitle>
              <p className="text-amber-300/80 mt-1">Choose the perfect tier to grow your venue's presence on Vibe Right Now</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Subscription Tier Selector */}
        <div className="bg-neutral-900/80 rounded-lg p-1 flex border border-neutral-700">
          <div className="flex-1 text-center py-3 px-6 rounded-md bg-purple-600 text-white font-medium">Plus</div>
          <div className="flex-1 text-center py-3 px-6 text-neutral-300">Premium</div>
          <div className="flex-1 text-center py-3 px-6 text-neutral-300">Pro</div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-neutral-800/60 rounded-lg p-6 text-center border border-neutral-600/50">
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Pin User Posts</h3>
            <p className="text-neutral-300 text-sm">Highlight the best user-generated content on your venue page</p>
          </div>

          <div className="bg-neutral-800/60 rounded-lg p-6 text-center border border-neutral-600/50">
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Offer Discounts</h3>
            <p className="text-neutral-300 text-sm">Create and manage special offers to attract more customers</p>
          </div>

          <div className="bg-neutral-800/60 rounded-lg p-6 text-center border border-neutral-600/50">
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Social Media Links</h3>
            <p className="text-neutral-300 text-sm">Link to your external platforms like Yelp, Instagram, and more</p>
          </div>
        </div>

        {/* Pricing */}
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-2">$29.99/month</div>
          <Button 
            onClick={() => onUpgrade('plus')}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3"
          >
            <Crown className="mr-2 h-4 w-4" />
            Upgrade to Plus
          </Button>
        </div>

        <p className="text-center text-neutral-300 text-sm">
          All plans include basic venue profile features. Upgrade to Pro for access to Google's cutting-edge Gemini, Veo, Imagen, 
          and Notebook LM technologies to grow your business. Annual billing available with a 15% discount.
        </p>
      </CardContent>
    </Card>
  );
};

export default PremiumBanner;
