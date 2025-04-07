
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface TransportationTabProps {
  onSave: () => void;
}

const TransportationTab = ({ onSave }: TransportationTabProps) => {
  const [defaultRideService, setDefaultRideService] = useState<string>("uber");
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transportation Settings</CardTitle>
        <CardDescription>
          Configure your preferred ride services
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label className="font-medium">Default Ride Service</Label>
            <RadioGroup 
              defaultValue={defaultRideService} 
              onValueChange={setDefaultRideService}
              className="mt-3 space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="uber" id="uber" />
                <Label htmlFor="uber">Uber</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lyft" id="lyft" />
                <Label htmlFor="lyft">Lyft</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="waymo" id="waymo" />
                <Label htmlFor="waymo">Waymo</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2 pt-4">
            <Label htmlFor="service-account-id">Service Account ID (Optional)</Label>
            <Input id="service-account-id" placeholder="Enter your account ID" />
          </div>
          <Button onClick={onSave} className="mt-4">Save Transportation Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransportationTab;
