
import { BusinessHours, Location } from "@/types";

export const formatBusinessHours = (hours: BusinessHours | Record<string, string>): string => {
  if (!hours) return "Hours not available";
  
  // Handle different venue types
  const isNightVenue = (location: Location) => {
    return location.type === "bar" || location.type === "nightclub";
  };
  
  if (typeof hours === 'object' && 'monday' in hours && 'tuesday' in hours && 'wednesday' in hours && 'thursday' in hours && 'friday' in hours && 'saturday' in hours && 'sunday' in hours) {
    const formatDayHours = (day: string | { open: string; close: string; }): string => {
      if (typeof day === 'string') {
        return day;
      } else if (day && typeof day === 'object' && 'open' in day && 'close' in day) {
        return `${day.open} - ${day.close}`;
      }
      return 'Closed';
    };

    const monday = formatDayHours(hours.monday);
    const tuesday = formatDayHours(hours.tuesday);
    const wednesday = formatDayHours(hours.wednesday);
    const thursday = formatDayHours(hours.thursday);
    const friday = formatDayHours(hours.friday);
    const saturday = formatDayHours(hours.saturday);
    const sunday = formatDayHours(hours.sunday);

    return `
      Mon: ${monday}
      Tue: ${tuesday}
      Wed: ${wednesday}
      Thu: ${thursday}
      Fri: ${friday}
      Sat: ${saturday}
      Sun: ${sunday}
    `;
  } else if (typeof hours === 'object') {
    // Handle the case where hours is a Record<string, string>
    let formattedHours = '';
    for (const day in hours) {
      if (hours.hasOwnProperty(day)) {
        formattedHours += `${day}: ${hours[day]}\n`;
      }
    }
    return formattedHours.trim();
  } else {
    return "Hours not available";
  }
};

export const generateBusinessHours = (location: Location): BusinessHours => {
  // Generate default business hours based on venue type
  if (location.type === "bar" || location.type === "nightclub") {
    return {
      monday: { open: "17:00", close: "02:00" },
      tuesday: { open: "17:00", close: "02:00" },
      wednesday: { open: "17:00", close: "02:00" },
      thursday: { open: "17:00", close: "02:00" },
      friday: { open: "17:00", close: "03:00" },
      saturday: { open: "17:00", close: "03:00" },
      sunday: { open: "17:00", close: "01:00" }
    };
  } else if (location.type === "restaurant") {
    return {
      monday: { open: "11:00", close: "22:00" },
      tuesday: { open: "11:00", close: "22:00" },
      wednesday: { open: "11:00", close: "22:00" },
      thursday: { open: "11:00", close: "22:00" },
      friday: { open: "11:00", close: "23:00" },
      saturday: { open: "11:00", close: "23:00" },
      sunday: { open: "11:00", close: "21:00" }
    };
  } else {
    return {
      monday: { open: "09:00", close: "18:00" },
      tuesday: { open: "09:00", close: "18:00" },
      wednesday: { open: "09:00", close: "18:00" },
      thursday: { open: "09:00", close: "18:00" },
      friday: { open: "09:00", close: "18:00" },
      saturday: { open: "10:00", close: "17:00" },
      sunday: { open: "10:00", close: "17:00" }
    };
  }
};

export const getTodaysHours = (location: Location): string => {
  const today = new Date();
  const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  
  if (!location.hours) {
    return "Hours not available";
  }
  
  const todaysHours = location.hours[dayOfWeek as keyof BusinessHours];
  
  if (typeof todaysHours === 'string') {
    return todaysHours;
  } else if (todaysHours && typeof todaysHours === 'object' && 'open' in todaysHours && 'close' in todaysHours) {
    return `${todaysHours.open} - ${todaysHours.close}`;
  }
  
  return "Closed";
};

export const isOpenNow = (businessHours: BusinessHours, timezone: string, location: Location): boolean => {
  if (!businessHours) return false;

  const now = new Date();
  const nowUtc = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
  const nowTarget = new Date(nowUtc.toLocaleString('en-US', { timeZone: timezone }));

  const dayOfWeek = nowTarget.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const currentTime = nowTarget.getHours() * 100 + nowTarget.getMinutes();

  const getHoursForDay = (day: string | { open: string; close: string; }): { open: number, close: number } | null => {
    if (typeof day === 'string' || !day || typeof day !== 'object' || !('open' in day) || !('close' in day)) {
      return null;
    }

    const openTime = (day.open as string).replace(':', '');
    const closeTime = (day.close as string).replace(':', '');

    return {
      open: parseInt(openTime, 10),
      close: parseInt(closeTime, 10)
    };
  };

  if (businessHours.isOpen24Hours) {
    return true;
  }

  if (businessHours && typeof businessHours === 'object' && dayOfWeek in businessHours) {
    const hoursToday = businessHours[dayOfWeek as keyof BusinessHours];

    if (!hoursToday) {
      return false;
    }

    const hours = getHoursForDay(hoursToday);

    if (!hours) {
      return false;
    }

    if (location.type === "bar" || location.type === "nightclub") {
      return currentTime >= hours.open && currentTime <= hours.close + 2400;
    }

    return currentTime >= hours.open && currentTime <= hours.close;
  }

  return false;
};

export const formatOpenStatus = (businessHours: BusinessHours, timezone: string, location: Location): string => {
  try {
    if (!businessHours) {
      return "Hours not available";
    }
    
    if (businessHours.isOpen24Hours) {
      return "Open 24 Hours";
    }

    if (isOpenNow(businessHours, timezone, location)) {
      return "Open Now";
    } else {
      return "Closed Now";
    }
  } catch (error) {
    console.error("Error formatting open status:", error);
    return "Hours not available";
  }
};
