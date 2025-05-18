
import { Location, Media } from "@/types";

// Get media for a location
export const getMediaForLocation = (location: Location): Media => {
  // Return appropriate media based on location type and name
  const imageMap: Record<string, string> = {
    // Sports venues - updated with reliable Unsplash images
    "30": "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=600&q=80&auto=format&fit=crop",  // Lakers
    "31": "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=600&q=80&auto=format&fit=crop",  // Rams
    "32": "https://images.unsplash.com/photo-1566577134624-d9b13555e288?w=600&q=80&auto=format&fit=crop",  // Dodgers
    "33": "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&q=80&auto=format&fit=crop",  // LA Galaxy
    "34": "https://images.unsplash.com/photo-1530915872-13619796d013?w=600&q=80&auto=format&fit=crop",    // Volleyball
    "35": "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80&auto=format&fit=crop",  // Golf
    // Adding more reliable images for all venues
    "1": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80&auto=format&fit=crop", // Sunset Lounge
    "2": "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&q=80&auto=format&fit=crop", // Artisan Coffee
    "3": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80&auto=format&fit=crop", // Music Festival
    "4": "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&q=80&auto=format&fit=crop", // Modern Art Museum
    "5": "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80&auto=format&fit=crop", // Skyline Rooftop
    "6": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80&auto=format&fit=crop", // Madison Square Garden
    "7": "https://images.unsplash.com/photo-1514913274516-4aa04f176f8c?w=600&q=80&auto=format&fit=crop", // Encore Beach Club
    "8": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80&auto=format&fit=crop", // Christ the Redeemer
    "9": "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=600&q=80&auto=format&fit=crop", // Aspen Highlands
    "10": "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80&auto=format&fit=crop", // Allegiant Stadium
    "11": "https://images.unsplash.com/photo-1545579133-99bb5ab189bd?w=600&q=80&auto=format&fit=crop", // Mama's Fish House
    "12": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80&auto=format&fit=crop", // Barry's Bootcamp
    "13": "https://images.unsplash.com/photo-1560147307-7fef1854cd4a?w=600&q=80&auto=format&fit=crop", // Houston Rodeo
    "14": "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&q=80&auto=format&fit=crop", // Laugh Factory
    "15": "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&q=80&auto=format&fit=crop", // Disney Wonder Cruise
    "16": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80&auto=format&fit=crop", // Sweet Delights Bakery
    "17": "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=600&q=80&auto=format&fit=crop", // Waldorf Astoria
    "18": "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?w=600&q=80&auto=format&fit=crop", // Sydney Opera House
    "19": "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=600&q=80&auto=format&fit=crop", // Eiffel Tower
    "20": "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80&auto=format&fit=crop", // Coachella
    "21": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80&auto=format&fit=crop", // Gucci Pop-Up
    "22": "https://images.unsplash.com/photo-1639815188546-c43c240ff4df?w=600&q=80&auto=format&fit=crop", // Bitcoin Conference
    "23": "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80&auto=format&fit=crop", // InvestFest
    "24": "https://images.unsplash.com/photo-1559166631-ef208440c75a?w=600&q=80&auto=format&fit=crop", // Austin Night Runners
    "25": "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=600&q=80&auto=format&fit=crop", // Comedy Cellar
    "26": "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=600&q=80&auto=format&fit=crop", // Skyline Nightclub
    "27": "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?w=600&q=80&auto=format&fit=crop", // Sunrise Bakery
    "28": "https://images.unsplash.com/photo-1535086181678-5a5c4d23aa7d?w=600&q=80&auto=format&fit=crop", // Coachella VIP
    "29": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80&auto=format&fit=crop", // CES Las Vegas
    // Add any other venues that were missing
    "95": "https://images.unsplash.com/photo-1455621481073-d5bc1c40e3cb?w=600&q=80&auto=format&fit=crop", // Old Port Pub
  };

  // Default media based on type if no specific image is available
  const typeDefaultMedia: Record<string, string> = {
    "restaurant": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80&auto=format&fit=crop",
    "bar": "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&q=80&auto=format&fit=crop",
    "event": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80&auto=format&fit=crop",
    "attraction": "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&q=80&auto=format&fit=crop",
    "sports": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80&auto=format&fit=crop",
    "other": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80&auto=format&fit=crop",
  };

  // Fallback image in case all else fails
  const fallbackImage = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&q=80&auto=format&fit=crop";

  // Build the URL with explicit quality and size parameters to ensure loading
  const imageUrl = imageMap[location.id] || 
                  typeDefaultMedia[location.type as string] || 
                  fallbackImage;

  return {
    type: "image" as const,
    url: imageUrl
  };
};
