
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Target, Users, Zap, TrendingUp, Share2, Search, Link } from "lucide-react";

const MarketingSuite = () => {
  const marketingTools = [
    {
      title: "Audience Targeting",
      description: "AI-driven segmentation",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Content Generator",
      description: "Create venue promotions",
      icon: Zap,
      color: "text-green-600"
    },
    {
      title: "Performance Tracker",
      description: "Track campaigns",
      icon: BarChart3,
      color: "text-purple-600"
    },
    {
      title: "Social Distributor",
      description: "Auto-share content",
      icon: Share2,
      color: "text-pink-600"
    }
  ];

  const campaignTemplates = [
    {
      title: "PPC Optimizer",
      description: "Optimize ad campaigns",
      icon: Target,
      color: "text-orange-600"
    },
    {
      title: "SEO Analyzer",
      description: "Improve search visibility",
      icon: Search,
      color: "text-green-600"
    },
    {
      title: "Affiliate Manager",
      description: "Track partner referrals",
      icon: Link,
      color: "text-red-600"
    },
    {
      title: "Customer Journey",
      description: "Optimize touchpoints",
      icon: TrendingUp,
      color: "text-blue-600"
    }
  ];

  const aiSuggestions = [
    {
      title: "Weekend Promotion",
      impact: "High Impact",
      impactColor: "bg-red-500",
      description: "Your venue has 32% more visitors on Fridays. Consider creating a special Friday offer to maximize revenue.",
      actionText: "Implement"
    },
    {
      title: "Underutilized Hours",
      impact: "Medium Impact", 
      impactColor: "bg-blue-500",
      description: "Tuesday evenings show low traffic. Consider a 'Tuesday Special' to attract more visitors during this time.",
      actionText: "Implement"
    },
    {
      title: "Content Strategy",
      impact: "High Impact",
      impactColor: "bg-green-500",
      description: "Photos of your signature dishes get 3x more engagement. Encourage more food photography from visitors.",
      actionText: "Implement"
    },
    {
      title: "Brand Awareness",
      impact: "Critical",
      impactColor: "bg-purple-500",
      description: "Your iconic Pink Flamingo mascot appears in 45% of visitor photos. Consider featuring it more prominently in your branding and merchandise.",
      actionText: "Implement"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Marketing Suite Enabled Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-1">Marketing Suite Enabled</h3>
        <p className="text-sm text-blue-700 dark:text-blue-400">Your premium account includes access to all AI-powered marketing tools and industry-standard templates.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI-Powered Marketing Tools */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2 text-blue-600" />
              AI-Powered Marketing Tools
            </CardTitle>
            <p className="text-sm text-muted-foreground">Leverage AI to optimize your marketing efforts with industry-standard processes</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {marketingTools.map((tool, index) => {
                  const Icon = tool.icon;
                  return (
                    <div key={index} className="p-3 border rounded-lg text-center hover:bg-accent transition-colors">
                      <Icon className={`h-6 w-6 mx-auto mb-2 ${tool.color}`} />
                      <h4 className="font-medium text-sm">{tool.title}</h4>
                      <p className="text-xs text-muted-foreground">{tool.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Campaign Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {campaignTemplates.map((template, index) => {
                const Icon = template.icon;
                return (
                  <div key={index} className="p-3 border rounded-lg text-center hover:bg-accent transition-colors">
                    <Icon className={`h-6 w-6 mx-auto mb-2 ${template.color}`} />
                    <h4 className="font-medium text-sm">{template.title}</h4>
                    <p className="text-xs text-muted-foreground">{template.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Marketer Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-orange-600" />
            AI Marketer Suggestions
          </CardTitle>
          <p className="text-sm text-muted-foreground">Smart recommendations based on your data</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiSuggestions.map((suggestion, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{suggestion.title}</h4>
                  <Badge className={`${suggestion.impactColor} text-white`}>
                    {suggestion.impact}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{suggestion.description}</p>
                <Button size="sm" className="bg-black text-white hover:bg-gray-800">
                  {suggestion.actionText}
                </Button>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <Button variant="outline" className="w-full">
              <Search className="h-4 w-4 mr-2" />
              Generate More Suggestions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingSuite;
