
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  MousePointer, 
  DollarSign,
  Users,
  MapPin,
  Clock,
  Download,
  RefreshCw,
  Target,
  Zap
} from "lucide-react";

const AdvertiserReporting = () => {
  const campaigns = [
    {
      name: "Summer Festival Push",
      impressions: 845000,
      clicks: 27040,
      ctr: 3.2,
      spend: 3200,
      conversions: 412,
      roas: 4.2,
      trend: "up"
    },
    {
      name: "Late Night Dining", 
      impressions: 520000,
      clicks: 15600,
      ctr: 3.0,
      spend: 2850,
      conversions: 289,
      roas: 3.8,
      trend: "stable"
    },
    {
      name: "Weekend Events",
      impressions: 380000,
      clicks: 11400,
      ctr: 3.0,
      spend: 1200,
      conversions: 156,
      roas: 3.2,
      trend: "down"
    }
  ];

  const adFormats = [
    { name: "MomentCard", impressions: 950000, ctr: 3.1, conversions: 425 },
    { name: "VibeOverlay", impressions: 720000, ctr: 2.8, conversions: 312 },
    { name: "Spawn Point", impressions: 650000, ctr: 4.2, conversions: 389 },
    { name: "Heat Ring Takeover", impressions: 420000, ctr: 2.1, conversions: 98 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
            Analytics & Reporting
          </h2>
          <p className="text-muted-foreground">Comprehensive performance insights and optimization recommendations</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="7d">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Eye className="h-4 w-4 mr-2 text-blue-600" />
              Total Impressions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">2.74M</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-xs text-green-600">+18.2% vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <MousePointer className="h-4 w-4 mr-2 text-green-600" />
              Click-Through Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">3.15%</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-xs text-green-600">+0.8% vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-purple-600" />
              ROAS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">3.9x</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-xs text-green-600">+12% vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/50 dark:to-amber-900/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Target className="h-4 w-4 mr-2 text-amber-600" />
              Conversions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700">857</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-xs text-green-600">+24% vs last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>Detailed breakdown by campaign</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaigns.map((campaign, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{campaign.name}</h4>
                    <div className="flex items-center gap-1">
                      {campaign.trend === 'up' && <TrendingUp className="h-3 w-3 text-green-600" />}
                      {campaign.trend === 'down' && <TrendingDown className="h-3 w-3 text-red-600" />}
                      <Badge variant="outline" className={
                        campaign.trend === 'up' ? 'text-green-700 border-green-200' :
                        campaign.trend === 'down' ? 'text-red-700 border-red-200' :
                        'text-gray-700 border-gray-200'
                      }>
                        {campaign.roas}x ROAS
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Impressions:</span>
                      <span className="font-medium ml-2">{campaign.impressions.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">CTR:</span>
                      <span className="font-medium ml-2">{campaign.ctr}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Spend:</span>
                      <span className="font-medium ml-2">${campaign.spend.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Conversions:</span>
                      <span className="font-medium ml-2">{campaign.conversions}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ad Format Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Ad Format Analysis</CardTitle>
            <CardDescription>Performance breakdown by ad unit type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {adFormats.map((format, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{format.name}</span>
                    <div className="text-right">
                      <div className="text-sm font-medium">{format.ctr}% CTR</div>
                      <div className="text-xs text-muted-foreground">{format.conversions} conversions</div>
                    </div>
                  </div>
                  <Progress value={(format.impressions / 1000000) * 100} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {format.impressions.toLocaleString()} impressions
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attribution & Measurement */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-blue-600" />
              QR Code Attribution
            </CardTitle>
            <CardDescription>Track in-store conversions via QR codes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">QR Scans</span>
              <Badge variant="outline">2,847</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Store Visits</span>
              <Badge variant="outline">1,923</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Redemption Rate</span>
              <Badge variant="outline" className="text-green-700 border-green-200">67.5%</Badge>
            </div>
            <Progress value={67.5} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-green-600" />
              Card-Linked Offers
            </CardTitle>
            <CardDescription>Visa partnership spend tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Linked Cards</span>
              <Badge variant="outline">15,234</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Tracked Purchases</span>
              <Badge variant="outline">8,967</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Spend Uplift</span>
              <Badge variant="outline" className="text-green-700 border-green-200">+18.2%</Badge>
            </div>
            <Progress value={58.9} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-purple-600" />
              Halo Reporting
            </CardTitle>
            <CardDescription>Foot traffic lift measurement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Baseline Traffic</span>
              <Badge variant="outline">4,521</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Ad-Exposed Traffic</span>
              <Badge variant="outline">5,672</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Lift</span>
              <Badge variant="outline" className="text-green-700 border-green-200">+25.5%</Badge>
            </div>
            <Progress value={75.5} className="h-2" />
          </CardContent>
        </Card>
      </div>

      {/* AI Optimization Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2 text-amber-600" />
            AI Optimization Recommendations
          </CardTitle>
          <CardDescription>
            Smart suggestions to improve campaign performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-medium text-sm">Increase Budget</span>
                <Badge variant="outline" className="text-xs bg-green-100 text-green-700">High Impact</Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Summer Festival Push campaign showing 40% above-target performance. Recommend 50% budget increase.
              </p>
              <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                Apply Recommendation
              </Button>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-sm">Adjust Targeting</span>
                <Badge variant="outline" className="text-xs bg-blue-100 text-blue-700">Medium Impact</Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                VibeOverlay ads performing better with 25-34 age group. Consider narrowing target age range.
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Review Targeting
              </Button>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-purple-600" />
                <span className="font-medium text-sm">Optimize Timing</span>
                <Badge variant="outline" className="text-xs bg-purple-100 text-purple-700">Medium Impact</Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Heat Ring Takeover ads show 60% higher CTR during 8-10pm. Shift budget to evening hours.
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Adjust Schedule
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvertiserReporting;
