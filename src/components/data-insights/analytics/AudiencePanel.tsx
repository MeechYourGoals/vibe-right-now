
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
  <Card>
    <CardHeader>
      <CardTitle>Audience Demographics</CardTitle>
      <CardDescription>Age distribution of your visitors</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={audienceDemoData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="age" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="percentage" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

const VisitorLoyaltyCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Visitor Loyalty</CardTitle>
      <CardDescription>Returning vs. new visitors</CardDescription>
    </CardHeader>
    <CardContent className="flex items-center justify-center">
      <div className="h-80 w-80">
        <ResponsiveContainer width="100%" height="100%">
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="relative w-64 h-64 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-background flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold">65%</div>
                  <div className="text-sm text-muted-foreground">Returning Visitors</div>
                </div>
              </div>
            </div>
            <div className="flex justify-between w-full">
              <div className="text-center">
                <div className="text-muted-foreground text-sm">New Visitors</div>
                <div className="font-medium">35%</div>
              </div>
              <div className="text-center">
                <div className="text-muted-foreground text-sm">Regulars</div>
                <div className="font-medium">28%</div>
              </div>
              <div className="text-center">
                <div className="text-muted-foreground text-sm">Occasionals</div>
                <div className="font-medium">37%</div>
              </div>
            </div>
          </div>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

const UserBehaviorCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>User Behavior</CardTitle>
      <CardDescription>Actions taken by your venue visitors</CardDescription>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Action</TableHead>
            <TableHead>Count</TableHead>
            <TableHead>% of Visitors</TableHead>
            <TableHead>Trend</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Check-ins</TableCell>
            <TableCell>1,245</TableCell>
            <TableCell>78%</TableCell>
            <TableCell className="text-green-500">↑ 12%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Photo Uploads</TableCell>
            <TableCell>876</TableCell>
            <TableCell>55%</TableCell>
            <TableCell className="text-green-500">↑ 8%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Receipt Uploads</TableCell>
            <TableCell>623</TableCell>
            <TableCell>39%</TableCell>
            <TableCell className="text-green-500">↑ 15%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Discount Redemptions</TableCell>
            <TableCell>421</TableCell>
            <TableCell>26%</TableCell>
            <TableCell className="text-amber-500">↔ 2%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Reviews</TableCell>
            <TableCell>312</TableCell>
            <TableCell>19%</TableCell>
            <TableCell className="text-red-500">↓ 5%</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default AudiencePanel;
