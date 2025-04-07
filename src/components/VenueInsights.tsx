
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Users, Receipt, Camera, Video, Eye, Tag, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, subDays } from "date-fns";
import { VenueInsights as InsightsType } from "@/types";

// Mock data for insights
const generateWeeklyData = () => {
  const data = [];
  for (let i = 6; i >= 0; i--) {
    const date = subDays(new Date(), i);
    data.push({
      date: format(date, "EEE"),
      visitors: Math.floor(Math.random() * 50) + 10,
      checkIns: Math.floor(Math.random() * 30) + 5,
      receipts: Math.floor(Math.random() * 15),
      discounts: Math.floor(Math.random() * 10),
      photos: Math.floor(Math.random() * 20),
      videos: Math.floor(Math.random() * 10),
      impressions: Math.floor(Math.random() * 100) + 50,
    });
  }
  return data;
};

const weeklyData = generateWeeklyData();

const monthlyData = [
  { name: "Jan", visitors: 240, checkIns: 180, receipts: 90, discounts: 60 },
  { name: "Feb", visitors: 300, checkIns: 200, receipts: 100, discounts: 80 },
  { name: "Mar", visitors: 200, checkIns: 150, receipts: 70, discounts: 40 },
  { name: "Apr", visitors: 278, checkIns: 190, receipts: 95, discounts: 55 },
  { name: "May", visitors: 189, checkIns: 120, receipts: 60, discounts: 30 },
  { name: "Jun", visitors: 239, checkIns: 170, receipts: 85, discounts: 50 },
];

// Mock current insights
const currentInsights: InsightsType = {
  visitorCount: 342,
  checkInCount: 198,
  receiptUploads: 87,
  discountRedemptions: 52,
  mediaUploads: {
    photos: 156,
    videos: 63,
  },
  impressions: 1248,
};

const VenueInsights = () => {
  const [timeframe, setTimeframe] = useState("week");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Venue Insights</h2>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Data
        </Button>
      </div>
      
      <p className="text-muted-foreground">
        Track how users are engaging with your venue on Vibe Right Now
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Visitors</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-500" />
              {currentInsights.visitorCount}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
              +12% from last {timeframe}
            </Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Check-ins</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2 text-green-500" />
              {currentInsights.checkInCount}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="outline" className="bg-green-500/10 text-green-500">
              +8% from last {timeframe}
            </Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Receipt Uploads</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              <Receipt className="h-5 w-5 mr-2 text-amber-500" />
              {currentInsights.receiptUploads}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
              +23% from last {timeframe}
            </Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Discounts Redeemed</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              <Tag className="h-5 w-5 mr-2 text-purple-500" />
              {currentInsights.discountRedemptions}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="outline" className="bg-purple-500/10 text-purple-500">
              +5% from last {timeframe}
            </Badge>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Visitor Engagement</CardTitle>
            <CardDescription>
              Track check-ins and visitor activity over time
            </CardDescription>
            <Tabs defaultValue="week" className="w-full" onValueChange={setTimeframe}>
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
        
        <Card>
          <CardHeader>
            <CardTitle>Media Engagement</CardTitle>
            <CardDescription>
              Photos vs Videos uploaded at your venue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="photos" fill="#3b82f6" name="Photos" />
                  <Bar dataKey="videos" fill="#ec4899" name="Videos" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
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
                data={timeframe === "week" ? weeklyData : monthlyData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={timeframe === "week" ? "date" : "name"} />
                <YAxis />
                <Tooltip />
                <Legend />
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
    </div>
  );
};

export default VenueInsights;
