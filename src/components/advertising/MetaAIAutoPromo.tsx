
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Upload, Zap, Clock, Target, TrendingUp, DollarSign, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MetaAIAutoPromoProps {
  isPro: boolean;
  onUpgrade?: () => void;
}

const MetaAIAutoPromo = ({ isPro, onUpgrade }: MetaAIAutoPromoProps) => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [formData, setFormData] = useState({
    image: null as File | null,
    description: "",
    budget: "",
    campaignGoal: "",
    tone: ""
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleLaunchCampaign = async () => {
    if (!formData.image || !formData.budget || !formData.campaignGoal) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to launch your campaign.",
        variant: "destructive"
      });
      return;
    }

    setIsLaunching(true);
    
    // Simulate API call to Meta AI
    setTimeout(() => {
      setIsLaunching(false);
      setIsModalOpen(false);
      toast({
        title: "Campaign Launched Successfully!",
        description: "Your Meta AI-powered campaign is now live. Check the analytics dashboard for performance metrics.",
      });
      
      // Reset form
      setFormData({
        image: null,
        description: "",
        budget: "",
        campaignGoal: "",
        tone: ""
      });
    }, 3000);
  };

  const ProFeatureContent = () => (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="p-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20">
            <Zap className="h-8 w-8 text-blue-400" />
          </div>
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-300">
            Coming Soon - 2026
          </Badge>
        </div>
        <h3 className="text-2xl font-bold">Auto-Promo Powered by Meta AI</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Fully automated advertising with AI by 2026. Simply provide an image and budget - 
          Meta AI will craft entire campaigns, generate visuals, video, text, and define precise audience segments.
        </p>
      </div>

      {/* Current Features (Beta) */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-400" />
            Available Now (Beta Version)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 border rounded-lg text-center">
              <Upload className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <h4 className="font-medium mb-1">Smart Creative Generation</h4>
              <p className="text-sm text-muted-foreground">Upload image + AI generates ad copy and targeting</p>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <Target className="h-6 w-6 text-purple-500 mx-auto mb-2" />
              <h4 className="font-medium mb-1">Automated Targeting</h4>
              <p className="text-sm text-muted-foreground">AI selects optimal audience based on event data</p>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <TrendingUp className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <h4 className="font-medium mb-1">Real-time Optimization</h4>
              <p className="text-sm text-muted-foreground">Campaign adjusts based on performance metrics</p>
            </div>
          </div>
          
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <Zap className="h-4 w-4 mr-2" />
                Launch Auto-Promo Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create Auto-Promo Campaign</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {/* Image Upload */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Event Image *</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {formData.image ? formData.image.name : "Upload JPG, PNG, or WebP"}
                      </p>
                    </label>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Description (Optional)</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of your event..."
                    maxLength={200}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.description.length}/200 characters
                  </p>
                </div>

                {/* Budget */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Campaign Budget *</label>
                  <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">$10</SelectItem>
                      <SelectItem value="25">$25 (Free for Pro users)</SelectItem>
                      <SelectItem value="50">$50</SelectItem>
                      <SelectItem value="custom">Custom Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Campaign Goal */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Campaign Goal *</label>
                  <Select value={formData.campaignGoal} onValueChange={(value) => setFormData({ ...formData, campaignGoal: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="awareness">Awareness</SelectItem>
                      <SelectItem value="tickets">Drive Ticket Sales</SelectItem>
                      <SelectItem value="followers">Grow Followers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* AI Tone Selector */}
                <div>
                  <label className="text-sm font-medium mb-2 block">AI Tone Suggestion</label>
                  <Select value={formData.tone} onValueChange={(value) => setFormData({ ...formData, tone: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Let AI choose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hype">Hype & Energetic</SelectItem>
                      <SelectItem value="classy">Classy & Sophisticated</SelectItem>
                      <SelectItem value="funny">Funny & Playful</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleLaunchCampaign}
                  disabled={isLaunching}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isLaunching ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Launching Campaign...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Auto-Launch with Meta AI
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  Meta AI will optimize delivery and audience using AI. You retain control over spend limits.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Campaign Analytics Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Campaign Performance (Preview)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-blue-500">12.4K</p>
              <p className="text-sm text-muted-foreground">Impressions</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-green-500">3.2%</p>
              <p className="text-sm text-muted-foreground">Click Rate</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-purple-500">$18.50</p>
              <p className="text-sm text-muted-foreground">Spent</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-orange-500">24</p>
              <p className="text-sm text-muted-foreground">Conversions</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2026 Future Features */}
      <Card className="border-orange-500/20 bg-orange-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-orange-400" />
            Coming in 2026 - Full Meta AI Suite
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="p-2 rounded-full bg-blue-500/20">
                <Zap className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium">Complete Creative Automation</h4>
                <p className="text-sm text-muted-foreground">AI generates all visuals, videos, and copy automatically</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="p-2 rounded-full bg-purple-500/20">
                <Target className="h-4 w-4 text-purple-400" />
              </div>
              <div>
                <h4 className="font-medium">Real-time Personalization</h4>
                <p className="text-sm text-muted-foreground">Ads adapt instantly based on viewer context and behavior</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="p-2 rounded-full bg-green-500/20">
                <TrendingUp className="h-4 w-4 text-green-400" />
              </div>
              <div>
                <h4 className="font-medium">Advanced LLaMA Integration</h4>
                <p className="text-sm text-muted-foreground">Powered by Meta's latest LLaMA models for superior performance</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const UpgradePrompt = () => (
    <Card className="border-dashed border-2 border-muted-foreground/25">
      <CardContent className="text-center p-8">
        <div className="flex items-center justify-center mb-4">
          <div className="p-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20">
            <Zap className="h-8 w-8 text-blue-400" />
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2">Auto-Promo Powered by Meta AI</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Unlock fully automated advertising campaigns with Meta AI. Available exclusively for Pro subscribers.
        </p>
        <div className="flex items-center justify-center gap-2 mb-6">
          <Badge className="bg-blue-500/20 text-blue-400">Pro Feature</Badge>
          <Badge className="bg-orange-500/20 text-orange-400">Coming 2026</Badge>
        </div>
        <Button onClick={onUpgrade} className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white">
          Upgrade to Pro
        </Button>
      </CardContent>
    </Card>
  );

  return isPro ? <ProFeatureContent /> : <UpgradePrompt />;
};

export default MetaAIAutoPromo;
