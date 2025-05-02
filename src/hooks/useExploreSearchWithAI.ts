
import { useExploreSearch } from "./useExploreSearch";
import { useUserPreferences } from "./useUserPreferences";
import { preferenceMatcher } from "@/services/PreferenceMatcherService";
import { localAI } from "@/services/LocalAIService";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Location } from "@/types";

/**
 * Enhanced version of useExploreSearch with local AI personalization
 */
export const useExploreSearchWithAI = () => {
  const [isAIEnabled, setIsAIEnabled] = useState(true);
  const [isAIReady, setIsAIReady] = useState(false);
  const [aiLoadError, setAiLoadError] = useState<string | null>(null);
  
  // Get base explore search functionality
  const exploreSearch = useExploreSearch();
  
  // Get user preferences
  const { getAllPreferencesFlat } = useUserPreferences();
  
  // Initial AI loading check
  useEffect(() => {
    const checkAIStatus = async () => {
      try {
        await localAI.initModels();
        setIsAIReady(true);
      } catch (error) {
        console.error('Failed to initialize AI models:', error);
        setAILoadError('Failed to load AI models');
        setIsAIEnabled(false);
      }
    };
    
    checkAIStatus();
  }, []);
  
  // Wrap the handle search function with AI personalization
  const handleSearchWithAI = async (
    query: string, 
    filterType: string, 
    category: string
  ) => {
    // First call the original search function
    await exploreSearch.handleSearch(query, filterType, category);
    
    // Then apply AI personalization if enabled
    if (isAIEnabled && isAIReady) {
      try {
        const preferences = getAllPreferencesFlat();
        
        // Skip personalization if no preferences
        if (!preferences || preferences.length === 0) return;
        
        // Wait for the base search to complete and then personalize results
        setTimeout(async () => {
          const locations = exploreSearch.filteredLocations;
          
          if (locations && locations.length > 0) {
            const personalizedLocations = await preferenceMatcher.sortByPreferenceMatch(
              locations,
              preferences
            );
            
            // Update the filtered locations with personalized ordering
            exploreSearch.setFilteredLocations(personalizedLocations);
            
            toast.success('Results personalized based on your preferences', {
              duration: 2000
            });
          }
        }, 300);
      } catch (error) {
        console.error('Error personalizing search results:', error);
      }
    }
  };
  
  // Wrap tab change with AI personalization
  const handleTabChangeWithAI = async (tabValue: string) => {
    // First call the original tab change function
    exploreSearch.handleTabChange(tabValue);
    
    // Then apply AI personalization if enabled
    if (isAIEnabled && isAIReady) {
      try {
        const preferences = getAllPreferencesFlat();
        
        // Skip personalization if no preferences
        if (!preferences || preferences.length === 0) return;
        
        // Wait for the tab change to complete and then personalize results
        setTimeout(async () => {
          const locations = exploreSearch.filteredLocations;
          
          if (locations && locations.length > 0) {
            const personalizedLocations = await preferenceMatcher.sortByPreferenceMatch(
              locations,
              preferences
            );
            
            // Update the filtered locations with personalized ordering
            exploreSearch.setFilteredLocations(personalizedLocations);
          }
        }, 300);
      } catch (error) {
        console.error('Error personalizing tab results:', error);
      }
    }
  };
  
  return {
    ...exploreSearch,
    handleSearch: handleSearchWithAI,
    handleTabChange: handleTabChangeWithAI,
    isAIEnabled,
    setIsAIEnabled,
    isAIReady
  };
};
