
import React, { useState } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useGooglePlacesAutocomplete } from '@/hooks/useGooglePlacesAutocomplete';

interface CityAutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  onCitySelect: (city: string, placeId: string) => void;
  placeholder?: string;
}

const CityAutocompleteInput: React.FC<CityAutocompleteInputProps> = ({
  value,
  onChange,
  onCitySelect,
  placeholder = "Enter location..."
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const { predictions, isLoading } = useGooglePlacesAutocomplete({
    input: value,
    types: ['(cities)'],
    componentRestrictions: { country: ['us'] }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setShowSuggestions(newValue.length > 1);
  };

  const handleCitySelect = (prediction: any) => {
    onChange(prediction.main_text);
    onCitySelect(prediction.main_text, prediction.place_id);
    setShowSuggestions(false);
  };

  const handleInputFocus = () => {
    if (value.length > 1) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => setShowSuggestions(false), 150);
  };

  return (
    <div className="relative">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="pl-10"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>
      
      {showSuggestions && predictions.length > 0 && (
        <Card className="absolute z-50 w-full mt-1 shadow-lg border border-border">
          <CardContent className="p-0">
            <div className="max-h-60 overflow-y-auto">
              {predictions.map((prediction) => (
                <div
                  key={prediction.place_id}
                  className="flex items-center gap-3 p-3 hover:bg-muted cursor-pointer border-b last:border-b-0"
                  onClick={() => handleCitySelect(prediction)}
                >
                  <div className="h-8 w-8 flex items-center justify-center rounded-md bg-primary/10">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{prediction.main_text}</span>
                    <span className="text-xs text-muted-foreground">{prediction.secondary_text}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CityAutocompleteInput;
