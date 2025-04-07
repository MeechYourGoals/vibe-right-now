
import { Location } from "@/types";
import VenuePost from "@/components/VenuePost";
import { getMediaForLocation } from "@/utils/map/locationMediaUtils";
import { getLocationVibes } from "@/utils/locationUtils";

interface RecentVibesProps {
  location: Location;
}

const RecentVibes = ({ location }: RecentVibesProps) => {
  const locationVibes = getLocationVibes(location.id);
  
  // Generate relevant venue content for different location types
  const getVenueContent = (locationType: string, locationName: string): string => {
    switch (locationType) {
      case "restaurant":
        return `Today's special: ${locationName === "Artisan Coffee House" ? "Fresh brewed Ethiopian coffee and homemade pastries!" : "Chef's signature dish with seasonal ingredients!"}`;
      case "bar":
        return `Happy hour tonight from 5-7PM! ${locationName.includes("Rooftop") ? "Enjoy amazing views with your cocktails." : "Live DJ starting at 9PM!"}`;
      case "event":
        return `Tickets still available for ${locationName}! Use code VIBES for 10% off your purchase.`;
      case "sports":
        return locationName.includes("Lakers") ? "Lakers tickets for tonight's game are going fast! Premium seats still available." : 
               locationName.includes("Golf") ? "Perfect weather for golfing today! Tee times available." : 
               "Game day is here! Come early for special fan activities.";
      case "attraction":
        return `Beat the crowds! Current wait time is only 15 minutes for ${locationName}.`;
      default:
        return `Don't miss our special event at ${locationName} today!`;
    }
  };
  
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
          <>
            <VenuePost
              venue={location}
              content={getVenueContent(location.type, location.name)}
              media={getMediaForLocation(location)}
              timestamp={new Date().toISOString()}
            />
            <VenuePost
              venue={location}
              content={`Check out what's happening at ${location.name}! ${location.type === "restaurant" ? "Our new menu is now available." : location.type === "bar" ? "New signature cocktails just added!" : "Special offers for VRN users!"}"`}
              media={getMediaForLocation(location)}
              timestamp={new Date(Date.now() - 3600000).toISOString()}
            />
          </>
        )}
      </div>
    </>
  );
};

export default RecentVibes;
