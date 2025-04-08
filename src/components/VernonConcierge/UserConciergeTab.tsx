
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, Star, Baby } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UserConciergeTab = () => {
  const [selectedPlan, setSelectedPlan] = useState<"one-time" | "subscription">("one-time");
  const [peopleCount, setPeopleCount] = useState<string>("1");
  const [serviceType, setServiceType] = useState<"standard" | "family">("standard");

  const getPriceForPeopleCount = (count: string): number => {
    switch (count) {
      case "1": return 9.99;
      case "2": return 19.99;
      case "3": return 29.99;
      case "4": return 39.99;
      case "5+": return 49.99;
      default: return 9.99;
    }
  };

  const handleProceed = () => {
    // Handle payment processing logic
    console.log("Processing payment for", selectedPlan, "plan with", peopleCount, "people");
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Let Vernon Plan Your Perfect Outing</h3>
        <p className="text-muted-foreground">
          Connect with a human concierge who will coordinate your perfect experience,
          from reservations to special arrangements.
        </p>
      </div>

      <Tabs defaultValue="standard" onValueChange={(val) => setServiceType(val as "standard" | "family")} className="w-full">
        <TabsList className="grid grid-cols-2 w-full mb-4">
          <TabsTrigger value="standard">Standard Services</TabsTrigger>
          <TabsTrigger value="family">Family Friendly</TabsTrigger>
        </TabsList>
        
        <TabsContent value="standard" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Choose Your Plan</CardTitle>
              <CardDescription>Select how you'd like to use Vernon Concierge</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                defaultValue={selectedPlan} 
                onValueChange={(value) => setSelectedPlan(value as "one-time" | "subscription")}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-secondary/10">
                  <RadioGroupItem value="one-time" id="one-time" />
                  <Label htmlFor="one-time" className="flex-1 cursor-pointer">
                    <div className="font-medium">One-Time Service</div>
                    <div className="text-sm text-muted-foreground">
                      Pay per use based on your party size
                    </div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-secondary/10">
                  <RadioGroupItem value="subscription" id="subscription" />
                  <Label htmlFor="subscription" className="flex-1 cursor-pointer">
                    <div className="font-medium flex items-center">
                      Monthly Subscription 
                      <span className="ml-2 bg-primary/20 text-primary text-xs px-2 py-1 rounded-full flex items-center">
                        <Star className="h-3 w-3 mr-1" /> Best Value
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      $19.99/month for unlimited concierge access
                    </div>
                  </Label>
                </div>
              </RadioGroup>
              
              {selectedPlan === "one-time" && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Number of People</h4>
                  <RadioGroup 
                    defaultValue={peopleCount} 
                    onValueChange={setPeopleCount}
                    className="grid grid-cols-2 md:grid-cols-5 gap-2"
                  >
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="1" id="p-1" className="sr-only" />
                      <Label 
                        htmlFor="p-1" 
                        className={`px-4 py-2 w-full text-center rounded-md cursor-pointer border ${peopleCount === "1" ? "bg-primary text-primary-foreground" : "hover:bg-secondary/10"}`}
                      >
                        1 <span className="block text-xs">${getPriceForPeopleCount("1")}</span>
                      </Label>
                    </div>
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="2" id="p-2" className="sr-only" />
                      <Label 
                        htmlFor="p-2" 
                        className={`px-4 py-2 w-full text-center rounded-md cursor-pointer border ${peopleCount === "2" ? "bg-primary text-primary-foreground" : "hover:bg-secondary/10"}`}
                      >
                        2 <span className="block text-xs">${getPriceForPeopleCount("2")}</span>
                      </Label>
                    </div>
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="3" id="p-3" className="sr-only" />
                      <Label 
                        htmlFor="p-3" 
                        className={`px-4 py-2 w-full text-center rounded-md cursor-pointer border ${peopleCount === "3" ? "bg-primary text-primary-foreground" : "hover:bg-secondary/10"}`}
                      >
                        3 <span className="block text-xs">${getPriceForPeopleCount("3")}</span>
                      </Label>
                    </div>
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="4" id="p-4" className="sr-only" />
                      <Label 
                        htmlFor="p-4" 
                        className={`px-4 py-2 w-full text-center rounded-md cursor-pointer border ${peopleCount === "4" ? "bg-primary text-primary-foreground" : "hover:bg-secondary/10"}`}
                      >
                        4 <span className="block text-xs">${getPriceForPeopleCount("4")}</span>
                      </Label>
                    </div>
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="5+" id="p-5" className="sr-only" />
                      <Label 
                        htmlFor="p-5" 
                        className={`px-4 py-2 w-full text-center rounded-md cursor-pointer border ${peopleCount === "5+" ? "bg-primary text-primary-foreground" : "hover:bg-secondary/10"}`}
                      >
                        5-10 <span className="block text-xs">${getPriceForPeopleCount("5+")}</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              )}
              
              <Button 
                className="w-full mt-6" 
                size="lg"
                onClick={handleProceed}
              >
                {selectedPlan === "one-time" 
                  ? `Pay $${getPriceForPeopleCount(peopleCount)}` 
                  : "Subscribe for $19.99/month"}
              </Button>
              
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium">What's included:</h4>
                <ul className="space-y-1">
                  <li className="text-sm flex items-start">
                    <Check className="h-4 w-4 mr-2 text-primary flex-shrink-0 mt-0.5" />
                    <span>Personalized recommendations from a human concierge</span>
                  </li>
                  <li className="text-sm flex items-start">
                    <Check className="h-4 w-4 mr-2 text-primary flex-shrink-0 mt-0.5" />
                    <span>Priority reservations at participating venues</span>
                  </li>
                  <li className="text-sm flex items-start">
                    <Check className="h-4 w-4 mr-2 text-primary flex-shrink-0 mt-0.5" />
                    <span>Special offers and exclusive access</span>
                  </li>
                  <li className="text-sm flex items-start">
                    <Check className="h-4 w-4 mr-2 text-primary flex-shrink-0 mt-0.5" />
                    <span>Full planning and booking service</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="family" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Baby className="h-5 w-5 mr-2" />
                Family Friendly Services
              </CardTitle>
              <CardDescription>
                We make traveling with children easier and more enjoyable
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-md border">
                  <h4 className="font-medium mb-2">Vernon Family Care</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Our concierge will arrange everything your family needs for a stress-free experience
                  </p>
                  
                  <ul className="space-y-2">
                    <li className="text-sm flex items-start">
                      <Check className="h-4 w-4 mr-2 text-primary flex-shrink-0 mt-0.5" />
                      <span className="flex-1">Vetted local babysitters for when parents need adult time</span>
                    </li>
                    <li className="text-sm flex items-start">
                      <Check className="h-4 w-4 mr-2 text-primary flex-shrink-0 mt-0.5" />
                      <span className="flex-1">Baby equipment rentals (strollers, cribs, car seats, etc.)</span>
                    </li>
                    <li className="text-sm flex items-start">
                      <Check className="h-4 w-4 mr-2 text-primary flex-shrink-0 mt-0.5" />
                      <span className="flex-1">Baby supply delivery (diapers, wipes, formula, food, etc.)</span>
                    </li>
                    <li className="text-sm flex items-start">
                      <Check className="h-4 w-4 mr-2 text-primary flex-shrink-0 mt-0.5" />
                      <span className="flex-1">Special items like bottle warmers and sanitizers delivered to your accommodation</span>
                    </li>
                    <li className="text-sm flex items-start">
                      <Check className="h-4 w-4 mr-2 text-primary flex-shrink-0 mt-0.5" />
                      <span className="flex-1">Family-friendly activity recommendations and bookings</span>
                    </li>
                    <li className="text-sm flex items-start">
                      <Check className="h-4 w-4 mr-2 text-primary flex-shrink-0 mt-0.5" />
                      <span className="flex-1">Kid-friendly restaurant reservations with high chairs and children's menus</span>
                    </li>
                  </ul>
                </div>
                
                <RadioGroup 
                  defaultValue={selectedPlan} 
                  onValueChange={(value) => setSelectedPlan(value as "one-time" | "subscription")}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-secondary/10">
                    <RadioGroupItem value="one-time" id="family-one-time" />
                    <Label htmlFor="family-one-time" className="flex-1 cursor-pointer">
                      <div className="font-medium">One-Time Family Service</div>
                      <div className="text-sm text-muted-foreground">
                        $29.99 per use for complete family assistance
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-secondary/10">
                    <RadioGroupItem value="subscription" id="family-subscription" />
                    <Label htmlFor="family-subscription" className="flex-1 cursor-pointer">
                      <div className="font-medium flex items-center">
                        Family Subscription 
                        <span className="ml-2 bg-primary/20 text-primary text-xs px-2 py-1 rounded-full flex items-center">
                          <Star className="h-3 w-3 mr-1" /> Recommended
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        $39.99/month for unlimited family concierge services
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
                
                <Button 
                  className="w-full mt-2" 
                  size="lg"
                  onClick={handleProceed}
                >
                  {selectedPlan === "one-time" 
                    ? "Pay $29.99 for Family Service" 
                    : "Subscribe for $39.99/month"}
                </Button>
                
                <p className="text-xs text-center text-muted-foreground mt-2">
                  All caregivers are background-checked and verified for your peace of mind
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserConciergeTab;
