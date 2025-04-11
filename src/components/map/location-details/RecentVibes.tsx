
import { Location } from "@/types";
import VenuePost from "@/components/VenuePost";
import { getMediaForLocation } from "@/utils/map/locationMediaUtils";
import { getLocationVibes } from "@/utils/locationUtils";
import { 
  isWithinThreeMonths, 
  getDaySpecificContent, 
  getDaySpecificImageUrl
} from "@/mock/time-utils";
import { formatTimestamp } from "@/lib/utils";

interface RecentVibesProps {
  location: Location;
}

const RecentVibes = ({ location }: RecentVibesProps) => {
  const locationVibes = getLocationVibes(location.id)
    .filter(vibe => isWithinThreeMonths(vibe.timestamp));
  
  // Get current day of week to show content for today
  const today = new Date();
  const dayOfWeek = today.getDay();
  
  // Get content specific to today's day of week
  const todayContent = getDaySpecificContent(location.type, dayOfWeek);
  const todayImage = {
    type: "image" as const,
    url: getDaySpecificImageUrl(location.type, dayOfWeek) || getMediaForLocation(location).url
  };
  
  // Get content for another day (2 days earlier)
  const previousDay = (dayOfWeek - 2 + 7) % 7; // Ensure it's a positive number
  const previousContent = getDaySpecificContent(location.type, previousDay);
  const previousImage = {
    type: "image" as const,
    url: getDaySpecificImageUrl(location.type, previousDay) || getMediaForLocation(location).url
  };
  
  return (
    <>
      <h4 className="font-medium text-sm mb-2">Recent Vibes <span className="text-xs text-muted-foreground">(up to 3 months)</span></h4>
      <div className="space-y-4">
        {locationVibes.length > 0 ? (
          locationVibes.map(post => (
            <div key={post.id} className="border-2 border-amber-500/50 rounded-lg overflow-hidden">
              <VenuePost
                venue={location}
                content={post.content}
                media={getMediaForLocation(location)}
                timestamp={formatTimestamp(post.timestamp)}
              />
            </div>
          ))
        ) : (
          <>
            <div className="border-2 border-amber-500/50 rounded-lg overflow-hidden">
              <VenuePost
                venue={location}
                content={todayContent}
                media={todayImage}
                timestamp={formatTimestamp(new Date().toISOString())}
              />
            </div>
            <div className="border-2 border-amber-500/50 rounded-lg overflow-hidden">
              <VenuePost
                venue={location}
                content={previousContent}
                media={previousImage}
                timestamp={formatTimestamp(new Date(Date.now() - 3600000 * 48).toISOString())}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RecentVibes;
