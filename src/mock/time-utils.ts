
import { Post } from "@/types";
import { addMonths, format, subDays, subHours, subMinutes } from "date-fns";

// Generate a time in the recent past (N days ago)
export const getRecentTime = (daysAgo: number): string => {
  const date = subDays(new Date(), daysAgo);
  // Set the time to a random hour between 9am and 11pm
  date.setHours(Math.floor(Math.random() * 14) + 9, Math.floor(Math.random() * 60), 0);
  return date.toISOString();
};

// Generate a time for specific day of week in the recent past
export const getRecentTimeForDayOfWeek = (dayOfWeek: number): string => {
  const today = new Date();
  const currentDayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  // Calculate how many days to go back to reach the desired day of week
  let daysToSubtract = currentDayOfWeek - dayOfWeek;
  if (daysToSubtract < 0) {
    daysToSubtract += 7; // Go back to previous week
  }
  
  // If it's the same day of week as today, use 7 days ago
  if (daysToSubtract === 0) {
    daysToSubtract = 7;
  }
  
  const date = subDays(today, daysToSubtract);
  // Set the time to a random hour between 9am and 11pm
  date.setHours(Math.floor(Math.random() * 14) + 9, Math.floor(Math.random() * 60), 0);
  return date.toISOString();
};

// Generate an expiry time for venue posts (3 months from post date)
export const getExpiryTime = (postTime: string): string => {
  const postDate = new Date(postTime);
  return addMonths(postDate, 3).toISOString();
};

// Check if a post is from a specific day of the week
export const isPostFromDayOfWeek = (timestamp: string, dayOfWeek: number): boolean => {
  const date = new Date(timestamp);
  return date.getDay() === dayOfWeek;
};

// Check if a post is within the last 3 months
export const isWithinThreeMonths = (timestamp: string): boolean => {
  const postDate = new Date(timestamp);
  const threeMonthsAgo = subMonths(new Date(), 3);
  return postDate >= threeMonthsAgo;
};

// Helper function to get posts for specific days of week
export const getPostsForDaysOfWeek = (posts: Post[], daysOfWeek: number[]): Post[] => {
  return posts.filter(post => 
    daysOfWeek.includes(new Date(post.timestamp).getDay())
  );
};

// Get a date string for a specific weekday in the most recent week
const subMonths = (date: Date, months: number): Date => {
  return new Date(date.getFullYear(), date.getMonth() - months, date.getDate());
};

// Generate a specific day of week post content based on the day
export const getDaySpecificContent = (venueType: string, dayOfWeek: number): string => {
  // Content variations for different days and venue types
  const dayContent: Record<string, Record<number, string>> = {
    "restaurant": {
      0: "Sunday brunch is poppin' today! Mimosa bar is fully stocked and the special eggs benedict is to die for.",
      1: "Monday lunch crowd is light today. No waiting, perfect for a quick bite in peace!",
      2: "Tuesday taco special is on! Half price margaritas and the house-made guac is perfect today.",
      3: "Wednesday wine tasting night! Half off bottles with any entree purchase.",
      4: "Thursday night and the chef just put out a special prix fixe menu. Reserved tables going fast!",
      5: "Friday happy hour is packed but the vibe is amazing! They're taking names for bar seating.",
      6: "Saturday dinner rush is in full swing! Put your name in now, currently a 45 min wait for walk-ins."
    },
    "bar": {
      0: "Sunday funday! Sports on all screens and pitcher specials all day. Chill crowd right now.",
      1: "Monday night industry discount! Place is chill but all the bartenders and servers from other spots are here.",
      2: "Tuesday trivia night about to start! Still time to register a team and the bar isn't full yet.",
      3: "Wednesday karaoke night is just warming up! Get here in the next hour to get your name on the list early.",
      4: "Thursday night and the DJ just started. Dance floor is filling up but still room to move!",
      5: "Friday night and this place is pumping! Line starting to form outside but worth the wait!",
      6: "Saturday night and the vibe is electric! Get here now because they're almost at capacity."
    },
    "event": {
      0: "Sunday outdoor market is perfect today! Hardly any crowds and vendors still have full inventory.",
      1: "Monday evening art exhibition is surprisingly busy! Drinks flowing and the artist is here in person.",
      2: "Tuesday workshop just started! They still have a few spots left if you hurry.",
      3: "Wednesday panel discussion is super engaging! Back rows still have seats available.",
      4: "Thursday night screening about to start! Popcorn is fresh and best seats are in the middle.",
      5: "Friday night show is about to go on! Opening act just started and the venue is filling up fast.",
      6: "Saturday festival is in full swing! Main stage has the headliner in an hour, food lines aren't bad yet."
    },
    "attraction": {
      0: "Sunday at this attraction is perfect! Families are mostly gone and it's so peaceful now.",
      1: "Monday is definitely the day to visit! Almost have the whole place to ourselves.",
      2: "Tuesday afternoon and barely any tourists! Perfect time for photos without crowds.",
      3: "Wednesday special exhibit just opened! Only a small line right now to get in.",
      4: "Thursday evening hours are extended today! Sun setting over the view is magical right now.",
      5: "Friday afternoon and surprisingly manageable crowds! They just opened another ticket window.",
      6: "Saturday is busy but the north entrance has almost no line! Pro tip: enter from there."
    },
    "sports": {
      0: "Sunday game day! Tailgating already starting in the parking lot. Gates open in an hour.",
      1: "Monday night game and the energy is building! Club level seats still available at the box office.",
      2: "Tuesday exhibition match about to start! Great seats still available behind home dugout.",
      3: "Wednesday game is a perfect night for baseball! Beer lines are short between innings.",
      4: "Thursday night game is surprisingly packed! Good energy in the stadium tonight.",
      5: "Friday night lights! Stadium is filling up fast and the student section is going crazy.",
      6: "Saturday rivalry game is intense! Crowd is evenly split and the chants are getting wild."
    }
  };

  // Default to "other" if venue type not found
  const venueCategory = Object.keys(dayContent).includes(venueType) ? venueType : "event";
  
  // Return the specific content or a generic fallback
  return dayContent[venueCategory][dayOfWeek] || 
    `Amazing ${["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayOfWeek]} vibe here right now! You need to check it out.`;
};

// Get an appropriate image URL for a day of week and venue type
export const getDaySpecificImageUrl = (venueType: string, dayOfWeek: number): string => {
  // Image URLs specific to day and venue type
  const dayImages: Record<string, Record<number, string>> = {
    "restaurant": {
      0: "https://images.unsplash.com/photo-1529059997568-3d847b1154f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Sunday brunch 
      1: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Monday lunch
      2: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Tuesday tacos
      3: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Wednesday wine
      4: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Thursday fine dining
      5: "https://images.unsplash.com/photo-1529604278261-8bfcbc4a39a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Friday dinner crowd
      6: "https://images.unsplash.com/photo-1555992336-fb0d29498b13?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"  // Saturday night dinner
    },
    "bar": {
      0: "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Sunday sports bar
      1: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Monday quiet night
      2: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Tuesday trivia
      3: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Wednesday karaoke
      4: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Thursday DJ night
      5: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Friday night crowd
      6: "https://images.unsplash.com/photo-1556035511-3168381ea4d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"  // Saturday night party
    },
    "event": {
      0: "https://images.unsplash.com/photo-1534237710431-e2fc698436d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Sunday market
      1: "https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Monday art exhibit
      2: "https://images.unsplash.com/photo-1522158637959-30ab854becb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Tuesday workshop
      3: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Wednesday panel
      4: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Thursday screening
      5: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Friday concert
      6: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"  // Saturday festival
    },
    "attraction": {
      0: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Sunday peaceful
      1: "https://images.unsplash.com/photo-1564221710304-0b37c8b9d729?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Monday empty
      2: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Tuesday no tourists
      3: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Wednesday exhibit
      4: "https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Thursday sunset
      5: "https://images.unsplash.com/photo-1558383817-8796e818ebb4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Friday crowds
      6: "https://images.unsplash.com/photo-1558383817-8796e818ebb4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"  // Saturday busy
    },
    "sports": {
      0: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Sunday tailgate
      1: "https://images.unsplash.com/photo-1518775053278-5a569f0981b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Monday night game
      2: "https://images.unsplash.com/photo-1571701652407-c692da042188?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Tuesday exhibition
      3: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Wednesday baseball
      4: "https://images.unsplash.com/photo-1508098682722-e99c643e7558?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Thursday game
      5: "https://images.unsplash.com/photo-1560012057-4372e14c5085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Friday night
      6: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"  // Saturday rivalry
    }
  };

  // Default to "other" if venue type not found
  const venueCategory = Object.keys(dayImages).includes(venueType) ? venueType : "event";
  
  // Return the specific image or a generic fallback
  return dayImages[venueCategory][dayOfWeek] || 
    "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
};

// Create day-specific venue posts for all days of the week
export const createDaySpecificVenuePosts = (venue: Location): Post[] => {
  const dayPosts: Post[] = [];
  
  // Generate a post for each day of the week
  for (let day = 0; day < 7; day++) {
    const timestamp = getRecentTimeForDayOfWeek(day);
    const content = getDaySpecificContent(venue.type, day);
    const imageUrl = getDaySpecificImageUrl(venue.type, day);
    
    dayPosts.push({
      id: `venue-${venue.id}-day-${day}`,
      user: { 
        id: 'venue',
        name: venue.name,
        username: venue.name.toLowerCase().replace(/\s+/g, '') || 'venue',
        avatar: `https://source.unsplash.com/random/200x200/?${venue.type}`
      },
      location: venue,
      content,
      media: [
        {
          type: "image",
          url: imageUrl
        }
      ],
      timestamp,
      expiresAt: getExpiryTime(timestamp),
      likes: Math.floor(Math.random() * 100) + 20,
      comments: Math.floor(Math.random() * 20),
      isVenuePost: true,
    });
  }
  
  return dayPosts;
};
