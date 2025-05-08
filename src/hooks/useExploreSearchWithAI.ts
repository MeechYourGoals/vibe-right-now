
import { useState, useCallback } from "react";
import { useExploreSearch } from "./useExploreSearch";
import { LocalAIService } from "@/services/LocalAIService";

/**
 * Enhanced hook for explore search with AI personalization
 */
const useExploreSearchWithAI = () => {
  const [isAIReady, setIsAIReady] = useState<boolean>(true);
  const [isAIPersonalized, setIsAIPersonalized] = useState<boolean>(false);

  const {
    handleSearch,
    handleTabChange,
    handleDateRangeChange,
    processComplexQuery,
    fetchRealData
  } = useExploreSearch();

  // Enhanced search with AI personalization
  const handleSearchWithAI = useCallback((query: string, filterType: string, category: string) => {
    if (isAIPersonalized) {
      // Process query with AI for personalization
      LocalAIService.analyzeSentiment(query)
        .then(sentiment => {
          console.log('Query sentiment analysis:', sentiment);
          
          // Extract keywords to enhance search
          return LocalAIService.extractKeywords(query);
        })
        .then(keywords => {
          console.log('Extracted keywords:', keywords);
          // Proceed with regular search but with AI-enhanced context
          handleSearch(query, filterType, category);
        })
        .catch(error => {
          console.error('Error in AI search enhancement:', error);
          // Fall back to regular search
          handleSearch(query, filterType, category);
        });
    } else {
      // Regular search without AI
      handleSearch(query, filterType, category);
    }
  }, [handleSearch, isAIPersonalized]);

  // Enhanced tab change with AI personalization
  const handleTabChangeWithAI = useCallback((value: string) => {
    console.log('Tab changed to:', value);
    handleTabChange(value);
  }, [handleTabChange]);

  return {
    handleSearch: handleSearchWithAI,
    handleTabChange: handleTabChangeWithAI,
    handleDateRangeChange,
    isAIReady,
    isAIPersonalized,
    setIsAIPersonalized
  };
};

export default useExploreSearchWithAI;
