
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Target, Users, MapPin, Clock, Heart, TrendingUp, Filter } from "lucide-react";

interface TargetingSegmentationProps {
  subscriptionTier: 'standard' | 'plus' | 'premium' | 'pro';
}

const TargetingSegmentation: React.FC<TargetingSegmentationProps> = ({ subscriptionTier }) => {
  const [ageRange, setAgeRange] = useState([18, 65]);
  const [radius, setRadius] = useState([5]);
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [enableBehavioral, setEnableBehavioral] = useState(true);
  const [enableLookalike, setEnableLookalike] = useState(false);

  const vibeOptions = [
    'Energetic', 'Chill', 'Trendy', 'Intimate', 'Luxury', 'Casual',
    'Romantic', 'Social', 'Quiet', 'Vibrant', 'Artsy', 'Sporty'
  ];

  const toggleVibe = (vibe: string) => {
    setSelectedVibes(prev => 
      prev.includes(vibe) 
        ? prev.filter(v => v !== vibe)
        : [...prev, vibe]
    );
  };

  return (
    <div className="space-y-6">
      {/* Audience Overview */}
      <Card className="bg-neutral-800/80 border-neutral-600">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Target className="mr-2 h-5 w-5" />
            Targeting Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-950/40 p-4 rounded-lg">
              <Users className="h-6 w-6 text-blue-400 mb-2" />
              <p className="text-sm text-blue-300">Estimated Reach</p>
              <p className="text-xl font-bold text-white">2.4M users</p>
            </div>
            <div className="bg-green-950/40 p-4 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-400 mb-2" />
              <p className="text-sm text-green-300">Targeting Score</p>
              <p className="text-xl font-bold text-white">8.7/10</p>
            </div>
            <div className="bg-purple-950/40 p-4 rounded-lg">
              <Heart className="h-6 w-6 text-purple-400 mb-2" />
              <p className="text-sm text-purple-300">Engagement Rate</p>
              <p className="text-xl font-bold text-white">4.2%</p>
            </div>
            <div className="bg-amber-950/40 p-4 rounded-lg">
              <Filter className="h-6 w-6 text-amber-400 mb-2" />
              <p className="text-sm text-amber-300">Active Filters</p>
              <p className="text-xl font-bold text-white">{selectedVibes.length + 3}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Targeting Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Demographics & Location */}
        <Card className="bg-neutral-800/80 border-neutral-600">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Demographics & Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-white mb-3 block">Age Range: {ageRange[0]} - {ageRange[1]} years</Label>
              <Slider
                value={ageRange}
                onValueChange={setAgeRange}
                max={75}
                min={13}
                step={1}
                className="w-full"
              />
            </div>

            <div>
              <Label className="text-white">Gender</Label>
              <Select>
                <SelectTrigger className="bg-neutral-700 border-neutral-600 text-white mt-2">
                  <SelectValue placeholder="Select gender targeting" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-700 border-neutral-600">
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non-binary">Non-Binary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white">Location Type</Label>
              <Select>
                <SelectTrigger className="bg-neutral-700 border-neutral-600 text-white mt-2">
                  <SelectValue placeholder="Select location targeting" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-700 border-neutral-600">
                  <SelectItem value="nationwide">Nationwide</SelectItem>
                  <SelectItem value="city">Specific Cities</SelectItem>
                  <SelectItem value="zip">ZIP Codes</SelectItem>
                  <SelectItem value="radius">Radius from Point</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white mb-3 block">
                <MapPin className="inline mr-1 h-4 w-4" />
                Radius: {radius[0]} miles
              </Label>
              <Slider
                value={radius}
                onValueChange={setRadius}
                max={50}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Vibe Preferences */}
        <Card className="bg-neutral-800/80 border-neutral-600">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Heart className="mr-2 h-5 w-5" />
              Vibe Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-400 text-sm mb-4">
              Target users based on their preferred venue atmospheres and experiences
            </p>
            <div className="grid grid-cols-3 gap-2">
              {vibeOptions.map((vibe) => (
                <Badge
                  key={vibe}
                  variant={selectedVibes.includes(vibe) ? "default" : "outline"}
                  className={`cursor-pointer text-center justify-center p-2 transition-all ${
                    selectedVibes.includes(vibe)
                      ? 'bg-purple-600 text-white border-purple-500'
                      : 'bg-neutral-700 text-neutral-300 border-neutral-600 hover:border-purple-400'
                  }`}
                  onClick={() => toggleVibe(vibe)}
                >
                  {vibe}
                </Badge>
              ))}
            </div>
            
            <div className="mt-6 p-3 bg-purple-950/40 border border-purple-600/30 rounded-lg">
              <p className="text-sm text-purple-300 font-medium">
                Selected: {selectedVibes.length} vibes
              </p>
              <p className="text-xs text-purple-200/80 mt-1">
                {selectedVibes.length === 0 
                  ? "Select vibes to refine your audience"
                  : `Targeting users who enjoy: ${selectedVibes.join(', ')}`
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Behavioral & Advanced Targeting */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-neutral-800/80 border-neutral-600">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Behavioral Targeting
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Past Behavior Targeting</Label>
                <p className="text-sm text-neutral-400">Target users based on previous venue visits</p>
              </div>
              <Switch 
                checked={enableBehavioral} 
                onCheckedChange={setEnableBehavioral}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Lookalike Audiences</Label>
                <p className="text-sm text-neutral-400">Find users similar to your best customers</p>
              </div>
              <Switch 
                checked={enableLookalike} 
                onCheckedChange={setEnableLookalike}
              />
            </div>

            <div>
              <Label className="text-white">Visit Frequency</Label>
              <Select>
                <SelectTrigger className="bg-neutral-700 border-neutral-600 text-white mt-2">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-700 border-neutral-600">
                  <SelectItem value="frequent">Frequent Visitors (3+ times/week)</SelectItem>
                  <SelectItem value="regular">Regular Visitors (1-2 times/week)</SelectItem>
                  <SelectItem value="occasional">Occasional Visitors (1-3 times/month)</SelectItem>
                  <SelectItem value="new">New to Area</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white">Spending Habits</Label>
              <Select>
                <SelectTrigger className="bg-neutral-700 border-neutral-600 text-white mt-2">
                  <SelectValue placeholder="Select spending level" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-700 border-neutral-600">
                  <SelectItem value="high">High Spenders ($100+/visit)</SelectItem>
                  <SelectItem value="medium">Medium Spenders ($25-100/visit)</SelectItem>
                  <SelectItem value="budget">Budget Conscious (<$25/visit)</SelectItem>
                  <SelectItem value="all">All Spending Levels</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-800/80 border-neutral-600">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Timing & Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-white">Days of Week</Label>
              <div className="grid grid-cols-7 gap-1 mt-2">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="bg-neutral-700 border-neutral-600 text-white hover:bg-purple-600 hover:border-purple-500"
                  >
                    {day}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-white">Time of Day</Label>
              <Select>
                <SelectTrigger className="bg-neutral-700 border-neutral-600 text-white mt-2">
                  <SelectValue placeholder="Select time targeting" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-700 border-neutral-600">
                  <SelectItem value="morning">Morning (6AM - 12PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12PM - 6PM)</SelectItem>
                  <SelectItem value="evening">Evening (6PM - 12AM)</SelectItem>
                  <SelectItem value="late-night">Late Night (12AM - 6AM)</SelectItem>
                  <SelectItem value="all-day">All Day</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white">Weather Conditions</Label>
              <Select>
                <SelectTrigger className="bg-neutral-700 border-neutral-600 text-white mt-2">
                  <SelectValue placeholder="Select weather targeting" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-700 border-neutral-600">
                  <SelectItem value="any">Any Weather</SelectItem>
                  <SelectItem value="sunny">Sunny Days</SelectItem>
                  <SelectItem value="rainy">Rainy Days</SelectItem>
                  <SelectItem value="cold">Cold Weather</SelectItem>
                  <SelectItem value="hot">Hot Weather</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Save Targeting Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TargetingSegmentation;
