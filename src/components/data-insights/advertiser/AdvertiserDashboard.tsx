import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, DollarSign, Users, Eye, MousePointer, Target, Calendar, AlertCircle, Sparkles, Image, Video } from "lucide-react";

interface AdvertiserDashboardProps {
  subscriptionTier: 'standard' | 'plus' | 'premium' | 'pro';
}

const campaignData = [
  { name: 'MomentCard', impressions: 45000, clicks: 1400, spend: 2800, conversions: 89 },
  { name: 'VibeOverlay', impressions: 32000, clicks: 960, spend: 1920, conversions: 67 },
  { name: 'Spawn Point', impressions: 28000, clicks: 840, spend: 1680, conversions: 45 },
  { name: 'Heat-Ring', impressions: 15000, clicks: 600, spend: 1200, conversions: 34 }
];

const performanceData = [
  { day: 'Mon', impressions: 18000, clicks: 540, conversions: 28 },
  { day: 'Tue', impressions: 22000, clicks: 660, conversions: 35 },
  { day: 'Wed', impressions: 19000, clicks: 570, conversions: 31 },
  { day: 'Thu', impressions: 25000, clicks: 750, conversions: 42 },
  { day: 'Fri', impressions: 28000, clicks: 840, conversions: 48 },
  { day: 'Sat', impressions: 31000, clicks: 930, conversions: 52 },
  { day: 'Sun', impressions: 27000, clicks: 810, conversions: 46 }
];

const audienceData = [
  { name: '18-24', value: 28, color: '#8b5cf6' },
  { name: '25-34', value: 42, color: '#3b82f6' },
  { name: '35-44', value: 20, color: '#10b981' },
  { name: '45+', value: 10, color: '#f59e0b' }
];

const AdvertiserDashboard: React.FC<AdvertiserDashboardProps> = ({ subscriptionTier }) => {
  const isPro = subscriptionTier === 'pro';
  
  return (
    <div className="space-y-6">
      {/* Google AI Creative Tools Banner */}
      <Card className="bg-gradient-to-r from-blue-950/80 to-purple-950/80 border-2 border-blue-600/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl text-blue-300 flex items-center">
                <Sparkles className="mr-3 h-6 w-6" />
                AI-Powered Creative Suite
              </CardTitle>
              <p className="text-blue-200/80 mt-2">
                Create stunning visuals and videos with Google's Imagen 3 and Veo AI models
              </p>
            </div>
            <Badge variant="outline" className="bg-blue-900/20 text-blue-400 border-blue-600">
              Google AI Integrated
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-950/40 p-3 rounded-lg">
              <div className="flex items-center text-blue-300">
                <Image className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">AI Images Generated</span>
              </div>
              <p className="text-xl font-bold text-white mt-1">147</p>
              <p className="text-xs text-blue-200/60">+23 this week</p>
            </div>
            <div className="bg-purple-950/40 p-3 rounded-lg">
              <div className="flex items-center text-purple-300">
                <Video className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">AI Videos Created</span>
              </div>
              <p className="text-xl font-bold text-white mt-1">52</p>
              <p className="text-xs text-purple-200/60">+8 this week</p>
            </div>
            <div className="bg-green-950/40 p-3 rounded-lg">
              <div className="flex items-center text-green-300">
                <TrendingUp className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">AI Content CTR</span>
              </div>
              <p className="text-xl font-bold text-white mt-1">4.8%</p>
              <p className="text-xs text-green-200/60">+1.2% vs manual</p>
            </div>
            <div className="bg-amber-950/40 p-3 rounded-lg">
              <div className="flex items-center text-amber-300">
                <Sparkles className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Time Saved</span>
              </div>
              <p className="text-xl font-bold text-white mt-1">89%</p>
              <p className="text-xs text-amber-200/60">vs traditional creation</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-neutral-800/80 border-neutral-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-400">Total Spend</p>
                <p className="text-2xl font-bold text-white">$7,600</p>
                <p className="text-xs text-green-400">+12% vs last week</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-neutral-800/80 border-neutral-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-400">Impressions</p>
                <p className="text-2xl font-bold text-white">2.4M</p>
                <p className="text-xs text-blue-400">+8% vs last week</p>
              </div>
              <Eye className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-neutral-800/80 border-neutral-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-400">Click Rate</p>
                <p className="text-2xl font-bold text-white">3.2%</p>
                <p className="text-xs text-purple-400">+0.4% vs last week</p>
              </div>
              <MousePointer className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-neutral-800/80 border-neutral-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-400">ROAS</p>
                <p className="text-2xl font-bold text-white">4.8x</p>
                <p className="text-xs text-amber-400">+0.3x vs last week</p>
              </div>
              <TrendingUp className="h-8 w-8 text-amber-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Campaigns & Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-neutral-800/80 border-neutral-600">
          <CardHeader>
            <CardTitle className="text-white">Campaign Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={campaignData}>
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
                  <Bar dataKey="clicks" fill="#8b5cf6" name="Clicks" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-800/80 border-neutral-600">
          <CardHeader>
            <CardTitle className="text-white">Weekly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line type="monotone" dataKey="impressions" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="clicks" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="conversions" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Management & Audience Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-neutral-800/80 border-neutral-600">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <DollarSign className="mr-2 h-5 w-5" />
              Budget Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-neutral-400">Monthly Budget</span>
                <span className="text-white">$15,000</span>
              </div>
              <Progress value={51} className="h-2" />
              <p className="text-xs text-neutral-400 mt-1">$7,600 spent • $7,400 remaining</p>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-neutral-400">Daily Average</span>
                <span className="text-white">$506</span>
              </div>
              <Progress value={76} className="h-2" />
              <p className="text-xs text-neutral-400 mt-1">15 days remaining</p>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Adjust Budget
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-neutral-800/80 border-neutral-600">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Audience Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={audienceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {audienceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {audienceData.map((item) => (
                <div key={item.name} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-neutral-400">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-800/80 border-neutral-600">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <AlertCircle className="mr-2 h-5 w-5" />
              Campaign Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-amber-950/40 border border-amber-600/30 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-amber-400 mr-2" />
                <span className="text-sm text-amber-300">Budget Alert</span>
              </div>
              <p className="text-xs text-amber-200/80 mt-1">
                MomentCard campaign approaching daily limit
              </p>
            </div>
            
            <div className="p-3 bg-green-950/40 border border-green-600/30 rounded-lg">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-green-400 mr-2" />
                <span className="text-sm text-green-300">Performance</span>
              </div>
              <p className="text-xs text-green-200/80 mt-1">
                VibeOverlay CTR improved by 0.8%
              </p>
            </div>
            
            <div className="p-3 bg-blue-950/40 border border-blue-600/30 rounded-lg">
              <div className="flex items-center">
                <Target className="h-4 w-4 text-blue-400 mr-2" />
                <span className="text-sm text-blue-300">Optimization</span>
              </div>
              <p className="text-xs text-blue-200/80 mt-1">
                Consider expanding Spawn Point targeting
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdvertiserDashboard;
