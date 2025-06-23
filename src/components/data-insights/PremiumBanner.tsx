
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Video, Image, Brain, Pin, Percent, Link, BarChart, Target, Podcast, FileText, Users } from "lucide-react";

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
                className="w-full bg-purple-600 hover:bg-purple-700 text-white border-purple-500"
              >
                Plus
              </Button>
            </div>
            <div className="space-y-3 text-center text-sm text-muted-foreground">
              <div className="flex items-center justify-center">
                <Pin className="mr-2 h-4 w-4 text-purple-400" />
                Pin User Posts
              </div>
              <div className="flex items-center justify-center">
                <Percent className="mr-2 h-4 w-4 text-purple-400" />
                Offer Discounts
              </div>
              <div className="flex items-center justify-center">
                <Link className="mr-2 h-4 w-4 text-purple-400" />
                External Platform Links
              </div>
              <p className="text-xs">
                Highlight the best user-generated content, create special offers, and link to your external platforms like Yelp, Instagram, and more
              </p>
            </div>
            <div className="text-center mt-4">
              <div className="text-lg font-bold text-foreground">$29.99/month</div>
            </div>
          </div>

          {/* Premium Tier */}
          <div className="bg-card/50 border border-border rounded-lg p-4">
            <div className="text-center mb-4">
              <Button 
                variant="outline" 
                className="w-full bg-green-600 hover:bg-green-700 text-white border-green-500"
              >
                Premium
              </Button>
            </div>
            <div className="space-y-3 text-center text-sm text-muted-foreground">
              <div className="flex items-center justify-center">
                <BarChart className="mr-2 h-4 w-4 text-green-400" />
                Perplexity Research Analytics
              </div>
              <div className="flex items-center justify-center">
                <Target className="mr-2 h-4 w-4 text-green-400" />
                Enhanced Advertising Tools
              </div>
              <div className="flex items-center justify-center">
                <Podcast className="mr-2 h-4 w-4 text-green-400" />
                Notebook LM Podcast Reports
              </div>
              <p className="text-xs">
                Access detailed insights powered by Perplexity about visitor demographics and behavior patterns, create targeted promotions and track their performance in real-time, and generate AI-powered podcast summaries of your weekly insights using Google Notebook LM
              </p>
            </div>
            <div className="text-center mt-4">
              <div className="text-lg font-bold text-foreground">$49.99/month</div>
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
                <FileText className="mr-2 h-4 w-4 text-orange-400" />
                AI Financial Analysis
              </div>
              <div className="flex items-center justify-center">
                <Video className="mr-2 h-4 w-4 text-orange-400" />
                Veo 3 Video Generation
              </div>
              <div className="flex items-center justify-center">
                <Image className="mr-2 h-4 w-4 text-orange-400" />
                Imagen 4 Graphics
              </div>
              <div className="flex items-center justify-center">
                <Users className="mr-2 h-4 w-4 text-orange-400" />
                Influencer Marketplace
              </div>
              <p className="text-xs">
                Everything in Plus and Premium, plus AI-powered Perplexity analysis of uploaded financial records, access to Google's Veo and Imagen AI models to create ads and videos for marketing campaigns, and access to the Influencer Marketplace
              </p>
            </div>
            <div className="text-center mt-4">
              <div className="text-lg font-bold text-foreground">$99.99/month</div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button 
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8"
            onClick={() => onUpgrade('pro')}
          >
            Upgrade to Pro
          </Button>
          <p className="text-xs text-muted-foreground mt-4 max-w-2xl mx-auto">
            All plans include basic venue profile features. Upgrade to Pro for access to cutting-edge Perplexity, Veo, Imagen,
            and Notebook LM technologies to grow your business. Project Mariner handles bookings automatically. Annual billing 
            available with a 15% discount.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PremiumBanner;
