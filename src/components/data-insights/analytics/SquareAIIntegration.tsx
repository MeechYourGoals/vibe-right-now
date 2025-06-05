
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Square, 
  TrendingUp, 
  Users, 
  DollarSign, 
  BarChart3,
  Settings,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";
import { toast } from "sonner";

interface SquareAIIntegrationProps {
  isPro: boolean;
}

const SquareAIIntegration = ({ isPro }: SquareAIIntegrationProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [squareToken, setSquareToken] = useState("");
  const [insights, setInsights] = useState<any>(null);
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);

  const handleConnectSquare = async () => {
    if (!squareToken.trim()) {
      toast.error("Please enter your Square API token");
      return;
    }

    setIsConnecting(true);
    try {
      // Simulate Square API connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsConnected(true);
      toast.success("Successfully connected to Square AI");
    } catch (error) {
      toast.error("Failed to connect to Square. Please check your API token.");
    } finally {
      setIsConnecting(false);
    }
  };

  const generateSquareInsights = async () => {
    setIsGeneratingInsights(true);
    try {
      // Simulate Square AI insights generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockInsights = {
        revenue: {
          total: "$45,230",
          growth: "+12.5%",
          trend: "increasing"
        },
        customers: {
          total: "1,847",
          newCustomers: "234",
          retention: "87%"
        },
        topProducts: [
          { name: "Craft Cocktails", revenue: "$18,500", growth: "+15%" },
          { name: "Weekend Brunch", revenue: "$12,300", growth: "+8%" },
          { name: "Happy Hour", revenue: "$9,800", growth: "+22%" }
        ],
        recommendations: [
          "Increase happy hour promotion frequency - 22% growth trend",
          "Consider expanding craft cocktail menu during peak hours",
          "Weekend brunch shows consistent performance - stable revenue stream"
        ]
      };
      
      setInsights(mockInsights);
      toast.success("Square AI insights generated successfully");
    } catch (error) {
      toast.error("Failed to generate insights");
    } finally {
      setIsGeneratingInsights(false);
    }
  };

  if (!isPro) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Square className="h-5 w-5" />
            Square AI Integration
            <Badge variant="outline" className="bg-amber-600/20 text-amber-600 border-amber-300">
              Pro Only
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Connect your Square account to get AI-powered business insights. Upgrade to Pro to access this feature.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Square className="h-5 w-5" />
          Square AI Integration
          <Badge variant="outline" className="bg-amber-600/20 text-amber-600 border-amber-300">
            Pro Feature
          </Badge>
          {isConnected && (
            <Badge variant="outline" className="bg-green-600/20 text-green-600 border-green-300">
              <CheckCircle className="h-3 w-3 mr-1" />
              Connected
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isConnected ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="squareToken">Square API Access Token</Label>
              <Input
                id="squareToken"
                type="password"
                placeholder="Enter your Square API token"
                value={squareToken}
                onChange={(e) => setSquareToken(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Get your API token from the Square Developer Dashboard
              </p>
            </div>
            
            <Button 
              onClick={handleConnectSquare} 
              disabled={isConnecting}
              className="w-full"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Square className="mr-2 h-4 w-4" />
                  Connect to Square
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium">Square Account Connected</span>
              </div>
              <Button
                onClick={generateSquareInsights}
                disabled={isGeneratingInsights}
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
              >
                {isGeneratingInsights ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Generate AI Insights
                  </>
                )}
              </Button>
            </div>

            {insights && (
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="products">Top Products</TabsTrigger>
                  <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium">Revenue</span>
                        </div>
                        <div className="text-2xl font-bold">{insights.revenue.total}</div>
                        <div className="text-sm text-green-600">{insights.revenue.growth}</div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium">Customers</span>
                        </div>
                        <div className="text-2xl font-bold">{insights.customers.total}</div>
                        <div className="text-sm text-blue-600">{insights.customers.newCustomers} new</div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <BarChart3 className="h-4 w-4 text-purple-600" />
                          <span className="text-sm font-medium">Retention</span>
                        </div>
                        <div className="text-2xl font-bold">{insights.customers.retention}</div>
                        <div className="text-sm text-purple-600">Customer retention</div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="products" className="space-y-4">
                  <div className="space-y-3">
                    {insights.topProducts.map((product: any, index: number) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{product.name}</h4>
                              <p className="text-sm text-muted-foreground">Revenue: {product.revenue}</p>
                            </div>
                            <Badge variant="outline" className="text-green-600 border-green-300">
                              {product.growth}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="recommendations" className="space-y-4">
                  <div className="space-y-3">
                    {insights.recommendations.map((rec: string, index: number) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                            <p className="text-sm">{rec}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SquareAIIntegration;
