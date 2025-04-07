
import { useState } from "react";
import { PercentCircle, Tag } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

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
  );
};

export default DiscountCodeAnalysis;
