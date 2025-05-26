
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Demo data for charts
const audienceDemoData = [
  { age: "18-24", percentage: 35 },
  { age: "25-34", percentage: 40 },
  { age: "35-44", percentage: 15 },
  { age: "45-54", percentage: 7 },
  { age: "55+", percentage: 3 },
];

const AudiencePanel = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AudienceDemographicsCard />
        <VisitorLoyaltyCard />
      </div>
      <UserBehaviorCard />
    </div>
  );
};

const AudienceDemographicsCard = () => (
  <Card className="bg-neutral-800/80 border border-neutral-600">
    <CardHeader>
      <CardTitle className="text-white">Audience Demographics</CardTitle>
      <CardDescription className="text-neutral-300">Age distribution of your visitors</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={audienceDemoData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="age" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', color: '#f3f4f6' }} 
              cursor={{ fill: 'rgba(156, 163, 175, 0.1)' }} 
            />
            <Bar dataKey="percentage" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

const VisitorLoyaltyCard = () => (
  <Card className="bg-neutral-800/80 border border-neutral-600">
    <CardHeader>
      <CardTitle className="text-white">Visitor Loyalty</CardTitle>
      <CardDescription className="text-neutral-300">Returning vs. new visitors</CardDescription>
    </CardHeader>
    <CardContent className="flex items-center justify-center">
      <div className="h-80 w-80">
        <ResponsiveContainer width="100%" height="100%">
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="relative w-64 h-64 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-background flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">65%</div>
                  <div className="text-sm text-neutral-400">Returning Visitors</div>
                </div>
              </div>
            </div>
            <div className="flex justify-between w-full">
              <div className="text-center">
                <div className="text-sm text-neutral-400">New Visitors</div>
                <div className="font-medium text-neutral-100">35%</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-neutral-400">Regulars</div>
                <div className="font-medium text-neutral-100">28%</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-neutral-400">Occasionals</div>
                <div className="font-medium text-neutral-100">37%</div>
              </div>
            </div>
          </div>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

const UserBehaviorCard = () => (
  <Card className="bg-neutral-800/80 border border-neutral-600">
    <CardHeader>
      <CardTitle className="text-white">User Behavior</CardTitle>
      <CardDescription className="text-neutral-300">Actions taken by your venue visitors</CardDescription>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-neutral-300">Action</TableHead>
            <TableHead className="text-neutral-300">Count</TableHead>
            <TableHead className="text-neutral-300">% of Visitors</TableHead>
            <TableHead className="text-neutral-300">Trend</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-neutral-100">Check-ins</TableCell>
            <TableCell className="text-neutral-100">1,245</TableCell>
            <TableCell className="text-neutral-100">78%</TableCell>
            <TableCell className="text-green-500">↑ 12%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-neutral-100">Photo Uploads</TableCell>
            <TableCell className="text-neutral-100">876</TableCell>
            <TableCell className="text-neutral-100">55%</TableCell>
            <TableCell className="text-green-500">↑ 8%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-neutral-100">Receipt Uploads</TableCell>
            <TableCell className="text-neutral-100">623</TableCell>
            <TableCell className="text-neutral-100">39%</TableCell>
            <TableCell className="text-green-500">↑ 15%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-neutral-100">Discount Redemptions</TableCell>
            <TableCell className="text-neutral-100">421</TableCell>
            <TableCell className="text-neutral-100">26%</TableCell>
            <TableCell className="text-amber-500">↔ 2%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-neutral-100">Reviews</TableCell>
            <TableCell className="text-neutral-100">312</TableCell>
            <TableCell className="text-neutral-100">19%</TableCell>
            <TableCell className="text-red-500">↓ 5%</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default AudiencePanel;
