
import { Location, Media } from "@/types";

// Get media for a location
export const getMediaForLocation = (location: Location): Media => {
  // Return appropriate media based on location type and name
  const imageMap: Record<string, string> = {
    // Sports venues
    "5": "https://images.unsplash.com/photo-1519214605650-76a613ee3245?q=80&w=1000&auto=format&fit=crop", // Skyline Rooftop Bar
    "6": "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1000&auto=format&fit=crop", // Madison Square Garden
    "7": "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1000&auto=format&fit=crop", // Encore Beach Club
    "8": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=1000&auto=format&fit=crop", // Christ the Redeemer
    "9": "https://images.unsplash.com/photo-1551524559-8af4e6624178?q=80&w=1000&auto=format&fit=crop", // Aspen Highlands
    "10": "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000&auto=format&fit=crop", // Allegiant Stadium
    "11": "https://images.unsplash.com/photo-1545579133-99bb5ab189bd?q=80&w=1000&auto=format&fit=crop", // Mama's Fish House
    "12": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop", // Barry's Bootcamp
    "13": "https://images.unsplash.com/photo-1560147307-7fef1854cd4a?q=80&w=1000&auto=format&fit=crop", // Houston Rodeo
    "14": "https://images.unsplash.com/photo-1527224857830-43a7acc85260?q=80&w=1000&auto=format&fit=crop", // Laugh Factory
    "15": "https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=1000&auto=format&fit=crop", // Disney Wonder
    "16": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1000&auto=format&fit=crop", // Corner Bakery
    "17": "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?q=80&w=1000&auto=format&fit=crop", // Waldorf Rooftop
    "18": "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?q=80&w=1000&auto=format&fit=crop", // Sydney Opera House
    "19": "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1000&auto=format&fit=crop", // Eiffel Tower
    "20": "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1000&auto=format&fit=crop", // Coachella
    "21": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop", // Gucci Pop-Up
    "22": "https://images.unsplash.com/photo-1639815188546-c43c240ff4df?q=80&w=1000&auto=format&fit=crop", // Bitcoin Conference  
    "23": "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1000&auto=format&fit=crop", // InvestFest
    "24": "https://images.unsplash.com/photo-1527224857830-43a7acc85260?q=80&w=1000&auto=format&fit=crop", // Comedy Cellar
    "25": "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1000&auto=format&fit=crop", // Skyline Nightclub
    "26": "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?q=80&w=1000&auto=format&fit=crop", // Sunrise Bakery
    "27": "https://images.unsplash.com/photo-1535086181678-5a5c4d23aa7d?q=80&w=1000&auto=format&fit=crop", // Coachella VIP
    "28": "https://images.unsplash.com/photo-1639815188546-c43c240ff4df?q=80&w=1000&auto=format&fit=crop", // Bitcoin Conference
    "29": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop", // CES Las Vegas
    "30": "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1000&auto=format&fit=crop",  // Lakers
    "31": "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=1000&auto=format&fit=crop",  // Rams
    "32": "https://images.unsplash.com/photo-1566577134624-d9b13555e288?q=80&w=1000&auto=format&fit=crop",  // Dodgers
    "33": "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=1000&auto=format&fit=crop",  // LA Galaxy
    "34": "https://images.unsplash.com/photo-1530915872-13619796d013?q=80&w=1000&auto=format&fit=crop",    // Volleyball
    "35": "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=1000&auto=format&fit=crop",  // Golf
  };

  // Default media based on type if no specific image is available
  const typeDefaultMedia: Record<string, string> = {
    "restaurant": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop",
    "bar": "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=1000&auto=format&fit=crop",
    "event": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop",
    "attraction": "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=1000&auto=format&fit=crop",
    "sports": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop",
    "other": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop",
  };

  return {
    type: "image" as const,
    url: imageMap[location.id] || typeDefaultMedia[location.type] || `https://source.unsplash.com/random/800x600/?${location.type},${location.city}`
  };
};
