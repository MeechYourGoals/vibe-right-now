
import { Zap, Lightbulb, BarChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-medium text-amber-800 dark:text-amber-300">Weekend Promotion</h4>
              <Badge variant="outline" className="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">High Impact</Badge>
            </div>
            <p className="text-sm text-amber-700 dark:text-amber-400">Your venue has 32% more visitors on Fridays. Consider creating a special Friday offer to maximize revenue.</p>
            <div className="mt-2 flex justify-end">
              <Button variant="outline" size="sm" className="text-xs h-7 px-2">Implement</Button>
            </div>
          </div>
          
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/30 rounded-lg">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-medium text-indigo-800 dark:text-indigo-300">Underutilized Hours</h4>
              <Badge variant="outline" className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">Medium Impact</Badge>
            </div>
            <p className="text-sm text-indigo-700 dark:text-indigo-400">Tuesday evenings show low traffic. Consider a "Tuesday Special" to attract more visitors during this time.</p>
            <div className="mt-2 flex justify-end">
              <Button variant="outline" size="sm" className="text-xs h-7 px-2">Implement</Button>
            </div>
          </div>
          
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/30 rounded-lg">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-medium text-emerald-800 dark:text-emerald-300">Content Strategy</h4>
              <Badge variant="outline" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">High Impact</Badge>
            </div>
            <p className="text-sm text-emerald-700 dark:text-emerald-400">Photos of your signature dishes get 3x more engagement. Encourage more food photography from visitors.</p>
            <div className="mt-2 flex justify-end">
              <Button variant="outline" size="sm" className="text-xs h-7 px-2">Implement</Button>
            </div>
          </div>
          
          <div className="p-3 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-medium text-purple-800 dark:text-purple-300">Customer Retention</h4>
              <Badge variant="outline" className="bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">Critical</Badge>
            </div>
            <p className="text-sm text-purple-700 dark:text-purple-400">Only 22% of customers return within 30 days. Implement a loyalty program to increase repeat business.</p>
            <div className="mt-2 flex justify-end">
              <Button variant="outline" size="sm" className="text-xs h-7 px-2">Implement</Button>
            </div>
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
