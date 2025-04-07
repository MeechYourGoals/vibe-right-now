
import { useState } from "react";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VenueInsights from "@/components/VenueInsights";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileLock, CreditCard, Crown, BarChart, TrendingUp, Zap, PercentCircle, Megaphone, Lightbulb, Share2, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const DataInsights = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="overview" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold">Data Insights</h1>
              
              {!isPremium && (
                <Button 
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                  onClick={() => setIsPremium(true)}
                >
                  <Crown className="mr-2 h-4 w-4" />
                  Upgrade to Premium
                </Button>
              )}
            </div>
            
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="advertising" disabled={!isPremium}>
                Advertising
                {!isPremium && <FileLock className="ml-2 h-3 w-3" />}
              </TabsTrigger>
            </TabsList>
            
            {!isPremium && (
              <Card className="mb-6 border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800/30">
                <CardHeader>
                  <CardTitle className="flex items-center text-amber-700 dark:text-amber-400">
                    <Crown className="mr-2 h-5 w-5" />
                    Upgrade to Premium
                  </CardTitle>
                  <CardDescription className="text-amber-600 dark:text-amber-500">
                    Unlock advanced analytics and advertising tools
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white dark:bg-amber-950/40 shadow-sm">
                      <h3 className="font-semibold mb-2">Full Analytics</h3>
                      <p className="text-sm text-muted-foreground">Access detailed insights about visitor demographics and behavior patterns</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white dark:bg-amber-950/40 shadow-sm">
                      <h3 className="font-semibold mb-2">Advertising Tools</h3>
                      <p className="text-sm text-muted-foreground">Create targeted promotions and track their performance in real-time</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white dark:bg-amber-950/40 shadow-sm">
                      <h3 className="font-semibold mb-2">Competitor Analysis</h3>
                      <p className="text-sm text-muted-foreground">Compare your venue performance with industry averages</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button 
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                    onClick={() => setIsPremium(true)}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Upgrade Now - $49.99/month
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            <TabsContent value="overview" className="mt-0">
              <VenueInsights />
            </TabsContent>
            
            <TabsContent value="analytics" className="mt-0">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Advanced Analytics</CardTitle>
                    <CardDescription>
                      {isPremium 
                        ? "Detailed insights about your venue's performance" 
                        : "Basic analytics are available in the free tier"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center py-6">
                      <h3 className="text-xl font-medium mb-2">
                        {isPremium 
                          ? "Full analytics dashboard is available" 
                          : "Upgrade to premium for detailed analytics"}
                      </h3>
                      <p className="text-muted-foreground text-center max-w-md">
                        {isPremium
                          ? "View detailed information about your visitors' demographics, behavior patterns, and engagement metrics"
                          : "Basic analytics are shown in the Overview tab. For more detailed insights, consider upgrading to our premium plan"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="advertising" className="mt-0">
              {isPremium ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* AI Marketing Tools */}
                    <Card className="md:col-span-2">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Megaphone className="h-5 w-5 mr-2 text-indigo-500" />
                          AI-Powered Marketing Tools
                        </CardTitle>
                        <CardDescription>
                          Leverage AI to optimize your marketing efforts
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Tool 1 */}
                          <div 
                            className={`p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors ${selectedTool === 'audience-targeting' ? 'bg-muted border-primary' : ''}`}
                            onClick={() => setSelectedTool('audience-targeting')}
                          >
                            <div className="flex items-start mb-2">
                              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full mr-3">
                                <TrendingUp className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                              </div>
                              <div>
                                <h3 className="font-semibold">Audience Targeting</h3>
                                <p className="text-sm text-muted-foreground">AI-driven customer segmentation</p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Tool 2 */}
                          <div 
                            className={`p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors ${selectedTool === 'content-generator' ? 'bg-muted border-primary' : ''}`}
                            onClick={() => setSelectedTool('content-generator')}
                          >
                            <div className="flex items-start mb-2">
                              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-full mr-3">
                                <Lightbulb className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                              </div>
                              <div>
                                <h3 className="font-semibold">Content Generator</h3>
                                <p className="text-sm text-muted-foreground">Create venue promotions with AI</p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Tool 3 */}
                          <div 
                            className={`p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors ${selectedTool === 'performance-tracker' ? 'bg-muted border-primary' : ''}`}
                            onClick={() => setSelectedTool('performance-tracker')}
                          >
                            <div className="flex items-start mb-2">
                              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
                                <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <h3 className="font-semibold">Performance Tracker</h3>
                                <p className="text-sm text-muted-foreground">Track campaign effectiveness</p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Tool 4 */}
                          <div 
                            className={`p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors ${selectedTool === 'social-distributor' ? 'bg-muted border-primary' : ''}`}
                            onClick={() => setSelectedTool('social-distributor')}
                          >
                            <div className="flex items-start mb-2">
                              <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full mr-3">
                                <Share2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                              </div>
                              <div>
                                <h3 className="font-semibold">Social Distributor</h3>
                                <p className="text-sm text-muted-foreground">Auto-share to social platforms</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Tool Interface */}
                        {selectedTool === 'audience-targeting' && (
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">Audience Targeting</CardTitle>
                              <CardDescription>Identify your ideal customer segments</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <Label htmlFor="demographic">Target Demographics</Label>
                                  <Select defaultValue="young-adults">
                                    <SelectTrigger className="w-[180px]">
                                      <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="young-adults">Young Adults (18-24)</SelectItem>
                                      <SelectItem value="professionals">Professionals (25-34)</SelectItem>
                                      <SelectItem value="families">Families (35-44)</SelectItem>
                                      <SelectItem value="mature">Mature (45+)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex items-center justify-between">
                                  <Label htmlFor="interests">Target Interests</Label>
                                  <Select defaultValue="dining">
                                    <SelectTrigger className="w-[180px]">
                                      <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="dining">Fine Dining</SelectItem>
                                      <SelectItem value="entertainment">Entertainment</SelectItem>
                                      <SelectItem value="nightlife">Nightlife</SelectItem>
                                      <SelectItem value="sports">Sports</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <Button className="w-full mt-2">Generate Audience Insights</Button>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                        
                        {selectedTool === 'content-generator' && (
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">Content Generator</CardTitle>
                              <CardDescription>Create marketing content powered by AI</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="space-y-2">
                                  <Label>Content Type</Label>
                                  <Select defaultValue="social-post">
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select content type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="social-post">Social Media Post</SelectItem>
                                      <SelectItem value="email">Email Newsletter</SelectItem>
                                      <SelectItem value="event-promo">Event Promotion</SelectItem>
                                      <SelectItem value="special-offer">Special Offer</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label>Tone</Label>
                                  <Select defaultValue="casual">
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select tone" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="casual">Casual & Friendly</SelectItem>
                                      <SelectItem value="professional">Professional</SelectItem>
                                      <SelectItem value="excited">Excited & Energetic</SelectItem>
                                      <SelectItem value="luxury">Luxury & Exclusive</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <Button className="w-full">Generate Content</Button>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                        
                        {(selectedTool === 'performance-tracker' || selectedTool === 'social-distributor') && (
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">{selectedTool === 'performance-tracker' ? 'Performance Tracker' : 'Social Distributor'}</CardTitle>
                              <CardDescription>
                                {selectedTool === 'performance-tracker' 
                                  ? 'Track the effectiveness of your campaigns' 
                                  : 'Distribute content across social platforms'}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex flex-col items-center justify-center py-4">
                                <p className="text-center text-muted-foreground mb-4">
                                  {selectedTool === 'performance-tracker'
                                    ? 'Connect your marketing platforms to start tracking performance metrics.'
                                    : 'Connect your social media accounts to enable automatic distribution.'}
                                </p>
                                <Button>Connect Accounts</Button>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </CardContent>
                    </Card>
                    
                    {/* AI Marketer Suggestions */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Zap className="h-5 w-5 mr-2 text-amber-500" />
                          AI Marketer Suggestions
                        </CardTitle>
                        <CardDescription>Smart recommendations based on your data</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg">
                            <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-1">Weekend Promotion</h4>
                            <p className="text-sm text-amber-700 dark:text-amber-400">Your venue has 32% more visitors on Fridays. Consider creating a special Friday offer to maximize revenue.</p>
                          </div>
                          
                          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/30 rounded-lg">
                            <h4 className="font-medium text-indigo-800 dark:text-indigo-300 mb-1">Underutilized Hours</h4>
                            <p className="text-sm text-indigo-700 dark:text-indigo-400">Tuesday evenings show low traffic. Consider a "Tuesday Special" to attract more visitors during this time.</p>
                          </div>
                          
                          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/30 rounded-lg">
                            <h4 className="font-medium text-emerald-800 dark:text-emerald-300 mb-1">Content Strategy</h4>
                            <p className="text-sm text-emerald-700 dark:text-emerald-400">Photos of your signature dishes get 3x more engagement. Encourage more food photography from visitors.</p>
                          </div>
                          
                          <Button variant="outline" className="w-full mt-2">
                            <Lightbulb className="h-4 w-4 mr-2" />
                            Generate More Suggestions
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Discount Code ROI Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <PercentCircle className="h-5 w-5 mr-2 text-green-500" />
                        Discount Code ROI Analysis
                      </CardTitle>
                      <CardDescription>
                        Track and analyze the performance of your discount codes
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Add New Discount Code */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Add New Discount Code</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="discount-code">Code</Label>
                              <Input 
                                id="discount-code" 
                                placeholder="e.g., SPRING25" 
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="discount-amount">Discount Amount</Label>
                              <Input 
                                id="discount-amount" 
                                placeholder="e.g., 25%"
                                value={discountAmount}
                                onChange={(e) => setDiscountAmount(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="discount-type">Type</Label>
                              <Select defaultValue="percentage">
                                <SelectTrigger id="discount-type">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="percentage">Percentage</SelectItem>
                                  <SelectItem value="fixed">Fixed Amount</SelectItem>
                                  <SelectItem value="bogo">Buy One Get One</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <Button>Add Discount Code</Button>
                        </div>
                        
                        <Separator />
                        
                        {/* Active Discount Codes */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Active Discount Codes</h3>
                          <div className="space-y-3">
                            {/* Discount 1 */}
                            <div className="p-4 border rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <div className="flex items-center">
                                    <Tag className="h-4 w-4 mr-2 text-blue-500" />
                                    <h4 className="font-semibold">WELCOME20</h4>
                                  </div>
                                  <p className="text-sm text-muted-foreground">20% off for new customers</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">267 uses</p>
                                  <p className="text-sm text-muted-foreground">$2,145 revenue</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 mt-3">
                                <div className="p-2 bg-muted rounded">
                                  <p className="text-xs text-muted-foreground">ROI</p>
                                  <p className="font-medium text-green-600">312%</p>
                                </div>
                                <div className="p-2 bg-muted rounded">
                                  <p className="text-xs text-muted-foreground">Avg. Order</p>
                                  <p className="font-medium">$42.50</p>
                                </div>
                                <div className="p-2 bg-muted rounded">
                                  <p className="text-xs text-muted-foreground">Repeat Uses</p>
                                  <p className="font-medium">18%</p>
                                </div>
                              </div>
                            </div>
                            
                            {/* Discount 2 */}
                            <div className="p-4 border rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <div className="flex items-center">
                                    <Tag className="h-4 w-4 mr-2 text-purple-500" />
                                    <h4 className="font-semibold">TUESDAY25</h4>
                                  </div>
                                  <p className="text-sm text-muted-foreground">25% off on Tuesdays</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">154 uses</p>
                                  <p className="text-sm text-muted-foreground">$1,870 revenue</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 mt-3">
                                <div className="p-2 bg-muted rounded">
                                  <p className="text-xs text-muted-foreground">ROI</p>
                                  <p className="font-medium text-green-600">275%</p>
                                </div>
                                <div className="p-2 bg-muted rounded">
                                  <p className="text-xs text-muted-foreground">Avg. Order</p>
                                  <p className="font-medium">$36.80</p>
                                </div>
                                <div className="p-2 bg-muted rounded">
                                  <p className="text-xs text-muted-foreground">Repeat Uses</p>
                                  <p className="font-medium">32%</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-center">
                          <Button variant="outline">
                            View All Discount Codes
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="flex items-center justify-center py-12">
                  <p className="text-muted-foreground">
                    Upgrade to premium to access advertising tools
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default DataInsights;
