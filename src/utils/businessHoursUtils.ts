
export interface BusinessHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export const getBusinessHours = (venueId?: string): BusinessHours => {
  // Mock business hours
  return {
    monday: "9:00 AM - 10:00 PM",
    tuesday: "9:00 AM - 10:00 PM", 
    wednesday: "9:00 AM - 10:00 PM",
    thursday: "9:00 AM - 11:00 PM",
    friday: "9:00 AM - 12:00 AM",
    saturday: "10:00 AM - 12:00 AM",
    sunday: "10:00 AM - 9:00 PM"
  };
};

export const getTodaysHours = (hours: BusinessHours): string => {
  const today = new Date().getDay();
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const todayKey = days[today] as keyof BusinessHours;
  return hours[todayKey];
};

export const isOpen = (hours: BusinessHours): boolean => {
  const todaysHours = getTodaysHours(hours);
  if (todaysHours === "Closed") return false;
  
  // Simple check - in real app would parse times and compare with current time
  const now = new Date();
  const currentHour = now.getHours();
  return currentHour >= 9 && currentHour <= 22;
};

// Legacy function names for compatibility
export const generateBusinessHours = getBusinessHours;
