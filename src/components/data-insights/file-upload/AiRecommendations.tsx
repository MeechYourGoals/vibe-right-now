
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Bot, FileSpreadsheet, Layers, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AiRecommendations = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Bot className="mr-2 h-5 w-5 text-blue-500" />
            AI Recommendations
          </CardTitle>
          <div className="flex items-center">
            <Badge variant="outline" className="bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300 border-blue-200 dark:border-blue-800/40">
              Powered by Gemini 1.5 & Notebook LM
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 border rounded-md">
          <h4 className="font-medium mb-2 flex items-center">
            <TrendingUp className="mr-2 h-4 w-4 text-blue-500" />
            Revenue Growth Strategy
          </h4>
          <p className="text-sm text-muted-foreground">
            Based on your data, implementing a tiered pricing structure for peak vs. off-peak hours could increase your average transaction value by 15%. Your historical data shows customers are willing to pay premium prices during Thursday-Sunday evenings.
          </p>
        </div>
        
        <div className="p-4 border rounded-md">
          <h4 className="font-medium mb-2 flex items-center">
            <Layers className="mr-2 h-4 w-4 text-blue-500" />
            Marketing Optimization
          </h4>
          <p className="text-sm text-muted-foreground">
            Your social media campaigns targeting the 25-34 demographic have the highest conversion rate. We recommend increasing budget allocation to Instagram and TikTok campaigns by 30%, which could result in a 22% increase in new customer acquisition.
          </p>
        </div>
        
        <div className="p-4 border rounded-md">
          <h4 className="font-medium mb-2 flex items-center">
            <FileSpreadsheet className="mr-2 h-4 w-4 text-blue-500" />
            Operational Efficiency
          </h4>
          <p className="text-sm text-muted-foreground">
            Staffing levels are 18% higher than needed during Monday-Wednesday. Optimizing your staff schedule could reduce labor costs by approximately $2,300 per month without impacting customer service quality.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t pt-4">
        <p className="text-xs text-muted-foreground">
          These insights are powered by Google's Notebook LM technology for advanced financial document analysis and Gemini 1.5 Pro for industry benchmarking.
        </p>
        <Badge variant="outline" className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-300">
          AI-Generated
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default AiRecommendations;
