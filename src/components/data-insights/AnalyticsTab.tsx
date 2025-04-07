
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AnalyticsTabProps {
  isPremium: boolean;
}

const AnalyticsTab = ({ isPremium }: AnalyticsTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Advanced Analytics</CardTitle>
          <CardDescription>
            {isPremium 
              ? "Detailed insights about your venue's performance" 
              : "Basic analytics are available in the free tier"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6">
            <h3 className="text-xl font-medium mb-2">
              {isPremium 
                ? "Full analytics dashboard is available" 
                : "Upgrade to premium for detailed analytics"}
            </h3>
            <p className="text-muted-foreground text-center max-w-md">
              {isPremium
                ? "View detailed information about your visitors' demographics, behavior patterns, and engagement metrics"
                : "Basic analytics are shown in the Overview tab. For more detailed insights, consider upgrading to our premium plan"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsTab;
