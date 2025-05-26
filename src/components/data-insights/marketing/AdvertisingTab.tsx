
import { FileLock, Zap, Award, TrendingUp, BarChart, Lightbulb, Target, Video, Image } from "lucide-react";
import AiMarketingTools from "./AiMarketingTools";
import AiMarketerSuggestions from "./AiMarketerSuggestions";
import DiscountCodeAnalysis from "./DiscountCodeAnalysis";
import IndustryInsights from "./IndustryInsights";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AdvertisingTabProps {
  isPremium: boolean;
}

const AdvertisingTab = ({ isPremium }: AdvertisingTabProps) => {
  if (!isPremium) {
    return (
      <div className="flex items-center justify-center py-12">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center text-premium-primary">
              <Award className="h-5 w-5 mr-2" />
              Premium Marketing Suite
            </CardTitle>
            <CardDescription>
              Unlock powerful advertising tools with a premium subscription
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-start">
                <Zap className="h-5 w-5 mr-2 text-premium-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">AI-powered marketing recommendations</h4>
                  <p className="text-sm text-muted-foreground">Get personalized suggestions based on your venue's unique data</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <TrendingUp className="h-5 w-5 mr-2 text-premium-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Industry benchmarks and insights</h4>
                  <p className="text-sm text-muted-foreground">See how your venue compares to competitors and industry leaders</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Target className="h-5 w-5 mr-2 text-premium-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Advanced discount code tracking</h4>
                  <p className="text-sm text-muted-foreground">Measure the effectiveness of your promotions in real-time</p>
                </div>
              </div>
            </div>
            
            <Button className="w-full bg-gradient-to-r from-premium-primary to-premium-secondary hover:from-green-600 hover:to-blue-600">
              Upgrade to Premium
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Alert className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/40 dark:to-green-950/40 border-premium-secondary dark:border-premium-primary/50">
        <AlertTitle className="text-premium-dark dark:text-premium-light">Marketing Suite Enabled</AlertTitle>
        <AlertDescription className="text-premium-dark/80 dark:text-premium-light/80">
          Your premium account includes access to all AI-powered marketing tools and industry-standard templates.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800/30">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Video className="h-5 w-5 mr-2 text-blue-600" /> 
              Veo 3 Video Generator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Google's Veo 3 technology lets you create professional promo videos in one click. Simply enter your event details to generate a 15-second trailer perfect for TikTok, Instagram Reels, and other social platforms.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Create Promo Video
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/30">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Image className="h-5 w-5 mr-2 text-amber-600" /> 
              Imagen 4 Marketing Materials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Google's Imagen 4 generates high-quality, on-brand posters, banners, and thumbnails for your venue events. Create consistent marketing materials with type-safe text and 2k resolution images.
            </p>
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">
              Generate Marketing Images
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AiMarketingTools />
        <AiMarketerSuggestions />
        <IndustryInsights />
      </div>
      
      <DiscountCodeAnalysis />
      
      <div className="flex justify-center">
        <Button className="bg-gradient-to-r from-premium-primary to-premium-secondary hover:from-green-600 hover:to-blue-600">
          Schedule Marketing Consultation
        </Button>
      </div>
    </div>
  );
};

export default AdvertisingTab;
