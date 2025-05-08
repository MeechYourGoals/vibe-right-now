
import { BusinessHours, OpeningHours } from "@/types";

/**
 * Generate random business hours for venues
 */
export const generateBusinessHours = (seed: number = 0): BusinessHours => {
  // Using a mutable counter to avoid the seed++ issue
  let mutableSeed = seed;
  
  const generateRandomTime = (baseHour: number, variance: number): string => {
    mutableSeed = (mutableSeed * 9301 + 49297) % 233280;
    const random = mutableSeed / 233280;
    
    const hour = Math.min(23, Math.max(0, Math.floor(baseHour + (random * variance * 2 - variance))));
    const minute = Math.floor(random * 4) * 15; // 0, 15, 30, or 45
    
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };

  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const hours: BusinessHours = {};
  
  daysOfWeek.forEach((day, index) => {
    // Determine if place is open on this day (closed on random day, typically Sunday)
    const isClosed = (index === 0 && mutableSeed % 3 === 0);
    
    if (isClosed) {
      hours[day as keyof BusinessHours] = { open: false };
    } else {
      const isLateNight = (index === 5 || index === 6); // Friday or Saturday
      
      const openHour = generateRandomTime(isLateNight ? 11 : 9, 2);
      const closeHour = generateRandomTime(isLateNight ? 22 : 20, 3);
      
      hours[day as keyof BusinessHours] = {
        open: true,
        openTime: openHour,
        closeTime: closeHour
      };
    }
  });
  
  return hours;
};

/**
 * Get today's hours from business hours object
 */
export const getTodaysHours = (location: any): string => {
  if (!location || !location.businessHours) {
    return "Hours not available";
  }
  
  const today = new Date().toLocaleDateString('en-US', { weekday: 'lower' }).split(',')[0];
  const hours = location.businessHours[today as keyof BusinessHours];
  
  if (!hours || !hours.open) {
    return "Closed";
  }
  
  return `${hours.openTime} - ${hours.closeTime}`;
};

/**
 * Generate phone number for a location
 */
export const generatePhoneNumber = (): string => {
  const areaCode = Math.floor(Math.random() * 800) + 200;
  const prefix = Math.floor(Math.random() * 800) + 200;
  const lineNumber = Math.floor(Math.random() * 10000);
  
  return `(${areaCode}) ${prefix}-${lineNumber.toString().padStart(4, '0')}`;
};

/**
 * Generate a description for a location
 */
export const generateDescription = (locationType: string): string => {
  const restaurantDescriptions = [
    "A cozy spot serving homestyle dishes with locally sourced ingredients",
    "Modern fusion cuisine in an elegant atmosphere with craft cocktails",
    "Family-friendly establishment known for generous portions and welcoming service",
    "Trendy bistro offering innovative takes on classic recipes",
    "Upscale dining experience with a seasonal menu and extensive wine list"
  ];
  
  const barDescriptions = [
    "Vibrant nightlife spot featuring live DJs and signature drinks",
    "Relaxed pub atmosphere with craft beers and classic cocktails",
    "Speakeasy-style bar known for its creative mixology and intimate setting",
    "Sports bar with multiple screens, pub fare, and local brews on tap",
    "Rooftop lounge offering stunning views and an impressive drink menu"
  ];
  
  const eventDescriptions = [
    "Premier venue hosting a variety of performances and cultural events",
    "Intimate space showcasing local talent and community gatherings",
    "Multi-purpose facility for concerts, conferences, and private functions",
    "Historic venue renowned for its architectural beauty and perfect acoustics",
    "Modern event space equipped with state-of-the-art sound and lighting systems"
  ];
  
  const attractionDescriptions = [
    "Popular destination offering unique experiences for visitors of all ages",
    "Hidden gem featuring interactive exhibits and educational programs",
    "Iconic landmark celebrating local heritage and cultural significance",
    "Family-friendly attraction with activities for children and adults alike",
    "Must-visit spot known for its photogenic settings and memorable experiences"
  ];
  
  let descriptions;
  switch (locationType.toLowerCase()) {
    case 'restaurant':
      descriptions = restaurantDescriptions;
      break;
    case 'bar':
      descriptions = barDescriptions;
      break;
    case 'event':
      descriptions = eventDescriptions;
      break;
    case 'attraction':
      descriptions = attractionDescriptions;
      break;
    default:
      descriptions = [...restaurantDescriptions, ...barDescriptions, ...eventDescriptions, ...attractionDescriptions];
  }
  
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

/**
 * Generate location amenities
 */
export const generateAmenities = (locationType: string): string[] => {
  const commonAmenities = ["Wi-Fi", "Wheelchair Accessible", "Air Conditioning"];
  
  const restaurantAmenities = [
    "Outdoor Seating", "Reservations", "Private Dining", "Takeout", 
    "Delivery", "Full Bar", "Wine List", "Happy Hour", "Kids Menu"
  ];
  
  const barAmenities = [
    "Live Music", "DJ", "Dance Floor", "Game Room", "TVs", 
    "Outdoor Seating", "Happy Hour", "Craft Cocktails", "Microbrews"
  ];
  
  const eventAmenities = [
    "Box Office", "Coat Check", "VIP Areas", "Merchandise", 
    "Food Vendors", "Full Service Bar", "Sound System", "Lighting Effects"
  ];
  
  const attractionAmenities = [
    "Gift Shop", "Guided Tours", "Photo Opportunities", "Restrooms", 
    "Snack Bar", "Lockers", "Family Friendly", "Seasonal Events"
  ];
  
  let typeAmenities: string[] = [];
  switch (locationType.toLowerCase()) {
    case 'restaurant':
      typeAmenities = restaurantAmenities;
      break;
    case 'bar':
      typeAmenities = barAmenities;
      break;
    case 'event':
      typeAmenities = eventAmenities;
      break;
    case 'attraction':
      typeAmenities = attractionAmenities;
      break;
    default:
      typeAmenities = [...restaurantAmenities, ...barAmenities, ...eventAmenities, ...attractionAmenities];
  }
  
  // Select random amenities
  const result = [...commonAmenities];
  const count = Math.floor(Math.random() * 5) + 3; // 3 to 7 amenities
  
  const shuffled = [...typeAmenities].sort(() => 0.5 - Math.random());
  for (let i = 0; i < count && i < shuffled.length; i++) {
    result.push(shuffled[i]);
  }
  
  return result;
};

/**
 * Generate popular times data
 */
export const generatePopularTimes = () => {
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const popularTimes: Record<string, number[]> = {};
  
  daysOfWeek.forEach(day => {
    const hourlyData = [];
    // Generate data for 24 hours (0-23)
    for (let hour = 0; hour < 24; hour++) {
      let baseValue = 0;
      
      // Create realistic patterns based on day/time
      if (hour >= 7 && hour <= 22) { // Open hours
        if (day === 'friday' || day === 'saturday') {
          // Weekend pattern
          if (hour >= 11 && hour <= 14) { // Lunch rush
            baseValue = 60 + Math.floor(Math.random() * 30);
          } else if (hour >= 17 && hour <= 21) { // Dinner rush
            baseValue = 75 + Math.floor(Math.random() * 25);
          } else {
            baseValue = 30 + Math.floor(Math.random() * 30);
          }
        } else {
          // Weekday pattern
          if (hour >= 11 && hour <= 13) { // Lunch rush
            baseValue = 50 + Math.floor(Math.random() * 40);
          } else if (hour >= 17 && hour <= 19) { // Dinner rush
            baseValue = 60 + Math.floor(Math.random() * 30);
          } else {
            baseValue = 20 + Math.floor(Math.random() * 25);
          }
        }
      } else {
        // Late night/early morning
        baseValue = Math.floor(Math.random() * 10);
      }
      
      hourlyData.push(baseValue);
    }
    
    popularTimes[day] = hourlyData;
  });
  
  return popularTimes;
};

/**
 * Generate images for a location
 */
export const generateImages = (locationType: string, count: number = 5): string[] => {
  const imageBaseUrl = "https://source.unsplash.com/random/800x600/?";
  
  let keywords = locationType.toLowerCase();
  switch (locationType.toLowerCase()) {
    case 'restaurant':
      keywords = 'restaurant,food,dining';
      break;
    case 'bar':
      keywords = 'bar,pub,cocktail,nightlife';
      break;
    case 'event':
      keywords = 'event,concert,festival';
      break;
    case 'attraction':
      keywords = 'attraction,landmark,tourism';
      break;
    case 'sports':
      keywords = 'sports,stadium,field';
      break;
    case 'music':
      keywords = 'music,concert,stage';
      break;
    case 'comedy':
      keywords = 'comedy,club,performance';
      break;
    case 'nightlife':
      keywords = 'nightlife,club,party';
      break;
  }
  
  const images: string[] = [];
  for (let i = 0; i < count; i++) {
    const cacheBuster = Math.floor(Math.random() * 1000);
    images.push(`${imageBaseUrl}${keywords}&sig=${cacheBuster}`);
  }
  
  return images;
};
