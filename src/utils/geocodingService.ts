
import { toast } from "sonner";

export async function geocodeAddress(address: string) {
  if (!address.trim()) {
    toast.error("Please enter an address");
    return null;
  }
  
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyDIwf3LDvHPDNR3A5s1jWu_-o4Zat4f6TY`
    );
    
    if (!response.ok) {
      throw new Error('Failed to geocode address');
    }
    
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return [location.lng, location.lat] as [number, number];
    } else {
      toast.error("Address not found. Please try again with a more specific address.");
      return null;
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    toast.error("Error finding address. Please try again.");
    return null;
  }
}
