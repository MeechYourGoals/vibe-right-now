
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Video, Sparkles, Clock, Palette, Zap, Shield, TrendingUp } from "lucide-react";

const GoogleAIIntegration = () => {
  const [imagePrompt, setImagePrompt] = useState("");
  const [videoPrompt, setVideoPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateImage = async () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  const handleGenerateVideo = async () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
    }, 5000);
  };

  return (
    <div className="space-y-6">
      {/* Google AI Features Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="p-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Image className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="font-semibold mb-2">Imagen 3</h3>
            <p className="text-sm text-muted-foreground">High-quality image generation with brand consistency</p>
            <Badge className="mt-2 bg-green-500/20 text-green-400">Active</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="p-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Video className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="font-semibold mb-2">Veo</h3>
            <p className="text-sm text-muted-foreground">Cinematic video generation for premium campaigns</p>
            <Badge className="mt-2 bg-green-500/20 text-green-400">Active</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="p-3 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="font-semibold mb-2">AI Optimization</h3>
            <p className="text-sm text-muted-foreground">Real-time performance optimization and insights</p>
            <Badge className="mt-2 bg-green-500/20 text-green-400">Active</Badge>
          </CardContent>
        </Card>
      </div>

      {/* AI Generation Tabs */}
      <Tabs defaultValue="imagen" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="imagen">Imagen 3 Studio</TabsTrigger>
          <TabsTrigger value="veo">Veo Video Creator</TabsTrigger>
          <TabsTrigger value="optimization">AI Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="imagen" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  Imagen 3 Image Generation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Prompt</label>
                  <Textarea
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    placeholder="Describe the image you want to generate for your ad campaign..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Style</label>
                    <div className="flex flex-wrap gap-2">
                      {["Photorealistic", "Artistic", "Minimal", "Vibrant"].map((style) => (
                        <Badge key={style} variant="outline" className="cursor-pointer">
                          {style}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Aspect Ratio</label>
                    <div className="flex flex-wrap gap-2">
                      {["1:1", "16:9", "9:16", "4:3"].map((ratio) => (
                        <Badge key={ratio} variant="outline" className="cursor-pointer">
                          {ratio}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleGenerateImage} 
                  disabled={isGenerating || !imagePrompt}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate with Imagen 3
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Generated Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                      <div className="text-center">
                        <Image className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Generated Image {i}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Brand Consistency Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Brand Consistency & Safety
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <Palette className="h-6 w-6 text-blue-500 mb-2" />
                  <h4 className="font-medium mb-1">Brand Colors</h4>
                  <p className="text-sm text-muted-foreground">Automatically applies your brand palette to generated content</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <Shield className="h-6 w-6 text-green-500 mb-2" />
                  <h4 className="font-medium mb-1">Content Safety</h4>
                  <p className="text-sm text-muted-foreground">AI-powered safety filters ensure brand-appropriate content</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <Zap className="h-6 w-6 text-purple-500 mb-2" />
                  <h4 className="font-medium mb-1">Real-time Generation</h4>
                  <p className="text-sm text-muted-foreground">Generate variations in seconds for A/B testing</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="veo" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Veo Video Generation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Video Prompt</label>
                  <Textarea
                    value={videoPrompt}
                    onChange={(e) => setVideoPrompt(e.target.value)}
                    placeholder="Describe the video content you want to create..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Duration</label>
                    <div className="flex flex-wrap gap-2">
                      {["6s", "15s", "30s", "60s"].map((duration) => (
                        <Badge key={duration} variant="outline" className="cursor-pointer">
                          {duration}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Quality</label>
                    <div className="flex flex-wrap gap-2">
                      {["Standard", "High", "Ultra"].map((quality) => (
                        <Badge key={quality} variant="outline" className="cursor-pointer">
                          {quality}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleGenerateVideo} 
                  disabled={isGenerating || !videoPrompt}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Generating Video...
                    </>
                  ) : (
                    <>
                      <Video className="h-4 w-4 mr-2" />
                      Generate with Veo
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Generated Videos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                      <div className="text-center">
                        <Video className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Generated Video {i}</p>
                        <Badge variant="outline" className="mt-2">Processing</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimization">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">CTR Improvement</span>
                      <Badge className="bg-green-500/20 text-green-400">+23%</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">AI-generated content outperforming baseline by 23%</p>
                  </div>

                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Time Saved</span>
                      <Badge className="bg-blue-500/20 text-blue-400">85%</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Reduced creative production time from days to minutes</p>
                  </div>

                  <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Cost Efficiency</span>
                      <Badge className="bg-purple-500/20 text-purple-400">$0.12/CPC</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Average cost per click reduced by 40%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">Creative Optimization</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Generate 3 new MomentCard variants with higher engagement potential
                    </p>
                    <Button size="sm" variant="outline">Apply Suggestion</Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Audience Expansion</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Lookalike audience shows 34% higher conversion rate
                    </p>
                    <Button size="sm" variant="outline">Expand Targeting</Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">Timing Optimization</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Shift 30% budget to 7-9 PM for better performance
                    </p>
                    <Button size="sm" variant="outline">Optimize Schedule</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GoogleAIIntegration;
