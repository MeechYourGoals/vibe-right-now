
import { toast } from "sonner";

export async function geocodeAddress(address: string) {
  if (!address.trim()) {
    toast.error("Please enter an address");
    return null;
  }
  
  try {
    // Using Nominatim (OpenStreetMap) for geocoding - no API key required
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
    );
    
    if (!response.ok) {
      throw new Error('Failed to geocode address');
    }
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      // Nominatim returns lon/lat (not lat/lng)
      return [parseFloat(data[0].lon), parseFloat(data[0].lat)] as [number, number];
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
