import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock } from "lucide-react";
import GoogleAIIntegration from "@/components/advertising/GoogleAIIntegration";
import MetaAIAutoPromo from "@/components/advertising/MetaAIAutoPromo";
import MetaAICampaignAnalytics from "@/components/advertising/MetaAICampaignAnalytics";

interface AdvertisingTabProps {
  isPremium: boolean;
}

const AdvertisingTab = ({ isPremium }: AdvertisingTabProps) => {
  const [activeSubTab, setActiveSubTab] = useState("overview");

  if (!isPremium) {
    return (
      <Card className="border-dashed border-2 border-muted-foreground/25">
        <CardContent className="text-center p-8">
          <div className="flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-muted-foreground/50" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Premium Advertising Suite</h3>
          <p className="text-muted-foreground mb-6">
            Access advanced advertising tools including Google AI integration and Meta AI Auto-Promo features.
          </p>
          <Button>Upgrade to Premium</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="google-ai">Google AI</TabsTrigger>
          <TabsTrigger value="meta-ai">Meta AI</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Advertising Overview</h3>
                <p className="text-muted-foreground mb-4">
                  Create and manage advertising campaigns to promote your venue and events.
                  Use AI-powered tools to optimize your reach and engagement.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Active Campaigns</span>
                    <span className="font-medium">2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Monthly Budget Used</span>
                    <span className="font-medium">$156.50 / $500.00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total Impressions</span>
                    <span className="font-medium">45,230</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average CTR</span>
                    <span className="font-medium">3.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full">Create New Campaign</Button>
                  <Button variant="outline" className="w-full">View Campaign Reports</Button>
                  <Button variant="outline" className="w-full">Manage Ad Accounts</Button>
                  <Button variant="outline" className="w-full">Audience Insights</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="google-ai" className="space-y-6">
          <GoogleAIIntegration />
        </TabsContent>

        <TabsContent value="meta-ai" className="space-y-6">
          <MetaAIAutoPromo isPro={isPremium} />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <MetaAICampaignAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvertisingTab;
