
import { FileLock, Zap, Award, TrendingUp, BarChart, Lightbulb, Target } from "lucide-react";
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
            <CardTitle className="flex items-center text-amber-500">
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
                <Zap className="h-5 w-5 mr-2 text-amber-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">AI-powered marketing recommendations</h4>
                  <p className="text-sm text-muted-foreground">Get personalized suggestions based on your venue's unique data</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <TrendingUp className="h-5 w-5 mr-2 text-amber-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Industry benchmarks and insights</h4>
                  <p className="text-sm text-muted-foreground">See how your venue compares to competitors and industry leaders</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Target className="h-5 w-5 mr-2 text-amber-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Advanced discount code tracking</h4>
                  <p className="text-sm text-muted-foreground">Measure the effectiveness of your promotions in real-time</p>
                </div>
              </div>
            </div>
            
            <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
              Upgrade to Premium
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border-blue-200 dark:border-blue-800/50">
        <AlertTitle className="text-blue-800 dark:text-blue-300">Marketing Suite Enabled</AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-400">
          Your premium account includes access to all AI-powered marketing tools and industry-standard templates.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AiMarketingTools />
        <AiMarketerSuggestions />
        <IndustryInsights />
      </div>
      
      <DiscountCodeAnalysis />
      
      <div className="flex justify-center">
        <Button className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600">
          Schedule Marketing Consultation
        </Button>
      </div>
    </div>
  );
};

export default AdvertisingTab;
