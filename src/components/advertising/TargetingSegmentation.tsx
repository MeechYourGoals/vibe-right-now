
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Users, 
  MapPin, 
  Clock, 
  TrendingUp, 
  Zap,
  Filter,
  Brain,
  Heart,
  Calendar
} from "lucide-react";

const TargetingSegmentation = () => {
  const [ageRange, setAgeRange] = useState([18, 65]);
  const [radius, setRadius] = useState([5]);
  const [momentScore, setMomentScore] = useState([7]);

  const vibes = [
    "Late Night Eats", "Date Night", "Brunch Vibes", "Happy Hour", "Live Music",
    "Rooftop Drinks", "Coffee Culture", "Workout Ready", "Study Session", "Girls Night"
  ];

  const venues = [
    "Restaurants", "Bars", "Cafes", "Nightclubs", "Lounges", 
    "Food Trucks", "Breweries", "Wine Bars", "Sports Bars", "Rooftops"
  ];

  const behaviors = [
    "Frequent Check-ins", "Social Sharers", "Review Writers", "Photo Posters",
    "Event Attendees", "Deal Seekers", "Trendsetters", "Loyalty Members"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <Target className="h-6 w-6 mr-2 text-blue-600" />
            Targeting & Segmentation
          </h2>
          <p className="text-muted-foreground">Create precise audience segments with advanced targeting options</p>
        </div>
        <Badge variant="outline" className="bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 border-purple-200">
          <Brain className="h-3 w-3 mr-1" />
          AI Optimized
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Demographics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              Demographics
            </CardTitle>
            <CardDescription>Basic demographic targeting parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Age Range: {ageRange[0]} - {ageRange[1]} years</Label>
              <Slider
                value={ageRange}
                onValueChange={setAgeRange}
                max={80}
                min={13}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender targeting" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="nonbinary">Non-binary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="income">Income Level</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select income range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Income Levels</SelectItem>
                  <SelectItem value="low">$0 - $30K</SelectItem>
                  <SelectItem value="medium">$30K - $75K</SelectItem>
                  <SelectItem value="high">$75K - $150K</SelectItem>
                  <SelectItem value="premium">$150K+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Education</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Education Levels</SelectItem>
                  <SelectItem value="highschool">High School</SelectItem>
                  <SelectItem value="college">College</SelectItem>
                  <SelectItem value="graduate">Graduate Degree</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Location & Timing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-green-600" />
              Location & Timing
            </CardTitle>
            <CardDescription>Geographic and temporal targeting controls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location">Primary Location</Label>
              <Input id="location" placeholder="Enter city, zip, or address..." />
            </div>

            <div className="space-y-2">
              <Label>Radius: {radius[0]} miles</Label>
              <Slider
                value={radius}
                onValueChange={setRadius}
                max={50}
                min={1}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="daypart">Day Parts</Label>
              <div className="grid grid-cols-2 gap-2">
                {["Morning", "Afternoon", "Evening", "Late Night"].map((time) => (
                  <div key={time} className="flex items-center space-x-2">
                    <Checkbox id={time} />
                    <Label htmlFor={time} className="text-sm">{time}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="days">Days of Week</Label>
              <div className="grid grid-cols-2 gap-2">
                {["Weekdays", "Weekends", "Friday", "Saturday"].map((day) => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox id={day} />
                    <Label htmlFor={day} className="text-sm">{day}</Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Behavioral Targeting */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="h-5 w-5 mr-2 text-purple-600" />
              Behavioral
            </CardTitle>
            <CardDescription>Target users based on past behavior and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Behaviors</Label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {behaviors.map((behavior) => (
                  <div key={behavior} className="flex items-center space-x-2">
                    <Checkbox id={behavior} />
                    <Label htmlFor={behavior} className="text-sm">{behavior}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="visit-frequency">Visit Frequency</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="new">New Visitors</SelectItem>
                  <SelectItem value="returning">Returning Visitors</SelectItem>
                  <SelectItem value="frequent">Frequent Visitors (5+ times)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="spending">Spending Behavior</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select spending level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Spenders</SelectItem>
                  <SelectItem value="budget">Budget Conscious</SelectItem>
                  <SelectItem value="moderate">Moderate Spenders</SelectItem>
                  <SelectItem value="premium">Premium Spenders</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contextual Targeting */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2 text-amber-600" />
              Contextual Targeting
            </CardTitle>
            <CardDescription>Target based on current context and vibes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Vibe Tags</Label>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {vibes.map((vibe) => (
                  <Badge key={vibe} variant="outline" className="cursor-pointer hover:bg-primary/10">
                    {vibe}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Venue Types</Label>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {venues.map((venue) => (
                  <Badge key={venue} variant="outline" className="cursor-pointer hover:bg-primary/10">
                    {venue}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-red-600" />
              Moment Score Targeting
            </CardTitle>
            <CardDescription>Target users based on real-time engagement levels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Moment Score Threshold: {momentScore[0]}/10</Label>
              <Slider
                value={momentScore}
                onValueChange={setMomentScore}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">
                Higher scores indicate peak engagement and social activity
              </p>
            </div>

            <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-lg">
              <h4 className="font-medium text-sm mb-2 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1 text-red-600" />
                Real-time Optimization
              </h4>
              <p className="text-xs text-muted-foreground mb-2">
                Moment Score combines hype level × crowd density for perfect timing
              </p>
              <div className="flex justify-between text-xs">
                <span>Current Score: 8.2</span>
                <Badge variant="outline" className="text-xs">High Activity</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="trigger">Trigger Conditions</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select trigger" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hunger">Hunger Spike Detection</SelectItem>
                  <SelectItem value="social">Social Gathering</SelectItem>
                  <SelectItem value="event">Event Starting</SelectItem>
                  <SelectItem value="happy">Happy Hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audience Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2 text-blue-600" />
            AI Audience Insights
          </CardTitle>
          <CardDescription>
            Smart recommendations based on your targeting parameters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Estimated Reach</span>
                <Badge variant="outline" className="bg-blue-100 text-blue-700">845K</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Users matching your targeting criteria
              </p>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Competition Level</span>
                <Badge variant="outline" className="bg-green-100 text-green-700">Medium</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Competitive landscape for this audience
              </p>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Optimization Score</span>
                <Badge variant="outline" className="bg-purple-100 text-purple-700">92%</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                AI assessment of targeting effectiveness
              </p>
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Filter className="h-4 w-4 mr-2" />
              Save Audience Segment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TargetingSegmentation;
