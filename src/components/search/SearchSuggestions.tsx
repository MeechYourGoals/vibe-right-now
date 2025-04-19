
import React from 'react';
import { MapPin, Star, Sparkles } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Location } from '@/types';

interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
}

interface SearchSuggestionsProps {
  searchCategory: string;
  showUserSuggestions: boolean;
  showPlaceSuggestions: boolean;
  showCitySuggestions: boolean;
  showVibeSuggestions: boolean;
  suggestedUsers: User[];
  premiumPlaces: Location[];
  citySuggestions: string[];
  vibeSuggestions: string[];
  onUserSelect: (username: string) => void;
  onPlaceSelect: (placeName: string) => void;
  onCitySelect: (city: string) => void;
  onVibeSelect: (vibe: string) => void;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  searchCategory,
  showUserSuggestions,
  showPlaceSuggestions,
  showCitySuggestions,
  showVibeSuggestions,
  suggestedUsers,
  premiumPlaces,
  citySuggestions,
  vibeSuggestions,
  onUserSelect,
  onPlaceSelect,
  onCitySelect,
  onVibeSelect
}) => {
  return (
    <>
      <Collapsible open={showCitySuggestions && searchCategory === "places"} className="w-full">
        <CollapsibleContent className="overflow-hidden">
          <Card className="mt-1 w-full p-2 shadow-md border border-border">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground px-2 py-1">Suggested Cities</p>
              {citySuggestions.map((city, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer"
                  onClick={() => onCitySelect(city)}
                >
                  <div className="h-8 w-8 flex items-center justify-center rounded-md bg-primary/10">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{city}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={showUserSuggestions && searchCategory === "users"} className="w-full">
        <CollapsibleContent className="overflow-hidden">
          <Card className="mt-1 w-full p-2 shadow-md border border-border">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground px-2 py-1">Suggested Users</p>
              {suggestedUsers.map((user) => (
                <div 
                  key={user.id} 
                  className="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer"
                  onClick={() => onUserSelect(user.username)}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground">@{user.username}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={showPlaceSuggestions && searchCategory === "places"} className="w-full">
        <CollapsibleContent className="overflow-hidden">
          <Card className="mt-1 w-full p-2 shadow-md border border-border">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground px-2 py-1 flex items-center">
                Featured Venues <Star className="h-3 w-3 text-amber-500 ml-1 fill-amber-500" />
              </p>
              {premiumPlaces.map((place) => (
                <div 
                  key={place.id} 
                  className={`flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer my-1 ${place.isPremium ? 'bg-amber-500/10 border border-amber-500/30' : ''}`}
                  onClick={() => onPlaceSelect(place.name)}
                >
                  <div className={`h-8 w-8 flex items-center justify-center rounded-md ${place.isPremium ? 'bg-amber-500/20' : 'bg-primary/10'}`}>
                    <MapPin className={`h-4 w-4 ${place.isPremium ? 'text-amber-500' : 'text-primary'}`} />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-sm font-medium flex items-center">
                      {place.name}
                      {place.isPremium && <Star className="h-3 w-3 text-amber-500 ml-1 fill-amber-500" />}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {place.city}, {place.state}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={showVibeSuggestions && searchCategory === "vibes"} className="w-full">
        <CollapsibleContent className="overflow-hidden">
          <Card className="mt-1 w-full p-2 shadow-md border border-border">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground px-2 py-1">Popular Vibes</p>
              <div className="flex flex-wrap gap-2 p-2">
                {vibeSuggestions.map((vibe, index) => (
                  <Badge 
                    key={index} 
                    className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 cursor-pointer flex items-center"
                    onClick={() => onVibeSelect(vibe)}
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    {vibe}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

export default SearchSuggestions;
