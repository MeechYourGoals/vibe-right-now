
import { Location, BusinessHours } from "@/types";

// Generate business hours based on venue type and other factors
export const generateBusinessHours = (venue: Location): BusinessHours => {
  const defaultHours = {
    monday: "9:00 AM - 5:00 PM",
    tuesday: "9:00 AM - 5:00 PM",
    wednesday: "9:00 AM - 5:00 PM", 
    thursday: "9:00 AM - 5:00 PM",
    friday: "9:00 AM - 5:00 PM",
    saturday: "10:00 AM - 3:00 PM",
    sunday: "Closed"
  };

  if (venue.hours) {
    return venue.hours as BusinessHours;
  }

  // Generate hours based on venue type
  if (venue.type === "restaurant") {
    return {
      monday: "11:00 AM - 10:00 PM",
      tuesday: "11:00 AM - 10:00 PM",
      wednesday: "11:00 AM - 10:00 PM",
      thursday: "11:00 AM - 10:00 PM",
      friday: "11:00 AM - 11:00 PM",
      saturday: "11:00 AM - 11:00 PM",
      sunday: "12:00 PM - 9:00 PM"
    };
  } else if (venue.type === "bar") {
    return {
      monday: "4:00 PM - 12:00 AM",
      tuesday: "4:00 PM - 12:00 AM",
      wednesday: "4:00 PM - 12:00 AM",
      thursday: "4:00 PM - 1:00 AM",
      friday: "4:00 PM - 2:00 AM",
      saturday: "4:00 PM - 2:00 AM",
      sunday: "4:00 PM - 12:00 AM"
    };
  } else if (venue.type === "attraction") {
    return {
      monday: "10:00 AM - 6:00 PM",
      tuesday: "10:00 AM - 6:00 PM",
      wednesday: "10:00 AM - 6:00 PM", 
      thursday: "10:00 AM - 6:00 PM",
      friday: "10:00 AM - 8:00 PM",
      saturday: "9:00 AM - 9:00 PM", 
      sunday: "9:00 AM - 6:00 PM"
    };
  } else if (venue.type === "sports") {
    return {
      monday: "Event times vary",
      tuesday: "Event times vary",
      wednesday: "Event times vary",
      thursday: "Event times vary", 
      friday: "Event times vary",
      saturday: "Event times vary",
      sunday: "Event times vary"
    };
  }

  return defaultHours;
};

// Get today's hours for a venue
export const getTodaysHours = (venue: Location): string => {
  if (!venue.hours) {
    return "Hours not available";
  }
  
  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const today = days[new Date().getDay()];
  
  const hours = venue.hours as BusinessHours;
  return hours[today] || "Hours not available";
};
