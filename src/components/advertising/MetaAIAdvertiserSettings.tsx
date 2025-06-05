
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Settings, Brain, Zap, Shield, Calendar, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MetaAIAdvertiserSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    autoOptimization: true,
    budgetReallocation: true,
    audienceExpansion: false,
    creativeGeneration: true,
    performanceAlerts: true,
    optimizationLevel: "balanced"
  });

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Setting Updated",
      description: "Your Meta AI preferences have been saved.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Meta AI Configuration</h3>
          <p className="text-muted-foreground">Customize how Meta AI manages your advertising campaigns</p>
        </div>
        <Button variant="outline" size="sm">
          <ExternalLink className="h-4 w-4 mr-2" />
          Meta Business Settings
        </Button>
      </div>

      {/* Account Connection Status */}
      <Card className="border-green-500/20 bg-green-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-400" />
            Meta Business Account Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-green-400">Connected & Verified</p>
              <p className="text-sm text-muted-foreground">Meta Business account linked successfully</p>
            </div>
            <Badge className="bg-green-500/20 text-green-400">Active</Badge>
          </div>
        </CardContent>
      </Card>

      {/* AI Optimization Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Optimization Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Auto Campaign Optimization</h4>
              <p className="text-sm text-muted-foreground">
                Allow Meta AI to automatically adjust bids, targeting, and placements
              </p>
            </div>
            <Switch
              checked={settings.autoOptimization}
              onCheckedChange={(value) => handleSettingChange('autoOptimization', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Budget Reallocation</h4>
              <p className="text-sm text-muted-foreground">
                Enable AI to redistribute budget between ad sets for better performance
              </p>
            </div>
            <Switch
              checked={settings.budgetReallocation}
              onCheckedChange={(value) => handleSettingChange('budgetReallocation', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Audience Expansion</h4>
              <p className="text-sm text-muted-foreground">
                Let AI find new audiences similar to your best performers
              </p>
              <Badge className="mt-1 bg-orange-500/20 text-orange-400">Coming 2026</Badge>
            </div>
            <Switch
              checked={settings.audienceExpansion}
              onCheckedChange={(value) => handleSettingChange('audienceExpansion', value)}
              disabled
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Creative Generation</h4>
              <p className="text-sm text-muted-foreground">
                Allow AI to create new ad variations from your original creative
              </p>
            </div>
            <Switch
              checked={settings.creativeGeneration}
              onCheckedChange={(value) => handleSettingChange('creativeGeneration', value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Optimization Aggressiveness</label>
            <Select 
              value={settings.optimizationLevel} 
              onValueChange={(value) => handleSettingChange('optimizationLevel', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select optimization level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conservative">Conservative - Minimal changes</SelectItem>
                <SelectItem value="balanced">Balanced - Moderate optimization</SelectItem>
                <SelectItem value="aggressive">Aggressive - Maximum optimization</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              Controls how frequently AI makes campaign adjustments
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Alert Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Performance Alerts</h4>
              <p className="text-sm text-muted-foreground">
                Get notified when AI makes significant optimizations
              </p>
            </div>
            <Switch
              checked={settings.performanceAlerts}
              onCheckedChange={(value) => handleSettingChange('performanceAlerts', value)}
            />
          </div>

          <div className="p-4 border rounded-lg space-y-2">
            <h5 className="font-medium text-sm">Recent AI Activities</h5>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>• Budget increased for "Holiday Sale Campaign" (+15%)</p>
              <p>• New audience segment discovered for "Product Launch"</p>
              <p>• Creative variation A performing 23% better</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2026 Preview */}
      <Card className="border-purple-500/20 bg-purple-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-400" />
            Meta AI 2026 Features Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 border rounded-lg opacity-60">
              <Brain className="h-5 w-5 text-purple-400" />
              <div>
                <h4 className="font-medium">Predictive Campaign Planning</h4>
                <p className="text-sm text-muted-foreground">
                  AI predicts optimal campaign timing and budget allocation
                </p>
              </div>
              <Badge className="bg-orange-500/20 text-orange-400">2026</Badge>
            </div>
            
            <div className="flex items-center gap-3 p-3 border rounded-lg opacity-60">
              <Zap className="h-5 w-5 text-blue-400" />
              <div>
                <h4 className="font-medium">Cross-Platform Intelligence</h4>
                <p className="text-sm text-muted-foreground">
                  Unified optimization across all Meta properties and external platforms
                </p>
              </div>
              <Badge className="bg-orange-500/20 text-orange-400">2026</Badge>
            </div>
            
            <div className="flex items-center gap-3 p-3 border rounded-lg opacity-60">
              <Settings className="h-5 w-5 text-green-400" />
              <div>
                <h4 className="font-medium">LLaMA 4.0 Integration</h4>
                <p className="text-sm text-muted-foreground">
                  Next-generation language models for superior ad performance
                </p>
              </div>
              <Badge className="bg-orange-500/20 text-orange-400">2026</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetaAIAdvertiserSettings;
