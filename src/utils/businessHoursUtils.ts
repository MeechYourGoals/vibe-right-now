
import { BusinessHours, Location } from "@/types";

// Generate appropriate business hours based on venue type
export const generateBusinessHours = (venue: Location): BusinessHours => {
  // Default hours
  const defaultHours: BusinessHours = {
    monday: "9:00 AM - 5:00 PM",
    tuesday: "9:00 AM - 5:00 PM",
    wednesday: "9:00 AM - 5:00 PM",
    thursday: "9:00 AM - 5:00 PM",
    friday: "9:00 AM - 5:00 PM",
    saturday: "10:00 AM - 3:00 PM",
    sunday: "Closed"
  };

  // Restaurant hours
  const restaurantHours: BusinessHours = {
    monday: "11:00 AM - 10:00 PM",
    tuesday: "11:00 AM - 10:00 PM",
    wednesday: "11:00 AM - 10:00 PM",
    thursday: "11:00 AM - 10:00 PM",
    friday: "11:00 AM - 11:00 PM",
    saturday: "11:00 AM - 11:00 PM",
    sunday: "11:00 AM - 9:00 PM"
  };

  // Bar hours
  const barHours: BusinessHours = {
    monday: "4:00 PM - 1:00 AM",
    tuesday: "4:00 PM - 1:00 AM",
    wednesday: "4:00 PM - 1:00 AM",
    thursday: "4:00 PM - 2:00 AM",
    friday: "4:00 PM - 2:00 AM",
    saturday: "2:00 PM - 2:00 AM",
    sunday: "2:00 PM - 12:00 AM"
  };

  // Sports venue hours (event-based)
  const sportsHours: BusinessHours = {
    monday: "Varies by event",
    tuesday: "Varies by event",
    wednesday: "Varies by event",
    thursday: "Varies by event",
    friday: "Varies by event",
    saturday: "Varies by event",
    sunday: "Varies by event"
  };

  // Event venue hours
  const eventHours: BusinessHours = {
    monday: "Varies by event",
    tuesday: "Varies by event",
    wednesday: "Varies by event",
    thursday: "Varies by event",
    friday: "Varies by event",
    saturday: "Varies by event",
    sunday: "Varies by event"
  };

  // Attraction hours
  const attractionHours: BusinessHours = {
    monday: "10:00 AM - 6:00 PM",
    tuesday: "10:00 AM - 6:00 PM",
    wednesday: "10:00 AM - 6:00 PM",
    thursday: "10:00 AM - 6:00 PM",
    friday: "10:00 AM - 6:00 PM",
    saturday: "9:00 AM - 8:00 PM",
    sunday: "9:00 AM - 6:00 PM"
  };

  // Return hours based on venue type
  switch (venue.type) {
    case "restaurant":
      return restaurantHours;
    case "bar":
      return barHours;
    case "sports":
      return sportsHours;
    case "event":
      return eventHours;
    case "attraction":
      return attractionHours;
    default:
      return defaultHours;
  }
};

// Check if a venue is currently open
export const isVenueOpen = (venue: Location): boolean => {
  if (!venue.hours) return false;
  
  const now = new Date();
  const day = now.toLocaleDateString('en-US', { weekday: 'lowercase' });
  
  // Handle 24-hour venues
  if (venue.hours.isOpen24Hours) return true;
  
  // For sports and event venues, assume they're open during events
  if (venue.type === "sports" || venue.type === "event") {
    // In a real app, this would check against a schedule of events
    return Math.random() > 0.5; // 50% chance of being open for demo purposes
  }
  
  // For other venues, check against their hours
  const hoursStr = venue.hours[day as keyof BusinessHours];
  if (hoursStr === "Closed" || hoursStr === "Varies by event") return false;
  
  // Parse hours string like "11:00 AM - 10:00 PM"
  const [openStr, closeStr] = hoursStr.split(" - ");
  
  // Convert to 24-hour format for easier comparison
  const convertTo24Hour = (timeStr: string): number => {
    const [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    
    if (period === "PM" && hours < 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    
    return hours * 60 + minutes;
  };
  
  const openMinutes = convertTo24Hour(openStr);
  const closeMinutes = convertTo24Hour(closeStr);
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
  return currentMinutes >= openMinutes && currentMinutes <= closeMinutes;
};

// Get the current day's hours for a venue
export const getTodaysHours = (venue: Location): string => {
  if (!venue.hours) return "Hours not available";
  
  const now = new Date();
  const day = now.toLocaleDateString('en-US', { weekday: 'lowercase' });
  
  // Handle 24-hour venues
  if (venue.hours.isOpen24Hours) return "Open 24 Hours";
  
  return venue.hours[day as keyof BusinessHours];
};
