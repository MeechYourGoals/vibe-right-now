
import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SmartCameraButton from "./mobile/SmartCameraButton";
import { useCameraAccess } from "@/hooks/useCameraAccess";
import CameraTab from "./camera/CameraTab";
import GalleryTab from "./camera/GalleryTab";
import LocationInput from "./camera/LocationInput";
import PinRewardsSection from "./camera/PinRewardsSection";

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

  const handleLocationChange = (value: string) => {
    setLocation(value);
    setLocationVerified(false);
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
            
            <CameraTab
              capturedPhoto={capturedPhoto}
              isCapacitorNative={isCapacitorNative}
              isLoading={isLoading}
              onCameraCapture={handleCameraCapture}
            />
            
            <GalleryTab
              capturedPhoto={capturedPhoto}
              isCapacitorNative={isCapacitorNative}
              isLoading={isLoading}
              onGallerySelect={handleGallerySelect}
            />
          </Tabs>
          
          <div className="space-y-4">
            <LocationInput
              location={location}
              isCheckingLocation={isCheckingLocation}
              locationVerified={locationVerified}
              onLocationChange={handleLocationChange}
              onVerifyLocation={verifyLocation}
            />
            
            <Input 
              placeholder="Add a caption (optional)"
              className="bg-background/50"
            />
            
            <PinRewardsSection
              availableToPin={availableToPin}
              onAvailableToPinChange={setAvailableToPin}
            />
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
