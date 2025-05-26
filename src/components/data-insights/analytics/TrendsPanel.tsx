
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
  <Card className="bg-neutral-800/80 border border-neutral-600">
    <CardHeader>
      <CardTitle className="text-white">Revenue Trends</CardTitle>
      <CardDescription className="text-neutral-300">Estimated revenue based on check-ins</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={demoData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', color: '#f3f4f6' }} 
              cursor={{ fill: 'rgba(156, 163, 175, 0.1)' }} 
            />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

const SocialMediaImpactCard = () => (
  <Card className="bg-neutral-800/80 border border-neutral-600">
    <CardHeader>
      <CardTitle className="text-white">Social Media Impact</CardTitle>
      <CardDescription className="text-neutral-300">Posts and mentions over time</CardDescription>
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
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', color: '#f3f4f6' }} 
              cursor={{ fill: 'rgba(156, 163, 175, 0.1)' }} 
            />
            <Legend wrapperStyle={{ color: '#d1d5db' }} />
            <Bar dataKey="posts" fill="#8884d8" />
            <Bar dataKey="mentions" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

const CompetitiveAnalysisCard = () => (
  <Card className="bg-neutral-800/80 border border-neutral-600">
    <CardHeader>
      <CardTitle className="text-white">Competitive Analysis</CardTitle>
      <CardDescription className="text-neutral-300">How your venue compares to similar venues in your area</CardDescription>
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
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="category" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', color: '#f3f4f6' }} 
              cursor={{ fill: 'rgba(156, 163, 175, 0.1)' }} 
            />
            <Legend wrapperStyle={{ color: '#d1d5db' }} />
            <Bar dataKey="you" fill="#8884d8" name="Your Venue" />
            <Bar dataKey="average" fill="#82ca9d" name="Industry Average" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
    <CardFooter>
      <p className="text-sm text-neutral-400">
        <span className="font-medium">Note:</span> Benchmarks are from similar venues in your area based on category, size, and pricing.
      </p>
    </CardFooter>
  </Card>
);

export default TrendsPanel;
