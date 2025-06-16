
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
import SmartCameraButton from "./mobile/SmartCameraButton";
import { useCameraAccess } from "@/hooks/useCameraAccess";
import { Loader2 } from "lucide-react";

const CameraButton = () => {
  const { toast } = useToast();
  const { takePhoto, selectFromGallery, isCapacitorNative, isLoading } = useCameraAccess();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [availableToPin, setAvailableToPin] = useState(false);
  const [activeTab, setActiveTab] = useState("camera");
  const [location, setLocation] = useState("");
  const [isCheckingLocation, setIsCheckingLocation] = useState(false);
  const [locationVerified, setLocationVerified] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

  const handleCameraClick = () => {
    setIsDialogOpen(true);
  };

  const handleCameraCapture = async () => {
    if (isCapacitorNative) {
      const photo = await takePhoto();
      if (photo?.webPath) {
        setCapturedPhoto(photo.webPath);
        toast({
          title: "Photo Captured",
          description: "Your photo has been captured successfully!",
        });
      }
    } else {
      // Fallback for web - show mock camera interface
      toast({
        title: "Camera Not Available",
        description: "Camera access is only available on mobile devices. Please use the gallery option.",
      });
    }
  };

  const handleGallerySelect = async () => {
    if (isCapacitorNative) {
      const photo = await selectFromGallery();
      if (photo?.webPath) {
        setCapturedPhoto(photo.webPath);
        toast({
          title: "Photo Selected",
          description: "Your photo has been selected from gallery!",
        });
      }
    } else {
      // Fallback for web - mock gallery selection
      toast({
        title: "Gallery Not Available",
        description: "Gallery access is only available on mobile devices.",
      });
    }
  };

  const handleSubmit = () => {
    setIsDialogOpen(false);
    
    const pointsEarned = availableToPin ? 3 : 2;
    
    toast({
      title: "Vibe Posted",
      description: availableToPin 
        ? `Your vibe has been posted and is available for venues to pin for longer than 90 days! (${pointsEarned}x points)` 
        : `Your vibe has been posted and will be visible for 1 week! (${pointsEarned}x points)`,
    });
    
    // Reset form
    setCapturedPhoto(null);
    setLocation("");
    setLocationVerified(false);
    setAvailableToPin(false);
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
      <SmartCameraButton onClick={handleCameraClick} />

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
              <div className="bg-muted/30 rounded-lg p-2 aspect-video flex items-center justify-center relative">
                {capturedPhoto ? (
                  <img src={capturedPhoto} alt="Captured" className="w-full h-full object-cover rounded" />
                ) : (
                  <>
                    <Camera className="h-12 w-12 opacity-50" />
                    <span className="ml-2 text-sm text-muted-foreground">
                      {isCapacitorNative ? "Tap to capture" : "Camera Preview"}
                    </span>
                  </>
                )}
                {isCapacitorNative && !capturedPhoto && (
                  <Button
                    onClick={handleCameraCapture}
                    disabled={isLoading}
                    className="absolute inset-0 bg-transparent hover:bg-black/10 border-0"
                  >
                    {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                  </Button>
                )}
              </div>
              {isCapacitorNative && !capturedPhoto && (
                <Button onClick={handleCameraCapture} disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Capturing...
                    </>
                  ) : (
                    <>
                      <Camera className="h-4 w-4 mr-2" />
                      Take Photo
                    </>
                  )}
                </Button>
              )}
            </TabsContent>
            
            <TabsContent value="gallery" className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-4 aspect-video flex items-center justify-center">
                {capturedPhoto ? (
                  <img src={capturedPhoto} alt="Selected" className="w-full h-full object-cover rounded" />
                ) : (
                  <div className="text-center">
                    <Camera className="h-12 w-12 opacity-50 mx-auto mb-2" />
                    <span className="text-sm text-muted-foreground">
                      {isCapacitorNative ? "Select from gallery" : "Gallery access on mobile only"}
                    </span>
                  </div>
                )}
              </div>
              {isCapacitorNative && (
                <Button onClick={handleGallerySelect} disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Selecting...
                    </>
                  ) : (
                    "Select from Gallery"
                  )}
                </Button>
              )}
              {!isCapacitorNative && (
                <p className="text-xs text-muted-foreground text-center">
                  Gallery uploads available on mobile app
                </p>
              )}
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
                  Make your posts available for longer than 90 days, Eligible for more points and Rewards if a Venue pins your post to their feed
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
