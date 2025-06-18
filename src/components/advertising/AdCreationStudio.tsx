
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Play, Image, Zap, MapPin, Palette, Eye, Download, Share } from "lucide-react";
import { AdFormat } from "@/types";

const adFormats: AdFormat[] = [
  {
    id: "moment-card",
    name: "MomentCard",
    description: "6-second vertical video auto-play",
    type: "MomentCard",
    duration: "6s",
    placement: "2nd swipe in feed after organic",
    kpis: ["Recall", "CPC"],
    platform: "VRN Feed",
    dimensions: "9:16 vertical",
    specifications: { duration: 6, autoplay: true },
    bestPractices: ["Keep message clear", "Strong opening frame"]
  },
  {
    id: "vibe-overlay",
    name: "VibeOverlay",
    description: "Semi-transparent brand filter over user clips",
    type: "VibeOverlay",
    placement: "AR mask over user content",
    kpis: ["Engagement", "Shares"],
    platform: "VRN Camera",
    dimensions: "Full screen overlay",
    specifications: { opacity: 0.3, blendMode: "multiply" },
    bestPractices: ["Subtle branding", "Enhance don't distract"]
  },
  {
    id: "spawn-point",
    name: "Spawn Point",
    description: "Sponsored push when vibe matches brand",
    type: "SpawnPoint",
    placement: "Vernon chat notifications",
    kpis: ["ROAS", "In-store sales"],
    platform: "Vernon AI",
    dimensions: "Text + small image",
    specifications: { triggers: ["vibe_match", "location_proximity"] },
    bestPractices: ["Contextual relevance", "Clear call-to-action"]
  },
  {
    id: "heat-ring",
    name: "Heat Ring Takeover",
    description: "Venue heat ring glows brand color",
    type: "HeatRingTakeover",
    placement: "Map overlay visualization",
    kpis: ["Foot traffic lift"],
    platform: "VRN Map",
    dimensions: "Circular overlay",
    specifications: { duration: "persistent", customColor: true },
    bestPractices: ["Brand color consistency", "Subtle animation"]
  }
];

const AdCreationStudio = () => {
  const [selectedFormat, setSelectedFormat] = useState<AdFormat>(adFormats[0]);
  const [campaignName, setCampaignName] = useState("");
  const [adContent, setAdContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Ad Format Selection */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Choose Ad Format
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {adFormats.map((format) => (
              <div
                key={format.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedFormat.id === format.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => setSelectedFormat(format)}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                    {format.type === "MomentCard" && <Play className="h-4 w-4" />}
                    {format.type === "VibeOverlay" && <Image className="h-4 w-4" />}
                    {format.type === "SpawnPoint" && <Zap className="h-4 w-4" />}
                    {format.type === "HeatRingTakeover" && <MapPin className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{format.name}</h3>
                      {format.duration && (
                        <Badge variant="outline" className="text-xs">
                          {format.duration}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {format.description}
                    </p>
                    <p className="text-xs text-muted-foreground mb-2">
                      Platform: {format.platform} • {format.dimensions}
                    </p>
                    <div className="flex gap-1">
                      {format.kpis.map((kpi) => (
                        <Badge key={kpi} variant="secondary" className="text-xs">
                          {kpi}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Campaign Details */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Campaign Name</label>
              <Input
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="Enter campaign name"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Ad Content</label>
              <Textarea
                value={adContent}
                onChange={(e) => setAdContent(e.target.value)}
                placeholder="Enter your ad copy or description"
                rows={4}
              />
            </div>
            <div className="flex gap-2">
              <Button className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                Generate with Imagen 3
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Create with Veo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Preview */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Live Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-[9/16] bg-gradient-to-b from-purple-900/20 to-pink-900/20 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
              <div className="text-center p-6">
                <div className="p-4 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  {selectedFormat.type === "MomentCard" && <Play className="h-8 w-8" />}
                  {selectedFormat.type === "VibeOverlay" && <Image className="h-8 w-8" />}
                  {selectedFormat.type === "SpawnPoint" && <Zap className="h-8 w-8" />}
                  {selectedFormat.type === "HeatRingTakeover" && <MapPin className="h-8 w-8" />}
                </div>
                <h3 className="font-semibold mb-2">{selectedFormat.name} Preview</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {selectedFormat.description}
                </p>
                <Button onClick={() => setShowPreview(true)} size="sm">
                  Generate Preview
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Export Options */}
        <Card>
          <CardHeader>
            <CardTitle>Export & Share</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Share className="h-4 w-4" />
                Share
              </Button>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Available Formats:</h4>
              <div className="grid grid-cols-3 gap-2">
                <Badge variant="outline">MP4</Badge>
                <Badge variant="outline">GIF</Badge>
                <Badge variant="outline">PNG</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdCreationStudio;
