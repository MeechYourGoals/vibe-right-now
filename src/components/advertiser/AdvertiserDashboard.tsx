// src/components/advertiser/AdvertiserDashboard.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdvertiserDashboard: React.FC = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Key metrics (Impressions, Clicks, Conversions, Spend) will be displayed here.</p>
          <p>Budget management tools will be available here.</p>
          <p>Campaign alerts will be shown here.</p>
        </CardContent>
      </Card>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>AI-Generated Content Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Images Created (Imagen 3): X</p>
          <p>Videos Generated (Veo): Y</p>
          <p>Improved CTR from AI Content: Z%</p>
          <p>Time Saved with AI Content Generation: T hours</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvertiserDashboard;
