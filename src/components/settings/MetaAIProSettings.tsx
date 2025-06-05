
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Zap, Calendar, Shield, CreditCard, Settings, ExternalLink } from "lucide-react";

interface MetaAIProSettingsProps {
  isPro: boolean;
}

const MetaAIProSettings = ({ isPro }: MetaAIProSettingsProps) => {
  const [settings, setSettings] = useState({
    autoPromoEnabled: true,
    realTimeOptimization: true,
    budgetAlerts: true,
    monthlyFreeCredit: true
  });

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (!isPro) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-500" />
              Meta AI Auto-Promo Settings
            </CardTitle>
            <CardDescription>
              Configure your automated advertising preferences powered by Meta AI
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-blue-500/20 text-blue-400">Pro Feature</Badge>
            <Badge className="bg-orange-500/20 text-orange-400">2026 Launch</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Feature Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg bg-green-500/5 border-green-500/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-medium text-green-700 dark:text-green-400">Beta Version Active</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Current AI-powered campaigns using GPT-4 + Meta targeting API
            </p>
          </div>
          <div className="p-4 border rounded-lg bg-orange-500/5 border-orange-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-orange-500" />
              <span className="font-medium text-orange-700 dark:text-orange-400">Full Suite Coming 2026</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Complete Meta AI automation with LLaMA models
            </p>
          </div>
        </div>

        <Separator />

        {/* Settings Controls */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Auto-Promo Preferences
          </h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h5 className="font-medium">Enable Auto-Promo Campaigns</h5>
                <p className="text-sm text-muted-foreground">Allow Meta AI to automatically create and optimize ad campaigns</p>
              </div>
              <Switch 
                checked={settings.autoPromoEnabled}
                onCheckedChange={(checked) => handleSettingChange('autoPromoEnabled', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h5 className="font-medium">Real-time Optimization</h5>
                <p className="text-sm text-muted-foreground">Allow AI to adjust targeting and creative in real-time based on performance</p>
              </div>
              <Switch 
                checked={settings.realTimeOptimization}
                onCheckedChange={(checked) => handleSettingChange('realTimeOptimization', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h5 className="font-medium">Budget Alert Notifications</h5>
                <p className="text-sm text-muted-foreground">Get notified when campaigns reach 80% of budget spend</p>
              </div>
              <Switch 
                checked={settings.budgetAlerts}
                onCheckedChange={(checked) => handleSettingChange('budgetAlerts', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h5 className="font-medium">Monthly Free Credit ($25)</h5>
                <p className="text-sm text-muted-foreground">Receive monthly $25 advertising credit included with Pro subscription</p>
              </div>
              <Switch 
                checked={settings.monthlyFreeCredit}
                onCheckedChange={(checked) => handleSettingChange('monthlyFreeCredit', checked)}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Account Connections */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Connected Accounts
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">M</span>
                </div>
                <div>
                  <h5 className="font-medium">Meta Business Account</h5>
                  <p className="text-sm text-muted-foreground">Connected for advertising campaigns</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Manage
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                  <CreditCard className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h5 className="font-medium">Payment Method</h5>
                  <p className="text-sm text-muted-foreground">For campaigns exceeding free credits</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Update
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        {/* Usage Summary */}
        <div className="space-y-4">
          <h4 className="font-medium">This Month's Usage</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-xl font-bold text-blue-500">2</p>
              <p className="text-xs text-muted-foreground">Campaigns Launched</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-xl font-bold text-green-500">$18.50</p>
              <p className="text-xs text-muted-foreground">Credits Used</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-xl font-bold text-purple-500">$6.50</p>
              <p className="text-xs text-muted-foreground">Credits Remaining</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-xl font-bold text-orange-500">66</p>
              <p className="text-xs text-muted-foreground">Total Conversions</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Zap className="h-4 w-4 mr-2" />
            Launch New Campaign
          </Button>
          <Button variant="outline" className="flex-1">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Meta Ads Manager
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetaAIProSettings;
