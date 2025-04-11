
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, UtensilsCrossed } from "lucide-react";

interface TransportationTabProps {
  onSave: () => void;
}

const TransportationTab = ({ onSave }: TransportationTabProps) => {
  const [defaultRideService, setDefaultRideService] = useState<string>("uber");
  const [defaultFoodService, setDefaultFoodService] = useState<string>("ubereats");
  const [activeTab, setActiveTab] = useState<string>("rides");
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transportation & Delivery Settings</CardTitle>
        <CardDescription>
          Configure your preferred ride services and food delivery platforms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 grid grid-cols-2">
            <TabsTrigger value="rides" className="flex items-center">
              <Car className="h-4 w-4 mr-2" />
              Ride Services
            </TabsTrigger>
            <TabsTrigger value="food" className="flex items-center">
              <UtensilsCrossed className="h-4 w-4 mr-2" />
              Food Delivery
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="rides" className="space-y-6">
            <div>
              <Label className="font-medium">Default Ride Service</Label>
              <RadioGroup 
                defaultValue={defaultRideService} 
                onValueChange={setDefaultRideService}
                className="mt-3 space-y-3"
              >
                <div className="flex items-center justify-between border p-3 rounded-md">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="uber" id="uber" />
                    <Label htmlFor="uber">Uber</Label>
                  </div>
                  <Button variant="outline" size="sm">Sign In</Button>
                </div>
                <div className="flex items-center justify-between border p-3 rounded-md">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lyft" id="lyft" />
                    <Label htmlFor="lyft">Lyft</Label>
                  </div>
                  <Button variant="outline" size="sm">Sign In</Button>
                </div>
                <div className="flex items-center justify-between border p-3 rounded-md">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="waymo" id="waymo" />
                    <Label htmlFor="waymo">Waymo</Label>
                  </div>
                  <Button variant="outline" size="sm">Sign In</Button>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2 pt-4">
              <Label htmlFor="ride-account-id">Ride Service Account ID (Optional)</Label>
              <Input id="ride-account-id" placeholder="Enter your account ID" />
            </div>
          </TabsContent>
          
          <TabsContent value="food" className="space-y-6">
            <div>
              <Label className="font-medium">Default Food Delivery Service</Label>
              <RadioGroup 
                defaultValue={defaultFoodService} 
                onValueChange={setDefaultFoodService}
                className="mt-3 space-y-3"
              >
                <div className="flex items-center justify-between border p-3 rounded-md">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ubereats" id="ubereats" />
                    <Label htmlFor="ubereats">Uber Eats</Label>
                  </div>
                  <Button variant="outline" size="sm">Sign In</Button>
                </div>
                <div className="flex items-center justify-between border p-3 rounded-md">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="doordash" id="doordash" />
                    <Label htmlFor="doordash">DoorDash</Label>
                  </div>
                  <Button variant="outline" size="sm">Sign In</Button>
                </div>
                <div className="flex items-center justify-between border p-3 rounded-md">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="postmates" id="postmates" />
                    <Label htmlFor="postmates">Postmates</Label>
                  </div>
                  <Button variant="outline" size="sm">Sign In</Button>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2 pt-4">
              <Label htmlFor="food-delivery-address">Default Delivery Address (Optional)</Label>
              <Input id="food-delivery-address" placeholder="Enter your delivery address" />
            </div>
          </TabsContent>
        </Tabs>
        
        <Button onClick={onSave} className="mt-6 w-full">Save Transportation & Delivery Settings</Button>
      </CardContent>
    </Card>
  );
};

export default TransportationTab;
