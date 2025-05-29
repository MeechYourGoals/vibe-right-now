// src/components/advertiser/TargetingSegmentation.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const TargetingSegmentation: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Audience Targeting & Segmentation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="demographics">Demographics</Label>
          <Input id="demographics" placeholder="e.g., Age, Gender, Interests" />
        </div>
        <div>
          <Label htmlFor="vibes">Vibes</Label>
          <Input id="vibes" placeholder="e.g., #nightlife, #livemusic, #foodie" />
        </div>
        <div>
          <Label htmlFor="behavior">Behavior</Label>
          <Input id="behavior" placeholder="e.g., Past check-ins, Ad interactions" />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input id="location" placeholder="e.g., City, Neighborhood, Specific venue radius" />
        </div>
        <div>
          <Label htmlFor="timing">Timing</Label>
          <Input id="timing" placeholder="e.g., Day of week, Time of day" />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="retargeting" />
          <Label htmlFor="retargeting">Enable Retargeting</Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default TargetingSegmentation;
