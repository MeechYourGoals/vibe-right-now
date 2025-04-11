
export interface CityCoordinates {
  city: string;
  state?: string;
  country?: string;
  name?: string; // For backward compatibility
  lat: number;
  lng: number;
}

export interface BusinessHours {
  monday: { open: string; close: string };
  tuesday: { open: string; close: string };
  wednesday: { open: string; close: string };
  thursday: { open: string; close: string };
  friday: { open: string; close: string };
  saturday: { open: string; close: string };
  sunday: { open: string; close: string };
  [key: string]: { open: string; close: string }; // Add index signature for string keys
}
