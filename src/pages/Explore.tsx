
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { ExploreContent } from "@/components/explore/ExploreContent";
import { ExploreSidebar } from "@/components/explore/ExploreSidebar";
import { useSearchParams } from "react-router-dom";
import { useExploreState } from "@/hooks/useExploreState";
import { useFilterHandling } from "@/hooks/explore/useFilterHandling";
import { useLocationData } from "@/hooks/explore/useLocationData";
import { useQueryProcessing } from "@/hooks/explore/useQueryProcessing";
import { useCityDetection } from "@/hooks/explore/useCityDetection";
import { cityLocations } from "@/mock/cityLocations";

const Explore = () => {
  const [searchParams] = useSearchParams();
  const {
    selectedCity,
    setSelectedCity,
    selectedCategory,
    setSelectedCategory,
    selectedFilters,
    setSelectedFilters,
    selectedVibeFilter,
    setSelectedVibeFilter,
    selectedDateRange,
    setSelectedDateRange,
    isLoading,
    setIsLoading
  } = useExploreState();
  
  const { filteredResults, allLocations } = useLocationData(
    selectedCity,
    selectedCategory,
    selectedFilters,
    selectedVibeFilter,
    selectedDateRange
  );
  
  const { processedQuery, setProcessedQuery } = useQueryProcessing();
  const { cityFromQuery } = useCityDetection(processedQuery);
  
  const { handleCategoryFilter, handleVibeFilter, handleDateRangeFilter } = useFilterHandling(
    setSelectedCategory,
    setSelectedVibeFilter,
    setSelectedDateRange,
    setIsLoading
  );

  useEffect(() => {
    if (cityFromQuery && cityFromQuery !== selectedCity) {
      setSelectedCity(cityFromQuery);
    }
  }, [cityFromQuery, selectedCity, setSelectedCity]);

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setProcessedQuery(query);
    }
  }, [searchParams, setProcessedQuery]);

  // Helper function to find city by name
  const findCityByName = (cityName: string) => {
    return cityLocations[cityName] || null;
  };

  const cityData = findCityByName(selectedCity);
  const locations = cityData || filteredResults;

  return (
    <Layout>
      <div className="flex min-h-screen">
        <ExploreSidebar
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryFilter}
          selectedFilters={selectedFilters}
          onFiltersChange={setSelectedFilters}
          selectedVibeFilter={selectedVibeFilter}
          onVibeFilterChange={handleVibeFilter}
          selectedDateRange={selectedDateRange}
          onDateRangeChange={handleDateRangeFilter}
          allLocations={allLocations}
        />
        
        <div className="flex-1 overflow-hidden">
          <ExploreContent
            locations={locations}
            selectedCity={selectedCity}
            isLoading={isLoading}
            processedQuery={processedQuery}
            onQueryChange={setProcessedQuery}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Explore;
