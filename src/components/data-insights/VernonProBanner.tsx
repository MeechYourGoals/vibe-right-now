
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
    <Card className="border-2 border-amber-600 bg-gradient-to-r from-amber-950/20 to-orange-950/20 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center text-amber-400">
            <Brain className="mr-2 h-5 w-5" />
            Vernon for Venues - AI-Powered Business Intelligence Suite
          </CardTitle>
          <Badge variant="outline" className="bg-amber-900/20 text-amber-400 border-amber-600">
            {isPro ? 'Pro Active' : 'Pro Required'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pb-4">
        <p className="text-sm text-amber-200">
          Vernon for Venues is your comprehensive AI business intelligence suite, powered by Google's most advanced AI technologies. 
          Get conversational insights, generate marketing content, analyze documents, and create podcast summaries of your business data.
        </p>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2 text-xs text-amber-300">
            <Brain className="h-4 w-4" />
            <span>Gemini Deep Research & Analysis</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-amber-300">
            <Video className="h-4 w-4" />
            <span>Veo Video Content Generation</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-amber-300">
            <Image className="h-4 w-4" />
            <span>Imagen Marketing Visuals</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-amber-300">
            <Mic className="h-4 w-4" />
            <span>NotebookLM Podcast Summaries</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button 
            className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-medium"
            onClick={openVernonChat}
            disabled={!isPro}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            {isPro ? 'Chat with Vernon AI' : 'Upgrade to Access Vernon'}
          </Button>
          
          {isPro && (
            <Button 
              variant="outline" 
              className="border-amber-600 text-amber-400 hover:bg-amber-900/20 bg-amber-950/30"
            >
              <FileText className="mr-2 h-4 w-4" />
              Upload Business Documents
            </Button>
          )}
        </div>
        
        {isPro && (
          <div className="mt-3 p-3 bg-amber-950/30 rounded-lg border border-amber-800/30">
            <p className="text-xs text-amber-300">
              💡 <strong>Pro Feature:</strong> Vernon analyzes your venue data using advanced AI to provide actionable insights. 
              Upload P&L sheets, customer data, or marketing materials to get conversational analysis and generate podcast summaries for easy consumption.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VernonProBanner;
