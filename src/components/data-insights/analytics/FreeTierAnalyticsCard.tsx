
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FreeTierAnalyticsCard = () => {
  return (
    <Card className="bg-neutral-800/80 border border-neutral-600">
      <CardHeader>
        <CardTitle className="text-white">Advanced Analytics</CardTitle>
        <CardDescription className="text-neutral-300">
          Basic analytics are available in the free tier
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-6">
          <h3 className="text-xl font-medium mb-2 text-white">
            Upgrade to premium for detailed analytics
          </h3>
          <p className="text-neutral-400 text-center max-w-md">
            Basic analytics are shown in the Overview tab. For more detailed insights, consider upgrading to our premium plan
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FreeTierAnalyticsCard;
