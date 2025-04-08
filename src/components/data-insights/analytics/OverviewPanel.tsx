
import { ChartContainer } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Demo data for charts
const demoData = [
  { month: 'Jan', visitors: 400, engagement: 240, revenue: 2400 },
  { month: 'Feb', visitors: 300, engagement: 138, revenue: 1800 },
  { month: 'Mar', visitors: 550, engagement: 320, revenue: 3200 },
  { month: 'Apr', visitors: 420, engagement: 250, revenue: 2800 },
  { month: 'May', visitors: 480, engagement: 280, revenue: 3100 },
  { month: 'Jun', visitors: 520, engagement: 290, revenue: 3400 },
];

const topPerformingHoursData = [
  { hour: "6PM", visitors: 120 },
  { hour: "7PM", visitors: 180 },
  { hour: "8PM", visitors: 240 },
  { hour: "9PM", visitors: 280 },
  { hour: "10PM", visitors: 210 },
  { hour: "11PM", visitors: 170 },
  { hour: "12AM", visitors: 90 },
];

const OverviewPanel = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VisitorTrendsCard />
        <EngagementRateCard />
      </div>
      <TopPerformingHoursCard />
    </div>
  );
};

const VisitorTrendsCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Visitor Trends</CardTitle>
      <CardDescription>Monthly visitor statistics</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={demoData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="visitors" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

const EngagementRateCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Engagement Rate</CardTitle>
      <CardDescription>User interaction with your venue</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={demoData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="engagement" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

const TopPerformingHoursCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Top Performing Hours</CardTitle>
      <CardDescription>Busiest hours at your venue</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={topPerformingHoursData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="visitors" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

export default OverviewPanel;
