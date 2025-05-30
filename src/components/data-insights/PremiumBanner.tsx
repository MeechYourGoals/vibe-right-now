
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Video, Image, Brain } from "lucide-react";

interface PremiumBannerProps {
  onUpgrade: (tier: string) => void;
}

const PremiumBanner = ({ onUpgrade }: PremiumBannerProps) => {
  return (
    <Card className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 border-orange-500/20 mb-6">
      <CardHeader>
        <CardTitle className="flex items-center text-orange-400">
          <Crown className="mr-2 h-5 w-5" />
          Upgrade Your Venue Subscription
        </CardTitle>
        <p className="text-muted-foreground">
          Choose the perfect tier to grow your venue's presence on Vibe Right Now
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Plus Tier */}
          <div className="bg-card/50 border border-border rounded-lg p-4">
            <div className="text-center mb-4">
              <Button 
                variant="outline" 
                className="w-full bg-slate-600 hover:bg-slate-700 text-white border-slate-500"
              >
                Plus
              </Button>
            </div>
            <div className="space-y-3 text-center text-sm text-muted-foreground">
              <div className="flex items-center justify-center">
                <Brain className="mr-2 h-4 w-4 text-purple-400" />
                AI-Powered Financial Analysis
              </div>
              <p className="text-xs">
                Use Notebook LM to analyze financial records and get advanced insights
              </p>
            </div>
          </div>

          {/* Premium Tier */}
          <div className="bg-card/50 border border-border rounded-lg p-4">
            <div className="text-center mb-4">
              <Button 
                variant="outline" 
                className="w-full bg-slate-600 hover:bg-slate-700 text-white border-slate-500"
              >
                Premium
              </Button>
            </div>
            <div className="space-y-3 text-center text-sm text-muted-foreground">
              <div className="flex items-center justify-center">
                <Video className="mr-2 h-4 w-4 text-blue-400" />
                Veo 3 Video Generation
              </div>
              <p className="text-xs">
                Create auto-generated promo videos for social media in just 15 seconds using Google's Veo AI
              </p>
            </div>
          </div>

          {/* Pro Tier */}
          <div className="bg-card/50 border border-border rounded-lg p-4">
            <div className="text-center mb-4">
              <Button 
                variant="outline" 
                className="w-full bg-orange-600 hover:bg-orange-700 text-white border-orange-500"
              >
                Pro
              </Button>
            </div>
            <div className="space-y-3 text-center text-sm text-muted-foreground">
              <div className="flex items-center justify-center">
                <Image className="mr-2 h-4 w-4 text-green-400" />
                Imagen 4 Graphics
              </div>
              <p className="text-xs">
                Generate high-quality posters, banners and promotional images for your venue using Google's Imagen AI
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-foreground mb-4">$99.99/month</div>
          <Button 
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8"
            onClick={() => onUpgrade('pro')}
          >
            Upgrade to Pro
          </Button>
          <p className="text-xs text-muted-foreground mt-4 max-w-2xl mx-auto">
            All plans include basic venue profile features. Upgrade to Pro for access to Google's cutting-edge Gemini, Veo, Imagen, 
            and Notebook LM technologies to grow your business. Project Mariner handles bookings automatically. Annual billing 
            available with a 15% discount.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PremiumBanner;
