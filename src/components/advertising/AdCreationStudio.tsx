import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdFormat } from "@/types";

const AdCreationStudio = () => {
  const [selectedFormat, setSelectedFormat] = useState<AdFormat | null>(null);

  const adFormats: AdFormat[] = [
    {
      id: "1",
      name: "Venue Moment Overlay",
      description: "Overlay ads that appear during high-vibe moments at venues",
      type: "overlay",
      placement: "moment-capture",
      platform: "VRN",
      dimensions: "320x180",
      specifications: { maxDuration: 15 },
      bestPractices: ["Keep text minimal", "High contrast colors"],
      kpis: ["engagement_rate", "click_through"],
      duration: 15
    },
    {
      id: "2", 
      name: "Feed Native",
      description: "Native ads that blend seamlessly with venue posts",
      type: "native",
      placement: "feed",
      platform: "VRN",
      dimensions: "340x400",
      specifications: { imageFormat: "jpg,png" },
      bestPractices: ["Match feed aesthetic", "Clear CTA"],
      kpis: ["impressions", "engagement"]
    },
    {
      id: "3",
      name: "Map Pin Sponsored",
      description: "Sponsored venue pins on the interactive map",
      type: "sponsored",
      placement: "map",
      platform: "VRN", 
      dimensions: "24x24",
      specifications: { iconFormat: "svg" },
      bestPractices: ["Distinctive but tasteful", "Clear branding"],
      kpis: ["map_clicks", "venue_visits"]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Ad Creation Studio</h2>
          <p className="text-muted-foreground">Create and manage your venue advertising campaigns</p>
        </div>
        <Button>Save Draft</Button>
      </div>
      
      <Tabs defaultValue="format">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="format">Format</TabsTrigger>
          <TabsTrigger value="creative">Creative</TabsTrigger>
          <TabsTrigger value="targeting">Targeting</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
        </TabsList>
        
        <TabsContent value="format" className="space-y-4 mt-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Select Ad Format</h3>
            <p className="text-muted-foreground mb-4">
              Choose the format that best fits your campaign objectives
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {adFormats.map((format) => (
              <Card 
                key={format.id}
                className={`cursor-pointer transition-all ${
                  selectedFormat?.id === format.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedFormat(format)}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{format.name}</CardTitle>
                  <Badge variant="outline">{format.type}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {format.description}
                  </p>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="font-medium">Placement:</span> {format.placement}
                    </div>
                    <div>
                      <span className="font-medium">Dimensions:</span> {format.dimensions}
                    </div>
                    <div>
                      <span className="font-medium">KPIs:</span> {format.kpis.join(', ')}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedFormat && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Format Details: {selectedFormat.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Specifications</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Dimensions: {selectedFormat.dimensions}</li>
                      <li>Platform: {selectedFormat.platform}</li>
                      {selectedFormat.duration && <li>Duration: {selectedFormat.duration} seconds</li>}
                      {Object.entries(selectedFormat.specifications).map(([key, value]) => (
                        <li key={key}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: {value}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Best Practices</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {selectedFormat.bestPractices.map((practice, index) => (
                        <li key={index}>{practice}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end">
            <Button disabled={!selectedFormat}>Continue to Creative</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="creative" className="space-y-4 mt-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Design Your Creative</h3>
            <p className="text-muted-foreground mb-4">
              Upload assets and customize your ad creative
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ad Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Headline</label>
                  <Input placeholder="Enter a catchy headline" />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea placeholder="Describe your venue or promotion" />
                </div>
                <div>
                  <label className="text-sm font-medium">Call to Action</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select CTA" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="book">Book Now</SelectItem>
                      <SelectItem value="visit">Visit Venue</SelectItem>
                      <SelectItem value="learn">Learn More</SelectItem>
                      <SelectItem value="rsvp">RSVP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Media Upload</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <div className="text-muted-foreground mb-2">
                    Drag and drop or click to upload
                  </div>
                  <Button variant="outline">Upload Media</Button>
                </div>
                <div>
                  <label className="text-sm font-medium">Media Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select media type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="carousel">Carousel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between">
            <Button variant="outline">Back to Format</Button>
            <Button>Continue to Targeting</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="targeting" className="mt-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Define Your Audience</h3>
            <p className="text-muted-foreground mb-4">
              Set targeting parameters to reach your ideal customers
            </p>
          </div>
          
          {/* Targeting content would go here */}
          <div className="flex justify-between mt-6">
            <Button variant="outline">Back to Creative</Button>
            <Button>Continue to Budget</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="budget" className="mt-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Set Campaign Budget</h3>
            <p className="text-muted-foreground mb-4">
              Define your spending limits and campaign duration
            </p>
          </div>
          
          {/* Budget content would go here */}
          <div className="flex justify-between mt-6">
            <Button variant="outline">Back to Targeting</Button>
            <Button>Launch Campaign</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdCreationStudio;
