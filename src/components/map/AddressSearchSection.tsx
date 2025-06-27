
import React, { useState } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface AddressSearchSectionProps {
  onAddressSearch: (address: string) => void;
  onUseCurrentLocation: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  loading: boolean;
  hasUserLocation: boolean;
}

const AddressSearchSection: React.FC<AddressSearchSectionProps> = ({
  onAddressSearch,
  onUseCurrentLocation,
  isOpen,
  setIsOpen,
  loading,
  hasUserLocation
}) => {
  const [addressInput, setAddressInput] = useState("");

  const handleAddressSubmit = () => {
    if (!addressInput.trim()) {
      toast.error("Please enter an address");
      return;
    }
    onAddressSearch(addressInput);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" disabled={loading}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MapPin className="h-4 w-4" />
          )}
          Distance
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h4 className="font-medium">Show distances from your location</h4>
          
          {hasUserLocation && (
            <Button 
              onClick={onUseCurrentLocation}
              className="w-full"
              variant="default"
            >
              Use Current Location
            </Button>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Or enter an address:</label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter address..."
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddressSubmit()}
              />
              <Button onClick={handleAddressSubmit} size="sm">
                Search
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AddressSearchSection;
