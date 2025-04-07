
import { Zap, Lightbulb } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AiMarketerSuggestions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Zap className="h-5 w-5 mr-2 text-amber-500" />
          AI Marketer Suggestions
        </CardTitle>
        <CardDescription>Smart recommendations based on your data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg">
            <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-1">Weekend Promotion</h4>
            <p className="text-sm text-amber-700 dark:text-amber-400">Your venue has 32% more visitors on Fridays. Consider creating a special Friday offer to maximize revenue.</p>
          </div>
          
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/30 rounded-lg">
            <h4 className="font-medium text-indigo-800 dark:text-indigo-300 mb-1">Underutilized Hours</h4>
            <p className="text-sm text-indigo-700 dark:text-indigo-400">Tuesday evenings show low traffic. Consider a "Tuesday Special" to attract more visitors during this time.</p>
          </div>
          
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/30 rounded-lg">
            <h4 className="font-medium text-emerald-800 dark:text-emerald-300 mb-1">Content Strategy</h4>
            <p className="text-sm text-emerald-700 dark:text-emerald-400">Photos of your signature dishes get 3x more engagement. Encourage more food photography from visitors.</p>
          </div>
          
          <Button variant="outline" className="w-full mt-2">
            <Lightbulb className="h-4 w-4 mr-2" />
            Generate More Suggestions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AiMarketerSuggestions;
