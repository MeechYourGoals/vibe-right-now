
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
                <div className="text-2xl font-bold text-purple-700">6,170</div>
                <p className="text-xs text-purple-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +24% vs last period
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/50 dark:to-amber-900/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Users className="h-4 w-4 mr-2 text-amber-600" />
                  Reach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-700">1.2M</div>
                <p className="text-xs text-amber-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% vs last period
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>Top performing campaigns by ROAS</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Summer Festival Push', 'Late Night Dining', 'Weekend Events'].map((campaign, index) => (
                    <div key={campaign} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{campaign}</div>
                        <div className="text-sm text-muted-foreground">
                          ${[5000, 3000, 2000][index].toLocaleString()} spend
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">
                          {[4.2, 3.8, 3.1][index]}x ROAS
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {['+12%', '+8%', '+15%'][index]}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>A/B Testing Results</CardTitle>
                <CardDescription>Current active tests and results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium">Creative A vs B</div>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Testing Imagen 3 vs Stock Photos
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium">Creative A (AI)</div>
                        <div className="text-green-600">4.2% CTR</div>
                      </div>
                      <div>
                        <div className="font-medium">Creative B (Stock)</div>
                        <div className="text-muted-foreground">2.8% CTR</div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-green-600">
                      +50% improvement with AI-generated content
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="formats" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ad Format Performance Breakdown</CardTitle>
              <CardDescription>Compare performance across all ad unit types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {adFormats.map((format) => (
                  <div key={format.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">{format.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {format.impressions.toLocaleString()} impressions
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center p-2 border rounded">
                        <div className="font-bold">{format.ctr}%</div>
                        <div className="text-muted-foreground">CTR</div>
                      </div>
                      <div className="text-center p-2 border rounded">
                        <div className="font-bold">{format.conversions}</div>
                        <div className="text-muted-foreground">Conversions</div>
                      </div>
                      <div className="text-center p-2 border rounded">
                        <div className="font-bold">${(format.conversions * 12.5).toFixed(0)}</div>
                        <div className="text-muted-foreground">Revenue</div>
                      </div>
                    </div>
                    <Progress value={(format.ctr / 6) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attribution" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <QrCode className="h-5 w-5 mr-2 text-blue-600" />
                  QR Code Bridge Attribution
                </CardTitle>
                <CardDescription>
                  Track redemptions with unique QR overlays
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {qrMetrics.map((metric) => (
                    <div key={metric.campaign} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{metric.campaign}</div>
                        <div className="text-sm text-muted-foreground">
                          {metric.scans.toLocaleString()} scans
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{metric.rate}%</div>
                        <div className="text-sm text-muted-foreground">
                          {metric.redemptions.toLocaleString()} redemptions
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-green-600" />
                  Card-Linked Offers (Visa)
                </CardTitle>
                <CardDescription>
                  Track spend uplift post ad exposure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">+23%</div>
                      <div className="text-sm text-muted-foreground">Spend Uplift</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold">$187K</div>
                      <div className="text-sm text-muted-foreground">Attributed Revenue</div>
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="text-sm font-medium text-green-800 dark:text-green-200">
                      Visa Partnership Active
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400">
                      Real-time transaction tracking enabled
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="foottraffic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-purple-600" />
                Halo Reporting - Foot Traffic Analysis
              </CardTitle>
              <CardDescription>
                Ad exposed foot traffic vs. baseline in 15-minute intervals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">+31%</div>
                    <div className="text-sm text-muted-foreground">Foot Traffic Lift</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold">847</div>
                    <div className="text-sm text-muted-foreground">Additional Visits</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold">$12.40</div>
                    <div className="text-sm text-muted-foreground">Avg. Spend per Visit</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-medium">Peak Traffic Hours</div>
                  {[
                    { time: '7:00-8:00 PM', lift: '+45%', visits: 156 },
                    { time: '8:00-9:00 PM', lift: '+38%', visits: 142 },
                    { time: '9:00-10:00 PM', lift: '+29%', visits: 118 }
                  ].map((hour) => (
                    <div key={hour.time} className="flex justify-between items-center p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{hour.time}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-purple-600">{hour.lift}</div>
                        <div className="text-sm text-muted-foreground">{hour.visits} visits</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2 text-blue-600" />
                AI Optimization Recommendations
              </CardTitle>
              <CardDescription>
                Machine learning insights for campaign improvement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-gray-800 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium text-green-600">High Priority</div>
                      <div className="text-sm mt-1">
                        Increase budget for "Summer Festival" campaign by 40% - predicted +67% ROAS improvement
                      </div>
                    </div>
                    <Button size="sm">Apply</Button>
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-gray-800 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium text-amber-600">Medium Priority</div>
                      <div className="text-sm mt-1">
                        Switch to Veo-generated videos for VibeOverlay ads - AI predicts +23% engagement
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Review</Button>
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-gray-800 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium text-blue-600">Optimization</div>
                      <div className="text-sm mt-1">
                        Target Moment Score 8+ for QSR campaigns during 9-11 PM for maximum conversion
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Enable</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel Analysis</CardTitle>
                <CardDescription>Identify optimization opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { stage: 'Impressions', value: '5.8M', rate: '100%' },
                    { stage: 'Clicks', value: '220K', rate: '3.8%' },
                    { stage: 'Landing Page Views', value: '186K', rate: '84.5%' },
                    { stage: 'Conversions', value: '6.2K', rate: '3.3%' }
                  ].map((stage, index) => (
                    <div key={stage.stage} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-8 rounded ${
                          ['bg-blue-500', 'bg-green-500', 'bg-amber-500', 'bg-purple-500'][index]
                        }`} />
                        <span className="text-sm">{stage.stage}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{stage.value}</div>
                        <div className="text-xs text-muted-foreground">{stage.rate}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Google AI Impact</CardTitle>
                <CardDescription>Performance boost from AI-generated content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Imagen 3 Images</span>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">+42% CTR</Badge>
                    </div>
                    <Progress value={85} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">vs stock photography</div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Veo Videos</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">+38% Engagement</Badge>
                    </div>
                    <Progress value={75} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">vs traditional video</div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Time Saved</span>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700">147 hours</Badge>
                    </div>
                    <Progress value={95} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">vs manual creation</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvertiserReporting;
