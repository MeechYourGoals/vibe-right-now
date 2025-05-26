
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Video, Image, FileSpreadsheet, Bot, Mic } from "lucide-react";

interface VernonProBannerProps {
  subscriptionTier: 'standard' | 'plus' | 'premium' | 'pro';
}

const VernonProBanner = ({ subscriptionTier }: VernonProBannerProps) => {
  return (
    <Card className="bg-gradient-to-r from-amber-950/80 to-orange-950/80 border-2 border-amber-600/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <Brain className="h-8 w-8 text-amber-400 mr-3" />
            <div>
              <CardTitle className="text-2xl text-amber-200">Vernon for Venues - AI-Powered Business Intelligence Suite</CardTitle>
              <p className="text-amber-300/90 mt-2 max-w-4xl">
                Vernon for Venues is your comprehensive AI business intelligence suite, powered by Google's most advanced AI technologies. 
                Get conversational insights, generate marketing content, analyze documents, and create podcast summaries of your business data.
              </p>
            </div>
          </div>
          <Badge className="bg-amber-600/30 text-amber-200 border-amber-500/50 px-3 py-1">
            Pro Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* AI Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-600/20 rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-amber-400" />
            </div>
            <span className="text-amber-200 font-medium">Gemini Deep Research & Analysis</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-600/20 rounded-lg flex items-center justify-center">
              <Video className="h-5 w-5 text-amber-400" />
            </div>
            <span className="text-amber-200 font-medium">Veo Video Content Generation</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-600/20 rounded-lg flex items-center justify-center">
              <Image className="h-5 w-5 text-amber-400" />
            </div>
            <span className="text-amber-200 font-medium">Imagen Marketing Visuals</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-600/20 rounded-lg flex items-center justify-center">
              <Mic className="h-5 w-5 text-amber-400" />
            </div>
            <span className="text-amber-200 font-medium">NotebookLM Podcast Summaries</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Button className="bg-amber-600 hover:bg-amber-700 text-white border-0">
            <Bot className="mr-2 h-4 w-4" />
            Chat with Vernon AI
          </Button>
          <Button variant="outline" className="border-amber-600 text-amber-300 hover:bg-amber-900/20">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Upload Business Documents
          </Button>
        </div>

        {/* Pro Feature Highlight */}
        <div className="bg-amber-900/40 rounded-lg p-4 border border-amber-700/50">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-amber-600/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-amber-300 text-xs font-bold">💡</span>
            </div>
            <div>
              <h4 className="text-amber-200 font-semibold mb-1">Pro Feature: Vernon analyzes your venue data using advanced AI to provide actionable insights.</h4>
              <p className="text-amber-300/80 text-sm">
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
