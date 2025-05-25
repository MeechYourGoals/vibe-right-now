
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Star, BarChart, Target, Brain } from "lucide-react";

interface PremiumBannerProps {
  onUpgrade: (tier: string) => void;
}

const PremiumBanner = ({ onUpgrade }: PremiumBannerProps) => {
  return (
    <Card className="border border-neutral-700 bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-800 backdrop-blur-sm mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center text-white">
            <Crown className="mr-2 h-5 w-5 text-amber-400" />
            Upgrade Your Venue Subscription
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pb-4">
        <p className="text-sm text-neutral-300">
          Choose the perfect tier to grow your venue's presence on Vibe Right Now
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tier: Plus */}
          <div className="bg-neutral-800/70 border border-neutral-700 rounded-lg p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Plus</h3>
              <p className="text-sm text-neutral-400 mb-3">Highlight the best user-generated content on your venue page.</p>
            </div>
            <Button 
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-amber-700"
              onClick={() => onUpgrade('plus')}
            >
              Upgrade to Plus
            </Button>
          </div>
          
          {/* Tier: Premium */}
          <div className="bg-neutral-800/70 border border-neutral-700 rounded-lg p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Premium</h3>
              <p className="text-sm text-neutral-400 mb-3">Create and manage special offers to attract more customers.</p>
            </div>
            <Button 
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-amber-700"
              onClick={() => onUpgrade('premium')}
            >
              Upgrade to Premium
            </Button>
          </div>
          
          {/* Tier: Pro */}
          <div className="bg-neutral-800/70 border border-neutral-700 rounded-lg p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Pro</h3>
              <p className="text-sm text-neutral-400 mb-3">Link to your external platforms and unlock advanced AI tools.</p>
            </div>
            <Button 
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-amber-700"
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
