
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Eye, MousePointer, Users, DollarSign, Calendar, ExternalLink } from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  startDate: string;
  endDate?: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Music Festival - Auto Generated',
    status: 'active',
    budget: 25,
    spent: 18.50,
    impressions: 12400,
    clicks: 396,
    conversions: 24,
    ctr: 3.2,
    startDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Comedy Night Special - AI Optimized',
    status: 'completed',
    budget: 50,
    spent: 47.80,
    impressions: 23800,
    clicks: 714,
    conversions: 42,
    ctr: 3.0,
    startDate: '2024-01-10',
    endDate: '2024-01-17'
  }
];

const MetaAICampaignAnalytics = () => {
  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;
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
        <h3 className="text-lg font-semibold">Meta AI Campaign Analytics</h3>
        <Button variant="outline" size="sm">
          <ExternalLink className="h-4 w-4 mr-2" />
          View in Meta Ads Manager
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Eye className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-blue-500">36.2K</p>
            <p className="text-sm text-muted-foreground">Total Impressions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <MousePointer className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-green-500">1,110</p>
            <p className="text-sm text-muted-foreground">Total Clicks</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-5 w-5 text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-purple-500">66</p>
            <p className="text-sm text-muted-foreground">Conversions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="h-5 w-5 text-orange-500" />
            </div>
            <p className="text-2xl font-bold text-orange-500">$66.30</p>
            <p className="text-sm text-muted-foreground">Total Spent</p>
          </CardContent>
        </Card>
      </div>

      {/* Campaign List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Active & Recent Campaigns
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
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Impressions</p>
                    <p className="font-medium">{formatNumber(campaign.impressions)}</p>
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
                </div>
                
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((campaign.spent / campaign.budget) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          {mockCampaigns.length === 0 && (
            <div className="text-center py-8">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h4 className="font-medium mb-2">No campaigns yet</h4>
              <p className="text-sm text-muted-foreground">Launch your first Meta AI campaign to see analytics here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MetaAICampaignAnalytics;
