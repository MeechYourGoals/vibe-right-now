
import { useState } from "react";
import { PercentCircle, Tag, BarChart, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DiscountCodeAnalysis = () => {
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");

  return (
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
        <Tabs defaultValue="active">
          <TabsList className="mb-4">
            <TabsTrigger value="active">Active Codes</TabsTrigger>
            <TabsTrigger value="add">Add New</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-4">
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
              
              {/* Discount 3 - New */}
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-2 text-amber-500" />
                      <h4 className="font-semibold">SUMMER30</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">30% off summer menu items</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">89 uses</p>
                    <p className="text-sm text-muted-foreground">$1,220 revenue</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <div className="p-2 bg-muted rounded">
                    <p className="text-xs text-muted-foreground">ROI</p>
                    <p className="font-medium text-green-600">210%</p>
                  </div>
                  <div className="p-2 bg-muted rounded">
                    <p className="text-xs text-muted-foreground">Avg. Order</p>
                    <p className="font-medium">$45.20</p>
                  </div>
                  <div className="p-2 bg-muted rounded">
                    <p className="text-xs text-muted-foreground">Repeat Uses</p>
                    <p className="font-medium">15%</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button variant="outline">
                View All Discount Codes
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="add" className="space-y-4">
            <div className="space-y-4">
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
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="valid-from">Valid From</Label>
                  <Input 
                    id="valid-from" 
                    type="date"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valid-until">Valid Until</Label>
                  <Input 
                    id="valid-until" 
                    type="date"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="usage-limit">Usage Limit</Label>
                  <Input 
                    id="usage-limit" 
                    type="number"
                    placeholder="e.g., 100 (blank for unlimited)"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input 
                  id="description" 
                  placeholder="Brief description of this discount code"
                />
              </div>
              
              <Button>Add Discount Code</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <BarChart className="h-4 w-4 mr-2 text-blue-500" />
                      Code Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center">
                      <p className="text-muted-foreground text-sm">Performance chart would display here</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                      ROI by Channel
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center">
                      <p className="text-muted-foreground text-sm">ROI chart would display here</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Discount Code Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="p-3 border rounded-md flex items-start">
                      <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
                        <Tag className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Optimize TUESDAY25</h4>
                        <p className="text-sm text-muted-foreground">Increase discount to 30% to drive more traffic during off-peak hours.</p>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-md flex items-start">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
                        <Tag className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Create FIRSTTIME15</h4>
                        <p className="text-sm text-muted-foreground">Introduce a first-time visitor discount to increase new customer acquisition.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DiscountCodeAnalysis;
