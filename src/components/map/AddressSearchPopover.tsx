
import React, { useState } from "react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, LocateFixed } from "lucide-react";
import { toast } from "sonner";

interface AddressSearchPopoverProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSearch: (address: string) => Promise<void>;
  onUseCurrentLocation: () => void;
  loading: boolean;
  hasUserLocation: boolean;
}

const AddressSearchPopover = ({
  isOpen,
  setIsOpen,
  onSearch,
  onUseCurrentLocation,
  loading,
  hasUserLocation
}: AddressSearchPopoverProps) => {
  const [addressInput, setAddressInput] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(addressInput);
  };
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1">
          <MapPin className="h-4 w-4" />
          View Distance
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 z-[9999]">
        <form onSubmit={handleSubmit} className="space-y-3">
          <h4 className="font-medium">Enter your address</h4>
          <p className="text-xs text-muted-foreground">
            Enter your address to see how far each location is from you
          </p>
          <div className="flex gap-2">
            <Input 
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              placeholder="123 Main St, City, State"
              className="flex-1"
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Go"}
            </Button>
          </div>
          {hasUserLocation && (
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={onUseCurrentLocation}
            >
              <LocateFixed className="h-4 w-4 mr-2" />
              Use my current location
            </Button>
          )}
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default AddressSearchPopover;
