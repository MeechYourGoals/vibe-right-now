
import { Users, CalendarIcon, Receipt, Tag } from "lucide-react";
import InsightMetricCard from "./InsightMetricCard";
import { VenueInsights } from "@/types";

interface MetricsOverviewProps {
  insights: VenueInsights;
  timeframe: string;
}

const MetricsOverview = ({ insights, timeframe }: MetricsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <InsightMetricCard
        title="Total Visitors"
        value={insights.visitorCount || 0}
        icon={Users}
        iconColor="text-blue-500"
        changePercentage={12}
        timeframe={timeframe}
      />
      
      <InsightMetricCard
        title="Check-ins"
        value={insights.checkInCount || 0}
        icon={CalendarIcon}
        iconColor="text-green-500"
        changePercentage={8}
        timeframe={timeframe}
      />
      
      <InsightMetricCard
        title="Receipt Uploads"
        value={insights.receiptUploads || 0}
        icon={Receipt}
        iconColor="text-amber-500"
        changePercentage={23}
        timeframe={timeframe}
      />
      
      <InsightMetricCard
        title="Discounts Redeemed"
        value={insights.discountRedemptions || 0}
        icon={Tag}
        iconColor="text-purple-500"
        changePercentage={5}
        timeframe={timeframe}
      />
    </div>
  );
};

export default MetricsOverview;
