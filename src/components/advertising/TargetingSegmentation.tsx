
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  Target, 
  Users, 
  MapPin, 
  Clock, 
  Activity,
  Brain,
  Zap
} from "lucide-react";

const TargetingSegmentation = () => {
  const [ageRange, setAgeRange] = useState([18, 65]);
  const [momentScore, setMomentScore] = useState([7]);

  const vibeTargets = [
    "🔥 Lit", "🎵 Vibes", "💎 Bougie", "🌮 Foodie", "🍸 Classy",
    "🎉 Party", "📸 Aesthetic", "🌃 Chill", "⚡ Electric", "🎭 Artsy"
  ];

  const venueTypes = [
    "Restaurant", "Bar", "Nightclub", "Lounge", "Music Venue", 
    "Comedy Club", "Attraction", "Sports", "Event"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Targeting & Segmentation</h2>
          <p className="text-muted-foreground">Advanced audience targeting with AI-powered insights</p>
        </div>
        <Badge variant="outline" className="bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 border-purple-200">
          <Brain className="h-3 w-3 mr-1" />
          AI Enhanced
        </Badge>
      </div>

      <Tabs defaultValue="demographics" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="demographics" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Demographics
          </TabsTrigger>
          <TabsTrigger value="contextual" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Contextual
          </TabsTrigger>
          <TabsTrigger value="behavioral" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Behavioral
          </TabsTrigger>
          <TabsTrigger value="moment" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Moment Score
          </TabsTrigger>
        </TabsList>

        <TabsContent value="demographics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Age & Gender</CardTitle>
                <CardDescription>Target specific age groups and gender demographics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Age Range: {ageRange[0]} - {ageRange[1]}</Label>
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
                  <Label>Gender</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender targeting" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Genders</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="non-binary">Non-Binary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Location Targeting
                </CardTitle>
                <CardDescription>Geographic and proximity-based targeting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Primary Location</Label>
                  <Input placeholder="Enter city, state, or ZIP code" />
                </div>
                <div className="space-y-2">
                  <Label>Radius</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select radius" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 mile</SelectItem>
                      <SelectItem value="5">5 miles</SelectItem>
                      <SelectItem value="10">10 miles</SelectItem>
                      <SelectItem value="25">25 miles</SelectItem>
                      <SelectItem value="50">50 miles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contextual" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Vibe Tags</CardTitle>
                <CardDescription>Target users interested in specific vibes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {vibeTargets.map(vibe => (
                    <Badge 
                      key={vibe}
                      variant="outline"
                      className="cursor-pointer justify-start hover:bg-primary hover:text-white"
                    >
                      {vibe}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Venue Types</CardTitle>
                <CardDescription>Target based on venue preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  {venueTypes.map(type => (
                    <Badge 
                      key={type}
                      variant="outline"
                      className="cursor-pointer justify-start hover:bg-primary hover:text-white"
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Daypart Targeting
              </CardTitle>
              <CardDescription>Schedule ads for optimal engagement times</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Morning (6-12)', 'Afternoon (12-17)', 'Evening (17-22)', 'Late Night (22-6)'].map(period => (
                  <Badge 
                    key={period}
                    variant="outline"
                    className="cursor-pointer justify-center py-2 hover:bg-primary hover:text-white"
                  >
                    {period}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behavioral" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Past Attendance</CardTitle>
                <CardDescription>Target based on venue history</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Badge variant="outline" className="cursor-pointer justify-start hover:bg-primary hover:text-white">
                  Frequent Visitors
                </Badge>
                <Badge variant="outline" className="cursor-pointer justify-start hover:bg-primary hover:text-white">
                  New Visitors
                </Badge>
                <Badge variant="outline" className="cursor-pointer justify-start hover:bg-primary hover:text-white">
                  Lapsed Visitors
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Clip History</CardTitle>
                <CardDescription>Target based on content engagement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Badge variant="outline" className="cursor-pointer justify-start hover:bg-primary hover:text-white">
                  Active Creators
                </Badge>
                <Badge variant="outline" className="cursor-pointer justify-start hover:bg-primary hover:text-white">
                  Heavy Viewers
                </Badge>
                <Badge variant="outline" className="cursor-pointer justify-start hover:bg-primary hover:text-white">
                  Sharers
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Trips Intent</CardTitle>
                <CardDescription>Target based on travel signals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Badge variant="outline" className="cursor-pointer justify-start hover:bg-primary hover:text-white">
                  Planning Trips
                </Badge>
                <Badge variant="outline" className="cursor-pointer justify-start hover:bg-primary hover:text-white">
                  Currently Traveling
                </Badge>
                <Badge variant="outline" className="cursor-pointer justify-start hover:bg-primary hover:text-white">
                  Local Explorers
                </Badge>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="moment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Zap className="h-5 w-5 mr-2 text-amber-600" />
                Moment Score Targeting
              </CardTitle>
              <CardDescription>
                Target based on our proprietary real-time index: hype level × crowd density
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Minimum Moment Score: {momentScore[0]}/10</Label>
                  <Slider
                    value={momentScore}
                    onValueChange={setMomentScore}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-xs text-muted-foreground">
                    Perfect for QSR brands targeting late night hunger spikes
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">7-8</div>
                    <div className="text-sm text-muted-foreground">High Energy</div>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-bold text-amber-600">9</div>
                    <div className="text-sm text-muted-foreground">Peak Vibes</div>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-bold text-red-600">10</div>
                    <div className="text-sm text-muted-foreground">Viral Moment</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
            <CardHeader>
              <CardTitle className="text-lg">AI Audience Insights</CardTitle>
              <CardDescription>Machine learning recommendations for optimal targeting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border">
                  <div className="font-medium">Lookalike Audiences</div>
                  <div className="text-sm text-muted-foreground">Find users similar to your best customers</div>
                  <Button variant="outline" size="sm" className="mt-2">Generate</Button>
                </div>
                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border">
                  <div className="font-medium">Predictive Targeting</div>
                  <div className="text-sm text-muted-foreground">AI predicts high-intent users</div>
                  <Button variant="outline" size="sm" className="mt-2">Enable</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center">
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          Save Targeting Configuration
        </Button>
      </div>
    </div>
  );
};

export default TargetingSegmentation;
