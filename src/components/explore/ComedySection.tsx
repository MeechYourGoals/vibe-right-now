
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Badge } from "@/components/ui/badge";
import EventsList from "@/components/venue/events/EventsList";
import { EventItem } from "@/components/venue/events/types";

interface ComedySectionProps {
  comedyEvents: EventItem[];
  searchedCity: string;
  dateRange: DateRange | undefined;
}

const ComedySection = ({ comedyEvents, searchedCity, dateRange }: ComedySectionProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        Comedy Shows in {searchedCity}
        {dateRange?.from && (
          <Badge className="ml-2 bg-indigo-100 text-indigo-800">
            {format(dateRange.from, "MMM yyyy")}
            {dateRange.to && ` - ${format(dateRange.to, "MMM yyyy")}`}
          </Badge>
        )}
      </h2>
      <div className="space-y-4">
        <EventsList events={comedyEvents.map(event => ({
          ...event,
          type: "comedy"
        }))} />
      </div>
    </div>
  );
};

export default ComedySection;
