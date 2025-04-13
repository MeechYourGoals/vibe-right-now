
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Location } from "@/types";
import { calculateDistance } from "@/components/map/common/DistanceCalculator";
import { EventTrackingService } from "@/services/EventTrackingService";

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

  const confirmCheckIn = async (pointsEarned: number) => {
    setIsCheckedIn(true);
    setIsOpen(false);
    
    toast({
      title: "Checked in successfully!",
      description: `You earned ${pointsEarned} points at ${venue.name}`,
      variant: "default"
    });
    
    // Track the check-in event for Palantir Foundry
    try {
      await EventTrackingService.trackCheckIn({
        userId: "current-user", // In a real app, get from auth
        venueId: venue.id,
        venueName: venue.name,
        venueType: venue.type,
        venueLat: venue.lat,
        venueLng: venue.lng,
        venueCity: venue.city,
        venueState: venue.state,
        hasReceipt: pointsEarned > 10,
        pointsEarned,
        distance: distance || undefined
      });
      
      console.log('Check-in tracking successful');
    } catch (error) {
      console.error('Error tracking check-in:', error);
      // Don't show error to user as this is background tracking
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
    handleCheckInClick,
    confirmCheckIn
  };
}
