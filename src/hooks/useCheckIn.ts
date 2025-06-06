
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Location } from "@/types";
import { calculateDistance } from "@/components/map/common/DistanceCalculator";

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

  const confirmCheckIn = (pointsEarned: number) => {
    setIsCheckedIn(true);
    setIsOpen(false);
    
    toast({
      title: "Checked in successfully!",
      description: `You earned ${pointsEarned} points at ${venue.name}`,
      variant: "default"
    });
  };

  return {
    isOpen,
    setIsOpen,
    isCheckedIn,
    isCheckingLocation,
    isInRange,
    distance,
    userLocation,
    handleCheckInClick,
    confirmCheckIn
  };
}
