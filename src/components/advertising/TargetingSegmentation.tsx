
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Users, MapPin, Clock, TrendingUp, Brain } from "lucide-react";
import { TargetingOptions } from "@/types";

const TargetingSegmentation = () => {
  const [targeting, setTargeting] = useState<TargetingOptions>({
    demographics: {
      ageRange: [18, 35],
      gender: ["all"],
      location: []
    },
    behavioral: {
      pastAttendance: [],
      clipHistory: [],
      tripsIntent: false
    },
    contextual: {
      vibeTags: [],
      venueTypes: [],
      daypart: []
    },
    momentScore: {
      hypeLevel: 50,
      crowdDensity: 50
    }
  });

  const vibeTagOptions = [
    "Trendy", "Popular", "Local Favorite", "Hidden Gem", "Romantic", 
    "Outdoor Seating", "Live Music", "Craft Beer", "Cocktails", "Sports Bar"
  ];

  const venueTypeOptions = [
    "Restaurant", "Bar", "Club", "Event", "Attraction", "Sports"
  ];

  const daypartOptions = [
    "Morning", "Afternoon", "Evening", "Late Night", "Weekend", "Weekday"
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Demographics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Demographics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Age Range: {targeting.demographics.ageRange[0]} - {targeting.demographics.ageRange[1]}
            </label>
            <Slider
              value={targeting.demographics.ageRange}
              onValueChange={(value) => 
                setTargeting(prev => ({
                  ...prev,
                  demographics: { ...prev.demographics, ageRange: value as [number, number] }
                }))
              }
              min={13}
              max={65}
              step={1}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Gender</label>
            <div className="flex gap-2">
              {["All", "Male", "Female", "Non-binary"].map((gender) => (
                <Badge
                  key={gender}
                  variant={targeting.demographics.gender.includes(gender.toLowerCase()) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    const genderValue = gender.toLowerCase();
                    setTargeting(prev => ({
                      ...prev,
                      demographics: {
                        ...prev.demographics,
                        gender: genderValue === "all" ? ["all"] : [genderValue]
                      }
                    }));
                  }}
                >
                  {gender}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Location</label>
            <Input placeholder="Enter cities, states, or zip codes" />
          </div>
        </CardContent>
      </Card>

      {/* Behavioral Targeting */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Behavioral Targeting
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Trips Intent</p>
              <p className="text-sm text-muted-foreground">Users planning venue visits</p>
            </div>
            <Switch
              checked={targeting.behavioral.tripsIntent}
              onCheckedChange={(checked) =>
                setTargeting(prev => ({
                  ...prev,
                  behavioral: { ...prev.behavioral, tripsIntent: checked }
                }))
              }
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Past Attendance History</label>
            <div className="flex flex-wrap gap-2">
              {["Concerts", "Sports Events", "Restaurants", "Bars", "Clubs"].map((type) => (
                <Badge key={type} variant="outline" className="cursor-pointer">
                  {type}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Clip History Preferences</label>
            <div className="flex flex-wrap gap-2">
              {["Food Content", "Nightlife", "Music", "Sports", "Art"].map((type) => (
                <Badge key={type} variant="outline" className="cursor-pointer">
                  {type}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contextual Targeting */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Contextual Targeting
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">Vibe Tags</label>
            <div className="flex flex-wrap gap-2">
              {vibeTagOptions.map((tag) => (
                <Badge
                  key={tag}
                  variant={targeting.contextual.vibeTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    setTargeting(prev => ({
                      ...prev,
                      contextual: {
                        ...prev.contextual,
                        vibeTags: prev.contextual.vibeTags.includes(tag)
                          ? prev.contextual.vibeTags.filter(t => t !== tag)
                          : [...prev.contextual.vibeTags, tag]
                      }
                    }));
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Venue Types</label>
            <div className="flex flex-wrap gap-2">
              {venueTypeOptions.map((type) => (
                <Badge
                  key={type}
                  variant={targeting.contextual.venueTypes.includes(type) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    setTargeting(prev => ({
                      ...prev,
                      contextual: {
                        ...prev.contextual,
                        venueTypes: prev.contextual.venueTypes.includes(type)
                          ? prev.contextual.venueTypes.filter(t => t !== type)
                          : [...prev.contextual.venueTypes, type]
                      }
                    }));
                  }}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Daypart</label>
            <div className="flex flex-wrap gap-2">
              {daypartOptions.map((time) => (
                <Badge
                  key={time}
                  variant={targeting.contextual.daypart.includes(time) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    setTargeting(prev => ({
                      ...prev,
                      contextual: {
                        ...prev.contextual,
                        daypart: prev.contextual.daypart.includes(time)
                          ? prev.contextual.daypart.filter(t => t !== time)
                          : [...prev.contextual.daypart, time]
                      }
                    }));
                  }}
                >
                  {time}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Moment Score Targeting */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Moment Score Targeting
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Hype Level: {targeting.momentScore.hypeLevel}%
            </label>
            <Slider
              value={[targeting.momentScore.hypeLevel]}
              onValueChange={(value) =>
                setTargeting(prev => ({
                  ...prev,
                  momentScore: { ...prev.momentScore, hypeLevel: value[0] }
                }))
              }
              min={0}
              max={100}
              step={5}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Crowd Density: {targeting.momentScore.crowdDensity}%
            </label>
            <Slider
              value={[targeting.momentScore.crowdDensity]}
              onValueChange={(value) =>
                setTargeting(prev => ({
                  ...prev,
                  momentScore: { ...prev.momentScore, crowdDensity: value[0] }
                }))
              }
              min={0}
              max={100}
              step={5}
              className="w-full"
            />
          </div>

          <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium">AI Audience Insights</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Based on your targeting criteria, this campaign will reach approximately 
              <span className="font-semibold text-foreground"> 2.4M users</span> with 
              high engagement probability.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TargetingSegmentation;
