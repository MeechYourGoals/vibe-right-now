
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DateRange } from "react-day-picker";

export const useSearchParams = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedCity, setSearchedCity] = useState("");
  const [searchedState, setSearchedState] = useState("");
  const [searchCategory, setSearchCategory] = useState("all");
  const [vibeFilter, setVibeFilter] = useState<string>("");
  const [isNaturalLanguageSearch, setIsNaturalLanguageSearch] = useState(false);
  const [searchCategories, setSearchCategories] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [activeSearchTab, setActiveSearchTab] = useState("all");
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Process URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    const vibe = params.get('vibe');
    const tab = params.get('tab');
    const fromDate = params.get('from');
    const toDate = params.get('to');
    
    if (fromDate) {
      const from = new Date(fromDate);
      let range: DateRange = { from };
      
      if (toDate) {
        range.to = new Date(toDate);
      }
      
      setDateRange(range);
      setShowDateFilter(true);
    }
    
    if (vibe) {
      setVibeFilter(vibe);
    }
    
    const lastChatQuery = sessionStorage.getItem('lastChatQuery');
    const lastChatTimestamp = sessionStorage.getItem('lastChatTimestamp');
    
    if (lastChatQuery && lastChatTimestamp && !q) {
      const timestamp = new Date(lastChatTimestamp);
      const fiveMinutesAgo = new Date();
      fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);
      
      if (timestamp > fiveMinutesAgo) {
        setSearchQuery(lastChatQuery);
        
        sessionStorage.removeItem('lastChatQuery');
        sessionStorage.removeItem('lastChatTimestamp');
        
        if (sessionStorage.getItem('isComplexQuery') === 'true') {
          setIsNaturalLanguageSearch(true);
          sessionStorage.removeItem('isComplexQuery');
        }
        
        const searchParams = new URLSearchParams();
        searchParams.set('q', lastChatQuery);
        navigate(`/explore?${searchParams.toString()}`, { replace: true });
      }
    }
  }, [location.search, navigate]);
  
  // Handle search tab change
  const handleSearchTabChange = (value: string) => {
    setActiveSearchTab(value);
    if (value === 'dates') {
      setShowDateFilter(true);
    } else {
      setShowDateFilter(false);
    }
  };
  
  // Handle date range change
  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    
    // Update URL with date params
    if (range?.from) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('from', range.from.toISOString().split('T')[0]);
      if (range.to) {
        searchParams.set('to', range.to.toISOString().split('T')[0]);
      } else {
        searchParams.delete('to');
      }
      navigate(`/explore?${searchParams.toString()}`, { replace: true });
    }
  };
  
  // Handle clear dates
  const handleClearDates = () => {
    setDateRange(undefined);
    setShowDateFilter(false);
    
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete('from');
    searchParams.delete('to');
    navigate(`/explore?${searchParams.toString()}`, { replace: true });
  };

  return {
    searchQuery,
    searchedCity,
    searchedState,
    searchCategory,
    vibeFilter,
    isNaturalLanguageSearch,
    searchCategories,
    dateRange,
    showDateFilter,
    activeSearchTab,
    setSearchQuery,
    setSearchedCity,
    setSearchedState,
    setSearchCategory,
    setVibeFilter,
    setIsNaturalLanguageSearch,
    setSearchCategories,
    setDateRange,
    setShowDateFilter,
    handleSearchTabChange,
    handleDateRangeChange,
    handleClearDates
  };
};
