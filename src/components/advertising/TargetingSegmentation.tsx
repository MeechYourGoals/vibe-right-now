import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TargetingOptions, GenderTargeting } from '@/types';

const TargetingSegmentation = () => {
  const [targeting, setTargeting] = useState<TargetingOptions>({
    ageRanges: [],
    locations: [],
    interests: [],
    gender: { all: true, male: false, female: false, other: false },
    ageRange: { min: 18, max: 65 },
    location: '',
    demographics: {
      gender: 'all',
      ageRange: [18, 65],
      interests: [],
      behaviors: [],
      location: []
    },
    geographic: {
      radius: 10,
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
    momentScore: 0.5
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
    const value = e.target.value;
    setTargeting(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.checked;
    setTargeting(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenderChange = (gender: keyof GenderTargeting) => {
    setTargeting(prev => ({
      ...prev,
      gender: {
        ...prev.gender,
        [gender]: !prev.gender[gender]
      }
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Targeting Segmentation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="ageRanges">Age Ranges</Label>
            <Input
              type="text"
              id="ageRanges"
              value={targeting.ageRanges.join(', ')}
              onChange={(e) => handleInputChange(e, 'ageRanges')}
            />
          </div>
          <div>
            <Label htmlFor="locations">Locations</Label>
            <Input
              type="text"
              id="locations"
              value={targeting.locations.join(', ')}
              onChange={(e) => handleInputChange(e, 'locations')}
            />
          </div>
        </div>

        <div>
          <Label>Gender</Label>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="genderAll"
              checked={targeting.gender.all}
              onCheckedChange={() => handleGenderChange('all')}
            />
            <Label htmlFor="genderAll">All</Label>

            <Checkbox
              id="genderMale"
              checked={targeting.gender.male}
              onCheckedChange={() => handleGenderChange('male')}
            />
            <Label htmlFor="genderMale">Male</Label>

            <Checkbox
              id="genderFemale"
              checked={targeting.gender.female}
              onCheckedChange={() => handleGenderChange('female')}
            />
            <Label htmlFor="genderFemale">Female</Label>

            <Checkbox
              id="genderOther"
              checked={targeting.gender.other}
              onCheckedChange={() => handleGenderChange('other')}
            />
            <Label htmlFor="genderOther">Other</Label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="minAge">Min Age</Label>
            <Input
              type="number"
              id="minAge"
              value={String(targeting.ageRange.min)}
              onChange={(e) => handleInputChange(e, 'ageRange.min')}
            />
          </div>
          <div>
            <Label htmlFor="maxAge">Max Age</Label>
            <Input
              type="number"
              id="maxAge"
              value={String(targeting.ageRange.max)}
              onChange={(e) => handleInputChange(e, 'ageRange.max')}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            type="text"
            id="location"
            value={targeting.location}
            onChange={(e) => handleInputChange(e, 'location')}
          />
        </div>

        {/* Example of using Select for frequency */}
        <div>
          <Label htmlFor="frequency">Frequency</Label>
          <Select onValueChange={(value) => setTargeting(prev => ({ ...prev, behaviors: { ...prev.behaviors, frequency: value } }))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={targeting.behaviors.frequency || "Select frequency"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button>Update Targeting</Button>
      </CardContent>
    </Card>
  );
};

export default TargetingSegmentation;
