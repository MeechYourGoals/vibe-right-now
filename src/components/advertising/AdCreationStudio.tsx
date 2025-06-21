
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Simplified ad formats without specifications for now
const adFormats = [
  {
    id: 'moment-card',
    name: 'Moment Card',
    description: 'Native ad that appears in user feeds',
    type: 'MomentCard' as const,
    placement: 'Feed',
    kpis: ['Engagement Rate', 'Click-through Rate'],
    platform: 'Mobile & Web',
    dimensions: '16:9 aspect ratio',
    bestPractices: [
      'Use high-quality, authentic images',
      'Keep text overlay minimal',
      'Include clear call-to-action'
    ]
  },
  {
    id: 'vibe-overlay',
    name: 'Vibe Overlay',
    description: 'Contextual overlay on location content',
    type: 'VibeOverlay' as const,
    placement: 'Location Detail',
    kpis: ['View Rate', 'Interaction Rate'],
    platform: 'Mobile & Web',
    dimensions: 'Flexible overlay',
    bestPractices: [
      'Match the vibe of the location',
      'Use subtle animations',
      'Provide value to users'
    ]
  },
  {
    id: 'spawn-point',
    name: 'Spawn Point',
    description: 'Location-based ad trigger',
    type: 'SpawnPoint' as const,
    placement: 'Map View',
    kpis: ['Discovery Rate', 'Visit Rate'],
    platform: 'Mobile',
    dimensions: 'Pin icon + details',
    bestPractices: [
      'Place near relevant venues',
      'Use location-specific messaging',
      'Offer immediate value'
    ]
  },
  {
    id: 'heat-ring',
    name: 'Heat Ring Takeover',
    description: 'Area-based promotional display',
    type: 'HeatRingTakeover' as const,
    placement: 'Map Overlay',
    kpis: ['Area Coverage', 'Engagement'],
    platform: 'Mobile & Web',
    dimensions: 'Circular overlay',
    bestPractices: [
      'Define clear boundaries',
      'Use brand colors effectively',
      'Time activations strategically'
    ]
  }
];

const AdCreationStudio: React.FC = () => {
  const [selectedFormat, setSelectedFormat] = useState(adFormats[0]);
  const [campaignName, setCampaignName] = useState('');
  const [adContent, setAdContent] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [budget, setBudget] = useState('');

  const handleCreateCampaign = () => {
    console.log('Creating campaign:', {
      format: selectedFormat,
      name: campaignName,
      content: adContent,
      audience: targetAudience,
      budget
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Ad Creation Studio</h1>
        <Button onClick={handleCreateCampaign} className="bg-purple-600 hover:bg-purple-700">
          Create Campaign
        </Button>
      </div>

      <Tabs defaultValue="format" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="format">Format</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="targeting">Targeting</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
        </TabsList>

        <TabsContent value="format" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {adFormats.map((format) => (
              <Card 
                key={format.id}
                className={`cursor-pointer transition-all ${
                  selectedFormat.id === format.id 
                    ? 'ring-2 ring-purple-500 bg-purple-50' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedFormat(format)}
              >
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    {format.name}
                    <Badge variant="outline">{format.type}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{format.description}</p>
                  <div className="space-y-2 text-sm">
                    <div><strong>Placement:</strong> {format.placement}</div>
                    <div><strong>Platform:</strong> {format.platform}</div>
                    <div><strong>Dimensions:</strong> {format.dimensions}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Campaign Name</label>
                <Input
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="Enter campaign name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Ad Content</label>
                <Textarea
                  value={adContent}
                  onChange={(e) => setAdContent(e.target.value)}
                  placeholder="Enter your ad content..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="targeting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Target Audience</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={targetAudience} onValueChange={setTargetAudience}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="young-adults">Young Adults (18-30)</SelectItem>
                  <SelectItem value="professionals">Professionals (25-45)</SelectItem>
                  <SelectItem value="locals">Local Residents</SelectItem>
                  <SelectItem value="tourists">Tourists & Visitors</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <label className="block text-sm font-medium mb-2">Daily Budget ($)</label>
                <Input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Enter daily budget"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdCreationStudio;
