
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, FileText, TrendingUp, Star, ChartBar } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import AnalyticsFileUpload from "./AnalyticsFileUpload";

const demoData = [
  { month: 'Jan', visitors: 400, engagement: 240, revenue: 2400 },
  { month: 'Feb', visitors: 300, engagement: 138, revenue: 1800 },
  { month: 'Mar', visitors: 550, engagement: 320, revenue: 3200 },
  { month: 'Apr', visitors: 420, engagement: 250, revenue: 2800 },
  { month: 'May', visitors: 480, engagement: 280, revenue: 3100 },
  { month: 'Jun', visitors: 520, engagement: 290, revenue: 3400 },
];

const audienceDemoData = [
  { age: "18-24", percentage: 35 },
  { age: "25-34", percentage: 40 },
  { age: "35-44", percentage: 15 },
  { age: "45-54", percentage: 7 },
  { age: "55+", percentage: 3 },
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

interface AnalyticsTabProps {
  isPremium: boolean;
  subscriptionTier: 'standard' | 'plus' | 'premium' | 'pro';
}

const AnalyticsTab = ({ isPremium, subscriptionTier }: AnalyticsTabProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const isPro = subscriptionTier === 'pro';
  
  if (!isPremium) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Advanced Analytics</CardTitle>
            <CardDescription>
              Basic analytics are available in the free tier
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-6">
              <h3 className="text-xl font-medium mb-2">
                Upgrade to premium for detailed analytics
              </h3>
              <p className="text-muted-foreground text-center max-w-md">
                Basic analytics are shown in the Overview tab. For more detailed insights, consider upgrading to our premium plan
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Advanced Analytics Dashboard</CardTitle>
          <CardDescription>
            Detailed insights about your venue's performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="overview">
                <ChartBar className="mr-2 h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="audience">
                <Star className="mr-2 h-4 w-4" />
                Audience
              </TabsTrigger>
              <TabsTrigger value="trends">
                <TrendingUp className="mr-2 h-4 w-4" />
                Trends
              </TabsTrigger>
              {isPro && (
                <TabsTrigger value="upload">
                  <Upload className="mr-2 h-4 w-4" />
                  File Analysis
                </TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              </div>
              
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
            </TabsContent>
            
            <TabsContent value="audience" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              </div>
              
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
            </TabsContent>
            
            <TabsContent value="trends" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              </div>
              
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
            </TabsContent>
            
            {isPro && (
              <TabsContent value="upload" className="space-y-6">
                <AnalyticsFileUpload />
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsTab;
