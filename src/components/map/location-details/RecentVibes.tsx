
import { Location } from "@/types";
import VenuePost from "@/components/VenuePost";
import { mockPosts } from "@/mock/data";

interface RecentVibesProps {
  location: Location;
}

const RecentVibes = ({ location }: RecentVibesProps) => {
  // Get media for the location
  const getMediaForLocation = (location: Location) => {
    // Return appropriate media based on location type and name
    const imageMap: Record<string, string> = {
      // Sports venues
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

  // Find vibes for a specific location
  const getLocationVibes = (locationId: string) => {
    return mockPosts.filter(post => post.location.id === locationId).slice(0, 2);
  };

  const locationVibes = getLocationVibes(location.id);
  
  return (
    <>
      <h4 className="font-medium text-sm mb-2">Recent Vibes</h4>
      <div className="space-y-4">
        {locationVibes.length > 0 ? (
          locationVibes.map(post => (
            <VenuePost
              key={post.id}
              venue={location}
              content={post.content}
              media={getMediaForLocation(location)}
              timestamp={post.timestamp}
            />
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No recent vibes for this location.</p>
        )}
      </div>
    </>
  );
};

export default RecentVibes;
