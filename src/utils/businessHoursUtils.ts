
export interface BusinessHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export const generateBusinessHours = (venue: any): Record<string, string> => {
  const hours: Record<string, string> = {
    monday: "9:00 AM - 10:00 PM",
    tuesday: "9:00 AM - 10:00 PM", 
    wednesday: "9:00 AM - 10:00 PM",
    thursday: "9:00 AM - 11:00 PM",
    friday: "9:00 AM - 12:00 AM",
    saturday: "10:00 AM - 12:00 AM",
    sunday: "10:00 AM - 9:00 PM"
  };

  // Customize based on venue type
  if (venue.type === 'bar' || venue.type === 'nightlife') {
    hours.friday = "4:00 PM - 2:00 AM";
    hours.saturday = "4:00 PM - 2:00 AM";
    hours.sunday = "4:00 PM - 12:00 AM";
  }

  return hours;
};

export const getTodaysHours = (venue: any): string => {
  const today = new Date().getDay();
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayName = days[today];
  
  if (!venue.hours) {
    venue.hours = generateBusinessHours(venue);
  }
  
  return venue.hours[dayName] || "Closed";
};
