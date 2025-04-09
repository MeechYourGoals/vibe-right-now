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
export const isWithinThreeMonths = (timestamp: string): boolean => {
  const now = new Date();
  const then = new Date(timestamp);
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  
  return then >= threeMonthsAgo && then <= now;
};

// Determine which time group a post belongs to
export const getTimeGroup = (timestamp: string): 'recent' | 'week' | 'month' | 'older' => {
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
export const formatTimeAgo = (timestamp: string): string => {
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

// Generate image URL specific to a day of the week for a venue type
export const getDaySpecificImageUrl = (venueType: string, dayOfWeek: number): string => {
  // Using placeholder images with different parameters to simulate different images
  return `https://source.unsplash.com/random/800x600?${venueType},${dayOfWeek}`;
};

// Check if a post is from a specific day of the week
export const isPostFromDayOfWeek = (timestamp: string, targetDayOfWeek: number): boolean => {
  const date = new Date(timestamp);
  return date.getDay() === targetDayOfWeek;
};

// Create day-specific venue posts
export const createDaySpecificVenuePosts = (venueId: string, venueType: string): any[] => {
  const posts = [];
  const now = new Date();
  
  // Create a post for each day of the week
  for (let i = 0; i < 7; i++) {
    const postDate = new Date();
    postDate.setDate(now.getDate() - ((now.getDay() - i + 7) % 7));
    
    posts.push({
      id: `${venueId}-day-${i}`,
      venueId: venueId,
      content: getDaySpecificContent(venueType, i),
      timestamp: postDate.toISOString(),
      isPinned: Math.random() > 0.7, // 30% chance of being pinned
      media: {
        type: "image",
        url: getDaySpecificImageUrl(venueType, i)
      }
    });
  }
  
  return posts;
};
