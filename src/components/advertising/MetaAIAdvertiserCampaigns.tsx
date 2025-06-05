
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Upload, Zap, Clock, Target, DollarSign, Users, Eye, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MetaAIAdvertiserCampaigns = () => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [formData, setFormData] = useState({
    image: null as File | null,
    campaignName: "",
    description: "",
    budget: "",
    campaignGoal: "",
    targetAudience: "",
    platforms: [] as string[]
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleLaunchCampaign = async () => {
    if (!formData.image || !formData.campaignName || !formData.budget) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to launch your Meta AI campaign.",
        variant: "destructive"
      });
      return;
    }

    setIsLaunching(true);
    
    setTimeout(() => {
      setIsLaunching(false);
      setIsModalOpen(false);
      toast({
        title: "Meta AI Campaign Launched!",
        description: "Your AI-powered campaign is now live across Meta platforms. Monitor performance in the Analytics tab.",
      });
      
      setFormData({
        image: null,
        campaignName: "",
        description: "",
        budget: "",
        campaignGoal: "",
        targetAudience: "",
        platforms: []
      });
    }, 3000);
  };

  const togglePlatform = (platform: string) => {
    const platforms = formData.platforms.includes(platform)
      ? formData.platforms.filter(p => p !== platform)
      : [...formData.platforms, platform];
    setFormData({ ...formData, platforms });
  };

  return (
    <div className="space-y-6">
      {/* Campaign Creation Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Meta AI Campaign Studio</h3>
          <p className="text-muted-foreground">Create intelligent campaigns powered by Meta's LLaMA models</p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Zap className="h-4 w-4 mr-2" />
              Create AI Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-400" />
                Meta AI Campaign Builder
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Campaign Name */}
              <div>
                <label className="text-sm font-medium mb-2 block">Campaign Name *</label>
                <Input
                  value={formData.campaignName}
                  onChange={(e) => setFormData({ ...formData, campaignName: e.target.value })}
                  placeholder="Enter campaign name"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="text-sm font-medium mb-2 block">Creative Asset *</label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp,.mp4,.mov"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="asset-upload"
                  />
                  <label htmlFor="asset-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {formData.image ? formData.image.name : "Upload image or video asset"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      AI will optimize your creative across all formats
                    </p>
                  </label>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium mb-2 block">Campaign Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of your product/service..."
                  maxLength={300}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.description.length}/300 characters
                </p>
              </div>

              {/* Budget */}
              <div>
                <label className="text-sm font-medium mb-2 block">Daily Budget *</label>
                <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select daily budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50">$50/day</SelectItem>
                    <SelectItem value="100">$100/day</SelectItem>
                    <SelectItem value="250">$250/day</SelectItem>
                    <SelectItem value="500">$500/day</SelectItem>
                    <SelectItem value="1000">$1,000/day</SelectItem>
                    <SelectItem value="custom">Custom Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Campaign Goal */}
              <div>
                <label className="text-sm font-medium mb-2 block">Campaign Objective *</label>
                <Select value={formData.campaignGoal} onValueChange={(value) => setFormData({ ...formData, campaignGoal: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select primary objective" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="awareness">Brand Awareness</SelectItem>
                    <SelectItem value="traffic">Drive Website Traffic</SelectItem>
                    <SelectItem value="conversions">Generate Conversions</SelectItem>
                    <SelectItem value="leads">Lead Generation</SelectItem>
                    <SelectItem value="app_installs">App Installs</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Target Audience */}
              <div>
                <label className="text-sm font-medium mb-2 block">Target Audience</label>
                <Select value={formData.targetAudience} onValueChange={(value) => setFormData({ ...formData, targetAudience: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Let AI optimize targeting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">AI-Optimized Targeting</SelectItem>
                    <SelectItem value="lookalike">Lookalike Audiences</SelectItem>
                    <SelectItem value="custom">Custom Audiences</SelectItem>
                    <SelectItem value="interest">Interest-Based</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Platform Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block">Meta Platforms</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Facebook', 'Instagram', 'Messenger', 'Audience Network'].map(platform => (
                    <Button
                      key={platform}
                      variant={formData.platforms.includes(platform) ? "default" : "outline"}
                      size="sm"
                      onClick={() => togglePlatform(platform)}
                      className="justify-start"
                    >
                      {platform}
                    </Button>
                  ))}
                </div>
              </div>

              <Button 
                onClick={handleLaunchCampaign}
                disabled={isLaunching}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isLaunching ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Launching with Meta AI...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Launch Meta AI Campaign
                  </>
                )}
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                Meta AI will create multiple ad variations and optimize delivery automatically
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Current Beta Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-blue-500/20">
          <CardContent className="p-6 text-center">
            <Target className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Smart Targeting</h4>
            <p className="text-sm text-muted-foreground">
              AI analyzes your creative and automatically selects optimal audiences
            </p>
            <Badge className="mt-2 bg-green-500/20 text-green-400">Available Now</Badge>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20">
          <CardContent className="p-6 text-center">
            <Sparkles className="h-8 w-8 text-purple-500 mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Creative Optimization</h4>
            <p className="text-sm text-muted-foreground">
              Generates multiple ad variations optimized for different placements
            </p>
            <Badge className="mt-2 bg-green-500/20 text-green-400">Available Now</Badge>
          </CardContent>
        </Card>

        <Card className="border-orange-500/20">
          <CardContent className="p-6 text-center">
            <Eye className="h-8 w-8 text-orange-500 mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Performance Monitoring</h4>
            <p className="text-sm text-muted-foreground">
              Real-time optimization and budget adjustment recommendations
            </p>
            <Badge className="mt-2 bg-green-500/20 text-green-400">Available Now</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Active Campaigns Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Active Meta AI Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium">Holiday Sale Campaign - AI Generated</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                    <Badge className="bg-blue-500/20 text-blue-400">Auto-Optimized</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">$847.50 / $1,000</p>
                  <p className="text-sm text-muted-foreground">Daily Budget</p>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Reach</p>
                  <p className="font-medium">45.2K</p>
                </div>
                <div>
                  <p className="text-muted-foreground">CTR</p>
                  <p className="font-medium">3.8%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Conversions</p>
                  <p className="font-medium">127</p>
                </div>
                <div>
                  <p className="text-muted-foreground">ROAS</p>
                  <p className="font-medium">4.2x</p>
                </div>
              </div>
            </div>

            <div className="text-center py-4 text-muted-foreground">
              <p>Launch your first Meta AI campaign to see detailed performance metrics</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetaAIAdvertiserCampaigns;
