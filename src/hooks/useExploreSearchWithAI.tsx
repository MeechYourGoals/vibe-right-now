
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DateRange } from "react-day-picker";

export default function useExploreSearchWithAI() {
  const [isAIReady, setIsAIReady] = useState<boolean>(false);
  const [isAIPersonalized, setIsAIPersonalized] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if AI should be ready based on some conditions
  useEffect(() => {
    const checkAIReady = async () => {
      try {
        // Simulate checking if AI is ready
        setTimeout(() => {
          setIsAIReady(true);
        }, 1000);
      } catch (error) {
        console.error("Error checking AI readiness:", error);
      }
    };
    
    checkAIReady();
  }, []);

  // Handle search
  const handleSearch = (query: string, filterType: string, category: string = "places") => {
    const searchParams = new URLSearchParams();
    if (query) {
      searchParams.set('q', query);
    }
    if (filterType && filterType !== "All") {
      searchParams.set('filter', filterType);
    }
    if (category && category !== "all") {
      searchParams.set('category', category);
    }
    
    // Navigate to explore page with query parameters
    navigate(`/explore?${searchParams.toString()}`);
  };
  
  // Handle tab change
  const handleTabChange = (tab: string) => {
    const currentSearchParams = new URLSearchParams(location.search);
    currentSearchParams.set('tab', tab);
    navigate(`/explore?${currentSearchParams.toString()}`);
  };
  
  // Handle date range change
  const handleDateRangeChange = (range: DateRange | undefined) => {
    const searchParams = new URLSearchParams(location.search);
    
    if (range?.from) {
      searchParams.set('from', range.from.toISOString().split('T')[0]);
      if (range.to) {
        searchParams.set('to', range.to.toISOString().split('T')[0]);
      } else {
        searchParams.delete('to');
      }
    } else {
      searchParams.delete('from');
      searchParams.delete('to');
    }
    
    navigate(`/explore?${searchParams.toString()}`);
  };

  return {
    handleSearch,
    handleTabChange,
    handleDateRangeChange,
    isAIReady,
    isAIPersonalized,
    setIsAIPersonalized
  };
}
