
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ReceiptDiscountChartProps {
  data: any[];
  timeframe: string;
}

const ReceiptDiscountChart = ({ data, timeframe }: ReceiptDiscountChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Receipt Uploads & Discount Usage</CardTitle>
        <CardDescription>
          Track receipt uploads and discount redemptions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey={timeframe === "week" ? "date" : "name"} stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', color: '#f3f4f6' }} 
                cursor={{ fill: 'rgba(156, 163, 175, 0.1)' }} 
              />
              <Legend wrapperStyle={{ color: '#d1d5db' }} />
              <Bar dataKey="receipts" fill="#f59e0b" name="Receipt Uploads" />
              <Bar dataKey="discounts" fill="#8b5cf6" name="Discount Redemptions" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Pro Tip:</span> Encourage users to upload receipts for 3x points to increase engagement.
        </p>
      </CardFooter>
    </Card>
  );
};

export default ReceiptDiscountChart;
