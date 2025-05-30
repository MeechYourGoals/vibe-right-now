
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign,
  Users,
  MousePointer,
  Eye,
  Video,
  Image as ImageIcon,
  Target,
  BarChart3
} from "lucide-react";

const AdvertiserDashboard = () => {
  const campaigns = [
    {
      id: 1,
      name: "Summer Festival Push",
      status: "active",
      budget: 5000,
      spent: 3200,
      impressions: 845000,
      clicks: 27040,
      ctr: 3.2,
      trend: "up"
    },
    {
      id: 2,
      name: "Late Night Dining",
      status: "active",
      budget: 3000,
      spent: 2850,
      impressions: 520000,
      clicks: 15600,
      ctr: 3.0,
      trend: "down"
    },
    {
      id: 3,
      name: "Weekend Events",
      status: "paused",
      budget: 2000,
      spent: 1200,
      impressions: 380000,
      clicks: 11400,
      ctr: 3.0,
      trend: "stable"
    }
  ];

  const alerts = [
    {
      type: "warning",
      message: "Late Night Dining campaign budget 95% depleted",
      action: "Increase Budget"
    },
    {
      type: "success", 
      message: "Summer Festival Push exceeding CTR goals by 40%",
      action: "Scale Up"
    },
    {
      type: "info",
      message: "Weekend Events campaign paused - ready to resume",
      action: "Resume"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <BarChart3 className="h-4 w-4 mr-2 text-blue-600" />
              Active Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">8</div>
            <p className="text-xs text-blue-600">2 launching tomorrow</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-green-600" />
              Total Spend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">$47.2K</div>
            <p className="text-xs text-green-600">$12.8K remaining budget</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="h-4 w-4 mr-2 text-purple-600" />
              Total Reach
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">2.8M</div>
            <p className="text-xs text-purple-600">Unique users reached</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/50 dark:to-amber-900/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Target className="h-4 w-4 mr-2 text-amber-600" />
              Avg. CTR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700">3.1%</div>
            <p className="text-xs text-amber-600">Above industry avg</p>
          </CardContent>
        </Card>
      </div>

      {/* Google AI Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Video className="h-5 w-5 mr-2 text-blue-600" />
            Google AI Performance Dashboard
          </CardTitle>
          <CardDescription>
            Real-time performance metrics for Imagen 3 and Veo generated content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center">
                  <ImageIcon className="h-4 w-4 mr-1 text-blue-600" />
                  Images Created
                </span>
                <span className="text-2xl font-bold">324</span>
              </div>
              <Progress value={85} className="h-2" />
              <p className="text-xs text-muted-foreground">Imagen 3 generated</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center">
                  <Video className="h-4 w-4 mr-1 text-green-600" />
                  Videos Generated
                </span>
                <span className="text-2xl font-bold">89</span>
              </div>
              <Progress value={65} className="h-2" />
              <p className="text-xs text-muted-foreground">Veo generated</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1 text-purple-600" />
                  CTR Improvement
                </span>
                <span className="text-2xl font-bold text-green-600">+42%</span>
              </div>
              <Progress value={95} className="h-2" />
              <p className="text-xs text-muted-foreground">vs non-AI content</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-amber-600" />
                  Time Saved
                </span>
                <span className="text-2xl font-bold">147h</span>
              </div>
              <Progress value={78} className="h-2" />
              <p className="text-xs text-muted-foreground">vs manual creation</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Management */}
        <Card>
          <CardHeader>
            <CardTitle>Active Campaigns</CardTitle>
            <CardDescription>Manage and monitor your running campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{campaign.name}</h4>
                      <Badge 
                        variant={campaign.status === 'active' ? 'default' : 'secondary'}
                        className={campaign.status === 'active' ? 'bg-green-100 text-green-700' : ''}
                      >
                        {campaign.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}</span>
                      <span>{campaign.impressions.toLocaleString()} impressions</span>
                      <span className="flex items-center gap-1">
                        {campaign.trend === 'up' ? (
                          <TrendingUp className="h-3 w-3 text-green-600" />
                        ) : campaign.trend === 'down' ? (
                          <TrendingDown className="h-3 w-3 text-red-600" />
                        ) : null}
                        {campaign.ctr}% CTR
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Campaign Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Alerts</CardTitle>
            <CardDescription>Important notifications and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                  <div className="mt-0.5">
                    {alert.type === 'warning' && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                    {alert.type === 'success' && <CheckCircle className="h-4 w-4 text-green-500" />}
                    {alert.type === 'info' && <Clock className="h-4 w-4 text-blue-500" />}
                  </div>
                  <div className="flex-1 space-y-2">
                    <p className="text-sm">{alert.message}</p>
                    <Button variant="outline" size="sm">
                      {alert.action}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>AI-powered content creation and campaign optimization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-auto p-4 flex flex-col items-center gap-2 bg-blue-600 hover:bg-blue-700">
              <ImageIcon className="h-5 w-5" />
              <span className="text-sm">Generate Images</span>
              <span className="text-xs opacity-75">with Imagen 3</span>
            </Button>
            <Button className="h-auto p-4 flex flex-col items-center gap-2 bg-green-600 hover:bg-green-700">
              <Video className="h-5 w-5" />
              <span className="text-sm">Create Videos</span>
              <span className="text-xs opacity-75">with Veo</span>
            </Button>
            <Button className="h-auto p-4 flex flex-col items-center gap-2 bg-purple-600 hover:bg-purple-700">
              <Target className="h-5 w-5" />
              <span className="text-sm">Optimize Targeting</span>
              <span className="text-xs opacity-75">AI suggestions</span>
            </Button>
            <Button className="h-auto p-4 flex flex-col items-center gap-2 bg-amber-600 hover:bg-amber-700">
              <BarChart3 className="h-5 w-5" />
              <span className="text-sm">Performance Analysis</span>
              <span className="text-xs opacity-75">Deep insights</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvertiserDashboard;
