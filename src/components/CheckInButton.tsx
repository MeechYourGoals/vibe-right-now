import { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Location } from "@/types";
import { Upload, Check, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { calculateDistance } from "@/components/map/common/DistanceCalculator";

interface CheckInButtonProps {
  venue: Location;
}

const CheckInButton = ({ venue }: CheckInButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [hasReceipt, setHasReceipt] = useState(false);
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);
  const [isInRange, setIsInRange] = useState(false);
  const [distance, setDistance] = useState<string | null>(null);
  const [isCheckingLocation, setIsCheckingLocation] = useState(false);

  useEffect(() => {
    if (userLocation && venue) {
      const distanceStr = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        venue.lat,
        venue.lng
      );
      
      setDistance(distanceStr);
      const distanceValue = parseFloat(distanceStr.split(" ")[0]);
      const unit = distanceStr.split(" ")[1];
      
      setIsInRange(unit === "mi" && distanceValue <= 0.038);
    }
  }, [userLocation, venue]);

  const handleCheckInClick = () => {
    setIsCheckingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position.coords);
          setIsCheckingLocation(false);
          setIsOpen(true);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsCheckingLocation(false);
          toast({
            title: "Location access required",
            description: "Please enable location services to check in",
            variant: "destructive"
          });
        },
        { enableHighAccuracy: true }
      );
    } else {
      setIsCheckingLocation(false);
      toast({
        title: "Location not supported",
        description: "Your browser doesn't support geolocation",
        variant: "destructive"
      });
    }
  };

  const handleUploadReceipt = () => {
    setIsUploading(true);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setHasReceipt(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleConfirmCheckIn = () => {
    const pointsEarned = hasReceipt ? 30 : 10;
    
    setIsCheckedIn(true);
    setIsOpen(false);
    
    toast({
      title: "Checked in successfully!",
      description: `You earned ${pointsEarned} points at ${venue.name}`,
      variant: "default"
    });
  };

  return (
    <>
      <Button 
        variant="default" 
        className={`${isCheckingLocation ? "" : "bg-gradient-vibe"}`}
        onClick={handleCheckInClick}
        disabled={isCheckingLocation || isCheckedIn}
      >
        {isCheckingLocation ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Locating...
          </>
        ) : isCheckedIn ? (
          <>
            <Check className="h-4 w-4 mr-2" />
            Checked In
          </>
        ) : (
          "Check In"
        )}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Check in at {venue.name}</DialogTitle>
            <DialogDescription>
              {isInRange ? (
                <span className="text-green-500">
                  You're within range! Check in to earn points.
                </span>
              ) : (
                <span className="text-yellow-500">
                  You appear to be {distance} away from this venue. You need to be within 200 feet to check in.
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Base points:</h4>
                  <p className="text-sm text-muted-foreground">Check in at this location</p>
                </div>
                <span className="font-bold">10 points</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Bonus points:</h4>
                  <p className="text-sm text-muted-foreground">Upload today's receipt</p>
                </div>
                <span className="font-bold text-primary">+20 points</span>
              </div>
              
              <div className="border rounded-md p-3 mt-4">
                <Label htmlFor="receipt" className="block mb-2">
                  Upload your receipt from today (optional)
                </Label>
                
                {hasReceipt ? (
                  <div className="flex items-center gap-2 text-green-500">
                    <Check className="h-4 w-4" />
                    <span>Receipt uploaded successfully</span>
                  </div>
                ) : isUploading ? (
                  <div className="space-y-2">
                    <Progress value={uploadProgress} className="h-2" />
                    <p className="text-xs text-center">{uploadProgress}% uploaded</p>
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleUploadReceipt}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Receipt (3x points)
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-between">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-gradient-vibe"
              onClick={handleConfirmCheckIn}
              disabled={!isInRange}
            >
              {hasReceipt ? 'Check in (+30 points)' : 'Check in (+10 points)'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CheckInButton;
