
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, BarChart3, PieChart, Download, Filter, RefreshCw } from "lucide-react";

const AdvertiserReporting = () => {
  const performanceData = [
    { metric: "Impressions", value: "2.4M", change: "+15.3%", trend: "up" },
    { metric: "Clicks", value: "91.2K", change: "+8.7%", trend: "up" },
    { metric: "CTR", value: "3.8%", change: "+0.5%", trend: "up" },
    { metric: "Conversions", value: "1,247", change: "-2.1%", trend: "down" },
    { metric: "CPC", value: "$1.35", change: "-5.2%", trend: "up" },
    { metric: "ROAS", value: "4.2x", change: "+12.8%", trend: "up" },
  ];

  const campaignPerformance = [
    { name: "Summer Vibes", impressions: "890K", ctr: "4.2%", conversions: "456", status: "Active" },
    { name: "Local Hotspots", impressions: "650K", ctr: "3.5%", conversions: "312", status: "Active" },
    { name: "Weekend Warriors", impressions: "580K", ctr: "2.8%", conversions: "234", status: "Paused" },
    { name: "Night Life", impressions: "420K", ctr: "5.1%", conversions: "245", status: "Active" },
  ];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          <Select defaultValue="7days">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {performanceData.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-muted-foreground">{item.metric}</div>
                  <div className="text-2xl font-bold">{item.value}</div>
                </div>
                <div className={`flex items-center text-sm ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {item.trend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                  {item.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Interactive chart showing performance trends over time
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2" />
                  Traffic Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { source: "MomentCards", percentage: 45, color: "bg-purple-500" },
                    { source: "VibeOverlays", percentage: 28, color: "bg-blue-500" },
                    { source: "Spawn Points", percentage: 18, color: "bg-green-500" },
                    { source: "Heat-Ring Takeovers", percentage: 9, color: "bg-orange-500" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${item.color} mr-2`}></div>
                        <span className="text-sm">{item.source}</span>
                      </div>
                      <span className="text-sm font-medium">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Campaign</th>
                      <th className="text-left py-2">Impressions</th>
                      <th className="text-left py-2">CTR</th>
                      <th className="text-left py-2">Conversions</th>
                      <th className="text-left py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaignPerformance.map((campaign, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 font-medium">{campaign.name}</td>
                        <td className="py-3">{campaign.impressions}</td>
                        <td className="py-3">{campaign.ctr}</td>
                        <td className="py-3">{campaign.conversions}</td>
                        <td className="py-3">
                          <Badge variant={campaign.status === 'Active' ? 'default' : 'secondary'}>
                            {campaign.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Audience Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>18-24 years</span>
                      <span>32%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '32%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>25-34 years</span>
                      <span>28%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '28%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>35-44 years</span>
                      <span>25%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>45+ years</span>
                      <span>15%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Vibes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { vibe: "Trendy", engagement: "High", percentage: 85 },
                    { vibe: "Foodie", engagement: "High", percentage: 78 },
                    { vibe: "Night Owl", engagement: "Medium", percentage: 65 },
                    { vibe: "Artsy", engagement: "Medium", percentage: 58 },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{item.vibe}</div>
                        <div className="text-xs text-muted-foreground">{item.engagement} engagement</div>
                      </div>
                      <div className="text-sm font-medium">{item.percentage}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Optimization Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Increase budget for 'Summer Vibes' campaign",
                    impact: "High",
                    description: "This campaign shows 23% higher CTR than average",
                    action: "Recommended: +$500 daily budget"
                  },
                  {
                    title: "Adjust targeting for 'Local Hotspots'",
                    impact: "Medium",
                    description: "Expand age range to include 45-54 demographic",
                    action: "Potential 15% reach increase"
                  },
                  {
                    title: "Update creative for 'Weekend Warriors'",
                    impact: "Medium",
                    description: "Current creative showing fatigue after 30 days",
                    action: "Consider new Imagen 3 generated visuals"
                  },
                ].map((rec, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{rec.title}</h4>
                      <Badge variant={rec.impact === 'High' ? 'default' : 'secondary'}>
                        {rec.impact} Impact
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                    <p className="text-sm font-medium text-purple-600">{rec.action}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvertiserReporting;
