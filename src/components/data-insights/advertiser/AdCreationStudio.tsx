
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Layout, MapPin, Smartphone, Upload, Eye, Play, Palette, Image } from "lucide-react";

interface AdCreationStudioProps {
  subscriptionTier: 'standard' | 'plus' | 'premium' | 'pro';
}

const AdCreationStudio: React.FC<AdCreationStudioProps> = ({ subscriptionTier }) => {
  const [selectedFormat, setSelectedFormat] = useState('momentcard');
  const [adTitle, setAdTitle] = useState('');
  const [adDescription, setAdDescription] = useState('');

  return (
    <div className="space-y-6">
      {/* Ad Format Selection */}
      <Card className="bg-neutral-800/80 border-neutral-600">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Layout className="mr-2 h-5 w-5" />
            Choose Ad Format
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div 
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedFormat === 'momentcard' 
                  ? 'border-purple-500 bg-purple-950/40' 
                  : 'border-neutral-600 bg-neutral-800/40 hover:border-purple-400'
              }`}
              onClick={() => setSelectedFormat('momentcard')}
            >
              <Smartphone className="h-8 w-8 text-purple-400 mb-2" />
              <h4 className="font-bold text-white mb-1">MomentCard</h4>
              <p className="text-xs text-neutral-400 mb-2">Story-style vertical ads in feed</p>
              <Badge variant="outline" className="bg-purple-900/20 text-purple-400 border-purple-600 text-xs">
                High Engagement
              </Badge>
            </div>

            <div 
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedFormat === 'vibeoverlay' 
                  ? 'border-blue-500 bg-blue-950/40' 
                  : 'border-neutral-600 bg-neutral-800/40 hover:border-blue-400'
              }`}
              onClick={() => setSelectedFormat('vibeoverlay')}
            >
              <Eye className="h-8 w-8 text-blue-400 mb-2" />
              <h4 className="font-bold text-white mb-1">VibeOverlay</h4>
              <p className="text-xs text-neutral-400 mb-2">AR overlay at specific venues</p>
              <Badge variant="outline" className="bg-blue-900/20 text-blue-400 border-blue-600 text-xs">
                AR Experience
              </Badge>
            </div>

            <div 
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedFormat === 'spawnpoint' 
                  ? 'border-green-500 bg-green-950/40' 
                  : 'border-neutral-600 bg-neutral-800/40 hover:border-green-400'
              }`}
              onClick={() => setSelectedFormat('spawnpoint')}
            >
              <MapPin className="h-8 w-8 text-green-400 mb-2" />
              <h4 className="font-bold text-white mb-1">Spawn Point</h4>
              <p className="text-xs text-neutral-400 mb-2">Virtual ads at coordinates</p>
              <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-600 text-xs">
                Geo-Targeted
              </Badge>
            </div>

            <div 
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedFormat === 'heatring' 
                  ? 'border-amber-500 bg-amber-950/40' 
                  : 'border-neutral-600 bg-neutral-800/40 hover:border-amber-400'
              }`}
              onClick={() => setSelectedFormat('heatring')}
            >
              <Zap className="h-8 w-8 text-amber-400 mb-2" />
              <h4 className="font-bold text-white mb-1">Heat-Ring Takeover</h4>
              <p className="text-xs text-neutral-400 mb-2">Full-screen immersive ads</p>
              <Badge variant="outline" className="bg-amber-900/20 text-amber-400 border-amber-600 text-xs">
                Premium Impact
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ad Creation Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Creation Panel */}
        <Card className="bg-neutral-800/80 border-neutral-600">
          <CardHeader>
            <CardTitle className="text-white">Create Your Ad</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="ad-title" className="text-white">Ad Title</Label>
              <Input
                id="ad-title"
                value={adTitle}
                onChange={(e) => setAdTitle(e.target.value)}
                placeholder="Enter compelling ad title..."
                className="bg-neutral-700 border-neutral-600 text-white"
              />
            </div>

            <div>
              <Label htmlFor="ad-description" className="text-white">Description</Label>
              <Textarea
                id="ad-description"
                value={adDescription}
                onChange={(e) => setAdDescription(e.target.value)}
                placeholder="Describe your offer or message..."
                className="bg-neutral-700 border-neutral-600 text-white"
                rows={3}
              />
            </div>

            <div>
              <Label className="text-white">Call-to-Action</Label>
              <Select>
                <SelectTrigger className="bg-neutral-700 border-neutral-600 text-white">
                  <SelectValue placeholder="Select CTA" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-700 border-neutral-600">
                  <SelectItem value="learn-more">Learn More</SelectItem>
                  <SelectItem value="shop-now">Shop Now</SelectItem>
                  <SelectItem value="visit-store">Visit Store</SelectItem>
                  <SelectItem value="get-directions">Get Directions</SelectItem>
                  <SelectItem value="book-now">Book Now</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white">Budget & Schedule</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Input 
                  placeholder="Daily budget"
                  className="bg-neutral-700 border-neutral-600 text-white"
                />
                <Select>
                  <SelectTrigger className="bg-neutral-700 border-neutral-600 text-white">
                    <SelectValue placeholder="Duration" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-700 border-neutral-600">
                    <SelectItem value="1-week">1 Week</SelectItem>
                    <SelectItem value="2-weeks">2 Weeks</SelectItem>
                    <SelectItem value="1-month">1 Month</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="bg-neutral-700 w-full">
                <TabsTrigger value="upload" className="flex-1">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Media
                </TabsTrigger>
                <TabsTrigger value="ai-generate" className="flex-1">
                  <Palette className="mr-2 h-4 w-4" />
                  AI Generate
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="mt-4">
                <div className="border-2 border-dashed border-neutral-600 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                  <p className="text-white mb-2">Upload your creative assets</p>
                  <p className="text-sm text-neutral-400 mb-4">PNG, JPG, MP4 up to 10MB</p>
                  <Button variant="outline" className="border-neutral-600 text-white hover:bg-neutral-700">
                    Choose Files
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="ai-generate" className="mt-4">
                <div className="space-y-3">
                  <div className="p-4 bg-gradient-to-r from-purple-950/40 to-blue-950/40 rounded-lg border border-purple-600/30">
                    <div className="flex items-center mb-2">
                      <Image className="h-4 w-4 text-purple-400 mr-2" />
                      <span className="text-sm font-medium text-purple-300">AI Image Generation</span>
                    </div>
                    <Input 
                      placeholder="Describe the image you want..."
                      className="bg-neutral-700 border-neutral-600 text-white mb-2"
                    />
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                      Generate Image
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-blue-950/40 to-green-950/40 rounded-lg border border-blue-600/30">
                    <div className="flex items-center mb-2">
                      <Play className="h-4 w-4 text-blue-400 mr-2" />
                      <span className="text-sm font-medium text-blue-300">AI Video Generation</span>
                    </div>
                    <Input 
                      placeholder="Describe your video concept..."
                      className="bg-neutral-700 border-neutral-600 text-white mb-2"
                    />
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Generate Video
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Preview Panel */}
        <Card className="bg-neutral-800/80 border-neutral-600">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Eye className="mr-2 h-5 w-5" />
              Live Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-neutral-900 rounded-lg p-4 min-h-[400px] flex items-center justify-center">
              {selectedFormat === 'momentcard' && (
                <div className="bg-gradient-to-b from-purple-600 to-purple-800 rounded-lg p-6 w-64 h-96 flex flex-col">
                  <div className="bg-white/20 rounded-lg h-48 mb-4 flex items-center justify-center">
                    <Image className="h-12 w-12 text-white/60" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{adTitle || 'Your Ad Title'}</h3>
                  <p className="text-white/80 text-sm flex-1">{adDescription || 'Your ad description will appear here...'}</p>
                  <Button className="bg-white text-purple-800 hover:bg-white/90 mt-4">
                    Learn More
                  </Button>
                </div>
              )}
              
              {selectedFormat === 'vibeoverlay' && (
                <div className="relative">
                  <div className="bg-neutral-700 rounded-lg w-80 h-60 flex items-center justify-center">
                    <span className="text-neutral-400">AR Camera View</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent rounded-lg flex flex-col justify-end p-4">
                    <h3 className="text-white font-bold">{adTitle || 'AR Experience'}</h3>
                    <p className="text-white/80 text-sm">{adDescription || 'Interactive overlay content'}</p>
                  </div>
                </div>
              )}
              
              {selectedFormat === 'spawnpoint' && (
                <div className="bg-green-950/40 border border-green-600/30 rounded-lg p-6 w-72">
                  <MapPin className="h-8 w-8 text-green-400 mb-3" />
                  <h3 className="text-white font-bold mb-2">{adTitle || 'Location-Based Ad'}</h3>
                  <p className="text-green-200/80 text-sm mb-4">{adDescription || 'Appears when users are near this location'}</p>
                  <Button className="bg-green-600 hover:bg-green-700 text-white w-full">
                    Get Directions
                  </Button>
                </div>
              )}
              
              {selectedFormat === 'heatring' && (
                <div className="bg-gradient-to-br from-amber-600 to-orange-700 rounded-lg p-8 w-80 h-80 flex flex-col items-center justify-center text-center">
                  <Zap className="h-16 w-16 text-white mb-4" />
                  <h2 className="text-white font-bold text-2xl mb-2">{adTitle || 'Full-Screen Takeover'}</h2>
                  <p className="text-white/90 mb-6">{adDescription || 'Immersive brand experience'}</p>
                  <Button className="bg-white text-amber-800 hover:bg-white/90 px-8">
                    Experience Now
                  </Button>
                </div>
              )}
              
              {!['momentcard', 'vibeoverlay', 'spawnpoint', 'heatring'].includes(selectedFormat) && (
                <div className="text-center">
                  <Eye className="h-16 w-16 text-neutral-500 mx-auto mb-4" />
                  <p className="text-neutral-400">Select an ad format to see preview</p>
                </div>
              )}
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                Save Draft
              </Button>
              <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                Launch Campaign
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdCreationStudio;
