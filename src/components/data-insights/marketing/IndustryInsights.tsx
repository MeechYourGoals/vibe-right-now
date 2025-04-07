
import { Award, TrendingUp, BarChart2, Target, Share2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const IndustryInsights = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Award className="h-5 w-5 mr-2 text-blue-500" />
          Industry Benchmarks & Best Practices
        </CardTitle>
        <CardDescription>See how your marketing compares to industry leaders</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="benchmarks">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
            <TabsTrigger value="strategies">Marketing Strategies</TabsTrigger>
            <TabsTrigger value="channels">Channel Mix</TabsTrigger>
          </TabsList>
          
          <TabsContent value="benchmarks">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium mb-1">Social Media Engagement</h4>
                  <p className="text-sm text-muted-foreground">Industry avg: 3.2% | Your venue: 4.8%</p>
                </div>
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium mb-1">Discount Redemption Rate</h4>
                  <p className="text-sm text-muted-foreground">Industry avg: 12% | Your venue: 9.5%</p>
                </div>
                <BarChart2 className="h-6 w-6 text-amber-500" />
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium mb-1">Repeat Visitor Rate</h4>
                  <p className="text-sm text-muted-foreground">Industry avg: 28% | Your venue: 22%</p>
                </div>
                <Target className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="strategies">
            <div className="space-y-4">
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-1">Top Strategies in Your Industry</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm mt-2">
                  <li>82% of similar venues run weekday happy hour promotions</li>
                  <li>65% partner with local businesses for cross-promotion</li>
                  <li>72% leverage user-generated content in their marketing</li>
                  <li>58% offer loyalty programs with tiered rewards</li>
                </ul>
              </div>
              
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border rounded-lg">
                <h4 className="font-medium mb-1 text-blue-800 dark:text-blue-300">Recommended for You</h4>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  Based on your venue type, we recommend implementing a seasonal menu rotation 
                  strategy. Venues that refresh their offerings quarterly see a 24% increase in 
                  repeat visitors.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="channels">
            <div className="space-y-4">
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-2">Industry Channel Distribution</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Social Media</span>
                      <span>42%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Email Marketing</span>
                      <span>21%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '21%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Local Partnerships</span>
                      <span>18%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '18%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Traditional Advertising</span>
                      <span>12%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '12%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Other</span>
                      <span>7%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-gray-500 h-2.5 rounded-full" style={{ width: '7%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <Button className="w-full mt-4">
          <Share2 className="h-4 w-4 mr-2" />
          Export Industry Report
        </Button>
      </CardContent>
    </Card>
  );
};

export default IndustryInsights;
