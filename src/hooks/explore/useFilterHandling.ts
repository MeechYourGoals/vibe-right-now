
import { mockLocations } from "@/mock/locations";
import { Location } from "@/types";
import { useLocation, useNavigate } from "react-router-dom";
import { mockUsers } from "@/mock/users";

// Import vibeTags from useUserProfile
import { vibeTags } from "@/hooks/useUserProfile";

export const useFilterHandling = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleTabChange = (
    value: string,
    searchQuery: string,
    searchedCity: string,
    searchedState: string,
    searchCategory: string,
    vibeFilter: string,
    setFilteredLocations: React.Dispatch<React.SetStateAction<Location[]>>
  ) => {
    // Check if user category is selected - should not filter locations
    if (searchCategory === "users") {
      return;
    }
    
    // If the tab value is not 'all', filter the locations by type
    const filteredByType = mockLocations.filter(loc => {
      if (value === 'all') return true;
      return loc.type?.toLowerCase() === value.toLowerCase();
    });
    
    // If there's a vibe filter active, apply that as well
    const filteredByVibe = vibeFilter 
      ? filteredByType.filter(loc => {
          if (!loc.vibeTags) return false;
          return loc.vibeTags.some(tag => 
            tag.toLowerCase() === vibeFilter.toLowerCase()
          );
        })
      : filteredByType;
    
    // If there's a search query for places, filter by city or state or venue name
    const filteredBySearch = searchQuery && searchCategory === 'places'
      ? filteredByVibe.filter(loc => {
          const searchLower = searchQuery.toLowerCase();
          const cityMatch = loc.city?.toLowerCase().includes(searchLower);
          const stateMatch = loc.state?.toLowerCase().includes(searchLower);
          const nameMatch = loc.name.toLowerCase().includes(searchLower);
          return cityMatch || stateMatch || nameMatch;
        })
      : filteredByVibe;
    
    // If there's a specific city being searched, filter by that city
    const filteredByCity = searchedCity
      ? filteredBySearch.filter(loc => {
          return loc.city?.toLowerCase() === searchedCity.toLowerCase();
        })
      : filteredBySearch;
    
    setFilteredLocations(filteredByCity);
  };

  const handleSearch = (
    query: string,
    filterType: string,
    category: string,
    searchQuery: string,
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
    setSearchCategory: React.Dispatch<React.SetStateAction<string>>,
    setActiveTab: React.Dispatch<React.SetStateAction<string>>,
    setSearchedCity: React.Dispatch<React.SetStateAction<string>>,
    setSearchedState: React.Dispatch<React.SetStateAction<string>>,
    setMusicEvents: React.Dispatch<React.SetStateAction<Location[]>>,
    setComedyEvents: React.Dispatch<React.SetStateAction<Location[]>>,
    setNightlifeVenues: React.Dispatch<React.SetStateAction<Location[]>>,
    setFilteredLocations: React.Dispatch<React.SetStateAction<Location[]>>,
    vibeFilter: string,
    setVibeFilter: React.Dispatch<React.SetStateAction<string>>,
    dateRange: any,
    processComplexQuery: (query: string) => Promise<void>,
    setIsNaturalLanguageSearch: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    // Handle user category differently
    if (category === "users") {
      // Navigate to user profile if it's a direct username
      const usernameMatch = query.match(/^@?([a-zA-Z0-9_]+)$/);
      if (usernameMatch) {
        const username = usernameMatch[1];
        
        // Verify if the username exists
        const userExists = mockUsers.some(user => user.username === username);
        
        if (userExists) {
          navigate(`/user/${username}`);
          return;
        }
      }
      
      // If we get here, it's not a direct username match
      setSearchQuery(query);
      setSearchCategory(category);
      return;
    }
    
    setSearchQuery(query);
    setSearchCategory(category);
    
    // If there's a special category like music or comedy, set the active tab
    if (category === "music") {
      setActiveTab("music");
    } else if (category === "comedy") {
      setActiveTab("comedy");
    } else if (category === "nightlife") {
      setActiveTab("nightlife");
    }
    
    // Complex query detection
    const isComplexQuery = query.length > 40 && 
      /(\w+\s+(and|or|with|near|before|after)\s+\w+)|(\w+\s+for\s+\w+)/i.test(query);
    
    if (isComplexQuery) {
      // Use NLP to analyze the query
      processComplexQuery(query);
      setIsNaturalLanguageSearch(true);
      return;
    }
    
    // Reset NLP flag for simple queries
    setIsNaturalLanguageSearch(false);
    
    // Check if query is a vibe tag
    const matchingVibeTag = vibeTags.find(tag => 
      tag.toLowerCase() === query.toLowerCase()
    );
    
    if (matchingVibeTag && category === "vibes") {
      setVibeFilter(matchingVibeTag);
      // Find locations with this vibe tag
      const vibeLocations = mockLocations.filter(loc => 
        loc.vibeTags && loc.vibeTags.some(tag => 
          tag.toLowerCase() === matchingVibeTag.toLowerCase()
        )
      );
      setFilteredLocations(vibeLocations);
      return;
    }
    
    // Process regular search
    // For simplicity, we'll just set the searched city and update locations
    setSearchedCity(query);
    setSearchedState("");
    
    // Update URL search params
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('q', query);
    if (category !== "all") {
      searchParams.set('category', category);
    } else {
      searchParams.delete('category');
    }
    
    // Update URL without reload
    navigate(`/explore?${searchParams.toString()}`, { replace: true });
    
    // Filter locations based on query
    const filteredBySearch = mockLocations.filter(loc => {
      const searchLower = query.toLowerCase();
      const cityMatch = loc.city?.toLowerCase().includes(searchLower);
      const stateMatch = loc.state?.toLowerCase().includes(searchLower);
      const nameMatch = loc.name.toLowerCase().includes(searchLower);
      return cityMatch || stateMatch || nameMatch;
    });
    
    // Update filtered locations
    setFilteredLocations(filteredBySearch);
    
    // Update music, comedy, and nightlife events
    const musicFiltered = filteredBySearch.filter(loc => loc.type === "music_venue");
    const comedyFiltered = filteredBySearch.filter(loc => loc.type === "comedy_club");
    const nightlifeFiltered = filteredBySearch.filter(loc => 
      loc.type === "bar" || loc.type === "nightclub" || loc.type === "lounge"
    );
    
    setMusicEvents(musicFiltered);
    setComedyEvents(comedyFiltered);
    setNightlifeVenues(nightlifeFiltered);
  };

  const handleClearVibeFilter = (
    searchQuery: string,
    searchCategory: string,
    setVibeFilter: React.Dispatch<React.SetStateAction<string>>,
    handleSearch: (query: string, filterType: string, category: string) => void
  ) => {
    setVibeFilter("");
    handleSearch(searchQuery, "", searchCategory);
  };

  return {
    handleTabChange,
    handleSearch,
    handleClearVibeFilter
  };
};

export default useFilterHandling;
