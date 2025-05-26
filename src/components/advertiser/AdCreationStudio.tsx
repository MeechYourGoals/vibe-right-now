
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Image, Video, Sparkles, Zap, Play, Download, Eye } from "lucide-react";

const AdCreationStudio = () => {
  const [selectedFormat, setSelectedFormat] = useState("momentcard");
  const [aiTab, setAiTab] = useState("imagen");

  const adFormats = [
    { id: "momentcard", name: "MomentCard", description: "Interactive cards in user feeds" },
    { id: "vibeoverlay", name: "VibeOverlay", description: "Immersive location-based overlays" },
    { id: "spawnpoint", name: "Spawn Point", description: "Discovery points on the map" },
    { id: "heatring", name: "Heat-Ring Takeover", description: "Full venue experience takeover" },
  ];

  return (
    <div className="space-y-6">
      {/* Ad Format Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Choose Ad Format</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {adFormats.map((format) => (
              <Card 
                key={format.id} 
                className={`cursor-pointer transition-all ${selectedFormat === format.id ? 'ring-2 ring-purple-500' : ''}`}
                onClick={() => setSelectedFormat(format.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className="font-medium">{format.name}</div>
                  <div className="text-sm text-muted-foreground mt-1">{format.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Google AI Creation Tools */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
              Google AI Creation Tools
              <Badge variant="outline" className="ml-2 bg-purple-100 text-purple-600 border-purple-300">
                Latest AI Models
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={aiTab} onValueChange={setAiTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="imagen" className="flex items-center">
                  <Image className="h-4 w-4 mr-2" />
                  Imagen 3
                </TabsTrigger>
                <TabsTrigger value="veo" className="flex items-center">
                  <Video className="h-4 w-4 mr-2" />
                  Veo
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="imagen" className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Image Prompt</label>
                  <Textarea 
                    placeholder="Describe the image you want to create for your ad..."
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Style</label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Choose style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="photorealistic">Photorealistic</SelectItem>
                      <SelectItem value="artistic">Artistic</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="vibrant">Vibrant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Zap className="mr-2 h-4 w-4" />
                  Generate with Imagen 3
                </Button>
              </TabsContent>
              
              <TabsContent value="veo" className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Video Prompt</label>
                  <Textarea 
                    placeholder="Describe the video you want to create for your ad..."
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Duration</label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5s">5 seconds</SelectItem>
                      <SelectItem value="15s">15 seconds</SelectItem>
                      <SelectItem value="30s">30 seconds</SelectItem>
                      <SelectItem value="60s">60 seconds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Play className="mr-2 h-4 w-4" />
                  Generate with Veo
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Manual Creation Tools */}
        <Card>
          <CardHeader>
            <CardTitle>Manual Creation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Campaign Name</label>
              <Input placeholder="Enter campaign name" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Headline</label>
              <Input placeholder="Catchy headline for your ad" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea placeholder="Describe your venue or event" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Call to Action</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose CTA" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visit">Visit Now</SelectItem>
                  <SelectItem value="book">Book Table</SelectItem>
                  <SelectItem value="learn">Learn More</SelectItem>
                  <SelectItem value="call">Call Now</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button variant="outline" className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Enhancement Features */}
      <Card>
        <CardHeader>
          <CardTitle>AI Enhancement Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <Sparkles className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <h4 className="font-medium">Brand Consistency</h4>
              <p className="text-sm text-muted-foreground">AI ensures all generated content matches your brand guidelines</p>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <Zap className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <h4 className="font-medium">Content Safety</h4>
              <p className="text-sm text-muted-foreground">Built-in safety filters ensure appropriate content generation</p>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <Eye className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <h4 className="font-medium">Performance Optimization</h4>
              <p className="text-sm text-muted-foreground">AI optimizes content for maximum engagement and conversion</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdCreationStudio;
