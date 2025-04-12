
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MetricsOverview from "@/components/data-insights/MetricsOverview";
import { currentInsights } from "@/utils/insightsData";

const PerformanceMetrics = () => {
  return (
    <Card className="border-none shadow-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent className="px-0 pt-0">
        <MetricsOverview insights={currentInsights} timeframe="week" />
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;
