
import { Location, Media } from "@/types";

// Get media for a location
export const getMediaForLocation = (location: Location): Media => {
  // Return appropriate media based on location type and name
  const imageMap: Record<string, string> = {
    // Sports venues with relevant images
    "30": "https://images.pexels.com/photos/2570139/pexels-photo-2570139.jpeg?auto=compress&cs=tinysrgb&w=600", // Lakers - basketball court
    "31": "https://images.pexels.com/photos/163452/football-american-football-quarterback-runner-163452.jpeg?auto=compress&cs=tinysrgb&w=600", // Rams - football field
    "32": "https://images.pexels.com/photos/2570843/pexels-photo-2570843.jpeg?auto=compress&cs=tinysrgb&w=600", // Dodgers - baseball field
    "33": "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=600", // LA Galaxy - soccer field
    "34": "https://images.pexels.com/photos/2444852/pexels-photo-2444852.jpeg?auto=compress&cs=tinysrgb&w=600", // Volleyball - volleyball game
    "35": "https://images.pexels.com/photos/114972/pexels-photo-114972.jpeg?auto=compress&cs=tinysrgb&w=600", // Golf - golf course
    // Entertainment venues
    "1": "https://images.pexels.com/photos/1267350/pexels-photo-1267350.jpeg?auto=compress&cs=tinysrgb&w=600", // Sunset Lounge - bar with sunset view
    "2": "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=600", // Artisan Coffee - coffee shop with latte art
    "3": "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600", // Music Festival - concert crowd
    "4": "https://images.pexels.com/photos/1674049/pexels-photo-1674049.jpeg?auto=compress&cs=tinysrgb&w=600", // Modern Art Museum - art gallery
    "5": "https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&cs=tinysrgb&w=600", // Skyline Rooftop - rooftop bar with city view
    "6": "https://images.pexels.com/photos/2409681/pexels-photo-2409681.jpeg?auto=compress&cs=tinysrgb&w=600", // Madison Square Garden - indoor arena
    "7": "https://images.pexels.com/photos/2507007/pexels-photo-2507007.jpeg?auto=compress&cs=tinysrgb&w=600", // Encore Beach Club - pool party
    "8": "https://images.pexels.com/photos/2868242/pexels-photo-2868242.jpeg?auto=compress&cs=tinysrgb&w=600", // Christ the Redeemer - Rio landmark
    "9": "https://images.pexels.com/photos/848618/pexels-photo-848618.jpeg?auto=compress&cs=tinysrgb&w=600", // Aspen Highlands - ski resort
    "10": "https://images.pexels.com/photos/139762/pexels-photo-139762.jpeg?auto=compress&cs=tinysrgb&w=600", // Allegiant Stadium - football stadium
    "11": "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600", // Mama's Fish House - seafood restaurant
    "12": "https://images.pexels.com/photos/3836861/pexels-photo-3836861.jpeg?auto=compress&cs=tinysrgb&w=600", // Barry's Bootcamp - gym workout
    "13": "https://images.pexels.com/photos/2959288/pexels-photo-2959288.jpeg?auto=compress&cs=tinysrgb&w=600", // Houston Rodeo - rodeo event
    "14": "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=600", // Laugh Factory - comedy club
    "15": "https://images.pexels.com/photos/813011/pexels-photo-813011.jpeg?auto=compress&cs=tinysrgb&w=600", // Disney Wonder Cruise - cruise ship
    "16": "https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg?auto=compress&cs=tinysrgb&w=600", // Sweet Delights Bakery - pastries
    "17": "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=600", // Waldorf Astoria - luxury hotel
    "18": "https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg?auto=compress&cs=tinysrgb&w=600", // Sydney Opera House
    "19": "https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=600", // Eiffel Tower
    "20": "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600", // Coachella - music festival
    "21": "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=600", // Gucci Pop-Up - fashion retail
    "22": "https://images.pexels.com/photos/6780789/pexels-photo-6780789.jpeg?auto=compress&cs=tinysrgb&w=600", // Bitcoin Conference - tech conference
    "23": "https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=600", // InvestFest - finance conference
    "24": "https://images.pexels.com/photos/235922/pexels-photo-235922.jpeg?auto=compress&cs=tinysrgb&w=600", // Austin Night Runners - running group
    "25": "https://images.pexels.com/photos/7991634/pexels-photo-7991634.jpeg?auto=compress&cs=tinysrgb&w=600", // Comedy Cellar - comedy venue
    "26": "https://images.pexels.com/photos/1604869/pexels-photo-1604869.jpeg?auto=compress&cs=tinysrgb&w=600", // Skyline Nightclub - club with lights
    "27": "https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=600", // Sunrise Bakery - fresh bread
    "28": "https://images.pexels.com/photos/154147/pexels-photo-154147.jpeg?auto=compress&cs=tinysrgb&w=600", // Coachella VIP - VIP festival experience
    "29": "https://images.pexels.com/photos/4065864/pexels-photo-4065864.jpeg?auto=compress&cs=tinysrgb&w=600", // CES Las Vegas - tech convention
    "95": "https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg?auto=compress&cs=tinysrgb&w=600", // Old Port Pub - traditional pub
  };

  // Default media based on type if no specific image is available
  const typeDefaultMedia: Record<string, string> = {
    "restaurant": "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=600", // Restaurant interior
    "bar": "https://images.pexels.com/photos/34631/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600", // Bar with bottles
    "event": "https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=600", // Event with crowd
    "attraction": "https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=600", // Tourist attraction
    "sports": "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=600", // Sports stadium
    "other": "https://images.pexels.com/photos/2493157/pexels-photo-2493157.jpeg?auto=compress&cs=tinysrgb&w=600", // General venue
  };

  // Reliable fallback image that will definitely load
  const fallbackImage = "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=600"; // City skyline

  // Build the URL with explicit quality and compression parameters for better loading
  const imageUrl = imageMap[location.id] || 
                  typeDefaultMedia[location.type as string] || 
                  fallbackImage;

  return {
    type: "image" as const,
    url: imageUrl
  };
};
