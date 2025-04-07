
import { useState } from "react";
import { TrendingUp, Lightbulb, BarChart, Share2, Megaphone, MousePointerClick, Search, Link2, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AiMarketingTools = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Megaphone className="h-5 w-5 mr-2 text-indigo-500" />
          AI-Powered Marketing Tools
        </CardTitle>
        <CardDescription>
          Leverage AI to optimize your marketing efforts with industry-standard processes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="tools" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="tools">Marketing Tools</TabsTrigger>
            <TabsTrigger value="campaigns">Campaign Templates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tools" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                    <p className="text-sm text-muted-foreground">AI-driven segmentation</p>
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
                    <p className="text-sm text-muted-foreground">Create venue promotions</p>
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
                    <p className="text-sm text-muted-foreground">Track campaigns</p>
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
                    <p className="text-sm text-muted-foreground">Auto-share content</p>
                  </div>
                </div>
              </div>
              
              {/* New Tool 5 */}
              <div 
                className={`p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors ${selectedTool === 'ppc-optimizer' ? 'bg-muted border-primary' : ''}`}
                onClick={() => setSelectedTool('ppc-optimizer')}
              >
                <div className="flex items-start mb-2">
                  <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full mr-3">
                    <MousePointerClick className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">PPC Optimizer</h3>
                    <p className="text-sm text-muted-foreground">Optimize ad campaigns</p>
                  </div>
                </div>
              </div>
              
              {/* New Tool 6 */}
              <div 
                className={`p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors ${selectedTool === 'seo-analyzer' ? 'bg-muted border-primary' : ''}`}
                onClick={() => setSelectedTool('seo-analyzer')}
              >
                <div className="flex items-start mb-2">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
                    <Search className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">SEO Analyzer</h3>
                    <p className="text-sm text-muted-foreground">Improve search visibility</p>
                  </div>
                </div>
              </div>
              
              {/* New Tool 7 */}
              <div 
                className={`p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors ${selectedTool === 'affiliate-manager' ? 'bg-muted border-primary' : ''}`}
                onClick={() => setSelectedTool('affiliate-manager')}
              >
                <div className="flex items-start mb-2">
                  <div className="bg-pink-100 dark:bg-pink-900/30 p-2 rounded-full mr-3">
                    <Link2 className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Affiliate Manager</h3>
                    <p className="text-sm text-muted-foreground">Track partner referrals</p>
                  </div>
                </div>
              </div>
              
              {/* New Tool 8 */}
              <div 
                className={`p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors ${selectedTool === 'customer-journey' ? 'bg-muted border-primary' : ''}`}
                onClick={() => setSelectedTool('customer-journey')}
              >
                <div className="flex items-start mb-2">
                  <div className="bg-cyan-100 dark:bg-cyan-900/30 p-2 rounded-full mr-3">
                    <Activity className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Customer Journey</h3>
                    <p className="text-sm text-muted-foreground">Optimize touchpoints</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="campaigns" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">AIDA Framework</CardTitle>
                  <CardDescription>Attention, Interest, Desire, Action</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">The classic marketing model for driving customer conversions</p>
                  <Button variant="outline" className="w-full">Apply to Campaign</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Seasonal Promotion</CardTitle>
                  <CardDescription>Holiday & seasonal marketing templates</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">Pre-built campaigns for major holidays and seasons</p>
                  <Button variant="outline" className="w-full">Select Season</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Loyalty Program</CardTitle>
                  <CardDescription>Customer retention framework</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">Build a tiered loyalty program with AI-suggested rewards</p>
                  <Button variant="outline" className="w-full">Create Program</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Influencer Campaign</CardTitle>
                  <CardDescription>Social media collaboration template</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">Connect with local influencers matched to your venue</p>
                  <Button variant="outline" className="w-full">Find Influencers</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Tool Interface */}
        {selectedTool === 'audience-targeting' && (
          <ToolAudienceTargeting />
        )}
        
        {selectedTool === 'content-generator' && (
          <ToolContentGenerator />
        )}
        
        {selectedTool === 'ppc-optimizer' && (
          <ToolPPCOptimizer />
        )}
        
        {selectedTool === 'seo-analyzer' && (
          <ToolSEOAnalyzer />
        )}
        
        {(selectedTool === 'performance-tracker' || selectedTool === 'social-distributor' || 
          selectedTool === 'affiliate-manager' || selectedTool === 'customer-journey') && (
          <ToolConnectPlatform title={
              selectedTool === 'performance-tracker' ? 'Performance Tracker' : 
              selectedTool === 'social-distributor' ? 'Social Distributor' :
              selectedTool === 'affiliate-manager' ? 'Affiliate Manager' : 'Customer Journey'
            } 
            description={
              selectedTool === 'performance-tracker' ? 'Track the effectiveness of your campaigns' : 
              selectedTool === 'social-distributor' ? 'Distribute content across social platforms' :
              selectedTool === 'affiliate-manager' ? 'Manage partner referrals and commissions' : 
              'Map and optimize customer journey touchpoints'
            }
            message={
              selectedTool === 'performance-tracker' ? 'Connect your marketing platforms to start tracking performance metrics.' :
              selectedTool === 'social-distributor' ? 'Connect your social media accounts to enable automatic distribution.' :
              selectedTool === 'affiliate-manager' ? 'Connect your partner platforms to track referrals and attribution.' :
              'Connect your customer data sources to map the customer journey.'
            }
          />
        )}
      </CardContent>
    </Card>
  );
};

const ToolAudienceTargeting = () => (
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
        <div className="flex items-center justify-between">
          <Label htmlFor="behavior">Behavioral Pattern</Label>
          <Select defaultValue="regular">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="regular">Regular Visitors</SelectItem>
              <SelectItem value="occasional">Occasional Visitors</SelectItem>
              <SelectItem value="first-time">First-time Visitors</SelectItem>
              <SelectItem value="high-spend">High Spenders</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="w-full mt-2">Generate Audience Insights</Button>
      </div>
    </CardContent>
  </Card>
);

const ToolContentGenerator = () => (
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
        <div className="space-y-2">
          <Label>Key Message</Label>
          <Textarea placeholder="What's the main message you want to convey?" />
        </div>
        <Button className="w-full">Generate Content</Button>
      </div>
    </CardContent>
  </Card>
);

const ToolPPCOptimizer = () => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-lg">PPC Campaign Optimizer</CardTitle>
      <CardDescription>Optimize your pay-per-click ad campaigns</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div className="space-y-2">
          <Label>Platform</Label>
          <Select defaultValue="google">
            <SelectTrigger>
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="google">Google Ads</SelectItem>
              <SelectItem value="facebook">Facebook/Instagram Ads</SelectItem>
              <SelectItem value="bing">Bing Ads</SelectItem>
              <SelectItem value="linkedin">LinkedIn Ads</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Daily Budget</Label>
          <div className="flex items-center">
            <span className="mr-2">$</span>
            <Input type="number" placeholder="50" min="1" className="w-full" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Campaign Goal</Label>
          <Select defaultValue="conversions">
            <SelectTrigger>
              <SelectValue placeholder="Select goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="awareness">Brand Awareness</SelectItem>
              <SelectItem value="traffic">Website Traffic</SelectItem>
              <SelectItem value="conversions">Conversions</SelectItem>
              <SelectItem value="leads">Lead Generation</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="w-full">Generate Optimized Campaign</Button>
      </div>
    </CardContent>
  </Card>
);

const ToolSEOAnalyzer = () => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-lg">SEO Analyzer</CardTitle>
      <CardDescription>Optimize your online presence for search engines</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div className="space-y-2">
          <Label>Website URL</Label>
          <Input placeholder="https://yourwebsite.com" />
        </div>
        <div className="space-y-2">
          <Label>Primary Keywords</Label>
          <Input placeholder="Enter 3-5 keywords separated by commas" />
        </div>
        <div className="space-y-2">
          <Label>Location Relevance</Label>
          <Select defaultValue="city">
            <SelectTrigger>
              <SelectValue placeholder="Select relevance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="neighborhood">Neighborhood</SelectItem>
              <SelectItem value="city">City-wide</SelectItem>
              <SelectItem value="state">State/Province</SelectItem>
              <SelectItem value="country">Country-wide</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="w-full">Analyze SEO Opportunities</Button>
      </div>
    </CardContent>
  </Card>
);

interface ToolConnectPlatformProps {
  title: string;
  description: string;
  message: string;
}

const ToolConnectPlatform = ({ title, description, message }: ToolConnectPlatformProps) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-lg">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col items-center justify-center py-4">
        <p className="text-center text-muted-foreground mb-4">{message}</p>
        <Button>Connect Accounts</Button>
      </div>
    </CardContent>
  </Card>
);

export default AiMarketingTools;
