
// If this file doesn't exist, we're creating it
import { MockUserProfile } from "@/utils/locations/types";

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  zip?: string; // Added for compatibility
  lat: number;
  lng: number;
  type: "restaurant" | "bar" | "event" | "attraction" | "sports" | "other";
  verified: boolean;
  hours?: Record<string, string>;
  vibes?: string[];
  userProfile?: MockUserProfile;
}
