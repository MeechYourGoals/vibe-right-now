
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "sonner";
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
import { ImagePlus, Loader2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SmartCameraButton from "./mobile/SmartCameraButton";
import { useCameraAccess } from "@/hooks/useCameraAccess";
import CameraTab from "./camera/CameraTab";
import GalleryTab from "./camera/GalleryTab";
import LocationInput from "./camera/LocationInput";
import PinRewardsSection from "./camera/PinRewardsSection";
import { createPost, NotSignedInError } from "@/services/posts/createPost";

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCameraClick = () => {
    setIsDialogOpen(true);
  };

  const handleCameraCapture = async () => {
    if (isCapacitorNative) {
      const photo = await takePhoto();
      if (photo?.webPath) {
        setCapturedPhoto(photo.webPath);
        setSelectedFile(null);
        toast({
          title: "Photo Captured",
          description: "Your photo has been captured successfully!",
        });
      }
    } else {
      // On web, fall back to the file picker.
      fileInputRef.current?.click();
    }
  };

  const handleGallerySelect = async () => {
    if (isCapacitorNative) {
      const photo = await selectFromGallery();
      if (photo?.webPath) {
        setCapturedPhoto(photo.webPath);
        setSelectedFile(null);
        toast({
          title: "Photo Selected",
          description: "Your photo has been selected from gallery!",
        });
      }
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleWebFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setCapturedPhoto(URL.createObjectURL(file));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const resetForm = () => {
    if (capturedPhoto && selectedFile) URL.revokeObjectURL(capturedPhoto);
    setCapturedPhoto(null);
    setSelectedFile(null);
    setCaption("");
    setLocation("");
    setLocationVerified(false);
    setAvailableToPin(false);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await createPost({
        content: caption.trim(),
        files: selectedFile ? [selectedFile] : [],
        // Captured (native) photos are object/web URLs we can attach directly.
        mediaUrls: !selectedFile && capturedPhoto ? [capturedPhoto] : [],
        location: locationVerified && location.trim() ? { name: location.trim() } : undefined,
      });

      const pointsEarned = availableToPin ? 3 : 2;
      toast({
        title: "Vibe Posted",
        description: availableToPin
          ? `Your vibe has been posted and is available for venues to pin for longer than 90 days! (${pointsEarned}x points)`
          : `Your vibe has been posted and will be visible for 1 week! (${pointsEarned}x points)`,
      });

      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      if (error instanceof NotSignedInError) {
        sonnerToast("Sign in to post a vibe");
      } else {
        console.error("Vibe post failed", error);
        sonnerToast.error("Couldn't post your vibe. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
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

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={handleWebFileSelected}
      />

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
            {!isCapacitorNative && (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImagePlus className="h-4 w-4 mr-2" />
                {capturedPhoto ? "Change photo" : "Choose a photo"}
              </Button>
            )}

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
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
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
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-gradient-to-r from-primary to-secondary sm:flex-1"
              onClick={handleSubmit}
              disabled={!locationVerified || submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Posting...
                </>
              ) : (
                "Post Right Now"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CameraButton;
