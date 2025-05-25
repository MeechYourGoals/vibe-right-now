
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Mic, Video, Image, FileText, MessageSquare } from "lucide-react";

interface VernonProBannerProps {
  subscriptionTier: 'standard' | 'plus' | 'premium' | 'pro';
  onOpenVernon?: () => void;
}

const VernonProBanner: React.FC<VernonProBannerProps> = ({ subscriptionTier, onOpenVernon }) => {
  const isPro = subscriptionTier === 'pro';

  const openVernonChat = () => {
    if (onOpenVernon) {
      onOpenVernon();
    } else {
      // Create and dispatch custom event
      const event = new CustomEvent('open-vernon-chat', { 
        detail: { mode: 'venue' } 
      });
      window.dispatchEvent(event);
      
      // Alternative approach: manipulate DOM elements directly
      const chatButtons = document.querySelectorAll('.chatButton');
      if (chatButtons && chatButtons.length > 0) {
        (chatButtons[0] as HTMLElement).click();
      }
    }
  };

  return (
    <Card className="border border-amber-700 bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center text-white">
            <Brain className="mr-2 h-5 w-5 text-amber-300" />
            Vernon for Venues - AI-Powered Business Intelligence Suite
          </CardTitle>
          <Badge variant="outline" className="bg-amber-600 text-white border-amber-700">
            {isPro ? 'Pro Active' : 'Pro Required'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pb-4">
        <p className="text-sm text-neutral-100">
          Vernon for Venues is your comprehensive AI business intelligence suite, powered by Google's most advanced AI technologies. 
          Get conversational insights, generate marketing content, analyze documents, and create podcast summaries of your business data.
        </p>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2 text-xs text-white">
            <Brain className="h-4 w-4 text-amber-300" />
            <span><strong className="font-semibold">Gemini</strong> Deep Research & Analysis</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-white">
            <Video className="h-4 w-4 text-amber-300" />
            <span><strong className="font-semibold">Veo</strong> Video Content Generation</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-white">
            <Image className="h-4 w-4 text-amber-300" />
            <span><strong className="font-semibold">Imagen</strong> Marketing Visuals</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-white">
            <Mic className="h-4 w-4 text-amber-300" />
            <span><strong className="font-semibold">NotebookLM</strong> Podcast Summaries</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button 
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-medium border border-amber-700"
            onClick={openVernonChat}
            disabled={!isPro}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            {isPro ? 'Chat with Vernon AI' : 'Upgrade to Access Vernon'}
          </Button>
          
          {isPro && (
            <Button 
              variant="outline" 
              className="border-orange-600 text-orange-100 hover:bg-orange-700/50 bg-orange-600/20 hover:text-white"
            >
              <FileText className="mr-2 h-4 w-4" />
              Upload Business Documents
            </Button>
          )}
        </div>
        
        {isPro && (
          <div className="mt-3 p-3 bg-orange-600/20 rounded-lg border border-orange-700/50">
            <p className="text-xs text-orange-100">
              💡 <strong className="font-semibold">Pro Feature:</strong> Vernon analyzes your venue data using advanced AI to provide actionable insights. 
              Upload P&L sheets, customer data, or marketing materials to get conversational analysis and generate podcast summaries for easy consumption.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VernonProBanner;
