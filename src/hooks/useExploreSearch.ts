
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { searchTripAdvisor } from "@/services/tripAdvisorService";
import { useExploreData } from "@/hooks/useExploreData";
import { useExploreInitialization } from "@/hooks/useExploreInitialization";
import { useSearchHandlers } from "@/hooks/useSearchHandlers";
import { processComplexQuery, fetchRealData } from "@/utils/explore/searchUtils";

export const useExploreSearch = () => {
  const exploreData = useExploreData();
  const { toast, navigate } = useExploreInitialization(exploreData, {
    processComplexQuery: (query: string) => processComplexQueryWrapper(query),
    fetchRealData: (query: string, city: string, state: string) => fetchRealDataWrapper(query, city, state)
  });
  
  // Wrapper for processComplexQuery to provide all the necessary dependencies
  const processComplexQueryWrapper = (query: string) => {
    return processComplexQuery(
      query,
      exploreData.setIsLoadingResults,
      toast,
      supabase,
      exploreData.setSearchCategories,
      exploreData.setSearchedCity,
      exploreData.setSearchedState,
      fetchRealDataWrapper,
      exploreData.setComedyEvents,
      exploreData.setMusicEvents,
      exploreData.setNightlifeVenues,
      exploreData.dateRange,
      exploreData.setFilteredLocations,
      exploreData.realDataResults,
      exploreData.setActiveTab,
      exploreData.setVibeFilter
    );
  };
  
  // Wrapper for fetchRealData to provide all the necessary dependencies
  const fetchRealDataWrapper = (query: string, city: string, state: string) => {
    return fetchRealData(
      query,
      city,
      state,
      searchTripAdvisor,
      exploreData.setIsLoadingResults,
      toast,
      exploreData.setRealDataResults,
      exploreData.locationTags,
      exploreData.setLocationTags,
      exploreData.setFilteredLocations
    );
  };
  
  // Get the search handlers with the necessary context
  const { 
    handleSearch, 
    handleTabChange, 
    handleDateRangeChange 
  } = useSearchHandlers(
    exploreData,
    {
      processComplexQuery: processComplexQueryWrapper,
      fetchRealData: fetchRealDataWrapper
    },
    navigate
  );

  return {
    handleSearch,
    handleTabChange,
    handleDateRangeChange,
    processComplexQuery: processComplexQueryWrapper,
    fetchRealData: fetchRealDataWrapper
  };
};
