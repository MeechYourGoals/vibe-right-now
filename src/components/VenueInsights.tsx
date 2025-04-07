
import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import MetricsOverview from "./data-insights/MetricsOverview";
import VisitorEngagementChart from "./data-insights/VisitorEngagementChart";
import MediaEngagementChart from "./data-insights/MediaEngagementChart";
import ReceiptDiscountChart from "./data-insights/ReceiptDiscountChart";
import { generateWeeklyData, monthlyData, currentInsights } from "@/utils/insightsData";

const VenueInsights = () => {
  const [timeframe, setTimeframe] = useState("week");
  const weeklyData = generateWeeklyData();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Venue Insights</h2>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Data
        </Button>
      </div>
      
      <p className="text-muted-foreground">
        Track how users are engaging with your venue on Vibe Right Now
      </p>
      
      <MetricsOverview insights={currentInsights} timeframe={timeframe} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <VisitorEngagementChart 
          weeklyData={weeklyData} 
          monthlyData={monthlyData} 
          onTimeframeChange={setTimeframe} 
        />
        
        <MediaEngagementChart data={weeklyData} />
      </div>
      
      <ReceiptDiscountChart data={timeframe === "week" ? weeklyData : monthlyData} timeframe={timeframe} />
    </div>
  );
};

export default VenueInsights;
