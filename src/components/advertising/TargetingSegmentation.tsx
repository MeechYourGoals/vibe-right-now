
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';

// Simplified targeting options without locations for now
const initialTargeting = {
  ageRanges: ['18-24', '25-34'],
  interests: ['dining', 'nightlife'],
  gender: {
    all: true,
    male: true,
    female: true,
    other: true
  }
};

const TargetingSegmentation: React.FC = () => {
  const [targeting, setTargeting] = useState(initialTargeting);
  const [selectedAge, setSelectedAge] = useState('18-34');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['dining']);
  const [radiusValue, setRadiusValue] = useState([5]);

  const interests = [
    'dining', 'nightlife', 'sports', 'music', 'art', 'shopping',
    'fitness', 'travel', 'technology', 'outdoor activities'
  ];

  const ageRanges = [
    '18-24', '25-34', '35-44', '45-54', '55-64', '65+'
  ];

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Targeting & Segmentation</h1>
        <Button className="bg-purple-600 hover:bg-purple-700">
          Save Targeting
        </Button>
      </div>

      <Tabs defaultValue="demographics" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="interests">Interests</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
        </TabsList>

        <TabsContent value="demographics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Age Range</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedAge} onValueChange={setSelectedAge}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ageRanges.map(range => (
                      <SelectItem key={range} value={range}>{range}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gender</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(targeting.gender).map(([key, value]) => (
                  <label key={key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setTargeting(prev => ({
                        ...prev,
                        gender: { ...prev.gender, [key]: e.target.checked }
                      }))}
                    />
                    <span className="capitalize">{key === 'all' ? 'All Genders' : key}</span>
                  </label>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="interests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Select Interests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {interests.map(interest => (
                  <Badge
                    key={interest}
                    variant={selectedInterests.includes(interest) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleInterestToggle(interest)}
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="location" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Targeting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Radius: {radiusValue[0]} miles
                </label>
                <Slider
                  value={radiusValue}
                  onValueChange={setRadiusValue}
                  max={50}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">City/Region</label>
                <Input placeholder="Enter city or region" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Behavioral Targeting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Visit Frequency</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily visitors</SelectItem>
                    <SelectItem value="weekly">Weekly visitors</SelectItem>
                    <SelectItem value="monthly">Monthly visitors</SelectItem>
                    <SelectItem value="occasional">Occasional visitors</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Spending Level</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select spending level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Budget-conscious</SelectItem>
                    <SelectItem value="medium">Moderate spenders</SelectItem>
                    <SelectItem value="high">High spenders</SelectItem>
                    <SelectItem value="luxury">Luxury seekers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TargetingSegmentation;
