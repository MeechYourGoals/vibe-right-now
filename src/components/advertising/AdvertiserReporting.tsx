
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Eye, 
  MousePointer, 
  CreditCard,
  QrCode,
  MapPin,
  Clock,
  Users,
  Target,
  Brain,
  Download
} from "lucide-react";

const AdvertiserReporting = () => {
  const [timeRange, setTimeRange] = useState("7d");

  const adFormats = [
    { name: "MomentCard", impressions: 2400000, ctr: 3.2, conversions: 1840, color: "blue" },
    { name: "VibeOverlay", impressions: 1800000, ctr: 4.1, conversions: 2150, color: "green" },
    { name: "Spawn Point", impressions: 950000, ctr: 2.8, conversions: 980, color: "purple" },
    { name: "Heat Ring", impressions: 650000, ctr: 5.2, conversions: 1200, color: "amber" }
  ];

  const qrMetrics = [
    { campaign: "Summer Festival", scans: 15420, redemptions: 12890, rate: 83.6 },
    { campaign: "Late Night Dining", scans: 8730, redemptions: 6950, rate: 79.6 },
    { campaign: "Weekend Events", scans: 12100, redemptions: 9680, rate: 80.0 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics & Reporting</h2>
          <p className="text-muted-foreground">Comprehensive performance tracking with AI insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="formats">Ad Formats</TabsTrigger>
          <TabsTrigger value="attribution">Attribution</TabsTrigger>
          <TabsTrigger value="foottraffic">Foot Traffic</TabsTrigger>
          <TabsTrigger value="optimization">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Eye className="h-4 w-4 mr-2 text-blue-600" />
                  Total Impressions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-700">5.8M</div>
                <p className="text-xs text-blue-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +18% vs last period
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <MousePointer className="h-4 w-4 mr-2 text-green-600" />
                  Avg. CTR
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-700">3.8%</div>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +0.6% vs last period
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Target className="h-4 w-4 mr-2 text-purple-600" />
                  Conversions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-700">6.2K</div>
                <p className="text-xs text-purple-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% vs last period
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/50 dark:to-amber-900/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <CreditCard className="h-4 w-4 mr-2 text-amber-600" />
                  ROAS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-700">4.2x</div>
                <p className="text-xs text-amber-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +0.8x vs last period
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="formats" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ad Format Performance</CardTitle>
              <CardDescription>Performance breakdown by ad unit type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {adFormats.map((format) => (
                  <div key={format.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">{format.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{format.impressions.toLocaleString()} impressions</span>
                        <span>{format.ctr}% CTR</span>
                        <span>{format.conversions} conversions</span>
                      </div>
                    </div>
                    <Badge variant="outline" className={`bg-${format.color}-50 text-${format.color}-700`}>
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Performing well
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attribution" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <QrCode className="h-5 w-5 mr-2" />
                QR Code Bridge Attribution
              </CardTitle>
              <CardDescription>Track conversions from QR code overlays to in-store purchases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {qrMetrics.map((metric) => (
                  <div key={metric.campaign} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">{metric.campaign}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{metric.scans.toLocaleString()} scans</span>
                        <span>{metric.redemptions.toLocaleString()} redemptions</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{metric.rate}%</div>
                      <div className="text-xs text-muted-foreground">Conversion Rate</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Card-Linked Offers (Visa Partnership)
              </CardTitle>
              <CardDescription>Direct attribution from ad view to purchase</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl font-bold">$847K</div>
                  <div className="text-sm text-muted-foreground">Attributed Revenue</div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl font-bold">12.4%</div>
                  <div className="text-sm text-muted-foreground">Attribution Rate</div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl font-bold">$89</div>
                  <div className="text-sm text-muted-foreground">Avg. Order Value</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="foottraffic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Halo Reporting - Foot Traffic Lift
              </CardTitle>
              <CardDescription>Measure incremental foot traffic in 15-minute intervals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Campaign Impact</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Baseline Traffic</span>
                      <span className="font-medium">142 visits/day</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Campaign Period</span>
                      <span className="font-medium text-green-600">186 visits/day</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Lift</span>
                      <span className="font-bold text-green-600">+31%</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Peak Impact Hours</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">7:00-7:15 PM</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">+67%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">8:30-8:45 PM</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">+45%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">9:15-9:30 PM</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">+38%</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2 text-blue-600" />
                AI Optimization Insights
              </CardTitle>
              <CardDescription>Machine learning recommendations for campaign improvement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100">Audience Expansion Opportunity</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
                    Your MomentCard ads are performing 42% above average. Consider expanding to similar audience segments for increased reach.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">Apply Recommendation</Button>
                </div>
                
                <div className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20">
                  <h4 className="font-medium text-green-900 dark:text-green-100">Budget Reallocation</h4>
                  <p className="text-sm text-green-700 dark:text-green-200 mt-1">
                    Shift 20% budget from Heat Ring to VibeOverlay format for +$2.3K projected revenue increase.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">View Details</Button>
                </div>
                
                <div className="p-4 border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/20">
                  <h4 className="font-medium text-amber-900 dark:text-amber-100">Creative Refresh</h4>
                  <p className="text-sm text-amber-700 dark:text-amber-200 mt-1">
                    Generate new Imagen 3 visuals for campaigns running 14+ days to combat creative fatigue.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">Generate New Creatives</Button>
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
