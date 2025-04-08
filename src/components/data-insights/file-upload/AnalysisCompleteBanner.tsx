
import { Check } from "lucide-react";

const AnalysisCompleteBanner = () => {
  return (
    <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-900">
      <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
        <Check className="h-5 w-5" />
        <h3 className="font-medium">Analysis Complete</h3>
      </div>
      <p className="text-sm text-green-600 dark:text-green-300 mt-1">
        Our AI has analyzed your data and generated insights
      </p>
    </div>
  );
};

export default AnalysisCompleteBanner;
