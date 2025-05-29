// src/components/advertiser/AdCreationStudio.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AdCreationStudio: React.FC = () => {
  return (
    <Tabs defaultValue="manual" className="w-full">
      <TabsList>
        <TabsTrigger value="manual">Manual Creation</TabsTrigger>
        <TabsTrigger value="googleAi">Google AI Studio</TabsTrigger>
      </TabsList>

      <TabsContent value="manual">
        <Card>
          <CardHeader>
            <CardTitle>Ad Format Selection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline">Create MomentCard Ad</Button>
              <Button variant="outline">Create VibeOverlay Ad</Button>
              <Button variant="outline">Create Spawn Point Ad</Button>
              <Button variant="outline">Create Heat-Ring Takeover Ad</Button>
            </div>
          </CardContent>
        </Card>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Ad Creation Tools & Live Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Interface for customizing ad creatives will be here.</p>
            <p>Live preview of the ad will be displayed here.</p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="googleAi">
        <Card>
          <CardHeader>
            <CardTitle>Google AI Powered Ad Generation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Imagen 3 Integration */}
            <div className="p-4 border rounded-md">
              <h3 className="text-lg font-semibold mb-2">Generate Images with Imagen 3</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="imagePrompt">Image Prompt</Label>
                  <Input id="imagePrompt" placeholder="e.g., A futuristic cityscape at sunset" />
                </div>
                <div>
                  <Label htmlFor="imageStyle">Style</Label>
                  <Select>
                    <SelectTrigger id="imageStyle">
                      <SelectValue placeholder="Select image style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="photorealistic">Photorealistic</SelectItem>
                      <SelectItem value="artistic">Artistic</SelectItem>
                      <SelectItem value="abstract">Abstract</SelectItem>
                      <SelectItem value="product">Product Shot</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>Generate Image</Button>
                <div className="mt-2 border aspect-video bg-muted flex items-center justify-center">
                  <p>Generated image will appear here</p>
                </div>
              </div>
            </div>

            {/* Veo Integration */}
            <div className="p-4 border rounded-md">
              <h3 className="text-lg font-semibold mb-2">Create Videos with Veo</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="videoPrompt">Video Prompt</Label>
                  <Input id="videoPrompt" placeholder="e.g., A time-lapse of a flower blooming" />
                </div>
                <div>
                  <Label htmlFor="videoLength">Video Length</Label>
                  <Select>
                    <SelectTrigger id="videoLength">
                      <SelectValue placeholder="Select video length" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short (up to 15s)</SelectItem>
                      <SelectItem value="medium">Medium (15s - 30s)</SelectItem>
                      <SelectItem value="long">Long (30s - 60s)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>Generate Video</Button>
                <div className="mt-2 border aspect-video bg-muted flex items-center justify-center">
                  <p>Generated video will appear here</p>
                </div>
              </div>
            </div>

            {/* AI Enhancement Features */}
            <div className="p-4 border rounded-md">
              <h3 className="text-lg font-semibold mb-2">AI Enhancement Features</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Brand Consistency Check: Ensure generated content aligns with your brand identity.</li>
                <li>Content Safety Filters: Automatically filter for inappropriate or harmful content.</li>
                <li>Performance Prediction: Get an estimate of how your AI-generated ad might perform.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AdCreationStudio;
