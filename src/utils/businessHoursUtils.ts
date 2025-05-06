
// This file handles business hours formatting and calculations

// Format 24-hour time to 12-hour format with AM/PM
export const formatTimeToAmPm = (time: string): string => {
  if (!time) return '';
  
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
  return `${displayHours}:${formattedMinutes} ${period}`;
};

// Check if a venue is currently open
export const isVenueOpen = (hours: Record<string, string[]>): boolean => {
  // Get current day and time
  const now = new Date();
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentDay = days[now.getDay()];
  
  // Check if there are hours for today
  if (!hours || !hours[currentDay] || !Array.isArray(hours[currentDay]) || hours[currentDay].length < 2) {
    return false;
  }
  
  const todayHours = hours[currentDay];
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  // Parse opening and closing times
  const [openingTime, closingTime] = todayHours.map(timeStr => {
    if (typeof timeStr !== 'string') {
      return { hours: 0, minutes: 0 };
    }
    const [hours, minutes] = timeStr.split(':').map(Number);
    return { hours, minutes };
  });
  
  // Handle overnight hours (if closing time is earlier than opening time)
  if (closingTime.hours < openingTime.hours) {
    // Venue is open overnight
    return (currentHour > openingTime.hours || 
            (currentHour === openingTime.hours && currentMinute >= openingTime.minutes)) || 
           (currentHour < closingTime.hours || 
            (currentHour === closingTime.hours && currentMinute <= closingTime.minutes));
  }
  
  // Normal hours (same day)
  return (currentHour > openingTime.hours || 
          (currentHour === openingTime.hours && currentMinute >= openingTime.minutes)) && 
         (currentHour < closingTime.hours || 
          (currentHour === closingTime.hours && currentMinute <= closingTime.minutes));
};

// Get the current status of the venue (Open Now, Closed, Opening Soon, etc.)
export const getVenueStatus = (hours: Record<string, string[]>): string => {
  if (!hours) return 'Hours not available';
  
  if (isVenueOpen(hours)) {
    return 'Open Now';
  } else {
    // Here we could add logic to show "Opening Soon" or "Closing Soon"
    return 'Closed';
  }
};

// Format and display business hours for the week
export const formatBusinessHours = (hours: Record<string, string[]>): string => {
  if (!hours) return 'Hours not available';
  
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const currentDayIndex = new Date().getDay(); // 0 is Sunday
  const reorderedDays = [...days.slice(currentDayIndex === 0 ? 6 : currentDayIndex - 1), ...days.slice(0, currentDayIndex === 0 ? 6 : currentDayIndex - 1)];
  
  const todayIdx = reorderedDays.findIndex(day => day === days[(currentDayIndex === 0 ? 6 : currentDayIndex - 1)]);
  
  return reorderedDays.map((day, index) => {
    const isToday = index === todayIdx;
    const dayHours = hours[day];
    
    if (!dayHours || !Array.isArray(dayHours) || dayHours.length < 2) {
      return `${day.charAt(0).toUpperCase() + day.slice(1)}: Closed ${isToday ? '(Today)' : ''}`;
    }
    
    const [open, close] = dayHours;
    if (typeof open === 'string' && typeof close === 'string') {
      return `${day.charAt(0).toUpperCase() + day.slice(1)}: ${formatTimeToAmPm(open)} - ${formatTimeToAmPm(close)} ${isToday ? '(Today)' : ''}`;
    } else {
      return `${day.charAt(0).toUpperCase() + day.slice(1)}: Hours not available ${isToday ? '(Today)' : ''}`;
    }
  }).join('\n');
};
