
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Megaphone, Users, Target, BadgePercent, TrendingUp, BarChart, Calendar, Mail } from "lucide-react";
import InfluencerMarketplace from "@/components/venue/marketplace/InfluencerMarketplace";
import UpcomingEvents from "@/components/venue/UpcomingEvents";

interface MarketingTabProps {
  subscriptionTier: 'standard' | 'plus' | 'premium' | 'pro';
}

const MarketingTab = ({ subscriptionTier }: MarketingTabProps) => {
  const isPro = subscriptionTier === 'pro';

  return (
    <div className="space-y-6">
      <InfluencerMarketplace subscriptionTier={subscriptionTier} />
      
      <Card className="bg-amber-950 text-white">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-amber-100">Marketing Settings</CardTitle>
              <CardDescription className="text-amber-200">
                Manage marketing campaigns, promotions, and customer engagement settings.
              </CardDescription>
            </div>
            {isPro && (
              <Badge className="bg-amber-500 hover:bg-amber-600 text-amber-950 font-medium">Pro Feature</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isPro ? (
            <Tabs defaultValue="campaigns">
              <TabsList className="grid grid-cols-4 mb-4 bg-amber-900">
                <TabsTrigger value="campaigns" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
                  Campaigns
                </TabsTrigger>
                <TabsTrigger value="promotions" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
                  Promotions
                </TabsTrigger>
                <TabsTrigger value="audience" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
                  Audience
                </TabsTrigger>
                <TabsTrigger value="automation" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
                  Automation
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="campaigns" className="mt-0">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-amber-900 border-amber-800">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-sm font-medium text-amber-100">Active Campaign</CardTitle>
                          <Badge className="bg-green-500 text-white">Running</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <h3 className="text-lg font-bold text-amber-50 mb-2">Summer Happy Hour Special</h3>
                        <div className="flex items-center text-xs text-amber-200 mb-3">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>Apr 10 - May 15, 2025</span>
                          <span className="mx-2">•</span>
                          <BarChart className="h-3 w-3 mr-1" />
                          <span>142 conversions</span>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2 border-amber-700 text-amber-100 hover:bg-amber-800 hover:text-white w-full">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-amber-900 border-amber-800">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-sm font-medium text-amber-100">Scheduled Campaign</CardTitle>
                          <Badge className="bg-amber-500 text-amber-950">Scheduled</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <h3 className="text-lg font-bold text-amber-50 mb-2">Weekend Brunch Launch</h3>
                        <div className="flex items-center text-xs text-amber-200 mb-3">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>Starts May 1, 2025</span>
                          <span className="mx-2">•</span>
                          <Target className="h-3 w-3 mr-1" />
                          <span>Local foodies</span>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2 border-amber-700 text-amber-100 hover:bg-amber-800 hover:text-white w-full">
                          Edit Campaign
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Button className="w-full bg-amber-800 hover:bg-amber-700 text-white">
                    <Megaphone className="mr-2 h-4 w-4" />
                    Create New Campaign
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="promotions" className="mt-0">
                <div className="space-y-4">
                  <div className="bg-amber-900 rounded-md p-4 border border-amber-800">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-amber-50">Tuesday 2-for-1 Special</h3>
                        <p className="text-sm text-amber-200">Every Tuesday, 5PM-8PM</p>
                      </div>
                      <Badge className="bg-green-500 text-white">Active</Badge>
                    </div>
                    <div className="flex items-center text-xs text-amber-200 mb-4">
                      <BadgePercent className="h-3 w-3 mr-1" />
                      <span>50% off second drink</span>
                      <span className="mx-2">•</span>
                      <Users className="h-3 w-3 mr-1" />
                      <span>267 redemptions</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-amber-700 text-amber-100 hover:bg-amber-800 hover:text-white">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="border-amber-700 text-amber-100 hover:bg-amber-800 hover:text-white">
                        Pause
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-amber-900 rounded-md p-4 border border-amber-800">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-amber-50">First-Time Visitor Discount</h3>
                        <p className="text-sm text-amber-200">Ongoing offer</p>
                      </div>
                      <Badge className="bg-green-500 text-white">Active</Badge>
                    </div>
                    <div className="flex items-center text-xs text-amber-200 mb-4">
                      <BadgePercent className="h-3 w-3 mr-1" />
                      <span>15% off first purchase</span>
                      <span className="mx-2">•</span>
                      <Users className="h-3 w-3 mr-1" />
                      <span>124 redemptions</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-amber-700 text-amber-100 hover:bg-amber-800 hover:text-white">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="border-amber-700 text-amber-100 hover:bg-amber-800 hover:text-white">
                        Pause
                      </Button>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-amber-800 hover:bg-amber-700 text-white">
                    <BadgePercent className="mr-2 h-4 w-4" />
                    Create New Promotion
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="audience" className="mt-0">
                <div className="space-y-4">
                  <Card className="bg-amber-900 border-amber-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-amber-100">Audience Segments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-2 bg-amber-800 rounded">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-amber-300" />
                            <span className="text-amber-100">Weekend Regulars</span>
                          </div>
                          <Badge className="bg-amber-700 text-amber-200 border-amber-600">342 users</Badge>
                        </div>
                        
                        <div className="flex justify-between items-center p-2 bg-amber-800 rounded">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-amber-300" />
                            <span className="text-amber-100">Happy Hour Enthusiasts</span>
                          </div>
                          <Badge className="bg-amber-700 text-amber-200 border-amber-600">215 users</Badge>
                        </div>
                        
                        <div className="flex justify-between items-center p-2 bg-amber-800 rounded">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-amber-300" />
                            <span className="text-amber-100">First-Time Visitors</span>
                          </div>
                          <Badge className="bg-amber-700 text-amber-200 border-amber-600">178 users</Badge>
                        </div>
                        
                        <Button variant="outline" size="sm" className="w-full mt-2 border-amber-700 text-amber-100 hover:bg-amber-800 hover:text-white">
                          <Users className="mr-2 h-4 w-4" />
                          Create New Segment
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="automation" className="mt-0">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-amber-900 border-amber-800">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-sm font-medium text-amber-100">Email Campaign</CardTitle>
                          <Badge className="bg-green-500 text-white">Active</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <h3 className="text-lg font-bold text-amber-50 mb-2">Welcome Email Series</h3>
                        <div className="flex items-center text-xs text-amber-200 mb-3">
                          <Mail className="h-3 w-3 mr-1" />
                          <span>3-part series</span>
                          <span className="mx-2">•</span>
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span>42% open rate</span>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2 border-amber-700 text-amber-100 hover:bg-amber-800 hover:text-white w-full">
                          Edit Automation
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-amber-900 border-amber-800">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-sm font-medium text-amber-100">Birthday Rewards</CardTitle>
                          <Badge className="bg-green-500 text-white">Active</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <h3 className="text-lg font-bold text-amber-50 mb-2">Birthday Special Offer</h3>
                        <div className="flex items-center text-xs text-amber-200 mb-3">
                          <BadgePercent className="h-3 w-3 mr-1" />
                          <span>Free dessert with meal</span>
                          <span className="mx-2">•</span>
                          <Users className="h-3 w-3 mr-1" />
                          <span>89 sent this month</span>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2 border-amber-700 text-amber-100 hover:bg-amber-800 hover:text-white w-full">
                          Edit Automation
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Button className="w-full bg-amber-800 hover:bg-amber-700 text-white">
                    <Mail className="mr-2 h-4 w-4" />
                    Create New Automation
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="bg-amber-900/70 p-4 rounded-lg border border-amber-700 text-center">
              <Megaphone className="h-12 w-12 text-amber-400 mx-auto mb-2" />
              <h3 className="text-lg font-medium mb-2 text-amber-100">Upgrade to Pro</h3>
              <p className="text-sm text-amber-200 mb-4">
                Unlock advanced marketing tools and campaign management features.
              </p>
              <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white">
                Upgrade to Pro
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {isPro && <UpcomingEvents />}
    </div>
  );
};

export default MarketingTab;
