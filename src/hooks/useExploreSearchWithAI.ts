import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from './useDebounce';
import { Location } from '@/types';
import { localAI } from '@/services/LocalAIService';
import { preferenceMatcher } from '@/services/PreferenceMatcherService';
import { useUserPreferences } from './useUserPreferences';

const useExploreSearchWithAI = () => {
  const [searchParams] = useSearchParams();
  const initialSearchQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'all';

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [category, setCategory] = useState(initialCategory);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(initialSearchQuery);
  const [isAIReady, setIsAIReady] = useState(false);
  const [aiLoadError, setAiLoadError] = useState<string | null>(null);
  const [isAIPersonalized, setIsAIPersonalized] = useState(true);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);

  const { preferences, isLoading: isPreferencesLoading } = useUserPreferences();
  const debouncedValue = useDebounce(searchQuery, 500);

  useEffect(() => {
    setDebouncedSearchQuery(debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    setSearchQuery(initialSearchQuery);
    setCategory(initialCategory);
    setDebouncedSearchQuery(initialSearchQuery);
  }, [initialSearchQuery, initialCategory]);

  useEffect(() => {
    const initializeAI = async () => {
      try {
        await localAI.initModels();
        setIsAIReady(true);
      } catch (error) {
        console.error('Error initializing local AI:', error);
        setAiLoadError('Failed to initialize AI personalization');
      }
    };

    initializeAI();
  }, []);

  const initLocalAI = async () => {
    try {
      await localAI.initModels();
      setIsAIReady(true);
    } catch (error) {
      console.error('Error initializing local AI:', error);
      setAiLoadError('Failed to initialize AI personalization');
    }
  };

  const searchLocationsWithAI = async (locations: Location[]): Promise<Location[]> => {
    if (!isAIReady || isPreferencesLoading || !isAIPersonalized) {
      return locations;
    }

    try {
      const userPrefs = preferences.interests.concat(preferences.vibes).concat(preferences.categories);
      const aiEnhancedLocations = await preferenceMatcher.sortByPreferenceMatch(locations, userPrefs);
      return aiEnhancedLocations;
    } catch (error) {
      console.error('Error searching locations with AI:', error);
      return locations;
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    category,
    setCategory,
    debouncedSearchQuery,
    isAIReady,
    aiLoadError,
    isAIPersonalized,
    setIsAIPersonalized,
    searchLocationsWithAI,
    filteredLocations,
    setFilteredLocations,
  };
};

export default useExploreSearchWithAI;
