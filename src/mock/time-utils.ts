
// Helper functions for generating timestamps and expiration times

// Get a recent timestamp (n hours ago)
export const getRecentTime = (hoursAgo: number): string => {
  const date = new Date();
  date.setHours(date.getHours() - hoursAgo);
  return date.toISOString();
};

// Function to calculate expiration time based on post timestamp
// Adds variability to make posts expire at different rates
export const getExpiryTime = (timestamp: string, isPinned = false): string => {
  const date = new Date(timestamp);
  
  if (isPinned) {
    // Pinned posts expire after 90 days
    date.setDate(date.getDate() + 90);
    return date.toISOString();
  }
  
  // Generate random expiration period for regular posts
  // Between 1-14 days for regular posts to create variety
  const randomDays = Math.floor(Math.random() * 14) + 1;
  date.setDate(date.getDate() + randomDays);
  
  return date.toISOString();
};

// Check if timestamp is within the last three months
export const isWithinThreeMonths = (timestamp: string | Date): boolean => {
  const now = new Date();
  const then = new Date(timestamp);
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  
  return then >= threeMonthsAgo && then <= now;
};

// Determine which time group a post belongs to
export const getTimeGroup = (timestamp: string | Date): 'recent' | 'week' | 'month' | 'older' => {
  const now = new Date();
  const postDate = new Date(timestamp);
  
  const hoursDiff = (now.getTime() - postDate.getTime()) / (1000 * 60 * 60);
  
  if (hoursDiff <= 24) {
    return 'recent'; // Last 24 hours
  } else if (hoursDiff <= 168) { // 7 days * 24 hours
    return 'week'; // Last week
  } else if (hoursDiff <= 720) { // ~30 days * 24 hours
    return 'month'; // Last month
  } else {
    return 'older'; // Older than a month
  }
};

// Format a timestamp as "X time ago"
export const formatTimeAgo = (timestamp: string | Date): string => {
  const now = new Date();
  const postDate = new Date(timestamp);
  
  const hoursDiff = (now.getTime() - postDate.getTime()) / (1000 * 60 * 60);
  
  if (hoursDiff < 1) {
    const minutesDiff = Math.floor(hoursDiff * 60);
    return `${minutesDiff} minute${minutesDiff !== 1 ? 's' : ''} ago`;
  } else if (hoursDiff < 24) {
    const hours = Math.floor(hoursDiff);
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else if (hoursDiff < 168) { // 7 days
    const days = Math.floor(hoursDiff / 24);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  } else if (hoursDiff < 720) { // 30 days
    const weeks = Math.floor(hoursDiff / 168);
    return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
  } else {
    const months = Math.floor(hoursDiff / 720);
    return `${months} month${months !== 1 ? 's' : ''} ago`;
  }
};

// Generate content specific to a day of the week for a venue type
export const getDaySpecificContent = (venueType: string, dayOfWeek: number): string => {
  const contents = {
    restaurant: [
      "Sunday brunch is our specialty! Join us for mimosas and pancakes.",
      "Monday night dinner special: Half-off appetizers!",
      "Taco Tuesday is here! $2 tacos all day.",
      "Wine Wednesday: Half-price bottles with any entrée purchase.",
      "Thursday night: Chef's special tasting menu available today only!",
      "Friday night prime rib special - while supplies last!",
      "Saturday date night special: Dinner for two with a complimentary dessert."
    ],
    bar: [
      "Sunday Funday! All-day happy hour drinks.",
      "Monday Night Football: Beer bucket specials all night!",
      "Tuesday Trivia Night starts at 8pm!",
      "Wednesday Karaoke Night - grab the mic at 9pm!",
      "Thursday Ladies Night: Discounted cocktails and DJ starts at 10pm.",
      "Friday night: Live band performs at 9pm!",
      "Saturday night dance party with DJ Max - doors open at 8pm."
    ],
    entertainment: [
      "Sunday afternoon jazz in the lounge.",
      "Monday: Comedy open mic night starts at 7pm!",
      "Tuesday acoustic sessions with local artists.",
      "Wednesday Film Club: Classic movie screening at 8pm.",
      "Thursday night poetry slam - sign up at 7pm!",
      "Friday showcase: Featured bands all night long!",
      "Saturday night headliner show - get tickets now!"
    ],
    default: [
      "Sunday special events and promotions!",
      "Monday deals you won't want to miss!",
      "Tuesday: Join us for a great time!",
      "Wednesday special: Limited time offers today!",
      "Thursday night: Something exciting is happening!",
      "Friday night: The weekend starts here!",
      "Saturday: Our most popular day of the week!"
    ]
  };
  
  const typeContents = contents[venueType as keyof typeof contents] || contents.default;
  return typeContents[dayOfWeek];
};

// Curated static image URLs for reliable loading
const getReliableImageUrl = (venueType: string, dayOfWeek: number): string => {
  const imageUrls = {
    restaurant: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80&auto=format&fit=crop", // Sunday brunch
      "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&q=80&auto=format&fit=crop", // Monday dinner
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=80&auto=format&fit=crop", // Tuesday tacos
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80&auto=format&fit=crop", // Wednesday wine
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80&auto=format&fit=crop", // Thursday special
      "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80&auto=format&fit=crop", // Friday steak
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80&auto=format&fit=crop"  // Saturday date night
    ],
    bar: [
      "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80&auto=format&fit=crop", // Sunday funday
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80&auto=format&fit=crop", // Monday football
      "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=800&q=80&auto=format&fit=crop", // Tuesday trivia
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80&auto=format&fit=crop", // Wednesday karaoke
      "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80&auto=format&fit=crop", // Thursday ladies night
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80&auto=format&fit=crop", // Friday live band
      "https://images.unsplash.com/photo-1571266028243-d220c6e40644?w=800&q=80&auto=format&fit=crop"  // Saturday dance party
    ],
    entertainment: [
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80&auto=format&fit=crop", // Sunday jazz
      "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800&q=80&auto=format&fit=crop", // Monday comedy
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80&auto=format&fit=crop", // Tuesday acoustic
      "https://images.unsplash.com/photo-1489599858701-6d4c4e6973b4?w=800&q=80&auto=format&fit=crop", // Wednesday film
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80&auto=format&fit=crop", // Thursday poetry
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80&auto=format&fit=crop", // Friday showcase
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80&auto=format&fit=crop"  // Saturday headliner
    ],
    default: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80&auto=format&fit=crop", // Default fallback
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&q=80&auto=format&fit=crop"
    ]
  };
  
  const typeImages = imageUrls[venueType as keyof typeof imageUrls] || imageUrls.default;
  return typeImages[dayOfWeek] || imageUrls.default[0];
};

// Generate image URL specific to a day of the week for a venue type
export const getDaySpecificImageUrl = (venueType: string, dayOfWeek: number): string => {
  return getReliableImageUrl(venueType, dayOfWeek);
};

// Check if a post is from a specific day of the week
export const isPostFromDayOfWeek = (timestamp: string | Date, targetDayOfWeek: number): boolean => {
  const date = new Date(timestamp);
  return date.getDay() === targetDayOfWeek;
};

// Create day-specific venue posts
export function createDaySpecificVenuePosts(venueId: string, venueType: string = 'venue') {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  // Get the current date
  const now = new Date();
  const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  // Create posts for each day of the week, with the current day being most recent
  return days.map((day, index) => {
    // Create a date for this day (going backward from today)
    const daysAgo = (index + 7 - currentDay) % 7;
    const postDate = new Date();
    postDate.setDate(now.getDate() - daysAgo);
    
    const timestamp = postDate.toISOString();
    
    // Generate content specific to the day and venue type
    let content = `${day} at this ${venueType || 'venue'} is amazing! `;
    
    if (index === currentDay) {
      content += "Today's special deals and events are not to be missed!";
    } else if (index === (currentDay + 1) % 7) {
      content += "Join us tomorrow for exclusive offers and entertainment!";
    } else if (index === (currentDay + 6) % 7) {
      content += "Yesterday was incredible, but we've got even more planned for the rest of the week!";
    } else {
      content += `Make sure to check out our ${day.toLowerCase()} specials and offers!`;
    }
    
    // Add venue-specific content based on type
    if (venueType === 'restaurant') {
      content += ` Our chef's ${day} specials are always a hit with regulars and new guests alike.`;
    } else if (venueType === 'bar' || venueType === 'nightlife') {
      content += ` ${day} nights feature special cocktails and our resident DJ spinning the best tracks.`;
    } else if (venueType === 'event') {
      content += ` ${day}'s schedule is packed with activities for everyone to enjoy.`;
    } else if (venueType === 'attraction') {
      content += ` ${day} is the perfect day to experience all we have to offer, with shorter lines and special guided tours.`;
    }
    
    return {
      id: `venue-${venueId}-${day.toLowerCase()}`,
      content,
      user: {
        id: `venue-admin-${venueId}`,
        name: "Venue Admin",
        username: `venue${venueId}admin`,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80&auto=format&fit=crop"
      },
      location: {
        id: venueId,
        type: venueType || 'venue', // Ensure a default type
        // Other location properties will be filled in by the component
      },
      media: [
        {
          type: "image",
          url: getReliableImageUrl(venueType || 'venue', index)
        }
      ],
      timestamp,
      likes: Math.floor(Math.random() * 50) + 5,
      comments: Math.floor(Math.random() * 10),
      isVenuePost: true,
      isPinned: index === currentDay, // Pin the current day's post
    };
  });
}
