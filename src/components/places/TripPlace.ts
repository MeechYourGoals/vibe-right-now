
import { Location } from "@/types";

export interface TripPlace {
  id: string;
  place: Location;
  addedBy: {
    id: string;
    name: string;
    avatar: string;
    colorCode: string;
  };
  notes?: string;
  addedAt: Date;
}
