
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface VisitorEngagementChartProps {
  weeklyData: any[];
  monthlyData: any[];
  onTimeframeChange: (value: string) => void;
}

const VisitorEngagementChart = ({ weeklyData, monthlyData, onTimeframeChange }: VisitorEngagementChartProps) => {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Visitor Engagement</CardTitle>
        <CardDescription>
          Track check-ins and visitor activity over time
        </CardDescription>
        <Tabs defaultValue="week" className="w-full" onValueChange={onTimeframeChange}>
          <TabsList className="grid w-[200px] grid-cols-2">
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="p-0">
        <TabsContent value="week" className="m-0">
          <div className="h-[300px] p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="#3b82f6" 
                  activeDot={{ r: 8 }} 
                  name="Visitors"
                />
                <Line 
                  type="monotone" 
                  dataKey="checkIns" 
                  stroke="#10b981" 
                  name="Check-ins"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        <TabsContent value="month" className="m-0">
          <div className="h-[300px] p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="#3b82f6" 
                  activeDot={{ r: 8 }} 
                  name="Visitors"
                />
                <Line 
                  type="monotone" 
                  dataKey="checkIns" 
                  stroke="#10b981" 
                  name="Check-ins"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </CardContent>
    </Card>
  );
};

export default VisitorEngagementChart;
