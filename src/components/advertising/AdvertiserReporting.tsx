
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, QrCode, CreditCard, MapPin, Brain, Target } from "lucide-react";

const performanceData = [
  { date: "Mon", impressions: 24000, clicks: 1200, conversions: 120 },
  { date: "Tue", impressions: 28000, clicks: 1400, conversions: 150 },
  { date: "Wed", impressions: 32000, clicks: 1600, conversions: 180 },
  { date: "Thu", impressions: 35000, clicks: 1750, conversions: 210 },
  { date: "Fri", impressions: 42000, clicks: 2100, conversions: 250 },
  { date: "Sat", impressions: 48000, clicks: 2400, conversions: 300 },
  { date: "Sun", impressions: 38000, clicks: 1900, conversions: 220 }
];

const footTrafficData = [
  { time: "9:00", baseline: 45, withAd: 68 },
  { time: "9:15", baseline: 52, withAd: 78 },
  { time: "9:30", baseline: 48, withAd: 72 },
  { time: "9:45", baseline: 55, withAd: 85 },
  { time: "10:00", baseline: 62, withAd: 95 },
  { time: "10:15", baseline: 58, withAd: 88 },
  { time: "10:30", baseline: 65, withAd: 102 }
];

const AdvertiserReporting = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Impressions</span>
            </div>
            <div className="text-2xl font-bold">2.4M</div>
            <div className="text-sm text-green-500">+15.3% vs last week</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">CTR</span>
            </div>
            <div className="text-2xl font-bold">5.2%</div>
            <div className="text-sm text-blue-500">+0.8% vs last week</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">ROAS</span>
            </div>
            <div className="text-2xl font-bold">4.2x</div>
            <div className="text-sm text-purple-500">+0.3x vs last week</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Foot Traffic Lift</span>
            </div>
            <div className="text-2xl font-bold">28%</div>
            <div className="text-sm text-orange-500">+5% vs last week</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Campaign Performance</TabsTrigger>
          <TabsTrigger value="attribution">QR Code Attribution</TabsTrigger>
          <TabsTrigger value="offers">Card-Linked Offers</TabsTrigger>
          <TabsTrigger value="halo">Halo Reporting</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="impressions" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="clicks" stroke="#82ca9d" strokeWidth={2} />
                    <Line type="monotone" dataKey="conversions" stroke="#ffc658" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ad Format Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { format: "MomentCard", ctr: "6.2%", conversions: "1,245", badge: "Best CTR" },
                    { format: "VibeOverlay", ctr: "4.8%", conversions: "892", badge: "High Engagement" },
                    { format: "Spawn Point", ctr: "5.1%", conversions: "1,100", badge: "Best ROAS" },
                    { format: "Heat Ring", ctr: "3.9%", conversions: "756", badge: "Foot Traffic" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{item.format}</div>
                        <div className="text-sm text-muted-foreground">CTR: {item.ctr} | Conversions: {item.conversions}</div>
                      </div>
                      <Badge variant="secondary">{item.badge}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Optimization Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="font-medium text-green-400 mb-1">Increase Budget</div>
                    <div className="text-sm">MomentCard campaigns are performing 23% above benchmark. Consider increasing budget by $500/day.</div>
                  </div>
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="font-medium text-blue-400 mb-1">Optimize Targeting</div>
                    <div className="text-sm">Expand age range to 25-40 for 15% more qualified traffic based on current performance.</div>
                  </div>
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <div className="font-medium text-purple-400 mb-1">Creative Refresh</div>
                    <div className="text-sm">VibeOverlay creative fatigue detected. Generate new variants with Imagen 3.</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attribution">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                QR Code Bridge Attribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 border rounded-lg">
                  <div className="text-3xl font-bold text-blue-500 mb-2">1,847</div>
                  <div className="text-sm text-muted-foreground">Total QR Scans</div>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <div className="text-3xl font-bold text-green-500 mb-2">68%</div>
                  <div className="text-sm text-muted-foreground">Scan-to-Visit Rate</div>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <div className="text-3xl font-bold text-purple-500 mb-2">$12.50</div>
                  <div className="text-sm text-muted-foreground">Avg. Spend per Scan</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="offers">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Card-Linked Offers (Visa Partnership)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="text-center p-6 border rounded-lg">
                    <div className="text-3xl font-bold text-green-500 mb-2">$47,250</div>
                    <div className="text-sm text-muted-foreground">Total Attributed Revenue</div>
                  </div>
                  <div className="text-center p-6 border rounded-lg">
                    <div className="text-3xl font-bold text-blue-500 mb-2">342</div>
                    <div className="text-sm text-muted-foreground">Discount Redemptions</div>
                  </div>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { day: "Mon", revenue: 5200 },
                      { day: "Tue", revenue: 6800 },
                      { day: "Wed", revenue: 7200 },
                      { day: "Thu", revenue: 8100 },
                      { day: "Fri", revenue: 9500 },
                      { day: "Sat", revenue: 10450 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="revenue" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="halo">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Halo Reporting - Foot Traffic Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={footTrafficData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="baseline" stroke="#8884d8" strokeWidth={2} name="Baseline" />
                    <Line type="monotone" dataKey="withAd" stroke="#82ca9d" strokeWidth={2} name="With Campaign" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg">
                <div className="text-lg font-semibold text-green-400 mb-1">+28% Foot Traffic Lift</div>
                <div className="text-sm text-muted-foreground">
                  15-minute interval tracking shows consistent improvement during campaign hours
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvertiserReporting;
