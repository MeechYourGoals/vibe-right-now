
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "sonner";
import { Location } from "@/types";
import { calculateDistance } from "@/components/map/common/DistanceCalculator";
import { checkInAndPost, NotSignedInError } from "@/services/posts/createPost";

export function useCheckIn(venue: Location) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const confirmCheckIn = async (pointsEarned: number, photo?: File | null) => {
    setIsSubmitting(true);
    try {
      // Persist a check_ins row and a post for the venue via the data layer.
      await checkInAndPost({
        content: `Checked in at ${venue.name}`,
        files: photo ? [photo] : [],
        note: `Checked in at ${venue.name}`,
        location: {
          id: venue.id,
          name: venue.name,
          city: venue.city,
          state: venue.state,
        },
        isVenuePost: false,
      });

      setIsCheckedIn(true);
      setIsOpen(false);

      toast({
        title: "Checked in successfully!",
        description: `You earned ${pointsEarned} points at ${venue.name}`,
        variant: "default"
      });
    } catch (error) {
      if (error instanceof NotSignedInError) {
        sonnerToast("Sign in to check in");
      } else {
        console.error("Check-in failed", error);
        sonnerToast.error("Couldn't complete your check-in. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isOpen,
    setIsOpen,
    isCheckedIn,
    isCheckingLocation,
    isInRange,
    distance,
    userLocation,
    isSubmitting,
    handleCheckInClick,
    confirmCheckIn
  };
}
