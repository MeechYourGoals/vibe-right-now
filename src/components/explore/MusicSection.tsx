
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import EventsList from "@/components/venue/events/EventsList";
import { EventItem } from "@/components/venue/events/types";

interface MusicSectionProps {
  musicEvents: EventItem[];
  searchedCity: string;
  dateRange: DateRange | undefined;
}

const MusicSection = ({ musicEvents, searchedCity, dateRange }: MusicSectionProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        Music Events in {searchedCity}
        {dateRange?.from && (
          <Badge className="ml-2 bg-indigo-100 text-indigo-800">
            {format(dateRange.from, "MMM yyyy")}
            {dateRange.to && ` - ${format(dateRange.to, "MMM yyyy")}`}
          </Badge>
        )}
      </h2>
      <div className="space-y-4">
        <EventsList events={musicEvents} />
      </div>
    </div>
  );
};

export default MusicSection;
