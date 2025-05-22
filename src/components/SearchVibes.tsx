import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Globe, MapPin, Star } from "lucide-react";
import { mockLocations } from "@/mock/locations";
import { Link } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { eventBus } from "@/components/TrendingLocations";
import { User, Location } from "@/types";
import { mockUsers } from "@/mock/users";

interface SearchVibesProps {
  onSearch?: (query: string, filterType: string) => void;
}

const SearchVibes = ({ onSearch }: SearchVibesProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [filterType, setFilterType] = useState("All");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query, filterType);
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setSearchQuery(location.name);
    setOpen(false);
    onSearch?.(location.name, filterType);

    // Update trending locations via event bus
    eventBus.emit('trending-locations-update', {
      cityName: location.city,
      events: mockLocations.filter(loc => loc.city === location.city)
    });
  };

  const handleFilterTypeChange = (type: string) => {
    setFilterType(type);
    onSearch?.(searchQuery, type);
  };

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Search for vibes..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => setOpen(true)}
        className="rounded-full shadow-sm"
      />
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a location..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Locations">
            <ScrollArea className="h-72">
              {mockLocations
                .filter((location) =>
                  location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  location.city.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((location) => (
                  <CommandItem
                    key={location.id}
                    value={location.name}
                    onSelect={() => handleLocationSelect(location)}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 opacity-50" />
                      <span>{location.name}, {location.city}</span>
                      {location.verified && <Star className="ml-1 h-3 w-3 text-blue-500" />}
                    </div>
                    <Globe className="ml-2 h-4 w-4 opacity-50" />
                  </CommandItem>
                ))}
            </ScrollArea>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default SearchVibes;
