
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FreeTierAnalyticsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Analytics</CardTitle>
        <CardDescription>
          Basic analytics are available in the free tier
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-6">
          <h3 className="text-xl font-medium mb-2">
            Upgrade to premium for detailed analytics
          </h3>
          <p className="text-muted-foreground text-center max-w-md">
            Basic analytics are shown in the Overview tab. For more detailed insights, consider upgrading to our premium plan
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FreeTierAnalyticsCard;
