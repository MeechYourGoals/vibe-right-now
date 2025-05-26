import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Users, Eye, MousePointer, Image, Video, Clock, Zap, Target } from "lucide-react";

const AdvertiserDashboard = () => {
  const metrics = [
    { title: "Campaign Spend", value: "$12,450", change: "+8.2%", trend: "up", icon: DollarSign },
    { title: "Impressions", value: "2.4M", change: "+15.3%", trend: "up", icon: Eye },
    { title: "Click-through Rate", value: "3.8%", change: "+0.5%", trend: "up", icon: MousePointer },
    { title: "Audience Reach", value: "890K", change: "-2.1%", trend: "down", icon: Users },
  ];

  const aiMetrics = [
    { title: "Images Created (Imagen 3)", value: "156", change: "+23%", icon: Image },
    { title: "Videos Generated (Veo)", value: "48", change: "+41%", icon: Video },
    { title: "Improved CTR from AI Content", value: "+32%", change: "+12%", icon: TrendingUp },
    { title: "Time Saved", value: "42hrs", change: "+18%", icon: Clock },
  ];

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <Icon className="h-4 w-4 mr-2" />
                  {metric.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className={`text-xs flex items-center ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {metric.change}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Google AI Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2 text-purple-600" />
            Google AI Performance
            <Badge variant="outline" className="ml-2 bg-purple-100 text-purple-600 border-purple-300">
              Powered by Imagen 3 & Veo
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {aiMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="text-center p-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 rounded-lg">
                  <Icon className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-xl font-bold">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.title}</div>
                  <div className="text-xs text-green-600 flex items-center justify-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {metric.change}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Campaign Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Summer Vibes Campaign", status: "Active", budget: "$2,500", performance: "High" },
              { name: "Local Hotspots", status: "Active", budget: "$1,800", performance: "Medium" },
              { name: "Weekend Warriors", status: "Paused", budget: "$3,200", performance: "Low" },
            ].map((campaign, index) => (
              <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{campaign.name}</div>
                  <div className="text-sm text-muted-foreground">Budget: {campaign.budget}</div>
                </div>
                <div className="text-right">
                  <Badge variant={campaign.status === 'Active' ? 'default' : 'secondary'}>
                    {campaign.status}
                  </Badge>
                  <div className={`text-xs mt-1 ${
                    campaign.performance === 'High' ? 'text-green-600' : 
                    campaign.performance === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {campaign.performance} Performance
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Image className="mr-2 h-4 w-4" />
              Create with Imagen 3
            </Button>
            <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Video className="mr-2 h-4 w-4" />
              Generate with Veo
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Target className="mr-2 h-4 w-4" />
              Update Targeting
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdvertiserDashboard;
