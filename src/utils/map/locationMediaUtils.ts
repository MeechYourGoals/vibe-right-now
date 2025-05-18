
import { Location, Media } from "@/types";

// Get media for a location
export const getMediaForLocation = (location: Location): Media => {
  // Return appropriate media based on location type and name using Pexels API
  const imageMap: Record<string, string> = {
    // Sports venues - updated with reliable Pexels images
    "30": "https://images.pexels.com/photos/3582640/pexels-photo-3582640.jpeg?auto=compress&cs=tinysrgb&w=600",  // Lakers
    "31": "https://images.pexels.com/photos/66334/pexels-photo-66334.jpeg?auto=compress&cs=tinysrgb&w=600",  // Rams
    "32": "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=600",  // Dodgers
    "33": "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=600",  // LA Galaxy
    "34": "https://images.pexels.com/photos/1263426/pexels-photo-1263426.jpeg?auto=compress&cs=tinysrgb&w=600",  // Volleyball
    "35": "https://images.pexels.com/photos/54123/pexels-photo-54123.jpeg?auto=compress&cs=tinysrgb&w=600",  // Golf
    // Adding more reliable images for all venues
    "1": "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=600", // Sunset Lounge
    "2": "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=600", // Artisan Coffee
    "3": "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=600", // Music Festival
    "4": "https://images.pexels.com/photos/20967/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600", // Modern Art Museum
    "5": "https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=600", // Skyline Rooftop
    "6": "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=600", // Madison Square Garden
    "7": "https://images.pexels.com/photos/948834/pexels-photo-948834.jpeg?auto=compress&cs=tinysrgb&w=600", // Encore Beach Club
    "8": "https://images.pexels.com/photos/2868242/pexels-photo-2868242.jpeg?auto=compress&cs=tinysrgb&w=600", // Christ the Redeemer
    "9": "https://images.pexels.com/photos/848618/pexels-photo-848618.jpeg?auto=compress&cs=tinysrgb&w=600", // Aspen Highlands
    "10": "https://images.pexels.com/photos/2531904/pexels-photo-2531904.jpeg?auto=compress&cs=tinysrgb&w=600", // Allegiant Stadium
    "11": "https://images.pexels.com/photos/6287210/pexels-photo-6287210.jpeg?auto=compress&cs=tinysrgb&w=600", // Mama's Fish House
    "12": "https://images.pexels.com/photos/28080/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600", // Barry's Bootcamp
    "13": "https://images.pexels.com/photos/33825/cowboy-the-horse-horse-jumps.jpg?auto=compress&cs=tinysrgb&w=600", // Houston Rodeo
    "14": "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=600", // Laugh Factory
    "15": "https://images.pexels.com/photos/144640/pexels-photo-144640.jpeg?auto=compress&cs=tinysrgb&w=600", // Disney Wonder Cruise
    "16": "https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=600", // Sweet Delights Bakery
    "17": "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=600", // Waldorf Astoria
    "18": "https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg?auto=compress&cs=tinysrgb&w=600", // Sydney Opera House
    "19": "https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=600", // Eiffel Tower
    "20": "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600", // Coachella
    "21": "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=600", // Gucci Pop-Up
    "22": "https://images.pexels.com/photos/6771900/pexels-photo-6771900.jpeg?auto=compress&cs=tinysrgb&w=600", // Bitcoin Conference
    "23": "https://images.pexels.com/photos/2422280/pexels-photo-2422280.jpeg?auto=compress&cs=tinysrgb&w=600", // InvestFest
    "24": "https://images.pexels.com/photos/1571939/pexels-photo-1571939.jpeg?auto=compress&cs=tinysrgb&w=600", // Austin Night Runners
    "25": "https://images.pexels.com/photos/8107191/pexels-photo-8107191.jpeg?auto=compress&cs=tinysrgb&w=600", // Comedy Cellar
    "26": "https://images.pexels.com/photos/1540319/pexels-photo-1540319.jpeg?auto=compress&cs=tinysrgb&w=600", // Skyline Nightclub
    "27": "https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=600", // Sunrise Bakery
    "28": "https://images.pexels.com/photos/1540341/pexels-photo-1540341.jpeg?auto=compress&cs=tinysrgb&w=600", // Coachella VIP
    "29": "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600", // CES Las Vegas
    // Add any other venues that were missing
    "95": "https://images.pexels.com/photos/1267696/pexels-photo-1267696.jpeg?auto=compress&cs=tinysrgb&w=600", // Old Port Pub
  };

  // Default media based on type if no specific image is available
  const typeDefaultMedia: Record<string, string> = {
    "restaurant": "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600",
    "bar": "https://images.pexels.com/photos/274192/pexels-photo-274192.jpeg?auto=compress&cs=tinysrgb&w=600",
    "event": "https://images.pexels.com/photos/196652/pexels-photo-196652.jpeg?auto=compress&cs=tinysrgb&w=600",
    "attraction": "https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=600",
    "sports": "https://images.pexels.com/photos/69773/stadium-barcelona-spain-the-field-69773.jpeg?auto=compress&cs=tinysrgb&w=600",
    "other": "https://images.pexels.com/photos/236148/pexels-photo-236148.jpeg?auto=compress&cs=tinysrgb&w=600",
  };

  // Fallback image in case all else fails - using a very reliable Pexels image
  const fallbackImage = "https://images.pexels.com/photos/670720/pexels-photo-670720.jpeg?auto=compress&cs=tinysrgb&w=600";

  // Build the URL with explicit quality and size parameters to ensure loading
  const imageUrl = imageMap[location.id] || 
                  typeDefaultMedia[location.type as string] || 
                  fallbackImage;

  return {
    type: "image" as const,
    url: imageUrl
  };
};
