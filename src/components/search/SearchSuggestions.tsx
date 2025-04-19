
import { Location } from "@/types";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MapPin, Star, Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";

interface SearchSuggestionsProps {
  searchCategory: string;
  showUserSuggestions: boolean;
  showPlaceSuggestions: boolean;
  showVibeSuggestions: boolean;
  showCitySuggestions: boolean;
  suggestedUsers: any[];
  premiumPlaces: Location[];
  citySuggestions: string[];
  vibeSuggestions: string[];
  searchQuery: string;
  handleUserSelect: (username: string) => void;
  handlePlaceSelect: (placeName: string) => void;
  handleVibeSelect: (vibe: string) => void;
  handleCitySelect: (city: string) => void;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  searchCategory,
  showUserSuggestions,
  showPlaceSuggestions,
  showVibeSuggestions,
  showCitySuggestions,
  suggestedUsers,
  premiumPlaces,
  citySuggestions,
  vibeSuggestions,
  searchQuery,
  handleUserSelect,
  handlePlaceSelect,
  handleVibeSelect,
  handleCitySelect,
}) => {
  if (!showUserSuggestions && !showPlaceSuggestions && !showVibeSuggestions && !showCitySuggestions) {
    return null;
  }

  return (
    <Card className="mt-1 w-full p-2 shadow-md border border-border">
      {showUserSuggestions && searchCategory === "users" && (
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground px-2 py-1">
            {searchQuery.length === 0 ? "Featured Users" : "Search Results"}
          </p>
          {suggestedUsers.length > 0 ? (
            suggestedUsers
              .filter(user => 
                !searchQuery || 
                user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((user) => (
                <div 
                  key={user.id} 
                  className="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer"
                  onClick={() => handleUserSelect(user.username)}
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
              ))
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              <p>No users found</p>
            </div>
          )}
        </div>
      )}

      {showPlaceSuggestions && searchCategory === "places" && (
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground px-2 py-1 flex items-center">
            Featured Venues <Star className="h-3 w-3 text-amber-500 ml-1 fill-amber-500" />
          </p>
          {premiumPlaces.map((place) => (
            <div 
              key={place.id} 
              className={`flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer my-1 ${place.isPremium ? 'bg-amber-500/10 border border-amber-500/30' : ''}`}
              onClick={() => handlePlaceSelect(place.name)}
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
      )}

      {showCitySuggestions && searchCategory === "places" && (
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground px-2 py-1">Suggested Cities</p>
          {citySuggestions.map((city, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer"
              onClick={() => handleCitySelect(city)}
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
      )}

      {showVibeSuggestions && searchCategory === "vibes" && (
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground px-2 py-1">Popular Vibes</p>
          <div className="flex flex-wrap gap-2 p-2">
            {vibeSuggestions.map((vibe, index) => (
              <Badge 
                key={index} 
                className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 cursor-pointer flex items-center"
                onClick={() => handleVibeSelect(vibe)}
              >
                <Sparkles className="h-3 w-3 mr-1" />
                {vibe}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default SearchSuggestions;
