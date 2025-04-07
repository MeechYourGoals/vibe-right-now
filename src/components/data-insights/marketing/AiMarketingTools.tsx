
import { useState } from "react";
import { TrendingUp, Lightbulb, BarChart, Share2, Megaphone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

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
          <ToolAudienceTargeting />
        )}
        
        {selectedTool === 'content-generator' && (
          <ToolContentGenerator />
        )}
        
        {(selectedTool === 'performance-tracker' || selectedTool === 'social-distributor') && (
          <ToolConnectPlatform title={selectedTool === 'performance-tracker' ? 'Performance Tracker' : 'Social Distributor'} 
            description={selectedTool === 'performance-tracker' 
              ? 'Track the effectiveness of your campaigns' 
              : 'Distribute content across social platforms'}
            message={selectedTool === 'performance-tracker'
              ? 'Connect your marketing platforms to start tracking performance metrics.'
              : 'Connect your social media accounts to enable automatic distribution.'}
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
        <Button className="w-full">Generate Content</Button>
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
