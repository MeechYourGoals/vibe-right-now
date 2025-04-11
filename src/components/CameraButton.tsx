
import { useState } from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const CameraButton = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [availableToPin, setAvailableToPin] = useState(false);
  const [activeTab, setActiveTab] = useState("camera");
  const [location, setLocation] = useState("");
  const [isCheckingLocation, setIsCheckingLocation] = useState(false);
  const [locationVerified, setLocationVerified] = useState(false);

  const handleCameraClick = () => {
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    setIsDialogOpen(false);
    
    const pointsEarned = availableToPin ? 3 : 2;
    
    toast({
      title: "Vibe Posted",
      description: availableToPin 
        ? `Your vibe has been posted and is available for venues to pin for up to 90 days! (${pointsEarned}x points)` 
        : `Your vibe has been posted and will be visible for 1 week! (${pointsEarned}x points)`,
    });
  };

  const verifyLocation = () => {
    if (!location.trim()) return;
    
    setIsCheckingLocation(true);
    
    // Simulate location verification
    setTimeout(() => {
      setIsCheckingLocation(false);
      setLocationVerified(true);
      
      toast({
        title: "Location Verified",
        description: "You're near this location and can post a vibe!",
      });
    }, 1500);
  };

  return (
    <>
      <Button 
        onClick={handleCameraClick}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center p-0 z-10 animate-pulse-gradient"
      >
        <Camera className="h-7 w-7" />
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="glass-effect max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold vibe-gradient-text">Post a Vibe</DialogTitle>
            <DialogDescription>
              Share the vibe at your current location. Your post will be visible for 1 week by default.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="camera" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="camera">Camera</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
            </TabsList>
            
            <TabsContent value="camera" className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-2 aspect-video flex items-center justify-center">
                <Camera className="h-12 w-12 opacity-50" />
                <span className="ml-2 text-sm text-muted-foreground">Camera Preview</span>
              </div>
            </TabsContent>
            
            <TabsContent value="gallery" className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="aspect-square relative overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                    <img 
                      src={`https://source.unsplash.com/random/200x200?sig=${i}`} 
                      alt="Gallery item" 
                      className="w-full h-full object-cover"
                    />
                  </Card>
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Gallery uploads earn 1x points
              </p>
            </TabsContent>
          </Tabs>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="flex gap-2">
                <Input 
                  id="location"
                  placeholder="Search for a venue..."
                  className="bg-background/50"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    setLocationVerified(false);
                  }}
                />
                <Button 
                  variant="outline"
                  disabled={!location.trim() || isCheckingLocation}
                  onClick={verifyLocation}
                  className={isCheckingLocation ? "opacity-50" : ""}
                >
                  {isCheckingLocation ? "Checking..." : "Verify"}
                </Button>
              </div>
              {locationVerified && (
                <p className="text-xs text-green-500 flex items-center">
                  <span className="bg-green-500 h-2 w-2 rounded-full mr-1"></span>
                  Location verified - You're within range!
                </p>
              )}
            </div>
            
            <Input 
              placeholder="Add a caption (optional)"
              className="bg-background/50"
            />
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="pinForRewards" 
                checked={availableToPin} 
                onCheckedChange={(checked) => {
                  if (typeof checked === 'boolean') {
                    setAvailableToPin(checked);
                  }
                }}
              />
              <div>
                <Label 
                  htmlFor="pinForRewards" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                >
                  Pin for Rewards 
                  <span className="ml-2 reward-badge">3x Points</span>
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Make your vibe available for venues to pin for up to 90 days
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
              className="sm:flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              className="bg-gradient-to-r from-primary to-secondary sm:flex-1" 
              onClick={handleSubmit}
              disabled={!locationVerified}
            >
              Post Right Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CameraButton;
