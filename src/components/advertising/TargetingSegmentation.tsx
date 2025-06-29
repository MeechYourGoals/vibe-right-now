import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TargetingOptions, GenderTargeting } from "@/types";

const TargetingSegmentation = () => {
  const [targeting, setTargeting] = useState<TargetingOptions>({
    ageRanges: [],
    locations: [],
    interests: [],
    gender: {
      all: true,
      male: false,
      female: false,
      other: false
    },
    demographics: {
      gender: 'all',
      ageRange: [18, 65],
      interests: [],
      behaviors: [],
      location: []
    },
    geographic: {
      radius: 5,
      cities: [],
      regions: []
    },
    behaviors: {
      categories: [],
      frequency: 'weekly',
      venueVisits: [],
      socialEngagement: [],
      purchaseHistory: []
    },
    contextual: {
      categories: [],
      frequency: 'daily',
      vibeTags: [],
      venueTypes: [],
      daypart: [],
      timeOfDay: [],
      dayOfWeek: [],
      weather: [],
      eventTypes: []
    },
    momentScore: {
      crowdDensity: '5',
      vibeScore: 'high',
      crowdLevel: 'medium',
      engagement: 'active'
    }
  });

  const handleGenderChange = (gender: string) => {
    setTargeting(prev => ({
      ...prev,
      demographics: {
        ...prev.demographics!,
        gender
      }
    }));
  };

  const handleAgeRangeChange = (values: number[]) => {
    setTargeting(prev => ({
      ...prev,
      demographics: {
        ...prev.demographics!,
        ageRange: [values[0], values[1]]
      }
    }));
  };

  const handleInterestToggle = (interest: string, checked: boolean) => {
    setTargeting(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, interest]
        : prev.interests.filter(i => i !== interest)
    }));
  };

  const handleBehaviorToggle = (behavior: string, checked: boolean) => {
    setTargeting(prev => ({
      ...prev,
      behaviors: {
        ...prev.behaviors!,
        venueVisits: checked 
          ? [...(prev.behaviors?.venueVisits || []), behavior]
          : (prev.behaviors?.venueVisits || []).filter(b => b !== behavior)
      }
    }));
  };

  const handleVibeTagToggle = (tag: string, checked: boolean) => {
    setTargeting(prev => ({
      ...prev,
      contextual: {
        ...prev.contextual!,
        vibeTags: checked 
          ? [...(prev.contextual?.vibeTags || []), tag]
          : (prev.contextual?.vibeTags || []).filter(t => t !== tag)
      }
    }));
  };

  const handleMomentScoreChange = (field: string, value: string) => {
    setTargeting(prev => ({
      ...prev,
      momentScore: typeof prev.momentScore === 'object' && prev.momentScore !== null ? {
        ...prev.momentScore,
        [field]: value
      } : {
        crowdDensity: field === 'crowdDensity' ? value : '5',
        vibeScore: field === 'vibeScore' ? value : 'high',
        crowdLevel: field === 'crowdLevel' ? value : 'medium',
        engagement: field === 'engagement' ? value : 'active'
      }
    }));
  };

  const interests = [
    'Nightlife', 'Food & Dining', 'Live Music', 'Cocktails', 'Dancing',
    'Rooftop Venues', 'Happy Hour', 'Date Night', 'Group Outings'
  ];

  const behaviors = [
    'Frequent bar visits', 'Weekend social events', 'Premium dining',
    'Late night activities', 'Social media check-ins', 'Event attendance'
  ];

  const vibeTags = [
    'Energetic', 'Chill', 'Romantic', 'Upscale', 'Casual', 'Trendy',
    'Live Entertainment', 'Outdoor Seating', 'Craft Cocktails'
  ];

  const getAgeRangeValues = (): number[] => {
    const ageRange = targeting.demographics?.ageRange;
    if (Array.isArray(ageRange)) {
      return ageRange;
    }
    if (ageRange && typeof ageRange === 'object' && 'min' in ageRange && 'max' in ageRange) {
      return [ageRange.min, ageRange.max];
    }
    return [18, 65];
  };

  const ageRangeValues = getAgeRangeValues();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Demographic Targeting</CardTitle>
          <CardDescription>Define your audience demographics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Gender</Label>
            <Select 
              value={typeof targeting.demographics?.gender === 'string' ? targeting.demographics.gender : 'all'} 
              onValueChange={handleGenderChange}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genders</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="non-binary">Non-Binary</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Age Range: {ageRangeValues[0]} - {ageRangeValues[1]}</Label>
            <Slider
              value={ageRangeValues}
              onValueChange={handleAgeRangeChange}
              min={18}
              max={80}
              step={1}
              className="mt-2"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interest Targeting</CardTitle>
          <CardDescription>Target users based on their interests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {interests.map((interest) => (
              <div key={interest} className="flex items-center space-x-2">
                <Checkbox
                  id={interest}
                  checked={targeting.interests.includes(interest)}
                  onCheckedChange={(checked) => handleInterestToggle(interest, checked as boolean)}
                />
                <Label htmlFor={interest} className="text-sm">{interest}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Behavioral Targeting</CardTitle>
          <CardDescription>Target based on user behaviors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {behaviors.map((behavior) => (
              <div key={behavior} className="flex items-center space-x-2">
                <Checkbox
                  id={behavior}
                  checked={(targeting.behaviors?.venueVisits || []).includes(behavior)}
                  onCheckedChange={(checked) => handleBehaviorToggle(behavior, checked as boolean)}
                />
                <Label htmlFor={behavior} className="text-sm">{behavior}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contextual Targeting</CardTitle>
          <CardDescription>Target based on venue vibes and context</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {vibeTags.map((tag) => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox
                  id={tag}
                  checked={(targeting.contextual?.vibeTags || []).includes(tag)}
                  onCheckedChange={(checked) => handleVibeTagToggle(tag, checked as boolean)}
                />
                <Label htmlFor={tag} className="text-sm">{tag}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Moment Scoring</CardTitle>
          <CardDescription>Target based on real-time venue energy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Crowd Density</Label>
            <Select 
              value={typeof targeting.momentScore === 'object' && targeting.momentScore !== null ? targeting.momentScore.crowdDensity : '5'} 
              onValueChange={(value) => handleMomentScoreChange('crowdDensity', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Very Low</SelectItem>
                <SelectItem value="2">Low</SelectItem>
                <SelectItem value="3">Medium</SelectItem>
                <SelectItem value="4">High</SelectItem>
                <SelectItem value="5">Very High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Vibe Score</Label>
            <Select 
              value={typeof targeting.momentScore === 'object' && targeting.momentScore !== null ? targeting.momentScore.vibeScore : 'high'} 
              onValueChange={(value) => handleMomentScoreChange('vibeScore', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low Energy</SelectItem>
                <SelectItem value="medium">Medium Energy</SelectItem>
                <SelectItem value="high">High Energy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline">Save as Template</Button>
        <Button>Create Campaign</Button>
      </div>
    </div>
  );
};

export default TargetingSegmentation;
