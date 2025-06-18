
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { TargetingOptions, GenderTargeting } from "@/types";

const TargetingSegmentation = () => {
  const [targeting, setTargeting] = useState<TargetingOptions>({
    demographics: {
      gender: 'all' as GenderTargeting,
      ageRange: [18, 65],
      interests: [],
      behaviors: [],
      location: []
    },
    geographic: {
      radius: 5,
      cities: [],
      excludeLocations: []
    },
    behaviors: {
      visitFrequency: [],
      spendingHabits: [],
      deviceUsage: []
    },
    interests: {
      categories: [],
      brands: [],
      keywords: []
    },
    contextual: {
      timeOfDay: [],
      dayOfWeek: [],
      weather: [],
      eventTypes: [],
      vibeTags: [],
      venueTypes: [],
      daypart: []
    },
    momentScore: {
      vibeScore: 0.7,
      crowdLevel: 0.6,
      engagement: 0.8,
      crowdDensity: "moderate"
    }
  });

  const handleGenderChange = (gender: GenderTargeting) => {
    setTargeting(prev => ({
      ...prev,
      demographics: {
        ...prev.demographics,
        gender
      }
    }));
  };

  const handleBehaviorToggle = (behavior: string) => {
    setTargeting(prev => ({
      ...prev,
      behaviors: {
        ...prev.behaviors,
        visitFrequency: prev.behaviors.visitFrequency.includes(behavior)
          ? prev.behaviors.visitFrequency.filter(b => b !== behavior)
          : [...prev.behaviors.visitFrequency, behavior]
      }
    }));
  };

  const handleMomentScoreChange = (field: keyof typeof targeting.momentScore, value: number) => {
    setTargeting(prev => ({
      ...prev,
      momentScore: {
        ...prev.momentScore,
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Demographics */}
        <Card>
          <CardHeader>
            <CardTitle>Demographics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Gender</Label>
              <Select value={targeting.demographics.gender} onValueChange={handleGenderChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Age Range: {targeting.demographics.ageRange?.[0]} - {targeting.demographics.ageRange?.[1]}</Label>
              <Slider
                value={targeting.demographics.ageRange || [18, 65]}
                onValueChange={(value) => 
                  setTargeting(prev => ({
                    ...prev,
                    demographics: { ...prev.demographics, ageRange: value as [number, number] }
                  }))
                }
                min={16}
                max={80}
                step={1}
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Behavioral */}
        <Card>
          <CardHeader>
            <CardTitle>Behavioral</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Visit Frequency</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {['frequent', 'occasional', 'first-time', 'returning'].map(behavior => (
                  <div key={behavior} className="flex items-center space-x-2">
                    <Checkbox
                      id={behavior}
                      checked={targeting.behaviors.visitFrequency.includes(behavior)}
                      onCheckedChange={() => handleBehaviorToggle(behavior)}
                    />
                    <Label htmlFor={behavior} className="text-sm capitalize">
                      {behavior.replace('-', ' ')}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Geographic */}
        <Card>
          <CardHeader>
            <CardTitle>Geographic</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Radius (miles): {targeting.geographic.radius}</Label>
              <Slider
                value={[targeting.geographic.radius]}
                onValueChange={(value) =>
                  setTargeting(prev => ({
                    ...prev,
                    geographic: { ...prev.geographic, radius: value[0] }
                  }))
                }
                min={1}
                max={50}
                step={1}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label>Target Cities</Label>
              <Input
                placeholder="Add cities..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const value = e.currentTarget.value.trim();
                    if (value && !targeting.geographic.cities.includes(value)) {
                      setTargeting(prev => ({
                        ...prev,
                        geographic: {
                          ...prev.geographic,
                          cities: [...prev.geographic.cities, value]
                        }
                      }));
                      e.currentTarget.value = '';
                    }
                  }
                }}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {targeting.geographic.cities.map(city => (
                  <Badge key={city} variant="outline">
                    {city}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Moment Scoring */}
        <Card>
          <CardHeader>
            <CardTitle>Moment Scoring</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Vibe Score: {targeting.momentScore.vibeScore}</Label>
              <Slider
                value={[targeting.momentScore.vibeScore]}
                onValueChange={(value) => handleMomentScoreChange('vibeScore', value[0])}
                min={0}
                max={1}
                step={0.1}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label>Crowd Level: {targeting.momentScore.crowdLevel}</Label>
              <Slider
                value={[targeting.momentScore.crowdLevel]}
                onValueChange={(value) => handleMomentScoreChange('crowdLevel', value[0])}
                min={0}
                max={1}
                step={0.1}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Engagement: {targeting.momentScore.engagement}</Label>
              <Slider
                value={[targeting.momentScore.engagement]}
                onValueChange={(value) => handleMomentScoreChange('engagement', value[0])}
                min={0}
                max={1}
                step={0.1}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Crowd Density</Label>
              <Select 
                value={targeting.momentScore.crowdDensity || "moderate"} 
                onValueChange={(value) => 
                  setTargeting(prev => ({
                    ...prev,
                    momentScore: { ...prev.momentScore, crowdDensity: value }
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="packed">Packed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Targeting Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Targeting Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">Demographics:</span>
              <p className="text-muted-foreground">
                {targeting.demographics.gender} • Ages {targeting.demographics.ageRange?.[0]}-{targeting.demographics.ageRange?.[1]}
              </p>
            </div>
            <div>
              <span className="font-medium">Geographic:</span>
              <p className="text-muted-foreground">
                {targeting.geographic.radius} mile radius • {targeting.geographic.cities.length} cities
              </p>
            </div>
            <div>
              <span className="font-medium">Moment Score:</span>
              <p className="text-muted-foreground">
                Vibe: {targeting.momentScore.vibeScore} • Crowd: {targeting.momentScore.crowdLevel}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Save Targeting</Button>
        <Button>Create Campaign</Button>
      </div>
    </div>
  );
};

export default TargetingSegmentation;
