
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

const AiRecommendations = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Recommendations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 border rounded-md">
          <h4 className="font-medium mb-2">Revenue Growth Strategy</h4>
          <p className="text-sm text-muted-foreground">
            Based on your data, implementing a tiered pricing structure for peak vs. off-peak hours could increase your average transaction value by 15%. Your historical data shows customers are willing to pay premium prices during Thursday-Sunday evenings.
          </p>
        </div>
        
        <div className="p-4 border rounded-md">
          <h4 className="font-medium mb-2">Marketing Optimization</h4>
          <p className="text-sm text-muted-foreground">
            Your social media campaigns targeting the 25-34 demographic have the highest conversion rate. We recommend increasing budget allocation to Instagram and TikTok campaigns by 30%, which could result in a 22% increase in new customer acquisition.
          </p>
        </div>
        
        <div className="p-4 border rounded-md">
          <h4 className="font-medium mb-2">Operational Efficiency</h4>
          <p className="text-sm text-muted-foreground">
            Staffing levels are 18% higher than needed during Monday-Wednesday. Optimizing your staff schedule could reduce labor costs by approximately $2,300 per month without impacting customer service quality.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          These insights are based on your uploaded financial data combined with Vibe Right Now analytics and industry benchmarks. For a detailed consultation, please book a session with a Vernon Concierge specialist.
        </p>
      </CardFooter>
    </Card>
  );
};

export default AiRecommendations;
