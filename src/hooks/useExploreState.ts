
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mockLocations } from '@/mock/locations';
import { Location } from '@/types';

export const useExploreState = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('all');
  const [searchedCity, setSearchedCity] = useState<string | null>(null);
  const [searchedState, setSearchedState] = useState<string | null>(null);
  const [searchCategory, setSearchCategory] = useState<string>('places');
  const [filteredLocations, setFilteredLocations] = useState<Location[]>(mockLocations);
  const [locationTags, setLocationTags] = useState<Record<string, string[]>>({});
  const [musicEvents, setMusicEvents] = useState<any[]>([]);
  const [comedyEvents, setComedyEvents] = useState<any[]>([]);
  const [nightlifeVenues, setNightlifeVenues] = useState<any[]>([]);
  const [vibeFilter, setVibeFilter] = useState<string | null>(null);
  const [isNaturalLanguageSearch, setIsNaturalLanguageSearch] = useState(false);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date } | undefined>();
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [activeSearchTab, setActiveSearchTab] = useState('all');

  const getPageTitle = () => {
    if (searchedCity) {
      return `Explore Vibes in ${searchedCity}${searchedState ? `, ${searchedState}` : ''}`;
    }
    return 'Explore Vibes';
  };

  const handleSearch = (query: string, category: string = 'places') => {
    setSearchedCity(query);
    setSearchCategory(category);
    setIsLoadingResults(true);
    
    setTimeout(() => {
      setFilteredLocations(mockLocations.filter(location => 
        location.city.toLowerCase().includes(query.toLowerCase()) ||
        location.name.toLowerCase().includes(query.toLowerCase())
      ));
      setIsLoadingResults(false);
    }, 1000);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab !== 'all') {
      setFilteredLocations(mockLocations.filter(location => location.type === tab));
    } else {
      setFilteredLocations(mockLocations);
    }
  };

  const handleClearVibeFilter = () => {
    setVibeFilter(null);
  };

  const handleDateRangeChange = (range: { from?: Date; to?: Date } | undefined) => {
    setDateRange(range);
  };

  const handleClearDates = () => {
    setDateRange(undefined);
  };

  const handleSearchTabChange = (tab: string) => {
    setActiveSearchTab(tab);
  };

  return {
    activeTab,
    searchedCity,
    searchedState,
    searchCategory,
    filteredLocations,
    locationTags,
    musicEvents,
    comedyEvents,
    nightlifeVenues,
    vibeFilter,
    isNaturalLanguageSearch,
    isLoadingResults,
    dateRange,
    showDateFilter,
    activeSearchTab,
    getPageTitle,
    handleSearch,
    handleTabChange,
    handleClearVibeFilter,
    handleDateRangeChange,
    handleClearDates,
    handleSearchTabChange,
    setShowDateFilter
  };
};

export default useExploreState;
