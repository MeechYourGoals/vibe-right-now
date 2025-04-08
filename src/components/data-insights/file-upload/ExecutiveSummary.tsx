
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const ExecutiveSummary = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Executive Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          Based on the financial data you've uploaded, we've identified several key opportunities for your venue:
        </p>
        <ul className="mt-4 space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <div className="rounded-full bg-blue-500 h-5 w-5 flex items-center justify-center mt-0.5">
              <span className="text-white text-xs">1</span>
            </div>
            <span>
              <strong>Revenue Opportunity:</strong> Your weekend bookings are at 95% capacity, but weekday bookings are only at 45%. Consider implementing weekday promotions that could increase revenue by an estimated 22%.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="rounded-full bg-blue-500 h-5 w-5 flex items-center justify-center mt-0.5">
              <span className="text-white text-xs">2</span>
            </div>
            <span>
              <strong>Cost Optimization:</strong> Beverage costs are 5% above industry standards. Renegotiating with suppliers could save approximately $1,200 monthly.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="rounded-full bg-blue-500 h-5 w-5 flex items-center justify-center mt-0.5">
              <span className="text-white text-xs">3</span>
            </div>
            <span>
              <strong>Marketing Efficiency:</strong> Your social media campaigns show 3.2x better ROI than print advertising. Reallocating 40% of print budget to social could increase marketing effectiveness by 28%.
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default ExecutiveSummary;
