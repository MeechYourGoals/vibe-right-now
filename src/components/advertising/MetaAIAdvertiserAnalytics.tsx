
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Eye, MousePointer, Users, DollarSign, Calendar, ExternalLink, Brain, Zap } from "lucide-react";

interface CampaignAnalytics {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  budget: number;
  spent: number;
  reach: number;
  clicks: number;
  conversions: number;
  ctr: number;
  roas: number;
  startDate: string;
  endDate?: string;
  aiOptimizations: number;
}

const mockCampaigns: CampaignAnalytics[] = [
  {
    id: '1',
    name: 'Black Friday Deals - Meta AI Generated',
    status: 'active',
    budget: 1000,
    spent: 847.50,
    reach: 45200,
    clicks: 1716,
    conversions: 127,
    ctr: 3.8,
    roas: 4.2,
    startDate: '2024-01-15',
    aiOptimizations: 23
  },
  {
    id: '2',
    name: 'Product Launch - AI Optimized',
    status: 'completed',
    budget: 750,
    spent: 732.80,
    reach: 32100,
    clicks: 963,
    conversions: 84,
    ctr: 3.0,
    roas: 3.8,
    startDate: '2024-01-10',
    endDate: '2024-01-17',
    aiOptimizations: 18
  }
];

const MetaAIAdvertiserAnalytics = () => {
  const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`;
  const formatNumber = (num: number) => num.toLocaleString();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/20 text-green-400">Active</Badge>;
      case 'paused':
        return <Badge className="bg-yellow-500/20 text-yellow-400">Paused</Badge>;
      case 'completed':
        return <Badge className="bg-gray-500/20 text-gray-400">Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Meta AI Campaign Analytics</h3>
          <p className="text-muted-foreground">Advanced performance insights powered by Meta AI</p>
        </div>
        <Button variant="outline" size="sm">
          <ExternalLink className="h-4 w-4 mr-2" />
          View in Meta Ads Manager
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Eye className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-blue-500">77.3K</p>
            <p className="text-sm text-muted-foreground">Total Reach</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <MousePointer className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-green-500">2,679</p>
            <p className="text-sm text-muted-foreground">Total Clicks</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-5 w-5 text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-purple-500">211</p>
            <p className="text-sm text-muted-foreground">Conversions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="h-5 w-5 text-orange-500" />
            </div>
            <p className="text-2xl font-bold text-orange-500">4.0x</p>
            <p className="text-sm text-muted-foreground">Avg ROAS</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Brain className="h-5 w-5 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-blue-400">41</p>
            <p className="text-sm text-muted-foreground">AI Optimizations</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Performance Insights */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-400" />
            Meta AI Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <h4 className="font-medium">Auto-Optimization</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                AI has made 41 optimizations across your campaigns
              </p>
              <Badge className="bg-green-500/20 text-green-400">+23% Performance</Badge>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-500" />
                <h4 className="font-medium">Audience Expansion</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                AI identified 3 new high-performing audience segments
              </p>
              <Badge className="bg-blue-500/20 text-blue-400">+15% Reach</Badge>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                <h4 className="font-medium">Budget Optimization</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                AI redistributed budget for optimal performance
              </p>
              <Badge className="bg-purple-500/20 text-purple-400">+18% Efficiency</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Campaign List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Campaign Performance Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockCampaigns.map((campaign) => (
              <div key={campaign.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{campaign.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusBadge(campaign.status)}
                      <Badge className="bg-blue-500/20 text-blue-400">
                        <Brain className="h-3 w-3 mr-1" />
                        {campaign.aiOptimizations} AI optimizations
                      </Badge>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {campaign.startDate} {campaign.endDate && `- ${campaign.endDate}`}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(campaign.spent)} / {formatCurrency(campaign.budget)}</p>
                    <p className="text-sm text-muted-foreground">Budget Used</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Reach</p>
                    <p className="font-medium">{formatNumber(campaign.reach)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Clicks</p>
                    <p className="font-medium">{formatNumber(campaign.clicks)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">CTR</p>
                    <p className="font-medium">{campaign.ctr}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Conversions</p>
                    <p className="font-medium">{campaign.conversions}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">ROAS</p>
                    <p className="font-medium">{campaign.roas}x</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">AI Score</p>
                    <p className="font-medium text-green-500">Excellent</p>
                  </div>
                </div>
                
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((campaign.spent / campaign.budget) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          {mockCampaigns.length === 0 && (
            <div className="text-center py-8">
              <Brain className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h4 className="font-medium mb-2">No Meta AI campaigns yet</h4>
              <p className="text-sm text-muted-foreground">Launch your first Meta AI campaign to see advanced analytics here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MetaAIAdvertiserAnalytics;
