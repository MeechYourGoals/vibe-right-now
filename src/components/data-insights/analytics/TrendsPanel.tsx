
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Demo data for charts
const demoData = [
  { month: 'Jan', visitors: 400, engagement: 240, revenue: 2400 },
  { month: 'Feb', visitors: 300, engagement: 138, revenue: 1800 },
  { month: 'Mar', visitors: 550, engagement: 320, revenue: 3200 },
  { month: 'Apr', visitors: 420, engagement: 250, revenue: 2800 },
  { month: 'May', visitors: 480, engagement: 280, revenue: 3100 },
  { month: 'Jun', visitors: 520, engagement: 290, revenue: 3400 },
];

const TrendsPanel = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueTrendsCard />
        <SocialMediaImpactCard />
      </div>
      <CompetitiveAnalysisCard />
    </div>
  );
};

const RevenueTrendsCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Revenue Trends</CardTitle>
      <CardDescription>Estimated revenue based on check-ins</CardDescription>
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
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

const SocialMediaImpactCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Social Media Impact</CardTitle>
      <CardDescription>Posts and mentions over time</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={[
              { month: 'Jan', posts: 120, mentions: 240 },
              { month: 'Feb', posts: 135, mentions: 260 },
              { month: 'Mar', posts: 190, mentions: 320 },
              { month: 'Apr', posts: 170, mentions: 290 },
              { month: 'May', posts: 160, mentions: 310 },
              { month: 'Jun', posts: 210, mentions: 370 },
            ]}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="posts" fill="#8884d8" />
            <Bar dataKey="mentions" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

const CompetitiveAnalysisCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Competitive Analysis</CardTitle>
      <CardDescription>How your venue compares to similar venues in your area</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={[
              { category: 'Check-ins', you: 82, average: 67 },
              { category: 'Engagement', you: 75, average: 63 },
              { category: 'Return Rate', you: 65, average: 58 },
              { category: 'Social Posts', you: 89, average: 72 },
              { category: 'Reviews', you: 78, average: 70 },
            ]}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="you" fill="#8884d8" name="Your Venue" />
            <Bar dataKey="average" fill="#82ca9d" name="Industry Average" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
    <CardFooter>
      <p className="text-sm text-muted-foreground">
        <span className="font-medium">Note:</span> Benchmarks are from similar venues in your area based on category, size, and pricing.
      </p>
    </CardFooter>
  </Card>
);

export default TrendsPanel;
