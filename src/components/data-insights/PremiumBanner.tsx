
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Star, BarChart, Target, Brain } from "lucide-react";

interface PremiumBannerProps {
  onUpgrade: (tier: string) => void;
}

const PremiumBanner = ({ onUpgrade }: PremiumBannerProps) => {
  return (
    <Card className="border-2 border-orange-500 bg-neutral-900 backdrop-blur-sm mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center text-orange-400">
            <Crown className="mr-2 h-5 w-5" />
            Upgrade Your Venue Subscription
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pb-4">
        <p className="text-sm text-orange-200">
          Choose the perfect tier to grow your venue's presence on Vibe Right Now
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-neutral-800 border border-neutral-600 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-purple-400 mb-2">Plus</h3>
            <p className="text-sm text-neutral-300 mb-3">Highlight the best user-generated content on your venue page</p>
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-white"
              onClick={() => onUpgrade('plus')}
            >
              Upgrade to Plus
            </Button>
          </div>
          
          <div className="bg-neutral-800 border border-neutral-600 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-400 mb-2">Premium</h3>
            <p className="text-sm text-neutral-300 mb-3">Create and manage special offers to attract more customers</p>
            <Button 
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
              onClick={() => onUpgrade('premium')}
            >
              Upgrade to Premium
            </Button>
          </div>
          
          <div className="bg-neutral-800 border border-neutral-600 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-amber-400 mb-2">Pro</h3>
            <p className="text-sm text-neutral-300 mb-3">Link to your external platforms like Yelp, Instagram, and more</p>
            <Button 
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
              onClick={() => onUpgrade('pro')}
            >
              Upgrade to Pro
            </Button>
          </div>
        </div>
        
        <p className="text-xs text-neutral-400 text-center">
          All plans include basic venue profile features. Upgrade to Pro for access to Google's cutting-edge Gemini, Veo, Imagen,
          and Notebook LM technologies to grow your business. Annual billing available with a 15% discount.
        </p>
      </CardContent>
    </Card>
  );
};

export default PremiumBanner;
