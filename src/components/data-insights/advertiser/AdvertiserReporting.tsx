
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Eye, MousePointer, DollarSign, TrendingUp, Download, Calendar, Target, Split, RefreshCw } from "lucide-react";

interface AdvertiserReportingProps {
  subscriptionTier: 'standard' | 'plus' | 'premium' | 'pro';
}

const performanceData = [
  { date: '2024-01-01', impressions: 45000, clicks: 1440, conversions: 89, spend: 2800 },
  { date: '2024-01-02', impressions: 52000, clicks: 1664, conversions: 102, spend: 3200 },
  { date: '2024-01-03', impressions: 48000, clicks: 1536, conversions: 95, spend: 2950 },
  { date: '2024-01-04', impressions: 61000, clicks: 1952, conversions: 124, spend: 3850 },
  { date: '2024-01-05', impressions: 55000, clicks: 1760, conversions: 108, spend: 3400 },
  { date: '2024-01-06', impressions: 59000, clicks: 1888, conversions: 118, spend: 3700 },
  { date: '2024-01-07', impressions: 51000, clicks: 1632, conversions: 98, spend: 3050 }
];

const campaignComparison = [
  { name: 'MomentCard A', impressions: 45000, ctr: 3.2, cpc: 1.95, roas: 4.8 },
  { name: 'MomentCard B', impressions: 32000, ctr: 2.8, cpc: 2.10, roas: 3.9 },
  { name: 'VibeOverlay A', impressions: 38000, ctr: 4.1, cpc: 1.75, roas: 5.2 },
  { name: 'Spawn Point A', impressions: 28000, ctr: 3.5, cpc: 1.88, roas: 4.1 }
];

const audienceBreakdown = [
  { name: '18-24', value: 28, color: '#8b5cf6' },
  { name: '25-34', value: 42, color: '#3b82f6' },
  { name: '35-44', value: 20, color: '#10b981' },
  { name: '45+', value: 10, color: '#f59e0b' }
];

const conversionFunnel = [
  { stage: 'Impressions', value: 100, count: 245000 },
  { stage: 'Clicks', value: 85, count: 7840 },
  { stage: 'Visits', value: 68, count: 5324 },
  { stage: 'Conversions', value: 45, count: 1547 }
];

const AdvertiserReporting: React.FC<AdvertiserReportingProps> = ({ subscriptionTier }) => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedCampaign, setSelectedCampaign] = useState('all');

  return (
    <div className="space-y-6">
      {/* Controls & Filters */}
      <Card className="bg-neutral-800/80 border-neutral-600">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white flex items-center">
              <Eye className="mr-2 h-5 w-5" />
              Campaign Analytics & Reporting
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-neutral-600 text-white hover:bg-neutral-700">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="border-neutral-600 text-white hover:bg-neutral-700">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-neutral-400" />
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="bg-neutral-700 border-neutral-600 text-white w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-neutral-700 border-neutral-600">
                  <SelectItem value="1d">Today</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-neutral-400" />
              <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                <SelectTrigger className="bg-neutral-700 border-neutral-600 text-white w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-neutral-700 border-neutral-600">
                  <SelectItem value="all">All Campaigns</SelectItem>
                  <SelectItem value="momentcard">MomentCard Campaigns</SelectItem>
                  <SelectItem value="vibeoverlay">VibeOverlay Campaigns</SelectItem>
                  <SelectItem value="spawnpoint">Spawn Point Campaigns</SelectItem>
                  <SelectItem value="heatring">Heat-Ring Campaigns</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-950/60 to-blue-900/40 border-blue-600/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-300">Total Impressions</p>
                <p className="text-2xl font-bold text-white">2.45M</p>
                <p className="text-xs text-blue-200">+12.3% vs last period</p>
              </div>
              <Eye className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-950/60 to-purple-900/40 border-purple-600/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-300">Click-Through Rate</p>
                <p className="text-2xl font-bold text-white">3.2%</p>
                <p className="text-xs text-purple-200">+0.4% vs last period</p>
              </div>
              <MousePointer className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-950/60 to-green-900/40 border-green-600/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-300">Conversion Rate</p>
                <p className="text-2xl font-bold text-white">1.96%</p>
                <p className="text-xs text-green-200">+0.3% vs last period</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-950/60 to-amber-900/40 border-amber-600/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-300">Return on Ad Spend</p>
                <p className="text-2xl font-bold text-white">4.8x</p>
                <p className="text-xs text-amber-200">+0.5x vs last period</p>
              </div>
              <DollarSign className="h-8 w-8 text-amber-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Tabs */}
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="bg-neutral-800 border-neutral-700 w-full">
          <TabsTrigger value="performance" className="data-[state=active]:bg-neutral-700 text-white">
            Performance Trends
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="data-[state=active]:bg-neutral-700 text-white">
            Campaign Comparison
          </TabsTrigger>
          <TabsTrigger value="audience" className="data-[state=active]:bg-neutral-700 text-white">
            Audience Insights
          </TabsTrigger>
          <TabsTrigger value="funnel" className="data-[state=active]:bg-neutral-700 text-white">
            Conversion Funnel
          </TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="mt-6">
          <Card className="bg-neutral-800/80 border-neutral-600">
            <CardHeader>
              <CardTitle className="text-white">Performance Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }} 
                    />
                    <Line type="monotone" dataKey="impressions" stroke="#3b82f6" strokeWidth={2} name="Impressions" />
                    <Line type="monotone" dataKey="clicks" stroke="#8b5cf6" strokeWidth={2} name="Clicks" />
                    <Line type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={2} name="Conversions" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="mt-6">
          <Card className="bg-neutral-800/80 border-neutral-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Split className="mr-2 h-5 w-5" />
                A/B Test Results & Campaign Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={campaignComparison}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="impressions" fill="#3b82f6" name="Impressions" />
                    <Bar dataKey="ctr" fill="#8b5cf6" name="CTR %" />
                    <Bar dataKey="roas" fill="#10b981" name="ROAS" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 p-4 bg-green-950/40 border border-green-600/30 rounded-lg">
                <h4 className="text-green-300 font-bold mb-2">Optimization Recommendations</h4>
                <ul className="space-y-1 text-sm text-green-200/80">
                  <li>• VibeOverlay A shows highest ROAS - consider increasing budget by 25%</li>
                  <li>• MomentCard B has lower CTR - test new creative variations</li>
                  <li>• Spawn Point A has good engagement - expand to similar locations</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-neutral-800/80 border-neutral-600">
              <CardHeader>
                <CardTitle className="text-white">Age Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={audienceBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {audienceBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {audienceBreakdown.map((item) => (
                    <div key={item.name} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-white">{item.name}: {item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-neutral-800/80 border-neutral-600">
              <CardHeader>
                <CardTitle className="text-white">Top Performing Segments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-blue-950/40 border border-blue-600/30 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-300 font-medium">Young Professionals (25-34)</span>
                    <Badge className="bg-blue-600 text-white">Best ROI</Badge>
                  </div>
                  <p className="text-sm text-blue-200/80">ROAS: 6.2x • CTR: 4.1% • Conversions: 524</p>
                </div>
                
                <div className="p-3 bg-purple-950/40 border border-purple-600/30 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-purple-300 font-medium">Weekend Warriors</span>
                    <Badge className="bg-purple-600 text-white">High Engagement</Badge>
                  </div>
                  <p className="text-sm text-purple-200/80">ROAS: 5.8x • CTR: 3.9% • Conversions: 412</p>
                </div>
                
                <div className="p-3 bg-green-950/40 border border-green-600/30 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-300 font-medium">Local Food Enthusiasts</span>
                    <Badge className="bg-green-600 text-white">Growing</Badge>
                  </div>
                  <p className="text-sm text-green-200/80">ROAS: 4.9x • CTR: 3.5% • Conversions: 298</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="funnel" className="mt-6">
          <Card className="bg-neutral-800/80 border-neutral-600">
            <CardHeader>
              <CardTitle className="text-white">Conversion Funnel Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversionFunnel.map((stage, index) => (
                  <div key={stage.stage} className="relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">{stage.stage}</span>
                      <span className="text-neutral-400">{stage.count.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-neutral-700 rounded-full h-6">
                      <div 
                        className={`h-6 rounded-full transition-all duration-500 ${
                          index === 0 ? 'bg-blue-500' :
                          index === 1 ? 'bg-purple-500' :
                          index === 2 ? 'bg-green-500' :
                          'bg-amber-500'
                        }`}
                        style={{ width: `${stage.value}%` }}
                      >
                        <span className="flex items-center justify-center h-full text-white text-sm font-medium">
                          {stage.value}%
                        </span>
                      </div>
                    </div>
                    {index < conversionFunnel.length - 1 && (
                      <div className="text-center text-neutral-400 text-sm mt-1">
                        ↓ {((conversionFunnel[index + 1].value / stage.value) * 100).toFixed(1)}% conversion rate
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-amber-950/40 border border-amber-600/30 rounded-lg">
                <h4 className="text-amber-300 font-bold mb-2">Funnel Optimization Opportunities</h4>
                <ul className="space-y-1 text-sm text-amber-200/80">
                  <li>• 15% drop-off from clicks to visits - optimize landing page load times</li>
                  <li>• 23% drop-off from visits to conversions - improve call-to-action placement</li>
                  <li>• Test shorter forms and simplified checkout process</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvertiserReporting;
