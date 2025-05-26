
import { Card } from "@/components/ui/card";
import FreeTierAnalyticsCard from "./analytics/FreeTierAnalyticsCard";
import AnalyticsTabContent from "./analytics/AnalyticsTabContent";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, FileSpreadsheet, Bot, TrendingUp, Mic } from "lucide-react";

interface AnalyticsTabProps {
  isPremium: boolean;
  subscriptionTier: 'standard' | 'plus' | 'premium' | 'pro';
}

const AnalyticsTab = ({ isPremium, subscriptionTier }: AnalyticsTabProps) => {
  const isPro = subscriptionTier === 'pro';
  const isPlus = subscriptionTier === 'plus';
  const isPremiumTier = subscriptionTier === 'premium';
  
  // Define appropriate theme class based on subscription tier
  const themeClass = isPro ? 'pro-theme' : 
                   isPremiumTier ? 'premium-theme' : 
                   isPlus ? 'plus-theme' : 'standard-theme';
  
  if (!isPremium) {
    return (
      <div className="space-y-6">
        <FreeTierAnalyticsCard />
      </div>
    );
  }
  
  return (
    <div className={`space-y-6 ${themeClass}`}>
      {/* Gemini Deep Research Section */}
      <Card className="border-2 border-blue-600/50 bg-gradient-to-r from-blue-950/60 to-purple-950/60 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Brain className="mr-3 h-6 w-6 text-blue-400" />
              <div>
                <h2 className="text-xl font-bold text-blue-300">Gemini Deep Research Powered Analytics</h2>
                <p className="text-blue-200/80 text-sm mt-1">
                  Our AI continuously analyzes your venue's social media presence using Gemini Deep Research to provide comprehensive insights about customer sentiment, trending topics, and competitive positioning. Export your weekly insights to Google Notebook LM to generate an AI-powered podcast summary.
                </p>
              </div>
            </div>
            <Badge variant="outline" className="bg-blue-900/20 text-blue-400 border-blue-600">
              {isPro ? 'Upgrade to Pro' : 'Upgrade to Pro'}
            </Badge>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              className="border-blue-600 text-blue-400 hover:bg-blue-900/20 bg-blue-950/30"
              disabled={!isPro}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Generate Deep Research Report
            </Button>
            <Button 
              variant="outline" 
              className="border-purple-600 text-purple-400 hover:bg-purple-900/20 bg-purple-950/30"
              disabled={!isPro}
            >
              <Mic className="mr-2 h-4 w-4" />
              Create Notebook LM Podcast
            </Button>
          </div>
        </div>
      </Card>

      <AnalyticsTabContent isPremium={isPremium} isPro={isPro} />
    </div>
  );
};

export default AnalyticsTab;
