
import { MockUserProfile } from "@/utils/locations/types";

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  zip?: string; // Making zip optional to avoid breaking existing code
  lat: number;
  lng: number;
  type: "restaurant" | "bar" | "event" | "attraction" | "sports" | "other";
  verified: boolean;
  hours?: Record<string, string>;
  vibes?: string[];
  userProfile?: MockUserProfile;
  description?: string;
}
