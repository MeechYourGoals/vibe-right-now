
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, MapPin, Clock, TrendingUp, Target } from "lucide-react";

const TargetingSegmentation = () => {
  const [ageRange, setAgeRange] = useState([18, 65]);
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [selectedBehaviors, setSelectedBehaviors] = useState<string[]>([]);

  const vibeOptions = [
    "Trendy", "Chill", "Upscale", "Casual", "Romantic", "Family-Friendly",
    "Artsy", "Sporty", "Foodie", "NightOwl", "Pet-Friendly", "Live Music"
  ];

  const behaviorOptions = [
    "Frequent Check-ins", "High Spenders", "Social Sharers", "Review Writers",
    "Event Attendees", "Group Planners", "Early Adopters", "Local Explorers"
  ];

  const toggleVibe = (vibe: string) => {
    setSelectedVibes(prev => 
      prev.includes(vibe) 
        ? prev.filter(v => v !== vibe)
        : [...prev, vibe]
    );
  };

  const toggleBehavior = (behavior: string) => {
    setSelectedBehaviors(prev => 
      prev.includes(behavior) 
        ? prev.filter(b => b !== behavior)
        : [...prev, behavior]
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Demographics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Demographics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-3 block">Age Range: {ageRange[0]} - {ageRange[1]} years</label>
              <Slider
                value={ageRange}
                onValueChange={setAgeRange}
                max={80}
                min={16}
                step={1}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Gender</label>
              <div className="space-y-2">
                {["All", "Male", "Female", "Non-binary"].map((gender) => (
                  <div key={gender} className="flex items-center space-x-2">
                    <Checkbox id={gender} />
                    <label htmlFor={gender} className="text-sm">{gender}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Income Level</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select income range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Income Levels</SelectItem>
                  <SelectItem value="low">$25K - $50K</SelectItem>
                  <SelectItem value="medium">$50K - $100K</SelectItem>
                  <SelectItem value="high">$100K+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Location Targeting
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Target Area</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local">Within 5 miles</SelectItem>
                  <SelectItem value="city">City-wide</SelectItem>
                  <SelectItem value="metro">Metro area</SelectItem>
                  <SelectItem value="state">State-wide</SelectItem>
                  <SelectItem value="national">National</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Specific Locations</label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {["Downtown", "Midtown", "Uptown", "Arts District", "Financial District", "Waterfront"].map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <Checkbox id={area} />
                    <label htmlFor={area} className="text-sm">{area}</label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Exclude Areas</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Areas to exclude" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential areas</SelectItem>
                  <SelectItem value="industrial">Industrial zones</SelectItem>
                  <SelectItem value="suburban">Suburban areas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vibe Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Vibe Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {vibeOptions.map((vibe) => (
              <Badge
                key={vibe}
                variant={selectedVibes.includes(vibe) ? "default" : "outline"}
                className="cursor-pointer justify-center py-2"
                onClick={() => toggleVibe(vibe)}
              >
                {vibe}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Behavioral Targeting */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Behavioral Targeting
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {behaviorOptions.map((behavior) => (
              <div key={behavior} className="flex items-center space-x-2">
                <Checkbox 
                  id={behavior}
                  checked={selectedBehaviors.includes(behavior)}
                  onCheckedChange={() => toggleBehavior(behavior)}
                />
                <label htmlFor={behavior} className="text-sm cursor-pointer">{behavior}</label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timing Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Timing & Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Days of Week</label>
              <div className="grid grid-cols-4 gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <div key={day} className="flex items-center space-x-1">
                    <Checkbox id={day} />
                    <label htmlFor={day} className="text-xs">{day}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Time of Day</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select time preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (6AM - 12PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12PM - 6PM)</SelectItem>
                  <SelectItem value="evening">Evening (6PM - 12AM)</SelectItem>
                  <SelectItem value="late">Late Night (12AM - 6AM)</SelectItem>
                  <SelectItem value="all">All Day</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audience Estimate */}
      <Card>
        <CardHeader>
          <CardTitle>Estimated Audience Reach</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-6">
            <div className="text-3xl font-bold text-purple-600 mb-2">~45,600</div>
            <div className="text-muted-foreground mb-4">Potential users in your target audience</div>
            <div className="flex justify-center gap-4">
              <Button variant="outline">Save Audience</Button>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Create Campaign
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TargetingSegmentation;
