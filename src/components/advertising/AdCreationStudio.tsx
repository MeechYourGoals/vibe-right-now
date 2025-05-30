
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Video, 
  Image as ImageIcon, 
  Sparkles, 
  Palette, 
  Clock, 
  Wand2,
  Play,
  Download,
  Share2,
  Eye
} from "lucide-react";

const AdCreationStudio = () => {
  const [selectedFormat, setSelectedFormat] = useState("momentcard");
  const [selectedAITool, setSelectedAITool] = useState("imagen");

  const adFormats = [
    {
      id: "momentcard",
      name: "MomentCard",
      description: "6-sec vertical video auto-play in feed",
      kpi: "Recall, CPC",
      placement: "2nd swipe in feed after organic"
    },
    {
      id: "vibeoverlay", 
      name: "VibeOverlay",
      description: "Semi-transparent brand filter over user clip",
      kpi: "Engagement, shares",
      placement: "AR mask (e.g., neon border)"
    },
    {
      id: "spawnpoint",
      name: "Spawn Point", 
      description: "Sponsored push when vibe matches brand",
      kpi: "ROAS, in-store sales",
      placement: "Text/image card in Vernon"
    },
    {
      id: "heatring",
      name: "Heat Ring Takeover",
      description: "Venue heat ring glows brand color", 
      kpi: "Foot traffic lift",
      placement: "SVG overlay"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Ad Creation Studio</h2>
          <p className="text-muted-foreground">Create engaging ads with Google AI-powered tools</p>
        </div>
        <Badge variant="outline" className="bg-gradient-to-r from-blue-50 to-green-50 text-blue-700 border-blue-200">
          <Sparkles className="h-3 w-3 mr-1" />
          AI Enhanced
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ad Format Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">1. Choose Ad Format</CardTitle>
            <CardDescription>Select the ad unit type for your campaign</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {adFormats.map((format) => (
              <div 
                key={format.id}
                className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedFormat === format.id 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedFormat(format.id)}
              >
                <div className="font-medium">{format.name}</div>
                <div className="text-sm text-muted-foreground mb-2">{format.description}</div>
                <div className="flex justify-between text-xs">
                  <span className="text-blue-600">KPI: {format.kpi}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Content Creation */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">2. Create Content</CardTitle>
            <CardDescription>Use Google AI to generate images and videos</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedAITool} onValueChange={setSelectedAITool} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="imagen" className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Imagen 3
                </TabsTrigger>
                <TabsTrigger value="veo" className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Veo
                </TabsTrigger>
              </TabsList>

              <TabsContent value="imagen" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image-prompt">Image Generation Prompt</Label>
                  <Textarea 
                    id="image-prompt"
                    placeholder="A vibrant restaurant scene with friends laughing over dinner..."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image-style">Style</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="photographic">Photographic</SelectItem>
                      <SelectItem value="artistic">Artistic</SelectItem>
                      <SelectItem value="cartoon">Cartoon</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate with Imagen 3
                </Button>
              </TabsContent>

              <TabsContent value="veo" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="video-prompt">Video Generation Prompt</Label>
                  <Textarea 
                    id="video-prompt"
                    placeholder="A 6-second promotional video showcasing the energy of a bustling nightclub..."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="video-length">Duration</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 seconds</SelectItem>
                        <SelectItem value="15">15 seconds</SelectItem>
                        <SelectItem value="30">30 seconds</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="video-ratio">Aspect Ratio</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ratio" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9:16">9:16 (Vertical)</SelectItem>
                        <SelectItem value="16:9">16:9 (Horizontal)</SelectItem>
                        <SelectItem value="1:1">1:1 (Square)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Play className="h-4 w-4 mr-2" />
                  Generate with Veo
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Preview & Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">3. Preview & Customize</CardTitle>
            <CardDescription>Fine-tune your ad before publishing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Eye className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Preview will appear here</p>
                <p className="text-sm">Generate content to see preview</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="ad-title">Ad Title</Label>
                <Input id="ad-title" placeholder="Enter ad title..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cta-text">Call-to-Action</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select CTA" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visit">Visit Now</SelectItem>
                    <SelectItem value="book">Book Table</SelectItem>
                    <SelectItem value="order">Order Online</SelectItem>
                    <SelectItem value="learn">Learn More</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>

            <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
              Launch Campaign
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* AI Enhancement Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-blue-600" />
            AI Enhancement Features
          </CardTitle>
          <CardDescription>
            Advanced AI capabilities powered by Google's latest models
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg bg-blue-50/50 dark:bg-blue-950/20">
              <div className="flex items-center gap-2 mb-2">
                <Palette className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-sm">Brand Consistency</span>
              </div>
              <p className="text-xs text-muted-foreground">
                AI ensures all generated content matches your brand guidelines
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-green-50/50 dark:bg-green-950/20">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-green-600" />
                <span className="font-medium text-sm">Real-time Generation</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Generate high-quality content in seconds, not hours
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-purple-50/50 dark:bg-purple-950/20">
              <div className="flex items-center gap-2 mb-2">
                <Wand2 className="h-4 w-4 text-purple-600" />
                <span className="font-medium text-sm">Content Safety</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Built-in safety filters ensure appropriate content generation
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-amber-50/50 dark:bg-amber-950/20">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-amber-600" />
                <span className="font-medium text-sm">Smart Optimization</span>
              </div>
              <p className="text-xs text-muted-foreground">
                AI optimizes content for maximum engagement and conversion
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdCreationStudio;
