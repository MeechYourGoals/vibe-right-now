
import { useState } from "react";
import AnalysisCompleteBanner from "./AnalysisCompleteBanner";
import ExecutiveSummary from "./ExecutiveSummary";
import FinancialHealthTable from "./FinancialHealthTable";
import MarketingCampaignTable from "./MarketingCampaignTable";
import AiRecommendations from "./AiRecommendations";

const AnalysisResults = () => {
  return (
    <div className="mt-6 space-y-6">
      <AnalysisCompleteBanner />
      
      <ExecutiveSummary />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FinancialHealthTable />
        <MarketingCampaignTable />
      </div>
      
      <AiRecommendations />
    </div>
  );
};

export default AnalysisResults;
