
import { useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle, RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import AnalysisCompleteBanner from "./AnalysisCompleteBanner";
import ExecutiveSummary from "./ExecutiveSummary";
import FinancialHealthTable from "./FinancialHealthTable";
import MarketingCampaignTable from "./MarketingCampaignTable";
import AiRecommendations from "./AiRecommendations";

interface AnalysisResultsProps {
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

const AnalysisResults = ({ isLoading = false, error = null, onRetry }: AnalysisResultsProps) => {
  if (isLoading) {
    return <AnalysisLoadingState />;
  }

  if (error) {
    return <AnalysisErrorState error={error} onRetry={onRetry} />;
  }

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

const AnalysisLoadingState = () => {
  return (
    <div className="mt-6 space-y-6">
      <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-200 dark:border-blue-900 flex items-center gap-2">
        <Loader2 className="h-5 w-5 text-blue-600 dark:text-blue-400 animate-spin" />
        <div>
          <h3 className="font-medium text-blue-700 dark:text-blue-400">Analyzing your data</h3>
          <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
            Our AI is processing your financial information
          </p>
        </div>
      </div>
      
      <Skeleton className="h-64 w-full" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="h-52 w-full" />
        <Skeleton className="h-52 w-full" />
      </div>
      
      <Skeleton className="h-64 w-full" />
    </div>
  );
};

const AnalysisErrorState = ({ error, onRetry }: { error: string, onRetry?: () => void }) => {
  return (
    <div className="mt-6">
      <Alert variant="destructive" className="mb-6">
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle>Analysis failed</AlertTitle>
        <AlertDescription>
          {error || "There was an error analyzing your data. Please try again."}
        </AlertDescription>
      </Alert>
      
      {onRetry && (
        <Button onClick={onRetry} className="mt-2">
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry Analysis
        </Button>
      )}
    </div>
  );
};

export default AnalysisResults;
