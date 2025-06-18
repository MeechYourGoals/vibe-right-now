
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdFormat } from '@/types/features/advertising';

const AD_FORMATS: AdFormat[] = [
  {
    id: 'moment-card',
    name: 'Moment Card',
    description: 'Native card that appears in feed during high-vibe moments',
    type: 'MomentCard',
    platform: 'Vibe Right Now',
    dimensions: { width: 375, height: 200 },
    kpis: ['Engagement Rate', 'Click-through Rate', 'Moment Score Impact'],
    placement: 'Feed Integration',
    specifications: {
      maxTextLength: 120,
      imageRequired: true,
      aspectRatio: '16:9'
    },
    bestPractices: [
      'Match the current vibe of the venue',
      'Use high-quality, mood-appropriate imagery',
      'Keep copy concise and action-oriented'
    ]
  },
  {
    id: 'vibe-overlay',
    name: 'Vibe Overlay',
    description: 'Subtle overlay on venue photos when vibe score is high',
    type: 'VibeOverlay',
    platform: 'Vibe Right Now',
    dimensions: { width: 300, height: 100 },
    kpis: ['Vibe Score Correlation', 'Brand Recall', 'Venue Association'],
    placement: 'Photo Overlay',
    specifications: {
      opacity: 0.8,
      fadeAnimation: true,
      vibeThreshold: 7.5
    },
    bestPractices: [
      'Ensure overlay doesn\'t obstruct key photo elements',
      'Use brand colors that complement venue atmosphere',
      'Trigger only during peak vibe moments'
    ]
  }
];

export default function AdCreationStudio() {
  const [selectedFormat, setSelectedFormat] = useState<AdFormat | null>(null);
  const [adContent, setAdContent] = useState({
    headline: '',
    description: '',
    callToAction: '',
    targetUrl: ''
  });

  const renderDimensions = (dimensions: AdFormat['dimensions']) => {
    if (typeof dimensions === 'string') {
      return dimensions;
    }
    return `${dimensions.width}x${dimensions.height}px`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Ad Creation Studio</h2>
        <Button>Launch Campaign</Button>
      </div>

      <Tabs defaultValue="format" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="format">1. Format</TabsTrigger>
          <TabsTrigger value="content">2. Content</TabsTrigger>
          <TabsTrigger value="targeting">3. Targeting</TabsTrigger>
        </TabsList>

        <TabsContent value="format" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {AD_FORMATS.map((format) => (
              <Card 
                key={format.id} 
                className={`cursor-pointer transition-colors ${
                  selectedFormat?.id === format.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedFormat(format)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {format.name}
                    <Badge variant="secondary">{format.type}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {format.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div><strong>Platform:</strong> {format.platform}</div>
                    <div><strong>Dimensions:</strong> {renderDimensions(format.dimensions)}</div>
                    <div><strong>Placement:</strong> {format.placement}</div>
                  </div>
                  <div className="mt-3">
                    <div className="text-xs font-medium mb-1">Key KPIs:</div>
                    <div className="flex flex-wrap gap-1">
                      {format.kpis.map((kpi) => (
                        <Badge key={kpi} variant="outline" className="text-xs">
                          {kpi}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          {selectedFormat ? (
            <Card>
              <CardHeader>
                <CardTitle>Create Content for {selectedFormat.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="headline">Headline</Label>
                  <Input
                    id="headline"
                    placeholder="Enter compelling headline..."
                    value={adContent.headline}
                    onChange={(e) => setAdContent(prev => ({ ...prev, headline: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your offer..."
                    value={adContent.description}
                    onChange={(e) => setAdContent(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="cta">Call to Action</Label>
                  <Input
                    id="cta"
                    placeholder="e.g., Visit Now, Learn More..."
                    value={adContent.callToAction}
                    onChange={(e) => setAdContent(prev => ({ ...prev, callToAction: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="url">Target URL</Label>
                  <Input
                    id="url"
                    placeholder="https://..."
                    value={adContent.targetUrl}
                    onChange={(e) => setAdContent(prev => ({ ...prev, targetUrl: e.target.value }))}
                  />
                </div>

                {selectedFormat.bestPractices && (
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Best Practices for {selectedFormat.name}:</h4>
                    <ul className="text-sm space-y-1">
                      {selectedFormat.bestPractices.map((practice, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          {practice}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  Please select an ad format first to create content.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="targeting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Targeting</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Targeting options will appear here based on selected format.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
