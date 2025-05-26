import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Video, Image, Mic, MessageSquare, FileText } from "lucide-react"; // Updated imports

interface VernonProBannerProps {
  subscriptionTier: 'standard' | 'plus' | 'premium' | 'pro';
  isPro?: boolean; // Added isPro
}

const VernonProBanner = ({ subscriptionTier, isPro }: VernonProBannerProps) => {
  const openVernonChat = () => console.log("openVernonChat called - placeholder");

  return (
    <Card className="border border-amber-600/80 bg-gradient-to-r from-amber-950/80 via-amber-800/80 to-orange-700/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <Brain className="h-6 w-6 text-amber-300 mr-3" /> {/* Adjusted icon size for consistency */}
            <div>
              <CardTitle className="flex items-center text-white text-xl"> {/* Adjusted title size */}
                Vernon for Venues - AI-Powered Business Intelligence Suite
              </CardTitle>
            </div>
          </div>
          <Badge variant="outline" className="bg-amber-700/80 text-white border-amber-600/80">
            {isPro ? 'Pro Active' : 'Pro Required'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm text-neutral-100">
          Vernon for Venues is your comprehensive AI business intelligence suite, powered by Google's most advanced AI technologies. 
          Get conversational insights, generate marketing content, analyze documents, and create podcast summaries of your business data.
        </p>
        
        {/* AI Features Grid - User's version structure with updated styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2 text-xs text-white">
            <div className="w-8 h-8 bg-amber-700/30 rounded-lg flex items-center justify-center flex-shrink-0">
              <Brain className="h-4 w-4 text-amber-300" />
            </div>
            <span><strong className="font-semibold">Gemini</strong> Deep Research & Analysis</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-white">
            <div className="w-8 h-8 bg-amber-700/30 rounded-lg flex items-center justify-center flex-shrink-0">
              <Video className="h-4 w-4 text-amber-300" />
            </div>
            <span><strong className="font-semibold">Veo</strong> Video Content Generation</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-white">
            <div className="w-8 h-8 bg-amber-700/30 rounded-lg flex items-center justify-center flex-shrink-0">
              <Image className="h-4 w-4 text-amber-300" />
            </div>
            <span><strong className="font-semibold">Imagen</strong> Marketing Visuals</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-white">
            <div className="w-8 h-8 bg-amber-700/30 rounded-lg flex items-center justify-center flex-shrink-0">
              <Mic className="h-4 w-4 text-amber-300" />
            </div>
            <span><strong className="font-semibold">NotebookLM</strong> Podcast Summaries</span>
          </div>
        </div>

        {/* Action Buttons - User's version structure with updated styling */}
        <div className="flex flex-wrap gap-4">
          <Button 
            onClick={openVernonChat} 
            className="bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white font-medium border border-amber-700/0"
          >
            <MessageSquare className="mr-2 h-4 w-4" /> {/* User's icon */}
            Chat with Vernon AI
          </Button>
          {isPro && (
            <Button 
              variant="outline" 
              className="border-orange-600/80 text-orange-200 hover:bg-orange-700/50 bg-orange-600/20 hover:text-white"
            >
              <FileText className="mr-2 h-4 w-4" /> {/* User's icon */}
              Upload Business Documents
            </Button>
          )}
        </div>

        {/* Pro Feature Highlight Box - User's version structure with updated styling */}
        <div className="mt-3 p-3 bg-orange-700/30 rounded-lg border border-orange-600/60">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-orange-800/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"> {/* Adjusted icon bg */}
              <span className="text-orange-100 text-xs font-bold">💡</span>
            </div>
            <div>
              <h4 className="text-orange-100 font-semibold mb-1">Pro Feature: Vernon analyzes your venue data using advanced AI to provide actionable insights.</h4>
              <p className="text-xs text-orange-100">
                Upload P&L sheets, customer data, or marketing materials to get conversational analysis and generate podcast summaries for easy consumption.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VernonProBanner;
